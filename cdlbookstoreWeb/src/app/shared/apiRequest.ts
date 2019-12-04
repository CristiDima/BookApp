import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

export class apiRequest {

    constructor(private httpClient: HttpClient) {
    }

    public getResponse(url: string) {
        return this.httpClient
            .get<any>(
                url
            )
            .pipe(
                map(responseData => {
                    console.log(responseData);
                return responseData;
                })
            )
    }
}