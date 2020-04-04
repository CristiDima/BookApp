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
        return this._router.navigate(['home/login']);
    }

    public SignUpPage(): any {
        return this._router.navigate(['home/signup']);
    }

    public BooksPage(): any {
        return this._router.navigate(['home/books']);
    }

    public AdminPage(): any {
        return this._router.navigate(['home/admin']);
    }

    public UserAccountPage(): any {
        return this._router.navigate(['home/account']);
    }
}