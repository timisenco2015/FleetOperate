import {Component, OnInit, Input, OnChanges} from '@angular/core';
//import {ROUTER_DIRECTIVES} from '@angular/router-deprecated';
import {FleetMapComponent} from '../fleetMap/fleetMapComponent';

@Component({
    selector: 'fleet-general',
    templateUrl: 'app/dashboard/features/fleet/fleetGeneral/fleetGeneralTemplate.html',
    //directives: [ROUTER_DIRECTIVES]
})

export class FleetGeneralComponent {

    private fleetGeneral: any;
    @Input() truckData: any[];
    private showMap: boolean = false;
    private broadcastTruckLoc: any;
    private fleetLocation:any;

    // constructor to loop the products in product service file and disply in html
    constructor() {


    }
    // render something initially 
    ngOnInit(): void {

    }
    // render fleet general info on constant changes
    ngOnChanges(): void {

        console.log("truck data in general comp. is...", this.truckData)
        
        this.fleetGeneral = this.truckData;

        this.fleetLocation = {latitude: this.fleetGeneral.currentLocation.latitude,
                             longitude: this.fleetGeneral.currentLocation.longitude}

        this.showMap = false;
        setTimeout(()=>{   
            this.showMap = true;
        },500);
        this.broadcastTruckLoc = this.fleetLocation;

    }

}