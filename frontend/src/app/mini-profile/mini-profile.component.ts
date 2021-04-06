import { Component, Input, OnInit } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-mini-profile', 
  templateUrl: './mini-profile.component.html',
  styleUrls: ['./mini-profile.component.css']
})
export class MiniProfileComponent implements OnInit {

  @Input() id;
  profileInfo:any;
  profilePhotoFileName:string;
  username:string;


  constructor(private api:ApiService) { }

  ngOnInit(): void {    
    this.getInfoProfile();
  }

  getInfoProfile(){

    this.api.getProfileInfoByUserId(this.id).subscribe(
      profile =>{
        this.profileInfo = profile;        
      }
    );

  }

}



