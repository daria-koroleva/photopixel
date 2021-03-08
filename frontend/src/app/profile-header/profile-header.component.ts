import { Component, OnInit, Input, SimpleChange, Output, EventEmitter } from '@angular/core';
import { first, map } from 'rxjs/operators'
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
  // @Input() follows:Array<Object>;
  follows:any;
  currentUserName:string;

  @Output() outer = new EventEmitter();
  constructor(private api : ApiService) { }
 
  ngOnInit(): void {
    this.setCurrentUserName();
    
    
    this.isFollow = false
    this.getFollowings()
    
    // this.getFollowings();
    
  }
  ngOnChanges(){
    let obj = arguments[0]
    console.log(obj.profileInfo,8000)
    // this.isFollow = false
    if(obj.profileInfo) this.getFollowings()
    
  }
  getFollowings(){
    let id = this.profileInfo.id;
    let user =  JSON.parse(localStorage.getItem("currentUser"));
    this.isFollow = false
    this.follows = []
    // console.log(1223)
    if(!id) return;
    this.api.getListOfFollowersOfUserId(id).pipe(first()).subscribe(
      post => {
        
        this.follows = post;
        if(this.follows){
          this.follows.map(item=>{
            if(item["follower"] == user.id){
              this.isFollow = true;
            }
          })
        }
        console.log(post,this.follows.length)
        // this.postsLoaded = true;
      }
    );
  }
  onClick(){
    // console.log(this.isFollow, this.profileInfo)
    if(this.isFollow){
      // console.log('UnFollow')
      this.api.UnFollow(this.profileInfo.id).subscribe(
        data => {
          console.log(data);
          // window.location.reload()
          this.getFollowings()
          // this.outer.emit()
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
          this.getFollowings()
          // this.outer.emit()
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