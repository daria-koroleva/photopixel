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
  data:any;
  usernamelist=[];
  useridlist=[];//
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
         // this.follows = post;
          this.data=post;
          for(let i in post){
            this.usernamelist.push(post[i].username);
            //this.useridlist.push(post[i].id);
          }
          
          
          
          //console.log(post[0].id);
          //console.log(this.data[0]);
          //console.log(this.userid[0]);
          //this.follows = post;
          // console.log(post,this.follows.length)
          // this.postsLoaded = true;
        }
      );
    })
    
  }

}

