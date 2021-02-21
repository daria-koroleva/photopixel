import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-gallery-item',
  templateUrl: './gallery-item.component.html',
  styleUrls: ['./gallery-item.component.css']
})
export class GalleryItemComponent implements OnInit {


  @Input() fileName: string;
  
  constructor() { }

  ngOnInit(): void {
    
  }

}
