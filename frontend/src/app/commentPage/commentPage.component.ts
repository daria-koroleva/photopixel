import { Component, Input} from '@angular/core';
import { ApiService } from './../api.service';
import { first  } from 'rxjs/operators';

@Component({
  selector:'app-commentPage',
  templateUrl:'./commentPage.component.html',
  styleUrls:['./commentPage.component.css']
})

export class CommentComponent {

  rawdata:any;
  displaycomments=[];
  likeTotal:number;
  commentId:string;
 
  posts: any;
  postsLoaded :boolean = false;
  comment: string;




  constructor(private api:ApiService) { }


  @Input() post: any;

  ngOnInit(): void {
    
    this.requestComment();
  }

  requestComment(){

    this.displaycomments=[];
    
    
    this.api.requestComment(this.post.id).subscribe(res=>{
      console.log(res);
      this.rawdata = res;
      for(let i in res){
        //this.displaycomments.push(res[i].content)
        this.displaycomments.push(res[i]);
      }
      console.log("Display comments" +this.displaycomments)
    })
  }

  getProfilePosts(){
    this.api.getAllPostsByUserId(this.post.poster_id).pipe(first()).subscribe(
      post => {
        this.posts = post;
        this.postsLoaded = true;
      }
    );
  }

  uploadComment(){
    console.log('this is postId',this.post.id);
    console.log('this is comment',this.comment);
    
    this.api.uploadComment(this.post.id,this.comment).
    subscribe(res=>{
      console.log(res); 
      this.comment="";     
      this.requestComment();
    })
  }

  deleteComment(comment:string){  
    for(let i in this.rawdata){
      console.log(this.rawdata[i])
      if(this.rawdata[i].content==comment){
        this.commentId = this.rawdata[i].id
      }
    }
    this.api.deleteComment(this.post.id, this.commentId).
    subscribe(res=>{
      console.log(res);
      this.requestComment();
    })
  }


  isCurrentUser(id:number):boolean{
      return (JSON.parse(localStorage.getItem("currentUser")).id==id)
  }
  




}
