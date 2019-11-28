import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomePageComponent } from './homePage/homePage.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { AdminComponent } from './admin/admin.component';
import { BooksComponent } from './books/books.component';
import { AccountComponent } from './account/account.component';

const routes: Routes = [
  { path: '', component: HomePageComponent},
  { path: 'home', component: HomePageComponent},
  { path: 'home/login', component: LoginComponent},
  { path: 'home/signup', component: SignupComponent},
  { path: 'home/admin', component: AdminComponent},
  { path: 'home/books', component: BooksComponent},
  { path: 'home/account', component: AccountComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
