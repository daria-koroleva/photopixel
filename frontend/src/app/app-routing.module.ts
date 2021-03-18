import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginGuard } from './login-guard.guard';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { RegisterComponent } from './register/register.component';
import { PostComponent } from './post/post.component';
import { FollowingComponent } from './following/following.component';
import { CommentComponent } from './commentPage/commentPage.component';
import { MainfeedComponent } from './mainfeed/mainfeed.component';


const routes: Routes = [
  
  {
    path:'login', component: LoginComponent    
  },
  {
    path:'', component: MainfeedComponent,
    canActivate:[LoginGuard]
  },  
  {
    path:'profile/:id', component: ProfileComponent,
    canActivate:[LoginGuard]
  },
  {
    path:'register', component: RegisterComponent    
  },  
  {
    path:'post', component: PostComponent
  },
  {
    path:'following/:id', component: FollowingComponent
  },
  {
    path:'comment', component: CommentComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
