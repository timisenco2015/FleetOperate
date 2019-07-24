import {Component, OnInit, Input, OnChanges} from '@angular/core';
//import {ROUTER_DIRECTIVES} from '@angular/router-deprecated';
import {DriverSummaryService} from './driverSummaryService';

@Component({
    selector: 'driverSummary',
    templateUrl: 'app/dashboard/features/drivers/driverSummary/driverSummaryTemplate.html',
    //directives: [ROUTER_DIRECTIVES]

})

export class DriverSummaryComponent implements OnInit, OnChanges {

    driverSummary: any;
    @Input() selectedDriverID: any;
    @Input() driverList: any[];

    // constructor to loop the products in product service file and disply in html
    constructor(private _driverSummaryService: DriverSummaryService) {


    }
    // render something initially 
    ngOnInit(): void {

        // this.trucksSummary = this._fleetSummaryService.getFleetSummary();
    }
    // render trucksSummary on constant changes
    ngOnChanges(): void {
        // console.log(this.selectedTruckID.iD);

        for (var i = 0; i < this.driverList.length; i++) {

            var summary = this.driverList[i];

            if (summary.driverId == this.selectedDriverID.driverId) {

                this.driverSummary = summary;
                // console.log(this.fleetSummary);
                break;

            } else {
                this.driverSummary = null;
            }
        }
    }
}