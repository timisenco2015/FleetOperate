import {Injectable} from '@angular/core';
import {Http, Response, Headers, RequestOptions} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {AppService} from '../../../../app.service';

@Injectable()
export class DriverSettingsService {

   // private url1 = 'app/dashboard/features/drivers/driverDataBase.json';
   // private url = 'http://localhost:8082/fleetops/driver';

    constructor(private _http: Http, private appService: AppService) {

    }

    private extractData(response: Response) {
        let serverResponse = response;

        return serverResponse || {};
    }

    private handleError(error: Response) {
        console.error(error)
        return Observable.throw(error.json().error || "Server error");
    }

    username: any = "user"
    password: any = "user"

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

  public checkIfUsernameExistsInDB(emailId: string):Observable<any>{
        console.log("Inside service username is:..", emailId)
        let headers = new Headers({ 'Content-Type': 'application/json' });
        headers.append('Authorization', 'Basic ' +
        btoa(this.username+':'+this.password));
    
        let options = new RequestOptions({ headers: headers });
        return this._http.post(this.appService.companyUrl+"/emailIdCheck/"+emailId+"/", options)
            .map(this.extractData)
            //.do(data => console.log("Data received: " + JSON.stringify(data)))
             .catch(this.handleError);

    }

     getDrivers(companyId: any): Observable<any> {
        return this._http.get(this.appService.driverUrl+"/driverList/"+companyId, {headers: this.createAuthorizationHeader(), 
            body:""})
            .map(this.extractData)
            //.do(data => console.log("Data received: " + JSON.stringify(data)))
            .catch(this.handleError);
     }

     addDriver(newDriverDetails: any): Observable<any> {
        console.log("Inside service:..", newDriverDetails)
        let body = JSON.stringify( newDriverDetails );
        console.log("Inside service json file:..", body)
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        return this._http.post(this.appService.driverUrl, body, options)
            .map(this.extractData)

            //.do(data => console.log("Data received: " + JSON.stringify(data)))
            .catch(this.handleError);
    }

    updateDriver(editedDriverDetails: any, driverId: any): Observable<any> {
        console.log("Inside service updateDriver:..", editedDriverDetails)
        console.log("Inside service updateDriverr ID is:..", driverId)
        let body = JSON.stringify( editedDriverDetails );
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        return this._http.put(this.appService.driverUrl + "/" + driverId, body, options)
            .catch(this.handleError);
    }

    deleteDriver(driverId: any): Observable<any> {
        return this._http.delete(this.appService.driverUrl + "/" + driverId)
             .map(this.extractData)
            /*.map((response: Response) => {
                console.log("response:.. is.." , response.status)
            })
             .do(data => console.log("Delete response received: " + JSON.stringify(data)))*/
            .catch(this.handleError);

    }

    getDriverToEdit(driverId: any): Observable<any>{

        console.log("In service edit driverId:..", driverId);
        return this._http.get(this.appService.driverUrl + "/" + driverId)
                .map(this.extractData)
                /*.map((response: Response) => {
                    this.extractData(response);
                console.log("response edit driver:.. is.." , response)
            })*/
                .catch(this.handleError);

    }

     confirmDriver(username: string): Observable<any>{
        console.log("username in service :..", username);

        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        return this._http.post(this.appService.driverUrl+"/adminConfirmDriver/"+username, options)
            .map(this.extractData)

            //.do(data => console.log("Data received: " + JSON.stringify(data)))
            .catch(this.handleError);
     }
}