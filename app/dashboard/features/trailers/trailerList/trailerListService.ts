import {Injectable, OnInit} from '@angular/core';
import {Http, Response} from '@angular/http';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class TrailerService implements OnInit {

    private url = 'app/dashboard/features/trailers/trailerDataBase.json';

    constructor(private _http: Http) {

    }

    ngOnInit() {

    }

    private extractData(response: Response) {
        let requestResponse = response;

        return requestResponse || {};
    }
    
    public getTrailer(): Observable<any> {
        console.log('getTrailer');
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


