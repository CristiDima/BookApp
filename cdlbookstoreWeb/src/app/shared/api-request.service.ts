import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PathRequestService } from './path-request.service';

@Injectable()
export class APIRequestService {
    private httpOptions = {
        headers: new HttpHeaders({
            'Accept': 'application/json',
            'Content-Type': 'application/json'})
      }
    constructor(private httpClient: HttpClient, private pathRequest: PathRequestService) {
    }

    public requst(requestType: string, url: string, data?: any): Observable<any> {
        
        this.heartbeat();

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

    public heartbeat(): void {
        const userDetails = JSON.parse(localStorage.getItem('currentUser'));
        if (!userDetails) {
            return;
        }
        const token: string = userDetails['token'];
        this.httpClient.post(this.pathRequest.userSessionPath, token, this.httpOptions)
        .subscribe(() => {
            const tokenExpirationDate = new Date();
            tokenExpirationDate.setMinutes(tokenExpirationDate.getMinutes() + 60);
            const currentUser: any = {'userId': userDetails['userId'],
                'token': userDetails['token'], 
                'tokenExpirationDate': tokenExpirationDate };
            localStorage.setItem('currentUser', JSON.stringify(currentUser));
        }, error => {
            // localStorage.clear();
        });
    }
}