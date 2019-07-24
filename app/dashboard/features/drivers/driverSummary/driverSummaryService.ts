import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class DriverSummaryService {

    private url = 'app/dashboard/features/drivers/driverDataBase.json';;

    constructor(private _http: Http) {

    }

    getDriverSummary(): Observable<any[]> {
        return this._http.get(this.url)
            .map((response: Response) => <any[]>response.json())
            // .do(data => console.log("Data received: " + JSON.stringify(data)))
            .catch(this.handleError);

    }

    private handleError(error: Response) {
        console.error(error)
        return Observable.throw(error.json().error || "Server error");
    }

}