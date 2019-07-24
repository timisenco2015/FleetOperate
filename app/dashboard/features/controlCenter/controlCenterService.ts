import {Injectable} from '@angular/core';
import {Http, Response, Headers, RequestOptions} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {AppService} from '../../../app.service';

@Injectable()
export class ControlCenterService {

    private url = 'app/dashboard/features/controlCenter/locations.json';

    constructor(private _http: Http, private appService: AppService) {

    }

    private extractData(response: Response) {
        let requestResponse = response;

        return requestResponse || {};
    }
/*
    getFleetsLocation(companyId, timeNumber): Observable<any> {
        console.log('control center service: companyId...', companyId);
        console.log('control center service: timeNumber...', timeNumber);
        return this._http.get(/*this.appService.controlCenterUrl+"/"+companyIdthis.url)
            .map(this.extractData)
            //.do(data => console.log("Data received: " + JSON.stringify(data)))
            .catch(this.handleError);

    }
*/



getFleetsLocation(): Observable<any> {
    // console.log('control center service: companyId...', companyId);
    // console.log('control center service: timeNumber...', timeNumber);
     return this._http.get(/*this.appService.controlCenterUrl+"/"+companyId*/this.url)
         .map(this.extractData)
         //.do(data => console.log("Data received: " + JSON.stringify(data)))
         .catch(this.handleError);

 }


    private handleError(error: Response) {
        console.error(error)
        return Observable.throw(error.json().error || "Server error");
    }
}