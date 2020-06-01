import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { LoginComponent } from './login/login.component';
import { AdminComponent } from './admin-module/actions/admin.component';
import { AuthGuard } from './guards/auth-guard.service';
import { AddBookComponent } from './admin-module/book-actions/add-book/add-book.component';
import { DeleteBookComponent } from './admin-module/book-actions/delete-book/delete-book.component';
import { AddAuthorComponent } from './admin-module/author-actions/add-author/add-author.component';
import { DeleteAuthorComponent } from './admin-module/author-actions/delete-author/delete-author.component';
import { AddGenreComponent } from './admin-module/type-actions/add-genre/add-genre.component';
import { DeleteGenreComponent } from './admin-module/type-actions/delete-genre/delete-genre.component';
import { AdminGuard } from './guards/admin-guard.service';
import { ResetPasswordComponent } from './login/resetPassword/reset-password.component';
import { NewPasswordComponent } from './login/new-password/new-password.component';
import { ResetPassGuard } from './guards/reset-pass-guard.service';
import { BookGuard } from './guards/book-guard.service';
import { OnlineFileComponent } from './pdf-viewer/online-file.component';
import { OrderedBooksComponent } from './admin-module/ordered-books/ordered-books.component';
import { ManagementComponent } from './admin-module/admin-management/management.component';
import { BusinessSignupComponent } from './business-module/business-signup/business-signup.component';
import { UserGuard } from './guards/user-guard';
import { SignupGuard } from './guards/signup-guard';
import { BusinessGuard } from './guards/business-guard';
import { BusinessProfileComponent } from './business-module/business-profile/business-profile.component';
import { EmployerSignupComponent } from './employer-signup/employer-signup.component';
import { TakeQuizComponent } from './user-module/take-quiz/take-quiz.component';
import { SignupComponent } from './user-module/signup/signup.component';
import { BooksComponent } from './user-module/books/books.component';
import { BookComponent } from './user-module/book/book.component';
import { ProfileComponent } from './user-module/profile/profile.component';
import { AddQuizComponent } from './admin-module/quiz/add-quiz/add-quiz.component';
import { LibraryComponent } from './user-module/library/library.component';
import { WishlistComponent } from './user-module/wishlist/wishlist.component';
import { OnlineBooksComponent } from './user-module/online-books/online-books.component';
import { LoannedBooksComponent } from './user-module/loanned-books/loanned-books.component';
import { LibraryBooksComponent } from './admin-module/library-books/library-books.component';
import { BusinessPaymentComponent } from './business-module/business-payment/business-payment.component';
import { EmployeesComponent } from './business-module/employees/employees.component';

const routes: Routes = [
  //#region  general
  { path: '', redirectTo: 'home', pathMatch: 'full'},
  { path: 'home', component: HomePageComponent},
  { path: 'login', component: LoginComponent},
  //#endregion

  //#region  user
  { path: 'signup', component: SignupComponent},
  { path: 'employerSignup', canActivate: [SignupGuard], component: EmployerSignupComponent},
  { path: 'reset-password', component: ResetPasswordComponent},
  { path: 'new-password', canActivate: [ResetPassGuard], component: NewPasswordComponent},
  { path: 'books', canActivate: [AuthGuard, UserGuard], component: BooksComponent},
  { path: 'book', canActivate: [AuthGuard, BookGuard, UserGuard], component: BookComponent},
  { path: 'pdf-viewer', canActivate: [AuthGuard, BookGuard, UserGuard], component: OnlineFileComponent},
  { path: 'take-quiz', canActivate: [AuthGuard, UserGuard], component: TakeQuizComponent},
  { path: 'profile', canActivate: [AuthGuard, UserGuard], component: ProfileComponent},
  { path: 'library', canActivate: [AuthGuard, UserGuard], component: LibraryComponent},
  { path: 'wishlist', canActivate: [AuthGuard, UserGuard], component: WishlistComponent},
  { path: 'e-book', canActivate: [AuthGuard, UserGuard], component: OnlineBooksComponent},
  { path: 'loaned', canActivate: [AuthGuard, UserGuard], component: LoannedBooksComponent},
  //#endregion

  //#region  admin
  { path: 'add-quiz', canActivate: [AuthGuard, AdminGuard], component: AddQuizComponent},
  { path: 'all-books', canActivate: [AuthGuard, AdminGuard], component: LibraryBooksComponent},
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
  //#endregion

  //#region  business
  { path: 'businessSignup', component: BusinessSignupComponent},
  { path: 'business-payment', canActivate: [AuthGuard, BusinessGuard], component: BusinessPaymentComponent},
  { path: 'business-employees', canActivate: [AuthGuard, BusinessGuard], component: EmployeesComponent},
  { path: 'business-profile', canActivate: [AuthGuard, BusinessGuard], component: BusinessProfileComponent},
  //#endregion

  { path: '**',  redirectTo: 'home'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
