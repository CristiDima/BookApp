import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MaterialModule } from './shared/material.module';
import { HomePageComponent } from './home-page/home-page.component';
import { LoginComponent } from './login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { PagesRouting } from './shared/pages-routing.service';
import { APIRequestService } from './shared/api-request.service';
import { HttpClientModule } from '@angular/common/http';
import { PathRequestService } from './shared/path-request.service';
import { AdminModule } from './admin-module/admin.module';
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
import { NgxSpinnerModule } from 'ngx-spinner';
import { UserDetailsService } from './shared/user-details.service';
import {SlideshowModule} from 'ng-simple-slideshow';
import { ResetPassGuard } from './guards/reset-pass-guard.service';
import { ToastrModule } from 'ngx-toastr';
import { FileSaveService } from './shared/file-save.service';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { BookGuard } from './guards/book-guard.service';
import { ConfirmationComponent } from './dialog/confirmation.component';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { ManagementModule } from './admin-module/admin-management/management.module';
import { BusinessSignupComponent } from './business-module/business-signup/business-signup.component';
import { EmployerSignupComponent } from './employer-signup/employer-signup.component';
import { SignupGuard } from './guards/signup-guard';
import { BusinessProfileModule } from './business-module/business-profile/business-profile.module';
import { UserGuard } from './guards/user-guard';
import { BusinessGuard } from './guards/business-guard';
import { SignupComponent } from './user-module/signup/signup.component';
import { QuizModule } from './admin-module/quiz/quiz.module';
import { UserModule } from './user-module/user.module';
import { FooterComponent } from './footer-component/footer.component';
import { HeaderComponent } from './header-component/header.component';
import { BooksFormComponent } from './user-module/books-form/books-form.component';
import { APIMessagesService } from './shared/api-messages.service';

const config = {
    apiKey: 'AIzaSyCS1_bJX95rdMH6mWdRNl_rnp6ewVK1xYc',
    authDomain: 'bookstorefiles-4fb5f.firebaseapp.com',
    databaseURL: 'https://bookstorefiles-4fb5f.firebaseio.com',
    projectId: 'bookstorefiles-4fb5f',
    storageBucket: 'bookstorefiles-4fb5f.appspot.com',
    messagingSenderId: '879408210464',
    appId: '1:879408210464:web:8ed0d527af1eca14a09245',
    measurementId: 'G-QT9QGXTVNS'
};

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    LoginComponent,
    SignupComponent,
    ResetPasswordComponent,
    NewPasswordComponent,
    ConfirmationComponent,
    BusinessSignupComponent,
    EmployerSignupComponent,
    HeaderComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    HttpClientModule,
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
    AdminModule,
    QuizModule,
    ManagementModule,
    BusinessProfileModule,
    UserModule
  ],
  entryComponents: [ConfirmationComponent],
  providers: [PagesRouting, APIRequestService, PathRequestService, UserDetailsService, AuthorService, BookService, APIMessagesService,
              GenreService, AuthenticationService, FileSaveService, UserSessionService, CustomValidatorService, ResetPassGuard,
              BookGuard, SignupGuard, BusinessGuard, UserGuard, AuthGuard, AdminGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }

platformBrowserDynamic().bootstrapModule(AppModule);
