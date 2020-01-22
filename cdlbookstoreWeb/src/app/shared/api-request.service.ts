import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';

@Injectable()
export class APIRequestService {
    private httpOptions = {
        headers: new HttpHeaders({'Content-Type': 'application/json'})
      }
    constructor(private httpClient: HttpClient) {
    }

    public requst(requestType: string, url: string, data?: any) {
        switch (requestType) {
            case 'PUT': this.putRequest(url, data);
                break;
            case 'POST': this.postRequest(url, JSON.stringify(data) );
                break;
            case 'GET': this.getRequest(url);
                break;
            case 'DELETE': this.deleteRequest(url, data);
                break;
        }
    }

    private getRequest(url: string): any {
        let response: any = null;
        this.httpClient
            .get(
                url
            ).subscribe((responseData: any) =>{
                response = responseData;
            });
        return response;
    }

    private putRequest(url: string, data: any): any {
        let response: any = null;
        this.httpClient
            .put(
                url, data, this.httpOptions
            )
            .subscribe((responseData: any) => {
                    response = responseData;
            });
        return response;
    }

    private postRequest(url: string, data: any): any {
        let response: any = null;
        this.httpClient
            .post(
                url, data, this.httpOptions
            )
            .subscribe((responseData: any) => {
                response = responseData;
            });
        return response;
    }

    private deleteRequest(url: string, data: any) {
        let response: any = null;
        this.httpClient
            .delete(
                url, data
            )
            .pipe(
                map(responseData => {
                    response = responseData;
                })
            )
        return response;

    }
}