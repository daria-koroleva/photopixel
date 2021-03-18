import { Component, OnInit, Input, SimpleChange, Output, EventEmitter } from '@angular/core';
import { first, map } from 'rxjs/operators'
import { ApiService } from './../api.service';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-profile-header',
  templateUrl: './profile-header.component.html',
  styleUrls: ['./profile-header.component.css']
})
export class ProfileHeaderComponent implements OnInit {
  public isFollow: boolean = false;
  @Input() profileInfo:any;
  @Input() postCount:number;
  follows:any;
  currentUserName:string;
  profileId: number;
  user:any;

  @Output() outer = new EventEmitter();
  constructor(private api : ApiService, private activatedRoute: ActivatedRoute) { }
 
  ngOnInit(): void {
    this.setCurrentUserName();
    this.isFollow = false
    
  }
  ngOnChanges(){
    let obj = arguments[0]
    if(obj.profileInfo){
      this.activatedRoute.params.subscribe(params => {
        if(this.profileId == (params.id)) return;
        this.profileId = params.id;
        this.getFollowings()
      })
    }
    
  }
  getFollowings(){
    let id = this.profileId;
    let user =  JSON.parse(localStorage.getItem("currentUser"));
    this.isFollow = false
    this.follows = []
    if(!id) return;
    this.api.getListOfFollowersOfUserId(id).pipe(first()).subscribe(
      post => {
        
        this.follows = post;
        if(this.follows){
          this.follows.map(item=>{
            if(item["id"] == this.user.id){
              this.isFollow = true;
            }
          })
        }
      }
    );
  }
  onClick(){
    if(this.isFollow){
      this.api.UnFollow(this.profileInfo.id).subscribe(
        data => {
          console.log(data);
          this.getFollowings()
        }
      );
    }else{
      this.api.Follow(this.profileInfo.id).subscribe(
        data => {
          console.log(data, this.outer);
          this.getFollowings()
        }
      );
    }   
  }
  

  setCurrentUserName(){    
      this.user =  JSON.parse(localStorage.getItem("currentUser"));
      this.currentUserName =this.user.username;
     
  }
  
  

}