import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css']
})
export class GalleryComponent implements OnInit {


  _galleryData:Post[];
  @Input() posts: any;
  
  constructor() { 
    this._galleryData=[];
    this._galleryData.push(new Post(1,"Mock 1","Content mock 1","2/21/2021","item1.jpg"));
    this._galleryData.push(new Post(2,"Mock 2","Content mock 2","2/21/2021","item2.jpg"));
    this._galleryData.push(new Post(3,"Mock 3","Content mock 3","2/21/2021","item3.jpg"));
    this._galleryData.push(new Post(4,"Mock 4","Content mock 4","2/21/2021","item4.jpg"));
    this._galleryData.push(new Post(5,"Mock 5","Content mock 5","2/21/2021","item5.jpg"));
    this._galleryData.push(new Post(6,"Mock 6","Content mock 6","2/21/2021","item6.jpg"));

  }

  ngOnInit(): void {
   

  }

}


export class Post{
  constructor(
    public id?:number,
    public title?:string,
    public content?:string,
    public date_posted?:string,
    public photoFileName?:string
    
  ){}
}


