import {Component, OnInit, OnChanges, EventEmitter, Output} from '@angular/core';
import {NgStyle} from '@angular/common';
import {FleetService} from '../../../fleet/fleetList/fleetListService';
import {TruckSettingsService} from '../truckSettingsService';
import {ErrorHandlingComponent} from '../../../../../errorHandling/errorHandlingComponent';

@Component({
    selector: 'truck-settings-list',
    templateUrl: 'app/dashboard/features/settings/truckSettings/truckSettingsList/truckSettingsListTemplate.html',
    //directives: [NgStyle, ErrorHandlingComponent]
})

export class TruckSettingsListComponent implements OnInit, OnChanges {

    private trucks: any[];
    private errorMessage: any;
    private deleteTruckInfo: any;
    private deleteResponse: any;
    private isDeleteClicked: boolean = false;
    private httpStatusCode: number;
    @Output() displayEditForm: EventEmitter<any> = new EventEmitter<any>();
    private broadcastErrorCode: number;
    private showError: boolean = false;
    private companyId: any = localStorage.getItem("token_2");

    constructor(private _fleetService: FleetService, private _truckSettingService: TruckSettingsService) {

    }

    ngOnInit() {
        this.getFleets();
    }

    ngOnChanges() {
        
         
    }

    getFleets(){
        this._truckSettingService.getFleets(this.companyId)
            
            .subscribe(
            fleets => {
                this.trucks = fleets.json();
                this.httpStatusCode = fleets.status;
                 console.log(" truckDetails are:  ", this.trucks);
                 console.log(" httpStatusCode is:  ", this.httpStatusCode);
                 if(this.httpStatusCode == 200){
                     this.showError = false;
                 }else{
                     this.broadcastErrorCode = this.httpStatusCode;
                     this.showError = true;
                     if(this.showError = true){
                        window.scrollTo(0,0)
                    }
                 }
            },

            error => {
            this.errorMessage = error;
            if(error.status != null){
                this.broadcastErrorCode = error.status;
                this.showError = true;
                if(this.showError = true){
                     window.scrollTo(0,0)
                }
            }
            console.log("Options request Error: ", error.status)
        })     
    }

    onClickEditTruck(fleetId: any){
        console.log("onClickEditTruck clicked: ", fleetId);
        this._truckSettingService.getTruckToEdit(fleetId)
            .subscribe(
            truck => {
                    console.log("truck to edit: ", truck.json());
                    if(truck.status == 200){
                        this.displayEditForm.emit({truckId: fleetId, truckDetail:truck.json()});
                    }else{
                        this.broadcastErrorCode = truck.status;
                        this.showError = true;
                            if(this.showError = true){
                                window.scrollTo(0,0)
                            }
                    }
                }
            )
        
    }

    

    onClickDelete(fleetId: any){
        this.isDeleteClicked = true;
        for (var i = 0; i < this.trucks.length; i++) {

            var trucks = this.trucks[i];
            // console.log(" fleet summary ID:  ", summaryData.fleetId)
            if (trucks.fleetId == fleetId) {

                this.deleteTruckInfo = trucks;
                console.log(" delete truckDetails is:  ", this.deleteTruckInfo);
                break;

            } else {
                this.deleteTruckInfo = null;
            }
        }
    }

    deleteTruck(fleetId: any){
        this._truckSettingService.deleteTruck(fleetId)
            .subscribe(
                deleteResponse => {
                    this.deleteResponse = deleteResponse
                    if(this.deleteResponse.status == 200){
                        this.getFleets();
                    }else{
                        this.broadcastErrorCode = this.deleteResponse.status;
                        this.showError = true;
                            if(this.showError = true){
                                window.scrollTo(0,0)
                            }
                    }
                },
            error => {
            this.errorMessage = error;
            if(error.status != null){
                this.broadcastErrorCode = error.status;
                this.showError = true;
                if(this.showError = true){
                     window.scrollTo(0,0)
                }
            }
            console.log("Options request Error : ", error.status)
        })

            this.isDeleteClicked = false;
    }

}