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
  constructor(private api: ApiService) { }

  ngOnInit(): void {
    this.myForm = new FormGroup({
      username: new FormControl(''),
      email: new FormControl(''),
      password: new FormControl('')
    });
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
      res => {this.registered = true}
    );
  }


}
