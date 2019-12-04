import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { PagesRouting } from '../shared/pages-routing.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
    constructor(private _router: Router, private _dialog: MatDialog, private _pagesRouting: PagesRouting) {}

    protected onLoginPage(): any {
        this._pagesRouting.LoginPage();
    }

    protected onHomePage(): any {
        this._pagesRouting.HomePage();
    }

    protected onBooksPage(): any {
        this._pagesRouting.BooksPage();
    }

    protected onAccountPage(): any {
        this._pagesRouting.UserAccountPage();
    }

    protected onAdminPage(): any {
        this._pagesRouting.AdminPage();
    }
}