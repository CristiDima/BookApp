import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MaterialModule } from './shared/material.module';
import { HomePageComponent } from './homePage/homePage.component';
import { FooterComponent } from './footerComponent/footer.component';
import { HeaderComponent } from './headerComponent/header.component';
import { UsersComponent } from './users/users.component';
import { LoginComponent } from './login/login.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations'
import { FlexLayoutModule } from "@angular/flex-layout";
import { SignupComponent } from './signup/signup.component';
import { BooksComponent } from './books/books.component';
import { AccountComponent } from './account/account.component';
import { AdminComponent } from './admin/admin.component';
import { PagesRouting } from './shared/pages-routing.service';

@NgModule({
  declarations: [
    AppComponent, 
    HomePageComponent,
    HeaderComponent,
    FooterComponent,
    UsersComponent,
    LoginComponent,
    SignupComponent,
    BooksComponent,
    AccountComponent,
    AdminComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    BrowserAnimationsModule,
    FlexLayoutModule
  ],
  providers: [PagesRouting],
  bootstrap: [AppComponent, 
    HomePageComponent,
    HeaderComponent,
    FooterComponent,
    LoginComponent]
})
export class AppModule { }
