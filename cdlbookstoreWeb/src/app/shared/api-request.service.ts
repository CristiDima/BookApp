import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class APIRequestService {
    private httpOptions = {
        headers: new HttpHeaders({'Content-Type': 'application/json'})
      }
    constructor(private httpClient: HttpClient) {
    }

    public requst(requestType: string, url: string, data?: any): Observable<any> {
        switch (requestType) {
            case 'PUT': return this.putRequest(url, data);
            case 'POST': return this.postRequest(url, data);
            case 'GET': return this.getRequest(url);
            case 'DELETE': return this.deleteRequest(url, data);
            default: return null;
        }
    }

    private getRequest(url: string):  Observable<any> {
        return this.httpClient.get(url);
    }

    private putRequest(url: string, data: any):  Observable<any> {
        return this.httpClient.put(url, data, this.httpOptions);
    }

    private postRequest(url: string, data: any): Observable<any> {
        return this.httpClient.post(url, data, this.httpOptions);
    }

    private deleteRequest(url: string, id: number): Observable<any> {
        return this.httpClient.delete(url + '/' + id, this.httpOptions);
    }
}