import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class AppService {

    //private hostName: string = "http://localhost:8083/"
    //private hostName: string = "http://AppTest-FleetOpsAPI.us-east-1.elasticbeanstalk.com/"
    private hostName: string = "http://QA-Test-JFS-PlatformService.us-east-1.elasticbeanstalk.com/"

    // Login URL
    public loginUrl: string = this.hostName+"fleetops/login"

    // Fleet URL
    public fleetUrl: string = this.hostName+"fleetops/truck" 

    // Trailer URL
    public trailerUrl: string = this.hostName+"fleetops/trailer"

    // Driver URL
    public driverUrl: string = this.hostName+"fleetops/driver"

    // TripPlanner URL
    public tripPlannerUrl: string = this.hostName+"fleetops/tripPlanner"

    // Control Center URL
    public controlCenterUrl: string = this.hostName+"fleetops/controlCenter"

    // Company URL
    public companyUrl: string = this.hostName+"fleetops/"

    // List of Features
    public listOfFeaturesUrl: string = this.hostName+"fleetops/listOfFeatures"

    // Confirm User (Get app client info from DB)
    public appClientInfo: string = this.hostName+"fleetops/appClientInfo"

}