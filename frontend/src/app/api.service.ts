import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { map } from 'rxjs/operators';

var httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': "null",
  })
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  baseurl: string = "http://127.0.0.1:8000/";
  constructor(private http: HttpClient) { }

  userLoggedIn(){
    return (localStorage.length != 0);
  }

  setTokenHeader(){
    httpOptions.headers = httpOptions.headers.set('Authorization', 'Token ' + JSON.parse(localStorage.getItem("currentUser")).token);
    console.log('Token ' + JSON.parse(localStorage.getItem("currentUser")).token);
  }

  login(username: string, password: string){
    return this.http.post<any>(this.baseurl + 'accounts/api/auth/login/',
    {username, password}, httpOptions).pipe(
      map(user => {
        if (user && user.token) {
          localStorage.setItem("currentUser", JSON.stringify(user));
        }
        return user;
      })
    );
  }

  register(username: string, email: string, password: string){
    return this.http.post<any>(this.baseurl + 'accounts/api/auth/register/',
    {username, email, password}, httpOptions);
  }


  newpost(title: string, content: string, photoFileName:string){
    if (this.userLoggedIn()){
      //httpOptions.headers = httpOptions.headers.set('Authorization', 'Token ' + JSON.parse(localStorage.getItem("currentUser")).token);
      this.setTokenHeader();
    }
    return this.http.post<any>(this.baseurl + 'posts/post/',
    {title, content, photoFileName}, httpOptions);
  }

  getposts(){
    return this.http.get(this.baseurl + 'posts/post/');
  }

  saveFileToServer(file:any){
    return this.http.post(this.baseurl + 'posts/post/saveFile/', file);
  }

  deleteImage(id:any){
    if (this.userLoggedIn()){
      this.setTokenHeader();
    }
    return this.http.delete(this.baseurl + 'posts/post/'+ id, httpOptions);
  }

  getListOfUsers(){
    return this.http.get(this.baseurl + 'accounts/users/');
  }

}
