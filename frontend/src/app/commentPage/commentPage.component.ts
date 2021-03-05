import { Component, Input, NgModule, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from './../api.service';
import { first, map } from 'rxjs/operators';
import { BrowserModule } from '@angular/platform-browser';
import { DataService } from './../data.service';
import { HttpClientModule, HttpClient } from '@angular/common/http';


@Component({
  selector:'app-commentPage',
  templateUrl:'./commentPage.component.html',
  styleUrls:['./commentPage.component.css']
})

export class CommentComponent {

  message: string;//filename of the pic
  id='item1.jpg';

  posts: any;
  profileId: number=null;
  profileInfoLoaded :boolean = false;
  postsLoaded :boolean = false;

  comment: string;

  @Input() photoFileName: string;


  constructor(private api:ApiService, private _router:Router,private data:DataService,private http:HttpClient){
    http.get('http://127.0.0.1:8000/posts/post')
    .subscribe(response=>{
      console.log(response)
    })
   }

  ngOnInit(): void {
    this.data.currentMessage.subscribe(message => this.message = message)
    console.log(this.message,'message in ngonInit')
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
    const fd = new FormData();
    console.log('comment is ',this.comment);
    console.log('message is ',this.message);
    fd.append('comment',JSON.stringify(this.comment),this.message);
    this.http.post("http://127.0.0.1:8000/posts/",fd).
    subscribe(res=>{
      console.log(res);
    })
  }

  createPost(input:HTMLInputElement){
    let post = { title: input.value };
    input.value = '';

    this.http.post("http://127.0.0.1:8000/posts/",JSON.stringify(post))
      .subscribe(res => {
        //post['id'] = res.id;
        this.posts.push(post);
        console.log(res)
      })
  }




}
