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
  constructor(private api : ApiService,private http:HttpClient,private _router:Router) { }

  ngOnInit(): void {
    this.getAllUsers()
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
        // console.log(data,90000);
      }
    )
  }
  onUserInput(event: any){
    // console.log(this.allUsers,899, event.target.value)
    let str = event.target.value.trim()
    this.users =!str ? [] :
      this.allUsers.filter(item=>{
        return item.username.indexOf(str)!=-1 
      })
    // console.log(users,111)
    // this.text.splice(1,0,event.target.value);
    // console.log(this.text[0]);
    // const fd  = new FormData();
    // fd.append('search',this.text[0]);
    /*this.http.get(this.baseurl+'',fd)
    .subscribe(res=>{
      console.log(res);
    })*/
  }



}

