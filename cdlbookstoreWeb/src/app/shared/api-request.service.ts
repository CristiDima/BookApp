import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';

@Injectable()
export class APIRequestService {

    constructor(private httpClient: HttpClient) {
    }

    public requst(requestType: string, url: string, data?: string) {
        switch (requestType) {
            case 'PUT': this.putRequest(url, data);
                break;
            case 'POST': this.postRequest(url, data);
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
                console.log(responseData);
                response = responseData;
            });
        return response;
    }

    private putRequest(url: string, data: any): any {
        let response: any = null;
        this.httpClient
            .put(
                url, data
            )
            .pipe(
                map(responseData => {
                    response = responseData;
                })
            )
        return response;
    }

    private postRequest(url: string, data: any) {
        let response: any = null;
        this.httpClient
            .post(
                url, data
            )
            .pipe(
                map(responseData => {
                    response = responseData;
                })
            )
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