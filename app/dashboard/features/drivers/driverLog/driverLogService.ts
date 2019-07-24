import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class DriverLogService {

   // private url = 'http://QA-Test-JFS-PlatformService.us-east-1.elasticbeanstalk.com/fleetops/driver/driverLogs?driverId=66&&timestamp=2017-12-09T07:33:20Z';
    private url  = 'app/dashboard/features/drivers/driverLog/driverLogData.json';
    constructor(private _http: Http) {

    }

     private extractData(response: Response) {
        let requestResponse = response;

        return requestResponse || {};
    }

    getDriverLog(): Observable<any> {
        return this._http.get(this.url)
            .map(this.extractData)
            // .do(data => console.log("Data received: " + JSON.stringify(data)))
            .catch(this.handleError);

    }

    private handleError(error: Response) {
        console.error(error)
        return Observable.throw(error.json().error || "Server error");
    }
}