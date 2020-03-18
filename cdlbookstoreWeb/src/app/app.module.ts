import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MaterialModule } from './shared/material.module';
import { HomePageComponent } from './homePage/homePage.component';
import { UsersComponent } from './users/users.component';
import { LoginComponent } from './login/login.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations'
import { FlexLayoutModule } from "@angular/flex-layout";
import { SignupComponent } from './signup/signup.component';
import { BooksComponent } from './books/books.component';
import { AccountComponent } from './account/account.component';
import { PagesRouting } from './shared/pages-routing.service';
import { APIRequestService } from './shared/api-request.service';
import { HttpClientModule } from '@angular/common/http';
import { PathRequestService } from './shared/path-request.service';
import { AdminModule } from './admin/admin.module';
import { AuthorService } from './shared/author.service';
import { BookService } from './shared/book.service';
import { TypeService } from './shared/type.service';

@NgModule({
  declarations: [
    AppComponent, 
    HomePageComponent,
    UsersComponent,
    LoginComponent,
    SignupComponent,
    BooksComponent,
    AccountComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    HttpClientModule,
    AdminModule
  ],
  providers: [PagesRouting, APIRequestService, PathRequestService, AuthorService, BookService, TypeService],
  bootstrap: [AppComponent, 
    HomePageComponent,
    LoginComponent]
})
export class AppModule { }
