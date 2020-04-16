import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomePageComponent } from './homePage/homePage.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { AdminComponent } from './admin/admin.component';
import { BooksComponent } from './books/books.component';
import { AccountComponent } from './account/account.component';
import { AuthGuard } from './guards/auth-guard.service';
import { AddBookComponent } from './admin/bookActions/addBook/add-book.component';
import { DeleteBookComponent } from './admin/bookActions/deleteBook/delete-book.component';
import { AddAuthorComponent } from './admin/authorActions/addAuthor/add-author.component';
import { DeleteAuthorComponent } from './admin/authorActions/deleteAuthor/delete-author.component';
import { AddGenreComponent } from './admin/typeActions/addGenre/add-genre.component';
import { DeleteGenreComponent } from './admin/typeActions/deleteGenre/delete-genre.component';
import { AdminGuard } from './guards/admin-guard.service';
import { ResetPasswordComponent } from './login/resetPassword/reset-password.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full'},
  { path: 'home', component: HomePageComponent},
  { path: 'login', component: LoginComponent},
  { path: 'signup', component: SignupComponent},
  { path: 'reset-password', component: ResetPasswordComponent},
  { path: 'books',   canActivate: [AuthGuard], component: BooksComponent},
  { path: 'account',   canActivate: [AuthGuard], component: AccountComponent},
  {
    path: 'admin',
    canActivate: [AuthGuard, AdminGuard],
    canActivateChild: [AuthGuard],
    component: AdminComponent,
    children: [
    { path: 'book/add', component: AddBookComponent},
    { path: 'book/delete', component: DeleteBookComponent},
    { path: 'author/add', component: AddAuthorComponent},
    { path: 'author/delete', component: DeleteAuthorComponent},
    { path: 'genre/add', component: AddGenreComponent},
    { path: 'genre/delete', component: DeleteGenreComponent}
  ] },
  { path: '**',  redirectTo: 'home'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
