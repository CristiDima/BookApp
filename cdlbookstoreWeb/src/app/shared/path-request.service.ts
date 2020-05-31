import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable()
export  class PathRequestService {
    //#region book
    public bookPath = environment.url + '/book';
    public borrowPath = environment.url + '/book/borrow';
    public onlinePath = environment.url + '/book/online';
    public wishlistPath = environment.url + '/book/wishlist';
    public libraryPath = environment.url + '/book/library';
    public bookRating = environment.url + '/book/rating';
    public onlineBookPath = environment.url + '/onlineBooks';
    public loanedBookPath = environment.url + '/loanedBooks';
    //#endregion

    //#region bookManagement
    public expiredLoanPath = environment.url + '/book/expiredLoan';
    public orderedPath = environment.url + '/book/ordered';
    public returnedPath = environment.url + '/book/returned';
    //#endregion

    //#region business
    public businessSignupPath = environment.url + '/businessSignup';
    public employeesPath = environment.url + '/employees';
    public businessAccountPath = environment.url + '/businessAccount';
    public setBusinessAccountPath = environment.url + '/businessAccount/set';
    public updateBusinessAccountPath = environment.url + '/businessAccount/update';
    //#endregion

    //#region quiz
    public quizPath = environment.url + '/quiz';
    //#endregion

    public onlineAccountPath = environment.url + '/onlineAccount';
    public physicalAccountPath = environment.url + '/physicalAccount';
    public readListBookPath = environment.url + '/readListBook';
    public addressPath = environment.url + '/address';
    public authorPath = environment.url + '/author';
    public genrePath = environment.url + '/genre';
    public loginPath = environment.url + '/login';
    public logoutPath = environment.url + '/logout';
    public signupPath = environment.url + '/signup';
    public userPath = environment.url + '/user';
    public userSessionPath = environment.url + '/user/session';
    public resetPasswordPath = environment.url + '/resetPassword';
    public changePasswordPath = environment.url + '/changePassword';
}
