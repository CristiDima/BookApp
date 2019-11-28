import { Router } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable()
export class PagesRouting {

    constructor (private _router: Router){
    }

    public get HomePage(): any {
        return this._router.navigate(['home']);
    }

    public get LoginPage(): any {
        return this._router.navigate(['home/login']);
    }

    public get SignUpPage(): any {
        return this._router.navigate(['home/signup']);
    }

    public get BooksPage(): any {
        return this._router.navigate(['home/books']);
    }

    public get AdminPage(): any {
        return this._router.navigate(['home/admin']);
    }

    public get UserAccountPage(): any {
        return this._router.navigate(['home/account']);
    }
}