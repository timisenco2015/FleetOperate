import {Component, OnInit, OnChanges, EventEmitter, Output} from '@angular/core';
import {NgStyle} from '@angular/common';
import {DriverSettingsService} from '../driverSettingsService';
import {ErrorHandlingComponent} from '../../../../../errorHandling/errorHandlingComponent';

@Component({
    selector: 'driver-settings-list',
    templateUrl: 'app/dashboard/features/settings/driverSettings/driverSettingsList/driverSettingsListTemplate.html',
    //directives: [NgStyle, ErrorHandlingComponent]
})

export class DriverSettingsListComponent implements OnInit, OnChanges {

    private drivers: any[];
    private errorMessage: any;
    private deleteDriverInfo: any;
    private deleteResponse: any;
    private isDeleteClicked: boolean = false;
    @Output() displayEditForm: EventEmitter<any> = new EventEmitter<any>();
    private broadcastErrorCode: number;
    private showError: boolean = false;
    private companyId: any = localStorage.getItem("token_2");

    constructor(private _driverSettingService: DriverSettingsService) {

    }

    ngOnInit() {
        this.getDrivers();
    }

    ngOnChanges() {

        
    }

    getDrivers(){
        this._driverSettingService.getDrivers(this.companyId)
            .subscribe(
            response => {
                this.drivers = response.json();
                console.log(" drivers:  ", this.drivers);
                if(response.status == 200){
                     this.showError = false;
                 }else{
                     this.broadcastErrorCode = response.status;
                     this.showError = true;
                     if(this.showError = true){
                        window.scrollTo(0,0)
                    }
                 }
            },
            error => {
            this.errorMessage = error;
            if(error != null){
                this.broadcastErrorCode = error;
                this.showError = true;
                if(this.showError = true){
                     window.scrollTo(0,0)
                }
            }
            console.log("Options request Error : ", error.status)
        })
    
    }

    onClickEditDriver(driverId: any){
        console.log(" driverId ID:  ", driverId)
        //this.displayEditForm.emit({driverId: driverId, driversList: this.drivers});
       // console.log(" driversList:  ", driversList)

       this._driverSettingService.getDriverToEdit(driverId)
            .subscribe(
            driver => {
                    console.log("driver to edit: ", driver.json());
                    if(driver.status == 200){
                        this.displayEditForm.emit({driverId: driverId, driverDetail:driver.json()});
                    }else{
                        this.broadcastErrorCode = driver.status;
                        this.showError = true;
                            if(this.showError = true){
                                window.scrollTo(0,0)
                            }
                    }
                }
            )
    }

    onClickDelete(driverId: any){
        this.isDeleteClicked = true;
        for (var i = 0; i < this.drivers.length; i++) {

            var drivers = this.drivers[i];
            // console.log(" fleet summary ID:  ", summaryData.fleetId)
            if (drivers.driverId == driverId) {

                this.deleteDriverInfo = drivers;
                console.log(" delete driversDetails is:  ", this.deleteDriverInfo);
                break;

            } else {
                this.deleteDriverInfo = null;
            }
        }
    }

    deleteDriver(driverId: any){
        this._driverSettingService.deleteDriver(driverId)
            .subscribe(
                deleteResponse => {
                    this.deleteResponse = deleteResponse
                    if(this.deleteResponse.status == 200){
                        this.getDrivers();
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