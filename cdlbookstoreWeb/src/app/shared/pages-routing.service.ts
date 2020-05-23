import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Book } from '../models/book.model';

@Injectable()
export class PagesRouting {

    constructor (private _router: Router){
    }

    public HomePage(): any {
        return this._router.navigate(['home']);
    }

    public LoginPage(): any {
        return this._router.navigate(['login']);
    }

    public SignUpPage(): any {
        return this._router.navigate(['signup']);
    }

    public BusinessSignUpPage(): any {
        return this._router.navigate(['businessSignup']);
    }

    public ResetPasswordPage(): any {
        return this._router.navigate(['reset-password']);
    }

    public BooksPage(): any {
        return this._router.navigate(['books']);
    }

    public BookPage(book: Book): any {
        return this._router.navigate(['book'], { state: { book: book } });
    }

    public PdfViewerPage(book: Book): any {
        return this._router.navigate(['pdf-viewer'], { state: { book: book } });
    }

    public AdminPage(): any {
        return this._router.navigate(['admin']);
    }

    public ManagementPage(): any {
        return this._router.navigate(['management']);
    }

    public UserAccountPage(): any {
        return this._router.navigate(['account']);
    }

    public BusinessProfilePage(): any {
        return this._router.navigate(['businessProfile']);
    }

    public AddQuizPage(): any {
        return this._router.navigate(['add-quiz']);
    }

    public TakeQuizPage(): any {
        return this._router.navigate(['take-quiz']);
    }
}