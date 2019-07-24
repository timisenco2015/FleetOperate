import {Component, OnInit, OnChanges, Output, EventEmitter} from '@angular/core';
import {TruckSettingsListComponent} from './truckSettingsList/truckSettingsListComponent';
import {TruckSettingsAddComponent} from './truckSettingsAdd/truckSettingsAddComponent';
import {TruckSettingsEditComponent} from './truckSettingsEdit/truckSettingsEditComponent';
import {TruckSettingsSearchBarComponent} from './truckSettingsSearchBar/truckSettingsSearchBarComponent';

@Component({
    selector: 'truck-settings',
    templateUrl: 'app/dashboard/features/settings/truckSettings/truckSettingsTemplate.html',
    //directives: [TruckSettingsListComponent, TruckSettingsAddComponent, TruckSettingsEditComponent, TruckSettingsSearchBarComponent]
})

export class TruckSettingsComponent implements OnInit, OnChanges {

    truckListDisplay: boolean;
    truckAddDisplay: boolean;
    truckEditDisplay: boolean;
    broadcastTruckID: any;
    sendTruckToEdit: any[];
    truckSearchBarDisplay: boolean;

    constructor() {

    }

    ngOnInit() {
        this.onClickTruckList();
    }

    ngOnChanges() {
   
    }

    onClickTruckList(){
        this.truckListDisplay = true;
        this.truckAddDisplay = false;
        this.truckEditDisplay = false;
    }

    onClickAddTruck() {
        this.truckListDisplay = false;
        this.truckAddDisplay = true;
        this.truckEditDisplay = false;
    }

    onDisplayEditForm($event){
        this.truckListDisplay = false;
        this.truckAddDisplay = false;
        this.truckEditDisplay = true;

        this.broadcastTruckID = $event.truckId;
        this.sendTruckToEdit = $event.truckDetail;
    }

    onDisplayTruckList(){
        this.onClickTruckList();
        //this.reloadTruckList.emit("reload truck list");
    }

    onClickSearchTruck(){
        this.truckSearchBarDisplay = ! this.truckSearchBarDisplay;
    }

}