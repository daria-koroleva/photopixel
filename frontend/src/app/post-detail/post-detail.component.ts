import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.css']
})
export class PostDetailComponent implements OnInit {

  @Output() closed = new EventEmitter<string>();
  @Input() post: any;


  constructor() { }

  ngOnInit(): void {
  }

  close() {
    this.closed.emit();
  }

}
