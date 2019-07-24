import {Component, OnInit, OnChanges} from '@angular/core';
//import {ROUTER_DIRECTIVES} from '@angular/router-deprecated';
import {FleetService} from './fleetListService';
import {FleetMapComponent} from '../fleetMap/fleetMapComponent';
import {NgClass} from '@angular/common';
import {FleetGeneralComponent} from '../fleetGeneral/fleetGeneralComponent';
import {FleetDocumentsComponent} from '../fleetDocuments/fleetDocumentsComponent';
import {FleetDiagnosticsComponent} from '../fleetDiagnostics/fleetDiagnosticsComponent';
import {FleetDriverInfoComponent} from '../fleetDriverInfo/fleetDriverInfoComponent';
import {FleetFilterPipe} from './fleetListFilter';
import {StatusFilterPipe} from './fleetStatusFilter';
import { FormBuilder, Validators, FormGroup, FormArray, FormControl } from '@angular/forms';

@Component({
    selector: 'fleet-list',
    templateUrl: 'app/dashboard/features/fleet/fleetList/fleetListTemplate.html',
    /*directives: [ROUTER_DIRECTIVES, FleetSummaryComponent, FleetGeneralComponent, FleetDocumentsComponent,
        FleetDiagnosticsComponent, FleetDriverInfoComponent, NgClass],*/
    //pipes: [FleetFilterPipe, StatusFilterPipe]
})


export class FleetListComponent implements OnInit, OnChanges {

    private trucks: any[];
    private showSummary: boolean = false;
    private showGeneral: boolean = true;
    //private showDocuments: boolean = false;
    private showDiagnostics: boolean = false;
    //private showDriverInfo: boolean = false;
    private generalActive: boolean = true;
    //private documentsActive: boolean = false;
    private diagnosticsActive: boolean = false;
    //private driverInfoActive: boolean = false;
    private errorMessage: any;
    private listFilter: any = '';
    private statusOption: any = 'All';
    private sendTruckData: any;
    private totalFleet: any;
    private availableFleet: any;
    private activeToday: boolean;
    private activeYesterday: boolean;
    private diagnosticsInfoForDay:any[];
    private showDiagnosticsInfo: boolean = false;
    private dateSearchForm: FormGroup;
    private truckGeneralInfo: any;
    private date: Date;

    // constructor to loop the products in product service file and disply in html
    constructor(private _fleetService: FleetService, private _formBuilder: FormBuilder) {
        this.createDateSearchForm();
        this.date = new Date();
    }
    // initiation of ngOnInit to bind the service or any external data to template
    ngOnInit() {

        this._fleetService.getFleets()
            .subscribe(
            fleets => {
                this.trucks = fleets.json();
                console.log('list of fleet...1..', this.trucks)
            },
            error => this.errorMessage = <any>error)

    }

    // on update of information, changes to implement
    ngOnChanges() {

        //fleet list filter
       /* console.log("clcik event: ..", this.trucks);
        for (var i = 0; i < this.trucks.length; i++) {
            if (this.trucks != null) {
                return this.totalFleet = this.trucks.length;
            } else if (this.trucks != null) {
                return this.availableFleet = this.trucks.indexOf("status");
            }
        }*/

    }
    // on click of each fleet in list of truck summary
    onSelectEachTruck(truckData: any) {
        console.log("truckData....",truckData);

        this.sendTruckData = truckData;
        this.showSummary = true;

    }
    // on click of general tab
    onClickGeneral() {
        this.showGeneral = true;
        //this.showDocuments = false;
        this.showDiagnostics = false;
        //this.showDriverInfo = false;

        this.generalActive = true;
        //this.documentsActive = false;
        this.diagnosticsActive = false;
        //this.driverInfoActive = false;

    }

    // on click of diagnostics tab
    onClickDiagnostics() {

        this.showGeneral = false;
        //this.showDocuments = false;
        this.showDiagnostics = true;
        //this.showDriverInfo = false;

        this.generalActive = false;
        //this.documentsActive = false;
        this.diagnosticsActive = true;
        //this.driverInfoActive = false;

        this.onClickToday();

    }

    onClickToday(){
        console.log("onClickToday() called..")
        this.activeToday = true;
        this.activeYesterday = false;
        let currentDate = new Date();
        console.log("onClickToday() currentDate..",currentDate.getDate())
        this._fleetService.getFleetdiagnostics()
            .subscribe(response => {
                this.diagnosticsInfoForDay = response.json();
                console.log("diagnosticsInfoForDay in fleetList....",this.diagnosticsInfoForDay)

                this.showDiagnosticsInfo= true;
            })
    }

    onClickYesterday(){
        console.log("onClickYesterday() called..")
        this.activeToday = false;
        this.activeYesterday = true;
        let currentDate = new Date();
        console.log("onClickYesterday() currentDate..",currentDate)
        this._fleetService.getFleetdiagnostics()
            .subscribe(response => {
                this.diagnosticsInfoForDay = response.json();
                console.log("diagnosticsInfoForDay in fleetList....",this.diagnosticsInfoForDay)

                this.showDiagnosticsInfo= true;
            })
    }

    createDateSearchForm(){
        this.dateSearchForm = this._formBuilder.group({
              'fromDate': []
        });
    }

    onClickDateSearch(date: any){
        console.log("onClickDateSearch() called..date..", date.fromDate)
        this.activeToday = false;
        this.activeYesterday = false;
        this._fleetService.getFleetdiagnostics()
            .subscribe(response => {
                this.diagnosticsInfoForDay = response.json();
                console.log("diagnosticsInfoForDay in fleetList....",this.diagnosticsInfoForDay)

                this.showDiagnosticsInfo= true;
            })
    }

  
}