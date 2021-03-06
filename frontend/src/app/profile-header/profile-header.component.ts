import { Component, OnInit, Input, SimpleChange, Output, EventEmitter } from '@angular/core';

import { ApiService } from './../api.service';
@Component({
  selector: 'app-profile-header',
  templateUrl: './profile-header.component.html',
  styleUrls: ['./profile-header.component.css']
})
export class ProfileHeaderComponent implements OnInit {
  public isFollow: boolean = false;
  // follows:any
  @Input() profileInfo:any;
  @Input() postCount:number;
  @Input() follows:Array<Object>;
  currentUserName:string;

  @Output() outer = new EventEmitter();
  constructor(private api : ApiService) { }
 
  ngOnInit(): void {
    this.setCurrentUserName();
    let user =  JSON.parse(localStorage.getItem("currentUser"));
    if(this.follows){
      this.follows.map(item=>{
        if(item["id"] == user.id){
          this.isFollow = true;
        }
      })
    }
    // this.getFollowings();
    
  }
  ngOnChanges(){
    let obj = arguments[0]
    // console.log(obj.follows.currentValue,8000)
    if(obj.follows){
      let user =  JSON.parse(localStorage.getItem("currentUser"));
     
      if(obj.follows.currentValue) obj.follows.currentValue.map(item=>{
          // console.log(item , user.id)
          if(item["follower"] == user.id){
            this.isFollow = true;
          }
        })
      
    }
  }
  onClick(){
    // console.log(this.isFollow, this.profileInfo)
    if(this.isFollow){
      // console.log('UnFollow')
      this.api.UnFollow(this.profileInfo.id).subscribe(
        data => {
          console.log(data);
          // window.location.reload()
          // this.getFollowings()
          this.outer.emit()
          this.isFollow = !this.isFollow;
          // this.posts = null;
          // this._router.navigateByUrl("");
        }
      );
    }else{
      // console.log('Follow')
      this.api.Follow(this.profileInfo.id).subscribe(
        data => {
          console.log(data, this.outer);
          // window.location.reload()
          // this.getFollowings()
          this.outer.emit()
          this.isFollow = !this.isFollow;
          // this.posts = null;
          // this._router.navigateByUrl("");
        }
      );
    }
    // this.isFollow = !this.isFollow;
    

  }
  


  setCurrentUserName(){    
      let user =  JSON.parse(localStorage.getItem("currentUser"));
      this.currentUserName =user.username;
     
  }
  
  

}