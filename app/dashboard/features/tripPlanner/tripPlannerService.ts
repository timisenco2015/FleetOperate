import {Injectable} from '@angular/core';
import {Http, Response, Headers, RequestOptions} from '@angular/http';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class TripPlannerService {

    private url1 = 'app/dashboard/features/tripPlanner/tripPlannerJSON.json';
    private url2 = 'http://localhost:8080/DocumentService/rest/documentManagement/add';
    private urlPost = 'http://localhost:8082/fleetops/tripPlanner';

    progress: any;
    progressObserver: any;
    addConsignmentResponse: any;

    constructor(private _http: Http) {
        /*this.progress = Observable.create(observer => {
            this.progressObserver = observer
        }).share();*/
    }

    private extractData(response: Response) {
        let serverResponse = response;
        console.log("serverResponse:..", serverResponse)
        return serverResponse || {};
    }

     getCurrentTrips(): Observable<any> {
        return this._http.get(this.urlPost + "/getCurrentTrips")
            .map(this.extractData)
            //.do(data => console.log("Data received: " + JSON.stringify(data)))
            .catch(this.handleError);
     }

     getCompletedTrips(): Observable<any> {
        return this._http.get(this.url1)
            .map(this.extractData)
            //.do(data => console.log("Data received: " + JSON.stringify(data)))
            .catch(this.handleError);
     }

     createTrip(planTripDetails: any): Observable<any[]> {
        console.log("Inside service:..", planTripDetails)
        let body = JSON.stringify( planTripDetails );
        console.log("Inside service json file:..", body)
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        return this._http.post(this.urlPost, body, options)
            .map(this.extractData)
            .do(data => console.log("Data received: " + JSON.stringify(data)))
            .catch(this.handleError);
    }

    username: any = "admin"
    password: any = "admin"

    addConsignment(consignmentDetails: any, consignmnetDocument: File[]){
        return Observable.create(observer =>{
            let formData: FormData = new FormData(),
            xhr: XMLHttpRequest = new XMLHttpRequest();
            console.log("Inside service the consignmentDetails are:..", consignmentDetails)
            console.log("Inside service file is:..", consignmnetDocument)
            for (let i = 0; i < consignmnetDocument.length; i++) {
                 formData.append("file", consignmnetDocument[i] );
             }
            
            let data = JSON.stringify(consignmentDetails);
           /* formData.append('Authorization', 'Basic '+window.btoa(this.username+':'+this.password));
            formData.append('Content-Type','application/json');
            formData.append('Accept', 'application/json');*/
            formData.append("consignmentDetails",data);
            formData.append('Content-Type', "multipart/form-data");
            xhr.onreadystatechange = () => {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    console.log("response in service:..", xhr.response);
                    this.addConsignmentResponse = xhr.response;
                    observer.next(this.addConsignmentResponse);
                    observer.complete();
                } else {
                    observer.error(xhr.response);
                }
            }
        };

        /*xhr.upload.onprogress = (event) => {
            this.progress = Math.round(event.loaded / event.total * 100);

            this.progressObserver.next(this.progress);
        };*/

        xhr.open('POST', this.urlPost+"/consignments", true);
        xhr.send(formData);
        })
    }

    updateTrip(editedTripDetails: any, tripId: any): Observable<any[]> {
        console.log("Inside service updateDriver:..", editedTripDetails)
        console.log("Inside service updateDriverr ID is:..", tripId)
        let body = JSON.stringify({ editedTripDetails });
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        return this._http.put(this.url1 + "/" + tripId, body, options)
            .catch(this.handleError);
    }

    deleteTrip(tripId: any): Observable<any[]> {
        return this._http.delete(this.url1 + "/" + tripId)
            // .map(this.extractData)
            /*.map((response: Response) => {
                console.log("response:.. is.." , response.status)
            })
             .do(data => console.log("Delete response received: " + JSON.stringify(data)))*/
            .catch(this.handleError);

    }

     private handleError(error: Response) {
        console.error("error:..",error)
        return Observable.throw(error || "Server error");
    }
}