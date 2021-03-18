import { Component, OnInit, OnDestroy } from '@angular/core';
import { ApiService } from './../api.service';
import { first, map } from 'rxjs/operators'
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  private sub: any;
  posts: any; //profile of posts currently being viewed
  // follows:any;
  profileInfo: any; //useer info of profile currently being viewed
  profileId: number=null; //user id of profile currently being viewed
  currentUserName: string; //username of logged in user
  postsLoaded :boolean = false;
  profileInfoLoaded :boolean = false;
  constructor(private api : ApiService, private _router:Router, private activatedRoute: ActivatedRoute) {

  }


  ngOnInit(): void {
    this.setCurrentUserName();
    this.sub = this.activatedRoute.params.subscribe(params => {
      this.profileId = params.id;
      if (this.profileId == null){
        this.profileId = JSON.parse(localStorage.getItem("currentUser")).id;
      }
      });
      this.getProfileInfo();
      this.getProfilePosts();
    }
    
  userLoggedIn(){
    return (localStorage.length != 0);
  }

  setCurrentUserName(){
    if (this.userLoggedIn()) {
      this.currentUserName = JSON.parse(localStorage.getItem("currentUser")).username;
    }
  }

  getProfilePosts(){
    this.api.getAllPostsByUserId(this.profileId).pipe(first()).subscribe(
      post => {
        this.posts = post;
        this.postsLoaded = true;
      }
    );
  }

  getProfileInfo(){
    this.api.getProfileInfoByUserId(this.profileId).pipe(first()).subscribe(
      profileInfo => {
        this.profileInfo = profileInfo;
        this.profileInfo.id = this.profileId;
        this.profileInfoLoaded = true;
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

