import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class LoginGuard implements CanActivate {

    constructor(private router: Router) { }
    canActivate(): boolean {
        if (!this.userLoggedIn()) {
            this.router.navigateByUrl("/login");
        }
        return true;
    }


    userLoggedIn(){
        return (localStorage.length != 0);
      }
    
}
