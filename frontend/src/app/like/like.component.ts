import { Component, Input, OnInit } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-like',
  templateUrl: './like.component.html',
  styleUrls: ['./like.component.css']
})
export class LikeComponent implements OnInit {

  @Input() postid;

  likes: any = [];
  isliked = true;

  isShowLikers: boolean;

  constructor(private api: ApiService) { }

  ngOnInit(): void {

    this.updateLikes();
  }

  like() {

    this.api.like(this.postid, this.getLiker()).subscribe(response => {
      this.updateLikes();

      this.isliked = true;
    });
  }

  unlike() {
    this.api.unlike(this.postid).subscribe(response => {
      this.updateLikes();
      this.isliked = false;
    });
  }



  updateLikes() {


    this.api.getLikesByPost(this.postid).subscribe(
      likes => {
        this.likes = likes;
        this.isliked = this.likes.filter(like => like.liker == this.getLiker()).length > 0;

      });



  }


  getLiker() {

    return JSON.parse(localStorage.getItem('currentUser')).id;


  }

  showLikers() {
    this.isShowLikers = true;
  }

  closeLikers() {
    this.isShowLikers = false;
  }

}
