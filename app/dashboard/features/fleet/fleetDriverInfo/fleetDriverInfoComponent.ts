import {Component, Input, OnChanges} from '@angular/core';
//import {ROUTER_DIRECTIVES} from '@angular/router-deprecated';

@Component({
    selector: 'fleet-driverInfo',
    templateUrl: 'app/dashboard/features/fleet/fleetDriverInfo/fleetDriverInfoTemplate.html',
    //directives: [ROUTER_DIRECTIVES]
})

export class FleetDriverInfoComponent implements OnChanges {

    @Input() selectedTruckID: any;
    fleetDriverInfo: any;
    @Input() truckList: any[];

    // constructor to loop the products in product service file and disply in html
    constructor() {


    }

    // render fleetDriverInfo on constant changes
    ngOnChanges(): void {
        //console.log(this.selectedTruckID.iD);

        for (var i = 0; i < this.truckList.length; i++) {

            var summaryData = this.truckList[i];
            // console.log(" fleet summary ID:  ", summaryData.fleetId)
            if (summaryData.fleetId == this.selectedTruckID.fleetId) {

                this.fleetDriverInfo = summaryData;
                console.log("fleet summary is:  ", this.fleetDriverInfo);
                break;

            } else {
                this.fleetDriverInfo = null;
            }
        }
    }
}