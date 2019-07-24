import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { AppService } from '../app.service';

@Injectable()
export class FleetOperateService {

    private url = 'app/fleetOperate/fleetOperateFeatures.json';

    constructor(private _http: Http, private appService: AppService) {

    }

    username: any = "admin"
    password: any = "admin"

    private extractData(response: Response) {
        let serverResponse = response;
        //console.log("serverResponse..", serverResponse)
        return serverResponse;
    }

    checkIfAdminUsernameExistsInDB(/*username: string, */emailId: string): Observable<any> {
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

    checkIfDriverUsernameExistsInDB(/*username: string, */emailId: string): Observable<any> {
        //console.log("Inside service emailId is:..", emailId)
        let headers = new Headers({ 'Content-Type': 'application/json' });
        headers.append('Authorization', 'Basic ' +
            btoa(this.username + ':' + this.password));

        let options = new RequestOptions({ headers: headers });
        return this._http.post(this.appService.companyUrl + "driverEmailIdCheck/" + emailId + "/", options)
            .map(this.extractData)
            //.do(data => console.log("Data received: " + JSON.stringify(data)))
            .catch(this.handleError);

    }

    getCompanyStatus(companyId): Observable<any> {

        return this._http.get(this.appService.companyUrl + "companyStatus/" + companyId)
            .map(this.extractData)
            //.do(data => console.log("Data received: " + JSON.stringify(data)))
            .catch(this.handleError);
    }

    getCompanyAdminInfo(companyId, adminId): Observable<any> {

        return this._http.get(this.appService.companyUrl + "companyAdminInfo/" + companyId + "/" + adminId)
            //.map(this.extractData)
            .map(response => {
                //console.log("getCompanyAdminInfo response...", response.json());

                return response
            })
            //.do(data => console.log("Data received: " + JSON.stringify(data)))
            .catch(this.handleError);
    }

    postCompleteCompanyAdminProfile(companyAdminInfo: any) {
       // console.log("postCompleteCompanyAdminProfile service is called:..", companyAdminInfo);

        //let body = JSON.stringify(companyAdminInfo);
       // console.log("Inside service createAdminProfile json is:..", body)
        let headers = new Headers({ 'Content-Type': 'application/json' });
        headers.append('Authorization', 'Basic ' +
            btoa(this.username + ':' + this.password));

        let options = new RequestOptions({ headers: headers });
        return this._http.post(this.appService.companyUrl + "companyAdminProfile", companyAdminInfo, options)
            .map(this.extractData)
            //.do(data => console.log("Data received: " + JSON.stringify(data)))
            .catch(this.handleError);

    }

    getFeaturesList(companyId: number): Observable<any> {

        return this._http.get(this.url)
            .map(this.extractData)
            //.do(data => console.log("Data received: " + JSON.stringify(data)))
            .catch(this.handleError);
    }

    private handleError(error: Response) {
       // console.error(error)
        return Observable.throw(error.json().error || "Server error");
    }
}