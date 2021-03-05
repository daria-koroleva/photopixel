import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-profile-header',
  templateUrl: './profile-header.component.html',
  styleUrls: ['./profile-header.component.css']
})
export class ProfileHeaderComponent implements OnInit {
  public isFollow: boolean = false;
  @Input() profileInfo:any;
  @Input() postCount:number;
  currentUserName:string;
  constructor() { }
 
  ngOnInit(): void {
    this.setCurrentUserName();
    
  }
  onClick(){
    this.isFollow = !this.isFollow;

  }


  setCurrentUserName(){    
      this.currentUserName = JSON.parse(localStorage.getItem("currentUser")).username;    
  }
  
  

}
