import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {AppService} from '../../../../app.service';
import { BehaviorSubject } from "rxjs/BehaviorSubject";

@Injectable()
export class FleetDiagnosticService {

    emitLocationData:any;

    constructor(private _http: Http, private appService: AppService) {

    }

    sendLocationDataToMap(locationData:any){
        console.log("location data in service...",locationData)
        let locData = new BehaviorSubject<any>(locationData);
        this.emitLocationData = locData.asObservable();
    }
}