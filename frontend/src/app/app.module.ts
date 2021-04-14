import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { RegisterComponent } from './register/register.component';
import { PostComponent } from './post/post.component';
import { HeaderComponent } from './header/header.component';
import { NgxImgclickerModule } from '@flywine93/ngx-imgclicker';
import { CommonModule } from '@angular/common';
import { ProfileHeaderComponent } from './profile-header/profile-header.component';
import { GalleryItemComponent } from './gallery-item/gallery-item.component';
import { GalleryComponent } from './gallery/gallery.component';
import { CommentComponent } from './commentPage/commentPage.component';
import { DataService } from './data.service';
import { PostDetailComponent } from './post-detail/post-detail.component';
import { MainfeedComponent } from './mainfeed/mainfeed.component';
import {CardModule} from 'primeng/card';
import { LikeComponent } from './like/like.component';
import { LikeListComponent } from './like-list/like-list.component';
import { MiniProfileComponent } from './mini-profile/mini-profile.component';
import { MainfeedPostComponent } from './mainfeed-post/mainfeed-post.component';
import { FollowerListComponent } from './follower-list/follower-list.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ProfileComponent,
    RegisterComponent,
    PostComponent,
    HeaderComponent,
    ProfileHeaderComponent,
    GalleryItemComponent,
    GalleryComponent,  
    CommentComponent,
    PostDetailComponent,
    MainfeedComponent,
    LikeComponent,
    LikeListComponent,
    MiniProfileComponent,
    MainfeedPostComponent,
    FollowerListComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    NgxImgclickerModule,
    CardModule,
  ],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
