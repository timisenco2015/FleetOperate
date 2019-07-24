import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, XSRFStrategy, CookieXSRFStrategy } from '@angular/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class SubscriptionService {

    constructor(private _http: Http) {

    }

    private subscriptionDataURL = 'app/createAccount/subscription/subscriptionData.json';

    private handleError(error: Response) {
        // console.error(error)
         return Observable.throw(error|| "Server error");
     }
     
    getSubscriptionData(): Observable<any>{

        return this._http.get(this.subscriptionDataURL)
        .map(response => {
            //console.log("getAppClientInfo response..1..",response.json());
     
            return response.json()
        })
        .catch(this.handleError);
    }
}