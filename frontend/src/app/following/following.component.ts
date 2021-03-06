import { Component, OnInit } from '@angular/core';
import { ApiService } from './../api.service';
import { first, map } from 'rxjs/operators'
@Component({
  selector: 'app-following',
  templateUrl: './following.component.html',
  styleUrls: ['./following.component.css']
})
export class FollowingComponent implements OnInit {
  follows:any
  constructor(private api : ApiService) { }

  ngOnInit(): void {
    this.getFollowings();
  }
  getFollowings(){
    this.api.getFollowingsByUserId().pipe(first()).subscribe(
      post => {
        
        this.follows = post;
        // console.log(post,this.follows.length)
        // this.postsLoaded = true;
      }
    );
  }

}
