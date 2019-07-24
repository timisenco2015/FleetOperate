import {Component, Input, OnChanges} from '@angular/core';
import {FleetMapComponent} from '../fleetMap/fleetMapComponent';
//import {ROUTER_DIRECTIVES} from '@angular/router-deprecated';
import {NgClass, Location} from '@angular/common';

@Component({
    selector: 'fleet-diagnostics',
    templateUrl: 'app/dashboard/features/fleet/fleetDiagnostics/fleetDiagnosticsTemplate.html',
    //directives: [ROUTER_DIRECTIVES]
})

export class FleetDiagnosticsComponent implements OnChanges {

    private fleetDiagnostics: any[];
    @Input() diagnosticsInfo: any[];
    private sliderPosition: any = 0;
    private eachDiag: any;
    private firstObjectRange: any;
    private lastObjectRange:any;
    private broadcastTruckLoc: any;
    private showMap: boolean = false;
    private diagTime:any;

    // constructor to loop the products in product service file and disply in html
    constructor() {

    }

    // render fleetDiagnostics on constant changes in truck summary list
    ngOnChanges(): void {
         console.log("diagnosticsInfo....",this.diagnosticsInfo);

        this.fleetDiagnostics = this.diagnosticsInfo;
        console.log("this.fleetDiagnostics :  ", this.fleetDiagnostics);
        for(var i = 0; i < this.fleetDiagnostics.length; i++){

                this.eachDiag = this.fleetDiagnostics[0];
                //console.log("eachDiag :  ", this.eachDiag);
                this.diagTime = this.eachDiag.eventTime
            }

        this.firstObjectRange = 1
        this.lastObjectRange = this.fleetDiagnostics.length

        this.showMap = false;
        setTimeout(()=>{    //<<<---    using ()=> syntax
            this.showMap = true;
        },500);
        this.broadcastTruckLoc = this.fleetDiagnostics[0];
    }

    onSliderMove(event:any, sliderPosition: any, diags:any){
        console.log("on slider move..diag...",diags)
        console.log("on slider move sliderPosition...",sliderPosition)
        
        for(var i = 0; i < diags.length; i++){
            //console.log("diags :  ", diags);
            var diag = diags[i];
            console.log("diag :  ", diag);
            if(sliderPosition == diag.id){
                this.eachDiag = diag;
                console.log("eachDiag :  ", diag);

                this.diagTime = diag.eventTime;
            }
                
        }
        this.showMap = false;
        setTimeout(()=>{    //<<<---    using ()=> syntax
            this.showMap = true;
        },500);
        
        this.broadcastTruckLoc = this.eachDiag;
    }

}