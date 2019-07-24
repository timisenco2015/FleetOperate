import {Component, OnInit, OnChanges} from '@angular/core';
//import {ROUTER_DIRECTIVES} from '@angular/router-deprecated';

import {NgClass} from '@angular/common';

import { FormBuilder, Validators, FormGroup, FormArray, FormControl } from '@angular/forms';

@Component({
    selector: 'driver-home',
    templateUrl: 'app/dashboard/features/drivers/driverHomeTemplate.html',
    /*directives: [ROUTER_DIRECTIVES, FleetSummaryComponent, FleetGeneralComponent, FleetDocumentsComponent,
        FleetDiagnosticsComponent, FleetDriverInfoComponent, NgClass],*/
    //pipes: [FleetFilterPipe, StatusFilterPipe]
})


export class DriverHomeComponent implements OnInit, OnChanges {
    private driverListDisplay:boolean;
    private driverAddDisplay:boolean;
   
     private broadcastTruckID: any;
     private sendTruckToEdit: any[];
    
    ngOnChanges()
    {

    }
    ngOnInit()
    {
        this.driverListDisplay=true;
        this.driverAddDisplay=false;
         
        
    }
onClickDriverList(){
        this.driverListDisplay = true;
        this.driverAddDisplay = false;
       
     
    }

    onClickAddDriver() {
       
        this.driverListDisplay = false;
        this.driverAddDisplay = true;
       
    }

      onClickEditDriver() {
         
         this.driverListDisplay = false;
        this.driverAddDisplay = false;
      
        
    }

   /* onDisplayEditForm($event){
        this.truckListDisplay = false;
        this.truckAddDisplay = false;
        this.truckEditDisplay = true;

       // this.broadcastTruckID = $event.truckId;
      //  this.sendTruckToEdit = $event.truckDetail;
    }
*/
    onDisplayTruckList(){
        this.onClickDriverList();
        
        //this.reloadTruckList.emit("reload truck list");
    }

 

}