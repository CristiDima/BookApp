import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { AdminComponent } from './admin/admin.component';
import { BooksComponent } from './books/books.component';
import { ProfileComponent } from './profile/profile.component';
import { AuthGuard } from './guards/auth-guard.service';
import { AddBookComponent } from './admin/book-actions/add-book/add-book.component';
import { DeleteBookComponent } from './admin/book-actions/delete-book/delete-book.component';
import { AddAuthorComponent } from './admin/author-actions/add-author/add-author.component';
import { DeleteAuthorComponent } from './admin/author-actions/delete-author/delete-author.component';
import { AddGenreComponent } from './admin/type-actions/add-genre/add-genre.component';
import { DeleteGenreComponent } from './admin/type-actions/delete-genre/delete-genre.component';
import { AdminGuard } from './guards/admin-guard.service';
import { ResetPasswordComponent } from './login/resetPassword/reset-password.component';
import { NewPasswordComponent } from './login/new-password/new-password.component';
import { ResetPassGuard } from './guards/reset-pass-guard.service';
import { BookComponent } from './books/book/book.component';
import { BookGuard } from './guards/book-guard.service';
import { OnlineFileComponent } from './pdf-viewer/online-file.component';
import { OrderedBooksComponent } from './admin-management/ordered-books/ordered-books.component';
import { ManagementComponent } from './admin-management/management.component';
import { BusinessSignupComponent } from './business-signup/business-signup.component';
import { UserGuard } from './guards/user-guard';
import { SignupGuard } from './guards/signup-guard';
import { BusinessGuard } from './guards/business-guard';
import { BusinessProfileComponent } from './business-profile/business-profile.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full'},
  { path: 'home', component: HomePageComponent},
  { path: 'login', component: LoginComponent},
  { path: 'signup', component: SignupComponent},
  { path: 'businessSignup', component: BusinessSignupComponent},
  { path: 'employerSignup', canActivate: [SignupGuard], component: BusinessSignupComponent},
  { path: 'reset-password', component: ResetPasswordComponent},
  { path: 'new-password', canActivate: [ResetPassGuard], component: NewPasswordComponent},
  { path: 'books', canActivate: [AuthGuard, UserGuard], component: BooksComponent},
  { path: 'book', canActivate: [AuthGuard, BookGuard, UserGuard], component: BookComponent},
  { path: 'pdf-viewer', canActivate: [AuthGuard, BookGuard, UserGuard], component: OnlineFileComponent},
  { path: 'businessProfile',   canActivate: [AuthGuard, BusinessGuard], component: BusinessProfileComponent},
  { path: 'account',   canActivate: [AuthGuard, UserGuard], component: ProfileComponent},
  {
    path: 'admin',
    canActivate: [AuthGuard, AdminGuard],
    canActivateChild: [AuthGuard, AdminGuard],
    component: AdminComponent,
    children: [
    { path: 'book/add', component: AddBookComponent},
    { path: 'book/delete', component: DeleteBookComponent},
    { path: 'author/add', component: AddAuthorComponent},
    { path: 'author/delete', component: DeleteAuthorComponent},
    { path: 'genre/add', component: AddGenreComponent},
    { path: 'genre/delete', component: DeleteGenreComponent}] 
  },
  {
    path: 'management',
    canActivate: [AuthGuard, AdminGuard],
    canActivateChild: [AuthGuard, AdminGuard],
    component: ManagementComponent,
    children: [
    { path: 'management/orderded', component: OrderedBooksComponent}]
  },


  { path: '**',  redirectTo: 'home'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
