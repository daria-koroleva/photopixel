import { from } from "rxjs";
import { Component } from "@angular/core";
import { HttpClientModule, HttpClient } from '@angular/common/http';
//import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'upload-Image',
  templateUrl: './uploadImage.component.html',
  styleUrls: ['./uploadImage.component.css']
})
export class UploadImageComponent {
  selectedFile = null;
  baseurl = "http://127.0.0.1:8000/"

  constructor(private http: HttpClient) {

  }

  onFileSelected(event){
    this.selectedFile = <File>event.target.files[0];
    console.log('on File selected method called: '+ this.selectedFile)
  }

  onUploadImage(){
    console.log(this.selectedFile+'has passed into upload image method')
    const fd = new FormData();
    fd.append('image',this.selectedFile, this.selectedFile.name);
    this.http.post(this.baseurl + 'posts/post/saveFile/',fd)
    .subscribe(res =>{
      console.log(res);
    });
  }

}


