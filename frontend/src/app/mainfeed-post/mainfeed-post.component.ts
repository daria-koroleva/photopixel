import { Component, Input, OnInit } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-mainfeed-post',
  templateUrl: './mainfeed-post.component.html',
  styleUrls: ['./mainfeed-post.component.css']
})
export class MainfeedPostComponent implements OnInit {

  @Input() post;

  displaycomments=[];
  rawdata:any;
  commentId:string;
  comment: string;

  constructor(private api:ApiService) { }

  ngOnInit(): void {
    this.requestComment();
  }


  requestComment(){

    this.displaycomments=[];    
    
    this.api.requestComment(this.post.id).subscribe(res=>{   
      this.rawdata = res;        
      for(let i in res){       
        this.displaycomments.push(res[i]);
      }     
    })
  }
  
  deleteComment(comment:string){  
    for(let i in this.rawdata){      
      if(this.rawdata[i].content==comment){
        this.commentId = this.rawdata[i].id
      }
    }
    this.api.deleteComment(this.post.id, this.commentId).
    subscribe(res=>{
      this.requestComment();
    })
  }

  uploadComment(){
   
    this.api.uploadComment(this.post.id,this.comment).
    subscribe(res=>{     
      this.comment="";     
      this.requestComment();
    })
  }



  isCurrentUser(id:number):boolean{
      return (JSON.parse(localStorage.getItem("currentUser")).id==id)
  }
  

}
