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
  selectedFile: File = null;
  constructor(private api: ApiService) { }

  ngOnInit(): void {
    this.myForm = new FormGroup({
      username: new FormControl(''),
      email: new FormControl(''),
      password: new FormControl(''),
      profilePic: new FormControl('')
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
    this.api.register(this.f.username.value, this.f.email.value, this.f.password.value, this.selectedFile.name).pipe(first()).subscribe(
      res => {this.registered = true; this.saveFile();}, err => {
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
    element.hidden = true;
    if (pw.length < 8){
      element.innerHTML += "Password Too Short<br>"
      element.hidden = false;
    }
    if (!pw.match(/\d+/)){
      element.innerHTML += "Password has no digits"
      element.hidden = false;
    }
  }

  onFileSelected(event:any){
    this.selectedFile = event.target.files[0];
    console.log(this.selectedFile)
  }

  saveFile(){
    console.log(this.selectedFile);
    const fd: FormData = new FormData();
    fd.append('uploadedFile', this.selectedFile, this.selectedFile.name);
    this.api.saveFileToServer(fd).subscribe();
  }

}
