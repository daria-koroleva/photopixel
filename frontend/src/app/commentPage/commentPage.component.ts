import { Component, Input, NgModule, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from './../api.service';
import { first, map } from 'rxjs/operators';
import { BrowserModule } from '@angular/platform-browser';
import { DataService } from './../data.service';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { analyzeAndValidateNgModules } from '@angular/compiler';
import { emitDistinctChangesOnlyDefaultValue } from '@angular/compiler/src/core';


@Component({
  selector:'app-commentPage',
  templateUrl:'./commentPage.component.html',
  styleUrls:['./commentPage.component.css']
})

export class CommentComponent {

  rawdata:any;
  displaycomments=[];
  likeTotal:number;
  postContent:string;
  message: string;//filename of the pic
  postId: string;
  commentId:string;
  id='item1.jpg';

  data1: string[]=[];

  posts: any;
  profileId: number=null;
  profileInfoLoaded :boolean = false;
  postsLoaded :boolean = false;

  comment: string;

  dict: any;

  @Input() photoFileName: string;


  constructor(private api:ApiService, private _router:Router,private data:DataService,private http:HttpClient){
    http.get('http://127.0.0.1:8000/posts/post')
    .subscribe(response=>{
      console.log(response);
      console.log(response[0])
      for(let i in response){
        console.log(response[i]);
        if(response[i].id == this.postId){
          this.postContent = response[i].content;
          this.likeTotal = response[i].likes;
        }
      }
      this.dict = response;
    })
   }

  ngOnInit(): void {
    this.data.currentMessage.subscribe(message => this.message = message)
    this.data.currentMessage.subscribe( postId=> this.postId = postId)
    //this.data.currentMessage.subscribe(postId => this.post.id = postId)
    //console.log(this.message,'new message in ngonInit')
    //console.log(this.postId,'message in ngonInit')
    this.changeData(this.message)
    this.requestComment();
  }

  requestComment(){
    this.api.requestComment(this.postId).subscribe(res=>{
      console.log(res);
      this.rawdata = res;
      for(let i in res){
        this.displaycomments.push(res[i].content)
      }
      console.log(this.displaycomments)
    })
  }



  changeData(message1){
    this.data = message1;
    console.log(this.data,'this is the data storage')
    this.message = this.data[0];
    this.postId = this.data[1];
  }

  getProfilePosts(){
    this.api.getAllPostsByUserId(this.profileId).pipe(first()).subscribe(
      post => {
        this.posts = post;
        this.postsLoaded = true;
      }
    );
  }

  onUserInput(event){
    this.comment = event.target.value;
  }

  uploadComment(){
    console.log('this is postId',this.postId);
    console.log('this is comment',this.comment);
    this.api.uploadComment(this.postId,this.comment).
    subscribe(res=>{
      console.log(res);
    })
  }

  deleteComment(comment:string){
    //console.log(comment)
    for(let i in this.rawdata){
      console.log(this.rawdata[i])
      if(this.rawdata[i].content==comment){
        this.commentId = this.rawdata[i].id
      }
    }
    this.api.deleteComment(this.postId, this.commentId).
    subscribe(res=>{
      console.log(res);
    })
  }

  /*
  createPost(input){
    let post = { title: input.value };
    input.value = '';
    console.log(input+'this is post ');

    this.http.post("http://127.0.0.1:8000/posts/",JSON.stringify(post))
      .subscribe(res => {
        //post['id'] = res.id;
        this.posts.push(post);
        console.log(res)
      })
  }*/




}
