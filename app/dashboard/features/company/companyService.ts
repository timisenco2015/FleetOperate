import {Injectable} from '@angular/core';
import {Http, Response, Headers, RequestOptions} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {AppService} from '../../../app.service';

@Injectable()
export class CompanyService {

    private url = 'app/dashboard/features/company/companyFullInfo.json';
   
    constructor(private _http: Http, private appService: AppService) {

    }

    private extractData(response: Response) {
        let serverResponse = response;
        
        return serverResponse || {};
    }

    getCompanyDetails(): Observable<any> {
        
                  
                return this._http.get(this.appService.companyUrl + "companyDetails/" + sessionStorage.getItem("cId") + "/" + sessionStorage.getItem("aId"))
                    //.map(this.extractData)
                    .map(response => {
                        console.log("getCompanyAdminInfo response...", response.json());
        
                        return response
                    })
                    //.do(data => console.log("Data received: " + JSON.stringify(data)))
                    .catch(this.handleError);
    }
    
    getBillingInfo(): Observable<any>{

        return this._http.get(this.url)
            .map(this.extractData)
            //.do(data => console.log("Data received: " + JSON.stringify(data)))
            .catch(this.handleError);
    }

    private handleError(error: Response) {
        console.error(error)
        return Observable.throw(error.json().error || "Server error");
    }
}