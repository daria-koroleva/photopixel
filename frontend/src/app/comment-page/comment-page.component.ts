import { Component, Input} from '@angular/core';
import { ApiService } from '../api.service';
import { first  } from 'rxjs/operators';

@Component({
  selector: 'app-comment-page',
  templateUrl: './comment-page.component.html',
  styleUrls: ['./comment-page.component.css']
})

export class CommentComponent {

  rawdata: any;
  displaycomments = [];
  likeTotal: number;
  commentId: string;

  posts: any;
  postsLoaded = false;
  comment: string;

  constructor(private api: ApiService) { }


  @Input() post: any;

  ngOnInit(): void {

    this.requestComment();
  }

  requestComment(){

    this.displaycomments = [];


    this.api.requestComment(this.post.id).subscribe(res => {
      this.rawdata = res;
      for (const i in res){
        this.displaycomments.push(res[i]);
      }
    });
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

    this.api.uploadComment(this.post.id, this.comment).
    subscribe(res => {
      this.comment = '';
      this.requestComment();
    });
  }

  deleteComment(comment: string){
    for (const i in this.rawdata){
      if (this.rawdata[i].content == comment){
        this.commentId = this.rawdata[i].id;
      }
    }
    this.api.deleteComment(this.post.id, this.commentId).
    subscribe(res => {
      this.requestComment();
    });
  }


  isCurrentUser(id: number): boolean{
      return (JSON.parse(localStorage.getItem('currentUser')).id == id);
  }





}
