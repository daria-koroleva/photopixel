import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from './../api.service';
import { first } from 'rxjs/operators';
import { DataService } from '../data.service';


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
  profileInfoLoaded = false;
  postsLoaded = false;

  @Input() fileName: string;
  @Input() post: any;

  isPostDetail: boolean;


  constructor(private api: ApiService, private _router: Router, private data: DataService) {

  }

  ngOnInit(): void {
    this.data.currentMessage.subscribe(message => this.message = message);
  }


  getProfilePosts() {

    this.api.getAllPostsByUserId(this.profileId).pipe(first()).subscribe(
      post => {
        this.posts = post;
        this.postsLoaded = true;

      }
    );
  }

  deleteImage(post: any) {
    const post_id = post.id;
    this.api.deleteImage(post_id).subscribe(
      data => {
        this.posts = null;
        this._router.navigateByUrl('');
      }
    );
  }

  commentPage() {
    this.passData.push(this.fileName);
    this.passData.push(this.post.id);
    this.newMessage(this.passData);
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
    return (JSON.parse(localStorage.getItem('currentUser')).id == this.post.poster_id);
  }

}
