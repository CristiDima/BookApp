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
    constructor(private authService: AuthenticationService, private pagesRouting: PagesRouting, private userService: UserSessionService) {
    }

    public isAdmin(): boolean {
        return this.userService.isAdmin();
    }

    public isUser(): boolean {
        return this.userService.isUser();
    }

    public isBusiness(): boolean {
        return this.userService.isBusiness();
    }

    public isLoggedId(): boolean {
        return this.userService.isLoggedIn();
    }

    //#region general events
    protected onLogin(): void {
        this.pagesRouting.LoginPage();
    }

    protected onLogout(): void {
        this.authService.logout();
    }

    protected onHomePage(): void {
        this.pagesRouting.HomePage();
    }
    //#endregion

    //#region user events
    protected onBooksPage(): void {
        this.pagesRouting.BooksPage();
    }

    protected onProfilePage(): void {
        this.pagesRouting.UserProfilePage();
    }

    protected onTakeQuizPage(): any {
        this.pagesRouting.TakeQuizPage();
    }

    protected onLibraryPagePage(): any {
        this.pagesRouting.LibraryPage();
    }

    protected onLoanedPage(): any {
        this.pagesRouting.LoanedPage();
    }

    protected onWishlistPage(): any {
        this.pagesRouting.WishlistPage();
    }

    protected onEBookPage(): any {
        this.pagesRouting.EBookPage();
    }
    //#endregion

    //#region admin events
    protected onAdminPage(): any {
        this.pagesRouting.AdminPage();
    }

    protected onManaagementPage(): any {
        this.pagesRouting.ManagementPage();
    }

    protected onAddQuizPage(): any {
        this.pagesRouting.AddQuizPage();
    }
    //#endregion

    //#region business events
    protected onBusinessProfilePage(): any {
        this.pagesRouting.BusinessProfilePage();
    }
    //#endregion
}
