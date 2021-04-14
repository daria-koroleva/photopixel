import { Component, OnInit } from '@angular/core';
import { ApiService } from './../api.service';

@Component({
  selector: 'app-mainfeed',
  templateUrl: './mainfeed.component.html',
  styleUrls: ['./mainfeed.component.css']
})
export class MainfeedComponent implements OnInit {


  constructor(private api: ApiService) { }

  posts: any;


  ngOnInit(): void {
    this.getMainFeedPosts();
  }


  getMainFeedPosts(){
    this.api.getMainFeedPosts().subscribe(
      data => {
        this.posts = data;
      }
    );
  }




}
