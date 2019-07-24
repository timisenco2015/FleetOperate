import {Injectable} from '@angular/core';
import {Http, Response, Headers, RequestOptions} from '@angular/http';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class DocumentService {

    private url1 = 'http://localhost:8080/DocumentService/rest/documentManagement';
    private url2 = 'http://localhost:8080/DocumentService/rest/documentManagement/add';

    constructor(private _http: Http) {

    }

    private extractData(response: Response) {
        let body = response.json();

        return body || {};
    }

    getDocuments(): Observable<any[]> {
        return this._http.get(this.url1)
            .map(this.extractData)
            //.do(data => console.log("Data received: " + JSON.stringify(data)))
            .catch(this.handleError);

    }

    sendDocuments(documents: any): Observable<any[]> {
        console.log("Inside service:..", documents)
        let body = JSON.stringify({ documents });
        console.log("Inside service json file:..", body)
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        return this._http.post(this.url2, body, options)
            //.map(this.extractData)

            .do(data => console.log("Data received: " + JSON.stringify(data)))
            .catch(this.handleError);
    }

    updateDocument(document: any, documentId: any): Observable<any[]> {
        console.log("Inside service updateDocument:..", document)
        console.log("Inside service updateDocument ID is:..", documentId)
        let body = JSON.stringify({ document });
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        return this._http.put(this.url1 + "/" + documentId, body, options)
            .catch(this.handleError);
    }

    deleteDocuments(documentId: any): Observable<any[]> {
        return this._http.delete(this.url1 + "/" + documentId)
            // .map(this.extractData)
            /*.map((response: Response) => {
                console.log("response:.. is.." , response.status)
            })
             .do(data => console.log("Delete response received: " + JSON.stringify(data)))*/
            .catch(this.handleError);

    }

    private handleError(error: Response) {
        console.error("error:..", error)
        return Observable.throw(error.json().error || "Server error");
    }
}