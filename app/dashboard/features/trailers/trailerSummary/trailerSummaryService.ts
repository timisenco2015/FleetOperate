import {Injectable, OnInit} from '@angular/core';
import {Http, Response} from '@angular/http';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class TrailerSummaryService implements OnInit {

    private url = 'app/dashboard/features/trailers/trailerDataBase.json';

    constructor(private _http: Http) {

    }

    ngOnInit() {

    }

    public getTrailerSummary(): Observable<any[]> {
        console.log('getTrailerummary');
        return this._http.get(this.url)
            .map((response: Response) => <any[]>response.json())
            //.do(data => console.log("Data received: " + JSON.stringify(data)))
            .catch(this.handleError);
    }

    private handleError(error: Response) {
        console.error(error)
        return Observable.throw(error.json().error || "Server error");
    }

}
