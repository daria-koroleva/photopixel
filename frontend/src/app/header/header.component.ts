import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClientModule, HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  text=[];
  baseurl = "http://127.0.0.1:8000/";
  constructor(private http:HttpClient,private _router:Router) { }

  ngOnInit(): void {
  } 

  logout(){
    localStorage.removeItem('currentUser'); 
    localStorage.clear;
    this._router.navigateByUrl("/");
  }

  onUserInput(event){
    this.text.splice(1,0,event.target.value);
    console.log(this.text[0]);
    const fd  = new FormData();
    fd.append('search',this.text[0]);
    /*this.http.get(this.baseurl+'',fd)
    .subscribe(res=>{
      console.log(res);
    })*/
  }



}
