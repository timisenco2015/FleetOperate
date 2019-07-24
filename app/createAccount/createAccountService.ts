import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, XSRFStrategy, CookieXSRFStrategy } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { AppService } from '../app.service';

@Injectable()
export class CreateAccountService {

    constructor(private _http: Http, private appService: AppService) {

    }

    private username: any = "admin"
    private password: any = "admin"

    addCompanyAndAdmin(companyAndAdminDetails: any): Observable<any> {
        //console.log("Inside service companyAndAdminDetails are:..", companyAndAdminDetails)
        let body = JSON.stringify(companyAndAdminDetails);
        //console.log("Inside service companyAndAdminDetails json is:..", body)
        let headers = new Headers({ 'Content-Type': 'application/json' });
        headers.append('Authorization', 'Basic ' +
            btoa(this.username + ':' + this.password));

        let options = new RequestOptions({ headers: headers });
        return this._http.post(this.appService.companyUrl, body, options)
            .map(this.extractData)
            //.do(data => console.log("Data received: " + JSON.stringify(data)))
            .catch(this.handleError);

    }

    checkIfUsernameExistsInDB(/*username: string, */emailId: string): Observable<any> {
        //console.log("Inside service emailId is:..", emailId)
        let headers = new Headers({ 'Content-Type': 'application/json' });
        headers.append('Authorization', 'Basic ' +
            btoa(this.username + ':' + this.password));

        let options = new RequestOptions({ headers: headers });
        return this._http.post(this.appService.companyUrl + "adminEmailIdCheck/" + emailId + "/", options)
            .map(this.extractData)
            //.do(data => console.log("Data received: " + JSON.stringify(data)))
            .catch(this.handleError);

    }

    createAdminProfile(adminProfile: any): Observable<any> {
        //console.log("createAdminProfile service is called:..", adminProfile);

        let body = JSON.stringify(adminProfile);
        //console.log("Inside service createAdminProfile json is:..", body)
        let headers = new Headers({ 'Content-Type': 'application/json' });
        headers.append('Authorization', 'Basic ' +
            btoa(this.username + ':' + this.password));

        let options = new RequestOptions({ headers: headers });
        return this._http.post(this.appService.companyUrl + "adminProfile", body, options)
            .map(this.extractData)
            //.do(data => console.log("Data received: " + JSON.stringify(data)))
            .catch(this.handleError);

    }

    resendEmailVerificationCode(adminId: any): Observable<any> {
        //console.log("resendEmailVerificationCode service is called:..", adminId);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        headers.append('Authorization', 'Basic ' +
            btoa(this.username + ':' + this.password));

        let options = new RequestOptions({ headers: headers });
        return this._http.post(this.appService.companyUrl + "resendEmailVerificationCode/"+adminId, options)
            .map(this.extractData)
            //.do(data => console.log("Data received: " + JSON.stringify(data)))
            .catch(this.handleError);
    }

    confirmVerificationCode(verificationCode: any): Observable<any>{
        //console.log("confirmVerificationCode service is called:..", verificationCode);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        headers.append('Authorization', 'Basic ' +
            btoa(this.username + ':' + this.password));

        let options = new RequestOptions({ headers: headers });
        return this._http.post(this.appService.companyUrl + "confirmAdminVerificationCode/"+verificationCode, options)
            .map(this.extractData)
            //.do(data => console.log("Data received: " + JSON.stringify(data)))
            .catch(this.handleError);
    }

    createCompanyOrderProfile(companyOrderDetails: any): Observable<any>{
        //console.log("Inside service companyAndAdminDetails are:..", companyOrderDetails)
        let body = JSON.stringify(companyOrderDetails);
        //console.log("Inside service companyAndAdminDetails json is:..", body)
        let headers = new Headers({ 'Content-Type': 'application/json' });
        headers.append('Authorization', 'Basic ' +
            btoa(this.username + ':' + this.password));

        let options = new RequestOptions({ headers: headers });
        return this._http.post(this.appService.companyUrl+"companyProfileAndOrder", body, options)
            .map(this.extractData)
            //.do(data => console.log("Data received: " + JSON.stringify(data)))
            .catch(this.handleError);
    }

    makePayment(stripePaymentRequest: any): Observable<any>{
        //console.log("Inside service stripePaymentRequest are:..", stripePaymentRequest)
        let body = JSON.stringify(stripePaymentRequest);
        //console.log("Inside service companyAndAdminDetails json is:..", body)
        let headers = new Headers({ 'Content-Type': 'application/json' });
        headers.append('Authorization', 'Basic ' +
            btoa(this.username + ':' + this.password));

        let options = new RequestOptions({ headers: headers });
        return this._http.post(this.appService.companyUrl+"makePayment", body, options)
            .map(this.extractData)
            //.do(data => console.log("Data received: " + JSON.stringify(data)))
            .catch(this.handleError);
    }

    public extractData(response: Response) {
        let serverResponse = response;

        let map = response.headers
        //console.log("create account response..", serverResponse)


        // console.log("header map:..", map)

        return serverResponse || {};
    }

    public handleError(error: any) {
        //console.error("Error: ", error)
        return Observable.throw(error || "Server error");
    }

}