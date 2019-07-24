import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {AppService} from '../../../../app.service';

@Injectable()
export class DriverGeneralService {

    private url = 'app/dashboard/features/drivers/driverDataBase.json';

    constructor(private _http: Http, private appService: AppService) {

    }

    private extractData(response: Response) {
        let serverResponse = response;

        return serverResponse || {};
    }

    getDriverGeneral(driverId): Observable<any> {
        return this._http.get(this.appService.driverUrl+"/driver/"+driverId)
            .map(this.extractData)
            // .do(data => console.log("Data received: " + JSON.stringify(data)))
            .catch(this.handleError);

    }

    private handleError(error: Response) {
        console.error(error)
        return Observable.throw(error.json().error || "Server error");
    }
}