import {Injectable} from '@angular/core';
import {Http, Response, Headers, RequestOptions} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {AppService} from '../../../../app.service';

@Injectable()
export class TrailerSettingsService {

    private url1 = 'app/dashboard/features/trailers/trailerDataBase.json';
    private url = 'http://localhost:8082/fleetops/trailer';

    constructor(private _http: Http, private appService: AppService) {

    }

    private extractData(response: Response) {
        let serverResponse = response;

        return serverResponse || {};
    }

    username: any = "admin"
    password: any = "admin"

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

     getTrailers(companyId: any): Observable<any> {
        return this._http.get(this.appService.trailerUrl+"/trailerList/"+companyId, {headers: this.createAuthorizationHeader()
            , body:""})
            .map(this.extractData)
            //.do(data => console.log("Data received: " + JSON.stringify(data)))
            .catch(this.handleError);
     }

     addTrailer(newTrailerDetails: any): Observable<any> {
        console.log("Inside service:..", newTrailerDetails)
        let body = JSON.stringify( newTrailerDetails );
        console.log("Inside service json file:..", body)
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        return this._http.post(this.appService.trailerUrl, body, options)
            .map(this.extractData)

            //.do(data => console.log("Data received: " + JSON.stringify(data)))
            .catch(this.handleError);
    }

    updateTrailer(editedTrailerDetails: any, trailerId: any): Observable<any> {
        console.log("Inside service updateTrailer:..", editedTrailerDetails)
        console.log("Inside service updateTrailer ID is:..", trailerId)
        let body = JSON.stringify( editedTrailerDetails );
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        return this._http.put(this.appService.trailerUrl + "/" + trailerId, body, options)
            .map(this.extractData)
            .catch(this.handleError);
    }

    deleteTrailer(trailerId: any): Observable<any> {
        return this._http.delete(this.appService.trailerUrl + "/" + trailerId)
             .map(this.extractData)
            /*.map((response: Response) => {
                console.log("response:.. is.." , response.status)
            })
             .do(data => console.log("Delete response received: " + JSON.stringify(data)))*/
            .catch(this.handleError);

    }

    getTrailerToEdit(trailerId: any): Observable<any>{

        console.log("In service edit trailerId:..", trailerId);
        return this._http.get(this.appService.trailerUrl + "/" + trailerId)
                .map(this.extractData)
                /*.map((response: Response) => {
                    this.extractData(response);
                console.log("response edit trailer:.. is.." , response)
            })*/
                .catch(this.handleError);
    }

     private handleError(error: Response) {
        console.error(error)
        return Observable.throw(error.json().error || "Server error");
    }
}