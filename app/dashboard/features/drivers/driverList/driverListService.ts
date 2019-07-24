import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class DriverService {

    private url = 'app/dashboard/features/drivers/driverDataBase.json';

    constructor(private _http: Http) {

    }

    private extractData(response: Response) {
        let requestResponse = response;

        return requestResponse || {};
    }

    getDrivers(): Observable<any> {
        return this._http.get(this.url)
            .map(this.extractData)
            //.do(data => console.log("Data received: " + JSON.stringify(data)))
            .catch(this.handleError);

    }

    getDriverLog(): Observable<any>{

        return this._http.get(this.url)
            .map(this.extractData)
            //.do(data => console.log("Data received: " + JSON.stringify(data)))
            .catch(this.handleError);
    }

    private handleError(error: Response) {
        console.error(error)
        return Observable.throw(error.json().error || "Server error");
    }


}