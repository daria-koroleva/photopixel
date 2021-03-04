import { Component, Input, OnInit } from '@angular/core';
import { Options } from '@flywine93/ngx-imgclicker';
import { Router } from '@angular/router';
import { ApiService } from './../api.service';
import { first, map } from 'rxjs/operators'


@Component({
  selector: 'app-gallery-item',
  templateUrl: './gallery-item.component.html',
  styleUrls: ['./gallery-item.component.css']
})
export class GalleryItemComponent implements OnInit {

  posts: any;
  profileId: number=null;
  profileInfoLoaded :boolean = false;
  postsLoaded :boolean = false;

  @Input() fileName: string;
  @Input() post: any;

  constructor(private api:ApiService, private _router:Router) { }

  ngOnInit(): void {

  }

  title = 'imgclicker-project';
  options: Options = {
    urlCallback: (url: string) => {
      return url;
    }
  };

  getProfilePosts(){
    this.api.getAllPostsByUserId(this.profileId).pipe(first()).subscribe(
      post => {
        this.posts = post;
        this.postsLoaded = true;
      }
    );
  }

  deleteImage(post:any){
    let post_id = post.id;
    console.log("delete image button is pressed");
    console.log(post_id);
    this.api.deleteImage(post_id).subscribe(
      data => {
        console.log(data);
        this.posts = null;
        this._router.navigateByUrl("");
      }
    );
  }

}
