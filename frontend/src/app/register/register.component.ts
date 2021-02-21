import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ApiService } from './../api.service';
import { first } from 'rxjs/operators'


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  myForm: FormGroup;
  registered: boolean = false;
  allUsers :any;
  constructor(private api: ApiService) { }

  ngOnInit(): void {
    this.myForm = new FormGroup({
      username: new FormControl(''),
      email: new FormControl(''),
      password: new FormControl('')
    });
    this.getAllUsers();
  }

  get f() {
    return this.myForm.controls;
  }

  userLoggedIn(){
    return (localStorage.length != 0);
  }
  
  logout(){
    localStorage.removeItem('currentUser');
    localStorage.clear;
  }

  submitRegisterForm(){
    this.api.register(this.f.username.value, this.f.email.value, this.f.password.value).pipe(first()).subscribe(
      res => {this.registered = true}, err => {
        let element = document.getElementById('register-errors')
        element.innerHTML = "<p>Errors exist</p>"
      }
    );
  }

  getAllUsers(){
    this.api.getListOfUsers().subscribe(
      data => {
        this.allUsers = data;
        console.log(data);
      }
    )
  }

  checkEmail(){
    let email = this.f.email.value;
    let isUser = false;
    let element = document.getElementById('email-errors')
    for (let a=0; a<this.allUsers.length; a++){
      if (this.allUsers[a].email == email){
        isUser = true;
      }
    }
    if (isUser){
      element.innerHTML = "Email already registered"
      element.hidden = false;
    }
    else {
      element.hidden = true;
    }
  }

  checkPW(){
    let pw:string = this.f.password.value;
    let badPW = false;
    let element = document.getElementById('pw-errors')
    element.innerHTML = '';
    if (pw.length < 8){
      element.innerHTML += "Password Too Short<br>"
    }
    if (!pw.match(/\d+/)){
      element.innerHTML += "Password has no digits"
    }

  }

}
