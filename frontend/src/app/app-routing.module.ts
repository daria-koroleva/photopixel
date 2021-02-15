import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginGuard } from './login-guard.guard';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { RegisterComponent } from './register/register.component';
import { PostComponent } from './post/post.component';


const routes: Routes = [
  
  {
    path:'login', component: LoginComponent    
  },
  {
    path:'', component: ProfileComponent,
    canActivate:[LoginGuard]
  },  
  {
    path:'profile', component: ProfileComponent,
    canActivate:[LoginGuard]
  },
  {
    path:'register', component: RegisterComponent    
  },  
  {
    path:'post', component: PostComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
