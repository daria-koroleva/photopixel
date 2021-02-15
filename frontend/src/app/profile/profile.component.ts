import { Component, OnInit } from '@angular/core';
import { ApiService } from './../api.service';
import { first, map } from 'rxjs/operators'

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  posts: any;
  currentUserName: string;
  constructor(private api : ApiService) { 
   
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


}
