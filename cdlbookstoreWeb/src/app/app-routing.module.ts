import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { AdminComponent } from './admin/admin.component';
import { BooksComponent } from './books/books.component';
import { ProfieComponent } from './profile/profile.component';
import { AuthGuard } from './guards/auth-guard.service';
import { AddBookComponent } from './admin/book-actions/add-book/add-book.component';
import { DeleteBookComponent } from './admin/book-actions/delete-book/delete-book.component';
import { AddAuthorComponent } from './admin/author-actions/add-author/add-author.component';
import { DeleteAuthorComponent } from './admin/author-actions/delete-author/delete-author.component';
import { AddGenreComponent } from './admin/type-actions/add-genre/add-genre.component';
import { DeleteGenreComponent } from './admin/type-actions/delete-genre/delete-genre.component';
import { AdminGuard } from './guards/admin-guard.service';
import { ResetPasswordComponent } from './login/resetPassword/reset-password.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full'},
  { path: 'home', component: HomePageComponent},
  { path: 'login', component: LoginComponent},
  { path: 'signup', component: SignupComponent},
  { path: 'reset-password', component: ResetPasswordComponent},
  { path: 'books',   canActivate: [AuthGuard], component: BooksComponent},
  { path: 'account',   canActivate: [AuthGuard], component: ProfieComponent},
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
