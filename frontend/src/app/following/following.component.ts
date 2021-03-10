import { Component, OnInit } from '@angular/core';
import { ApiService } from './../api.service';
import { first, map } from 'rxjs/operators'
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-following',
  templateUrl: './following.component.html',
  styleUrls: ['./following.component.css']
})
export class FollowingComponent implements OnInit {
  follows:any
  constructor(private api : ApiService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.getFollowings();
  }
  getFollowings(){
    this.activatedRoute.params.subscribe(params => {
      if(!params.id){
        return;
      }
      this.api.getListOfFollowersOfUserId(params.id).pipe(first()).subscribe(
        post => {
          
          this.follows = post;
          // console.log(post,this.follows.length)
          // this.postsLoaded = true;
        }
      );
    })
    
  }

}

