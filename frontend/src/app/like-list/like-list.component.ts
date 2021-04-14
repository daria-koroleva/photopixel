import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-like-list',
  templateUrl: './like-list.component.html',
  styleUrls: ['./like-list.component.css']
})
export class LikeListComponent implements OnInit {

  @Output() closed = new EventEmitter<string>();
  @Input() likes: any;

  constructor() { }

  ngOnInit(): void {
  }

  close() {
    this.closed.emit();
  }

}
