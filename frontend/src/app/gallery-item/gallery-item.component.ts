import { Component, Input, OnInit, Output } from '@angular/core';
import { Options } from '@flywine93/ngx-imgclicker';
import { Router, RouterLink } from '@angular/router';
import { ApiService } from './../api.service';
import { first, map } from 'rxjs/operators';
import { post } from 'jquery';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { DataService } from '../data.service'


@Component({
  selector: 'app-gallery-item',
  templateUrl: './gallery-item.component.html',
  styleUrls: ['./gallery-item.component.css']
})
export class GalleryItemComponent implements OnInit {


  message: string;
  postId: any;
  passData: string[] = [];

  posts: any;
  profileId: number = null;
  profileInfoLoaded: boolean = false;
  postsLoaded: boolean = false;

  @Input() fileName: string;
  @Input() post: any;

  isPostDetail: boolean;


  constructor(private api: ApiService, private _router: Router, private data: DataService) {

  }



  ngOnInit(): void {
    //console.log(this.fileName,'filename');
    this.data.currentMessage.subscribe(message => this.message = message)
    //this.data.currentMessage.subscribe( postId=> postId = postId)
    console.log('this is profileId : ', this.post.id)
    console.log(this.post);
  }

  title = 'imgclicker-project';
  options: Options = {
    urlCallback: (url: string) => {
      return url;
    }
  };



  getProfilePosts() {

    this.api.getAllPostsByUserId(this.profileId).pipe(first()).subscribe(
      post => {
        this.posts = post;
        this.postsLoaded = true;

      }
    );
  }

  deleteImage(post: any) {
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

  commentPage() {
    console.log('comment button is pressed');
    console.log('file name is ', this.fileName)
    console.log('this is profileId : ', this.post.id)
    this.passData.push(this.fileName)
    this.passData.push(this.post.id)
    this.newMessage(this.passData)
    //this.newMessage1(this.post.id)

  }

  newMessage(message) {
    this.data.changeMessage(message);
  }

  newMessage1(message) {
    this.data.changeMessage(message);
  }


  showPostDetail(): void {

    this.isPostDetail = true;

  }

  hidePostDetail(): void {

    this.isPostDetail = false;

  }



  isCurrentUser(): boolean {
    return (JSON.parse(localStorage.getItem("currentUser")).id == this.post.poster_id);
  }




}
