import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { RegisterComponent } from './register/register.component';
import { PostComponent } from './post/post.component';

const routes: Routes = [
  {
    path:'login', component: LoginComponent
  },
  {
    path:'profile', component: ProfileComponent
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
