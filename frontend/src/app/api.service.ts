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

  register(username: string, email: string, password: string, profilePhotoFileName:string){
    return this.http.post<any>(this.baseurl + 'accounts/api/auth/register/',
    {username, email, password, profilePhotoFileName}, httpOptions);
  }


  newpost(title: string, content: string, photoFileName:string){
    if (this.userLoggedIn()){
      this.setTokenHeader();
    }
    return this.http.post<any>(this.baseurl + 'posts/post/',
    {title, content, photoFileName}, httpOptions);
  }

  getAllPosts(){
    return this.http.get(this.baseurl + 'posts/post/');
  }
  getMyPosts(){
    if (this.userLoggedIn()){
      this.setTokenHeader();
    }
    return this.http.get(this.baseurl + 'posts/myposts/', httpOptions);
  }

  getAllPostsByUserId(id:number){
    if (this.userLoggedIn()){
      this.setTokenHeader();
    }
    return this.http.get(this.baseurl + 'posts/profileposts/'+id, httpOptions);
  }

  getProfileInfoByUserId(id:number){
    if (this.userLoggedIn()){
      this.setTokenHeader();
    }
    return this.http.get(this.baseurl + 'accounts/profile/'+id, httpOptions);
  }
  getFollowingsByUserId(){
    if (this.userLoggedIn()){
      this.setTokenHeader();
    }
    return this.http.get(this.baseurl + 'accounts/api/auth/follow/', httpOptions);
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
  UnFollow(id:any){
    if (this.userLoggedIn()){
      this.setTokenHeader();
    }
    return this.http.delete(this.baseurl + 'accounts/api/auth/follow/?following='+id, httpOptions);
  }
  Follow(id:any){
    if (this.userLoggedIn()){
      this.setTokenHeader();
    }
    return this.http.post<any>(this.baseurl + 'accounts/api/auth/follow/?following='+id,
      {}, httpOptions);
      // return this.http.delete(this.baseurl + '/account/api/auth/follow/?id='+ id, httpOptions);
    }

  getListOfUsers(){
    return this.http.get(this.baseurl + 'accounts/users/');
  }
  
  
  getListOfFollowersOfUserId(id:number){
    if (this.userLoggedIn()){
      this.setTokenHeader();
    }
    return this.http.get(this.baseurl + 'accounts/followersUser/'+id, httpOptions);
  }

  getListOfUserIdFollowing(id:number){
    if (this.userLoggedIn()){
      this.setTokenHeader();
    }
    return this.http.get(this.baseurl + 'accounts/followingUser/'+id, httpOptions);
  }


  uploadComment(picId:string ,comment:string){

    if(this.userLoggedIn()){
      this.setTokenHeader();
    }
    return this.http.post(this.baseurl + 'posts/post/' + picId + '/comment/', {content:comment},httpOptions);
  }

  requestComment(picId:string){

    return this.http.get(this.baseurl + 'posts/post/'+ picId +'/comments')
  }

  deleteComment(picId:string,commentId:string){

    if(this.userLoggedIn()){
      this.setTokenHeader();
    }
    return this.http.delete(this.baseurl + 'posts/post/' + picId +'/comment/'+commentId,httpOptions)
  }

  getMainFeedPosts(){
    if(this.userLoggedIn()){
      this.setTokenHeader();
    }
    return this.http.get(this.baseurl + 'posts/mainfeed/',httpOptions)
  }



  like(picId:any, liker:any){
    if (this.userLoggedIn()){
      this.setTokenHeader();
    }
    return this.http.post<any>(this.baseurl + 'posts/post/'+picId+'/like' , {liker:liker}, httpOptions);
     
    }

    unlike(picId:any){
      if (this.userLoggedIn()){
        this.setTokenHeader();
      }
      return this.http.delete<any>(this.baseurl + 'posts/post/'+picId+'/like' , httpOptions);
       
      }


      getLikesByPost(picId:any){

        if(this.userLoggedIn()){
          this.setTokenHeader();
        }
    
        return this.http.get(this.baseurl + 'posts/post/'+picId+'/likes',httpOptions)
      }
    

}
