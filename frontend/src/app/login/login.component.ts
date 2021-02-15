import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ApiService } from './../api.service';
import { first } from 'rxjs/operators'


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  myForm: FormGroup;
  userData: any;
  currentUserName: string;
  constructor(private api: ApiService) { }

  ngOnInit(): void {
    this.myForm = new FormGroup({
      email: new FormControl(''),
      password: new FormControl('')
    });
    this.setCurrentUserName();
  }

get f() {
  return this.myForm.controls;
}

  submitLoginForm(){
    this.api.login(this.f.email.value, this.f.password.value).pipe(first()).subscribe(
      data => {
        this.setCurrentUserName();
        console.log(data);
        this.userData = data;
      }
    )
    
  }

  logout(){
    localStorage.removeItem('currentUser');
    this.userData = null;
    localStorage.clear;
  }

  userLoggedIn(){
    return (localStorage.length != 0);
  }

  setCurrentUserName(){
    if (this.userLoggedIn()) {
      this.currentUserName = JSON.parse(localStorage.getItem("currentUser")).username;
    }
  }

}
