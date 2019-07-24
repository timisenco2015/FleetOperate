import {Injectable} from '@angular/core';
import {Http, Response, Headers, RequestOptions} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {AppService} from '../../../app.service';

@Injectable()
export class DriverService {

    private url = 'app/dashboard/features/drivers/driverDataBase.json';

    private username: string = "admin"
    private password: string = "admin"

    constructor(private _http: Http, private appService: AppService) {

    }

    private extractData(response: Response) {
        let requestResponse = response;

        return requestResponse || {};
    }

    createAuthorizationHeader() {
    let headers = new Headers();
   // headers.append("Content-Type", "application/json");
   headers.append('Content-Type', 'application/json');
     headers.append('Accept', 'application/json');
    headers.append('Authorization', 'Basic '+btoa(this.username+':'+this.password));
      console.log("Authorization:..", 'Basic '+btoa(this.username+':'+this.password));
     // headers.append("Accept", "application/json");
     
      return headers; 
  }

  updateDrivers (data: any): Observable<any> {
        let bodyString = JSON.stringify(data); // Stringify drivers object
        let headers      = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
        let options       = new RequestOptions({ headers: headers }); // Create a request option

        return this._http.put(this.appService.driverUrl, bodyString, options) // ...using put request
                         .map((res:Response) => res.json()) // ...and calling .json() on the response to return data
                         .catch((error:any) => Observable.throw(error.json().error || 'Server error')); //...errors if any
    }   


    addDrivers (data: any): Observable<any> {
        let bodyString = JSON.stringify(data); // Stringify drivers object
        let headers      = this.createAuthorizationHeader(); // ... Set content type to JSON
        let options       = new RequestOptions({ headers: headers }); // Create a request option

        return this._http.post(this.appService.driverUrl, bodyString, options) // ...using put request
                         .map(this.extractData) // ...and calling .json() on the response to return data
                        .do(data => console.log("Data received: " + JSON.stringify(data)))
                         .catch(this.handleError); //...errors if any
    }  

    /*getDrivers(companyId: number): Observable<any> {
        return this._http.get(this.appService.driverUrl+"/summary/"+companyId, {headers: this.createAuthorizationHeader(), 
            body:""})
            .map(this.extractData)
            //.do(data => console.log("Data received: " + JSON.stringify(data)))
            .catch(this.handleError);

    }*/
    getDrivers(companyId: number): Observable<any> {
        return this._http.get(this.url)
            .map(this.extractData)
            //.do(data => console.log("Data received: " + JSON.stringify(data)))
            .catch(this.handleError);

    }

    /*getDriverGeneral(driverId): Observable<any> {
        return this._http.get(this.appService.driverUrl+"/"+driverId)
            .map(this.extractData)
            // .do(data => console.log("Data received: " + JSON.stringify(data)))
            .catch(this.handleError);

    }*/

    getDriverGeneral(driverId): Observable<any> {
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