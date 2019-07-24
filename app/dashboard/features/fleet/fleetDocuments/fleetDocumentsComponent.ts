import {Component, Input, OnChanges} from '@angular/core';
//import {ROUTER_DIRECTIVES} from '@angular/router-deprecated';

@Component({
    selector: 'fleet-documents',
    templateUrl: 'app/dashboard/features/fleet/fleetDocuments/fleetDocumentsTemplate.html',
    //directives: [ROUTER_DIRECTIVES]
})

export class FleetDocumentsComponent implements OnChanges {

    @Input() selectedTruckID: any;

    fleetDocuments: any;
    @Input() truckList: any[];

    // constructor to loop the products in product service file and disply in html
    constructor() {


    }

    // render something on constant changes
    ngOnChanges(): void {
        // console.log(this.selectedTruckID.iD);

        for (var i = 0; i < this.truckList.length; i++) {

            var summaryData = this.truckList[i];
            // console.log(" fleet summary ID:  ", summaryData.fleetId)
            if (summaryData.fleetId == this.selectedTruckID.fleetId) {

                this.fleetDocuments = summaryData;
                console.log("fleet summary is:  ", this.fleetDocuments);
                break;

            } else {
                this.fleetDocuments = null;
            }
        }
    }
}