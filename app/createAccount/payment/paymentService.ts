import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, XSRFStrategy, CookieXSRFStrategy } from '@angular/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class PaymentService {

    constructor(private _http: Http) {

    }

    private PaymentDataURL = 'app/createAccount/payment/PaymentData.json';

    private handleError(error: Response) {
        // console.error(error)
         return Observable.throw(error|| "Server error");
     }
     
    getPaymentData(): Observable<any>{

        return this._http.get(this.PaymentDataURL)
        .map(response => {
            //console.log("getAppClientInfo response..1..",response.json());
     
            return response.json()
        })
        .catch(this.handleError);
    }
}