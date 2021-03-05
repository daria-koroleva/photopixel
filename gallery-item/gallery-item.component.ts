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

  posts: any;
  profileId: number=null;
  profileInfoLoaded :boolean = false;
  postsLoaded :boolean = false;

  @Input() fileName: string;
  @Input() post: any;


  constructor(private api:ApiService, private _router:Router,private data:DataService) {

  }



  ngOnInit(): void {
    //console.log(this.fileName,'filename');
    this.data.currentMessage.subscribe(message => this.message = message)
  }

  title = 'imgclicker-project';
  options: Options = {
    urlCallback: (url: string) => {
      return url;
    }
  };



  getProfilePosts(){
    this.api.getAllPostsByUserId(this.profileId).pipe(first()).subscribe(
      post => {
        this.posts = post;
        this.postsLoaded = true;

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

  commentPage(){
    console.log('comment button is pressed');
    console.log('file name is ',this.fileName)
    this.newMessage(this.fileName)

  }

  newMessage(message){
    this.data.changeMessage(message);
  }




}
