import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MaterialModule } from './shared/material.module';
import { HomePageComponent } from './home-page/home-page.component';
import { UsersComponent } from './users/users.component';
import { LoginComponent } from './login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { FlexLayoutModule } from "@angular/flex-layout";
import { SignupComponent } from './signup/signup.component';
import { BooksComponent } from './books/books.component';
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
import { ProfileModule } from './profile/profile.module';
import { NgxSpinnerModule } from "ngx-spinner";
import { UserDetailsService } from './shared/user-details.service';
import {SlideshowModule} from 'ng-simple-slideshow';
import { ResetPassGuard } from './guards/reset-pass-guard.service';
import { ToastrModule } from 'ngx-toastr';
import { FileSaveService } from './shared/file-save.service';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { BookComponent } from './books/book/book.component';
import { BookGuard } from './guards/book-guard.service';
import { RatingModule } from 'ng-starrating';
import { ConfirmationComponent } from './dialog/confirmation.component';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { OnlineFileComponent } from './pdf-viewer/online-file.component';
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';
import { ManagementModule } from './admin-management/management.module';

const config = {
    apiKey: "AIzaSyCS1_bJX95rdMH6mWdRNl_rnp6ewVK1xYc",
    authDomain: "bookstorefiles-4fb5f.firebaseapp.com",
    databaseURL: "https://bookstorefiles-4fb5f.firebaseio.com",
    projectId: "bookstorefiles-4fb5f",
    storageBucket: "bookstorefiles-4fb5f.appspot.com",
    messagingSenderId: "879408210464",
    appId: "1:879408210464:web:8ed0d527af1eca14a09245",
    measurementId: "G-QT9QGXTVNS"
};

@NgModule({
  declarations: [
    AppComponent, 
    HomePageComponent,
    UsersComponent,
    LoginComponent,
    SignupComponent,
    BooksComponent,
    BookComponent,
    ResetPasswordComponent,
    NewPasswordComponent,
    ConfirmationComponent,
    OnlineFileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    HttpClientModule,
    AdminModule,
    ManagementModule,
    ProfileModule,
    NgxSpinnerModule,
    SlideshowModule,
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-right',
      preventDuplicates: true
    }),
    AngularFireModule.initializeApp(config),
    AngularFirestoreModule, // firestore
    AngularFireAuthModule, // auth
    AngularFireStorageModule, // storage
    RatingModule,
    PdfViewerModule,
    NgxExtendedPdfViewerModule
  ],
  entryComponents: [ConfirmationComponent],
  providers: [PagesRouting, APIRequestService, PathRequestService, UserDetailsService,
              AuthorService, BookService, GenreService, AuthenticationService, FileSaveService,
              UserSessionService, AuthGuard, AdminGuard, CustomValidatorService, ResetPassGuard,
              BookGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }

platformBrowserDynamic().bootstrapModule(AppModule);
