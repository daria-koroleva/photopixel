import { Component, OnInit } from '@angular/core';
import { ApiService } from './../api.service';
import { first, map } from 'rxjs/operators'
//import { deleteImage } from './../deleteImage/deleteImage.component';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { formatCurrency } from '@angular/common';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  posts: any;
  currentUserName: string;
  constructor(private api : ApiService, private http: HttpClient) {

  }

  ngOnInit(): void {
    this.setCurrentUserName();
    this.getProfileData();
  }

  userLoggedIn(){
    return (localStorage.length != 0);
  }

  setCurrentUserName(){
    if (this.userLoggedIn()) {
      this.currentUserName = JSON.parse(localStorage.getItem("currentUser")).username;
    }
  }

  getProfileData(){
    this.api.getposts().pipe(first()).subscribe(
      post => {
        console.log(post);
        this.posts = post;
      }
    );
  }

  deleteImage(post:any){
    let post_id = post.id;
    console.log("delete image button is pressed");
    console.log(post_id);
    //const fd = new FormData();
    //fd.append('image',this.posts.id);
    this.http.delete("http://127.0.0.1:8000/posts/post/"+post_id)
    .subscribe(val=>{
      console.log("DELETE call successful value returned in body", val);
    },
    res=>{
      console.log("DELETE call in error", res);
    },
    ()=>{
      console.log("The DELETE is now complete")
    });
  }


}
