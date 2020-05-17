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

    public UserAccountPage(): any {
        return this._router.navigate(['account']);
    }
}