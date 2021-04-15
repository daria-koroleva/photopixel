import { ApiService } from './api.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ ApiService ],
})
export class AppComponent {


  constructor(private api: ApiService) {

  }

  ngOnInit(){
  }

  userLoggedIn(){
    return (localStorage.length != 0);
  }

}
