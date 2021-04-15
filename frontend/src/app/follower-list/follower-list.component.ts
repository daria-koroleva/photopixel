import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { first } from 'rxjs/operators';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-follower-list',
  templateUrl: './follower-list.component.html',
  styleUrls: ['./follower-list.component.css']
})
export class FollowerListComponent implements OnInit {

  @Output() closed = new EventEmitter<string>();
  @Input() idUser;

  followers: any;

  constructor(private api: ApiService) { }

  ngOnInit(): void {
    this.loadFollowers();
  }

  close() {
    this.closed.emit();
  }


  loadFollowers(){
    this.api.getListOfFollowersOfUserId(this.idUser).pipe(first()).subscribe(
      followersResponse => {
        this.followers = followersResponse;
      }
    );

  }




}
