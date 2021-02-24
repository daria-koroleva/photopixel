import { Component, Input, OnInit } from '@angular/core';
import { Options } from '@flywine93/ngx-imgclicker';

@Component({
  selector: 'app-gallery-item',
  templateUrl: './gallery-item.component.html',
  styleUrls: ['./gallery-item.component.css']
})
export class GalleryItemComponent implements OnInit {


  @Input() fileName: string;
  @Input() post: any;

  constructor() { }

  ngOnInit(): void {
    
  }

  title = 'imgclicker-project';
  options: Options = {
    urlCallback: (url: string) => {
      return url;
    }
  };

}
