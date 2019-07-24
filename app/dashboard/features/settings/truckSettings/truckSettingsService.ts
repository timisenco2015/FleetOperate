import {Injectable} from '@angular/core';
import {Http, Response, Headers, RequestOptions, XSRFStrategy, CookieXSRFStrategy} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {AppService} from '../../../../app.service';

@Injectable()
export class TruckSettingsService {

   // private url1 = 'app/dashboard/features/fleet/fleetList/fleetdataBase.json';
   // private url = 'http://localhost:8082/fleetops/truck';

    constructor(private _http: Http, private appService: AppService) {

    }

    public extractData(response: Response) {
        let serverResponse = response;

        let map = response.headers
        console.log("response in extractData..",serverResponse)
        

       // console.log("header map:..", map)

        return serverResponse || {};
    }

    username: any = "admin"
    password: any = "admin"

    getToken() {
        console.log("document is:..",document.cookie)
  let token = document.querySelector('meta[property="csrf-token"]')['content'];
   console.log("token is:..",token)
  return token;
  }

  getCookie() {
      console.log("document.cookie:..", document.cookie)
    let value = "; " + document.cookie;
    let parts = value.split("; " + "XSRF-TOKEN" + "=");
    if (parts.length == 2) {
        var cookieToken = parts.pop().split(";").shift();
         console.log("cookieToken is:..", cookieToken)
  return cookieToken;
    }
     
  }


    createAuthorizationHeader() {
    let headers = new Headers();
   // headers.append("Content-Type", "application/json");
   headers.append('Content-Type', 'application/json');
     headers.append('Accept', 'application/json');
     

    //headers.append('Authorization', 'Basic '+window.btoa(this.username+':'+this.password));
      console.log("Authorization:..", 'Basic '+btoa(this.username+':'+this.password));
      console.log("cookie is:..", headers)
     
      return headers; 
  }

     getFleets(companyId: any): Observable<any> {
       
  //this.getCookie();

        return this._http.get(this.appService.fleetUrl+"/truckList/"+companyId, {headers: this.createAuthorizationHeader(), 
            body:""})
        
            .map(this.extractData)
            //.do(data => console.log("Data received: " + JSON.stringify(data)))
             .catch(this.handleError);
     }

     addTruck(newTruckDetails: any): Observable<any> {
        console.log("Inside service:..", newTruckDetails)
        let body = JSON.stringify(newTruckDetails);
        console.log("Inside service json file:..", body)
        let headers = new Headers({ 'Content-Type': 'application/json' });
        headers.append('Authorization', 'Basic ' +
        btoa(this.username+':'+this.password));
    
        let options = new RequestOptions({ headers: headers });

        return this._http.post(this.appService.fleetUrl, body, options)
            .map(this.extractData)

            //.do(data => console.log("Data received: " + JSON.stringify(data)))
            .catch(this.handleError);
    }

    updateTruck(editedTruckDetails: any, fleetId: any): Observable<any> {
        console.log("Inside service updateTruck:..", editedTruckDetails)
        console.log("Inside service updateTruck ID is:..", fleetId)
        let body = JSON.stringify( editedTruckDetails );
        
        let headers = new Headers({ 'Content-Type': 'application/json','Accept': 'application/json' });
         console.log("headers is:..", headers)
         headers.append('Authorization', 'Basic '+
         btoa(this.username+':'+this.password));
        //  headers.append('X-CSRF-Token', this.getCookie())
       /* let updateBody = {
            headers,
            body
        }*/
        let options = new RequestOptions({ headers: headers, withCredentials: true });
         console.log("options is:..", options)
        
         
// let headers = new Headers({ 'Content-Type': 'application/json', 'X-CSRF-TOKEN': this.getToken()});
        return this._http.put(this.appService.fleetUrl + "/" + fleetId, body, options)
            .map(this.extractData)
            .catch(this.handleError);
    }

    deleteTruck(fleetId: any): Observable<any> {
       // let headers = new Headers();
        // this.createAuthorizationHeader(headers);
       let deleteCookie = this.getCookie();
        console.log("deleteCookie", deleteCookie)
        let headers = new Headers({ 'Content-Type': 'application/json','Accept': 'application/json' });
         
        // headers.append('Authorization', 'Basic '+
        // btoa(this.username+':'+this.password));
         // headers.append('X-CSRF-Token', deleteCookie)
          console.log("delete headers is:..", headers)
        return this._http.delete(this.appService.fleetUrl + "/" + fleetId, {/*headers: this.createAuthorizationHeader(),*/
            headers:headers,  
            body:""
    })
             .map(this.extractData)
            /*.map((response: Response) => {
                console.log("response:.. is.." , response.status)
            })
             .do(data => console.log("Delete response received: " + JSON.stringify(data)))*/
            .catch(this.handleError);

    }

    getTruckToEdit(truckId: any): Observable<any> {

        console.log("In service edit truckId:..", truckId);
        return this._http.get(this.appService.fleetUrl + "/" + truckId)
                .map(this.extractData)
                /*.map((response: Response) => {
                    this.extractData(response);
                console.log("response edit truck:.. is.." , response)
            })*/
                .catch(this.handleError);
    }

     public handleError(error: any) {
        console.error("Error: ",error)
        return Observable.throw(error || "Server error");
    }
}