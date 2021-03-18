import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ApiService } from './../api.service';
import { first } from 'rxjs/operators'
import { Router } from '@angular/router';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  selectedFile: File = null;
  myForm: FormGroup;
  currentUserName: string;
  posted: boolean = false;
  constructor(private api : ApiService, private _router:Router) { }

  ngOnInit(): void {
    this.myForm = new FormGroup({
      title: new FormControl(''),
      content: new FormControl(''),
      uploadedFile: new FormControl('')
    });
    this.setCurrentUserName();
  }

  get f() {
    return this.myForm.controls;
  }
  
  submitPostForm(){
    this.api.newpost(this.f.title.value, this.f.content.value, this.selectedFile.name).pipe(first()).subscribe(
      data => {
        console.log(data);
        this.posted = true;
        this.saveFile();
        this._router.navigateByUrl("/profile/"+JSON.parse(localStorage.getItem("currentUser")).id);
      }
    )
    
  }
  
  userLoggedIn(){
    return (localStorage.length != 0);
  }

  setCurrentUserName(){
    if (this.userLoggedIn()) {
      this.currentUserName = JSON.parse(localStorage.getItem("currentUser")).username;
    }
  }

  onFileSelected(event){
    console.log(event);
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
