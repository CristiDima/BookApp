import { Router } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable()
export class PagesRouting {

    constructor (private _router: Router){
    }

    public HomePage(): any {
        return this._router.navigate(['home']);
    }

    public LoginPage(): any {
        console.log('test');
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

    public AdminPage(): any {
        return this._router.navigate(['admin']);
    }

    public UserAccountPage(): any {
        return this._router.navigate(['account']);
    }
}