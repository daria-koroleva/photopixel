import { Component, OnInit } from '@angular/core';
import { ApiService } from './../api.service';
import { first, map } from 'rxjs/operators'
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  posts: any;
  currentUserName: string;
  currentUserProfilePic: string;
  constructor(private api : ApiService, private _router:Router) {

  }

  ngOnInit(): void {
    this.setCurrentUserName();
    this.setCurrentUserProfilePictureName();
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

  setCurrentUserProfilePictureName(){
    if (this.userLoggedIn()) {
      this.currentUserProfilePic = JSON.parse(localStorage.getItem("currentUser")).profilePictureName;
      console.log(this.currentUserProfilePic);
    }
  }

  getProfileData(){
    this.api.getMyPosts().pipe(first()).subscribe(
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
    this.api.deleteImage(post_id).subscribe(
      data => {
        console.log(data);
        this.posts = null;
        this._router.navigateByUrl("");
      }
    );
  }



}
