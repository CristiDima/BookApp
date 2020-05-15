import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable()
export  class PathRequestService {
    public bookPath = environment.url + '/book';
    public bookRating = environment.url + '/book/rating';
    public onlineBookPath = environment.url + '/onlineBooks'
    public loanedBookPath = environment.url + '/loanedBooks'
    public onlineAccountPath = environment.url + '/onlineAccount'
    public physicalAccountPath = environment.url + '/physicalAccount'
    public readListBookPath = environment.url + '/readListBook'
    public addressPath = environment.url + '/address'
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