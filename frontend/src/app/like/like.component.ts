import { Component, Input, OnInit } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-like',
  templateUrl: './like.component.html',
  styleUrls: ['./like.component.css']
})
export class LikeComponent implements OnInit {

  @Input() postid;

  likes:any=[];
  isliked:boolean=true;

  constructor(private api:ApiService) { }

  ngOnInit(): void {

    this.updateLikes();
  }

  like(){
    
    //console.log("I like this");
    console.log(this.postid);

    this.api.like(this.postid).subscribe(response => {      
      this.updateLikes();
      
      this.isliked =true;
    });
  }

  unlike(){
    this.api.unlike(this.postid).subscribe(response => {
      this.updateLikes();
      this.isliked =false;
    });
  }


  updateLikes(){


    this.api.getLikesByPost(this.postid).subscribe(
      likes => {
         this.likes=likes;
    }
    )

  }



  

}
