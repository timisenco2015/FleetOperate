import {Component, OnInit, OnChanges} from '@angular/core';
import {DriverSettingsListComponent} from './driverSettingsList/driverSettingsListComponent';
import {DriverSettingsAddComponent} from './driverSettingsAdd/driverSettingsAddComponent';
import {DriverSettingsEditComponent} from './driverSettingsEdit/driverSettingsEditComponent';
import {DriverSettingsSearchBarComponent} from './driverSettingsSearchBar/driverSettingsSearchBarComponent';
import {ConfirmDriverComponent} from './driverSettingsConfirmDriver/confirmDriverComponent';

@Component({
    selector: 'driver-settings',
    templateUrl: 'app/dashboard/features/settings/driverSettings/driverSettingsTemplate.html',
    //directives: [DriverSettingsListComponent, DriverSettingsAddComponent, DriverSettingsEditComponent, DriverSettingsSearchBarComponent]
})

export class DriverSettingsComponent implements OnInit, OnChanges {

    driverListDisplay: boolean = true;
    driverAddDisplay: boolean;
    driverEditDisplay: boolean;
    broadcastDriverID: any;
    sendDriverToEdit: any[];
    driverSearchBarDisplay: boolean;
    driverConfirmDisplay: boolean;

    constructor() {

    }

    ngOnInit() {
        
    }

    ngOnChanges() {
   
    }

    onClickDriverList(){
        this.driverListDisplay = true;
        this.driverAddDisplay = false;
        this.driverEditDisplay = false;
        this.driverConfirmDisplay = false;
    }

    onClickAddDriver() {
        this.driverListDisplay = false;
        this.driverAddDisplay = true;
        this.driverEditDisplay = false;
        this.driverConfirmDisplay = false;
    }

    onDisplayEditForm($event){
        this.driverListDisplay = false;
        this.driverAddDisplay = false;
        this.driverEditDisplay = true;
        this.driverConfirmDisplay = false;

        this.broadcastDriverID = $event.driverId;
        this.sendDriverToEdit = $event.driverDetail;
        console.log(" $event.driversDetails:  ", $event.driverDetail)
    }

    onDisplayDriverList(){
        this.onClickDriverList();
    }

    onClickSearchDriver(){
        this.driverSearchBarDisplay = !this.driverSearchBarDisplay;
    }

    onClickConfirmDriver(){
        this.driverListDisplay = false;
        this.driverAddDisplay = false;
        this.driverEditDisplay = false;
        this.driverConfirmDisplay = true;
    }

}