import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MaterialModule } from './shared/material.module';
import { HomePageComponent } from './home-page/home-page.component';
import { UsersComponent } from './users/users.component';
import { LoginComponent } from './login/login.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations'
import { FlexLayoutModule } from "@angular/flex-layout";
import { SignupComponent } from './signup/signup.component';
import { BooksComponent } from './books/books.component';
import { ProfieComponent } from './profile/profile.component';
import { PagesRouting } from './shared/pages-routing.service';
import { APIRequestService } from './shared/api-request.service';
import { HttpClientModule } from '@angular/common/http';
import { PathRequestService } from './shared/path-request.service';
import { AdminModule } from './admin/admin.module';
import { AuthorService } from './shared/author.service';
import { BookService } from './shared/book.service';
import { GenreService } from './shared/genre.service';
import { AuthenticationService } from './shared/authentication.service';
import { UserSessionService } from './shared/user-session.service';
import { AuthGuard } from './guards/auth-guard.service';
import { AdminGuard } from './guards/admin-guard.service';
import { CustomValidatorService } from './validators/custom-validator.service';
import { ResetPasswordComponent } from './login/resetPassword/reset-password.component';
import { NewPasswordComponent } from './login/new-password/new-password.component';
import { LoannedBooksComponent } from './profile/loanned-books/loanned-books.component';
import { OnlineBooksComponent } from './profile/online-books/online-books.component';
import { PaymentComponent } from './profile/payment/payment.component';
import { ReadListComponent } from './profile/read-list/read-list.component';

@NgModule({
  declarations: [
    AppComponent, 
    HomePageComponent,
    UsersComponent,
    LoginComponent,
    SignupComponent,
    BooksComponent,
    ProfieComponent,
    ResetPasswordComponent,
    NewPasswordComponent,
    LoannedBooksComponent,
    OnlineBooksComponent,
    PaymentComponent,
    ReadListComponent
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
  providers: [PagesRouting, APIRequestService, PathRequestService, 
              AuthorService, BookService, GenreService, AuthenticationService,
              UserSessionService, AuthGuard, AdminGuard, CustomValidatorService],
  bootstrap: [AppComponent, 
    HomePageComponent,
    LoginComponent]
})
export class AppModule { }
