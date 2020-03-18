import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable()
export  class PathRequestService {
    public bookPath = environment.url +  '/book';
    public authorPath = environment.url +  '/author';
    public bookTypePath = environment.url +  '/type';
}