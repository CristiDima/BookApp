import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable()
export  class PathRequestService {
    public clientsPath = '';
    public booksPath = '';
    public saveBookPath = environment.url +  '/book';
}