import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {AppService} from '../../../../app.service';

@Injectable()
export class FleetService {

    private url = 'app/dashboard/features/fleet/fleetList/fleetdataBase.json';

    private diagURL = 'app/dashboard/features/fleet/fleetDiagnostics/fleetDiagnosticsData.json'

    constructor(private _http: Http, private appService: AppService) {

    }

    private extractData(response: Response) {
        let requestResponse = response;

        return requestResponse || {};
    }

    getFleets(): Observable<any> {
        return this._http.get(/*this.appService.fleetUrl*/this.url)
            .map(this.extractData)
            //.do(data => console.log("Data received: " + JSON.stringify(data)))
            .catch(this.handleError);

    }

    getFleetdiagnostics(): Observable<any>{

        return this._http.get(/*this.appService.fleetUrl*/this.diagURL)
            .map(this.extractData)
            //.do(data => console.log("Data received: " + JSON.stringify(data)))
            .catch(this.handleError);
    }

    getFleetGeneralInfo(truckId: any): Observable<any> {

        return this._http.get(/*this.appService.fleetUrl*/this.url)
            .map(this.extractData)
            //.do(data => console.log("Data received: " + JSON.stringify(data)))
            .catch(this.handleError);
    }

    private handleError(error: Response) {
        console.error(error)
        return Observable.throw(error.json().error || "Server error");
    }


}