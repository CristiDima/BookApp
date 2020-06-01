import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Book } from '../models/book.model';

@Injectable()
export class PagesRouting {

    constructor(private router: Router) {
    }

    public HomePage(): any {
        return this.router.navigate(['home']);
    }

    public LoginPage(): any {
        return this.router.navigate(['login']);
    }

    public SignUpPage(): any {
        return this.router.navigate(['signup']);
    }

    public BusinessSignUpPage(): any {
        return this.router.navigate(['businessSignup']);
    }

    public ResetPasswordPage(): any {
        return this.router.navigate(['reset-password']);
    }

    public BooksPage(): any {
        return this.router.navigate(['books']);
    }

    public BookPage(book: Book): any {
        return this.router.navigate(['book'], { state: { book } });
    }

    public PdfViewerPage(book: Book): any {
        return this.router.navigate(['pdf-viewer'], { state: { book } });
    }

    public AdminPage(): any {
        return this.router.navigate(['admin']);
    }

    public ManagementPage(): any {
        return this.router.navigate(['management']);
    }

    public UserProfilePage(): any {
        return this.router.navigate(['profile']);
    }

    public BusinessProfilePage(): any {
        return this.router.navigate(['business-profile']);
    }

    public BusinessPaymentPage(): any {
        return this.router.navigate(['business-payment']);
    }

    public BusinessEmployeesPage(): any {
        return this.router.navigate(['business-employees']);
    }

    public AddQuizPage(): any {
        return this.router.navigate(['add-quiz']);
    }

    public LibraryBooksPage(): any {
        return this.router.navigate(['all-books']);
    }

    public TakeQuizPage(): any {
        return this.router.navigate(['take-quiz']);
    }

    public LibraryPage(): any {
        return this.router.navigate(['library']);
    }

    public EBookPage(): any {
        return this.router.navigate(['e-book']);
    }

    public LoanedPage(): any {
        return this.router.navigate(['loaned']);
    }

    public WishlistPage(): any {
        return this.router.navigate(['wishlist']);
    }
}
