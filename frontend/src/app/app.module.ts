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
import { FollowingComponent } from './following/following.component';
import { CommentComponent } from './commentPage/commentPage.component';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { DataService } from './data.service';
import { PostDetailComponent } from './post-detail/post-detail.component';
import { MainfeedComponent } from './mainfeed/mainfeed.component';
import {CardModule} from 'primeng/card';


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
    FollowingComponent,
    CommentComponent,
    PostDetailComponent,
    MainfeedComponent,
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
