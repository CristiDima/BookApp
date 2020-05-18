import { Component, OnInit } from '@angular/core';
import { PagesRouting } from '../shared/pages-routing.service';
import { UserSessionService } from '../shared/user-session.service';
import { AuthenticationService } from '../shared/authentication.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
    constructor(private _authService: AuthenticationService, private _pagesRouting: PagesRouting,
                private _userService: UserSessionService) {
    }

    public isAdmin(): boolean {
        return this._userService.isAdmin();
    }

    public isLoggedId(): boolean {
        return this._userService.isLoggedIn();
    }

    //region events
    protected onLogin(): void {
        this._pagesRouting.LoginPage();
    }

    protected onLogout():void {
        this._authService.logout();
    }

    protected onHomePage(): void {
        this._pagesRouting.HomePage();
    }

    protected onBooksPage(): void {
        this._pagesRouting.BooksPage();
    }

    protected onAccountPage(): void {
        this._pagesRouting.UserAccountPage();
    }

    protected onAdminPage(): any {
        this._pagesRouting.AdminPage();
    }

    protected onManaagementPage(): any {
        this._pagesRouting.ManagementPage();
    }
    //endregion
}