import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { map } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  baseurl: string = "http://127.0.0.1:8000/";
  
  constructor(private http: HttpClient) { }

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


}
