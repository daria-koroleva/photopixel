import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { ApiService } from './../api.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  text=[];
  baseurl = "http://127.0.0.1:8000/";
  allUsers:any
  users:any
  currentUserID: number; //user id of logged in user
  searchBox:any;
  constructor(private api : ApiService,private http:HttpClient,private _router:Router) { }

  ngOnInit(): void {
    this.getAllUsers();
    this.setCurrentUserId();
  } 

  logout(){
    localStorage.removeItem('currentUser'); 
    localStorage.clear;
    this._router.navigateByUrl("/");
  }
  getAllUsers(){
    this.api.getListOfUsers().subscribe(
      data => {
        this.allUsers = data;
      }
    )
  }
  onUserInput(event: any){
    let str = event.target.value.trim()
    this.users =!str ? [] :
      this.allUsers.filter(item=>{
        return item.username.indexOf(str)!=-1 
      })
    this.searchBox = event.target;
  }

  userLoggedIn(){
    return (localStorage.length != 0);
  }

  setCurrentUserId(){
    if (this.userLoggedIn()) {
      this.currentUserID = JSON.parse(localStorage.getItem("currentUser")).id;
    }
  }

  redirectTo(uri:string){
    this._router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
    this._router.navigate([uri]));
 }

  changeProfile(id:string){
    console.log(id);
    this.users = [];
    this.searchBox.value = '';
    this.redirectTo("profile/"+id);
    
  }

  goToProfile(){
    console.log("hello");
    this.redirectTo("profile/"+this.currentUserID);
  }

}

