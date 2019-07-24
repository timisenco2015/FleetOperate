import {Component, OnInit, OnChanges} from '@angular/core';
import {TrailerSettingsListComponent} from './trailerSettingsList/trailerSettingsListComponent';
import {TrailerSettingsAddComponent} from './trailerSettingsAdd/trailerSettingsAddComponent';
import {TrailerSettingsEditComponent} from './trailerSettingsEdit/trailerSettingsEditComponent';
import {TrailerSettingsSearchBarComponent} from './trailerSettingsSearchBar/trailerSettingsSearchBarComponent';

@Component({
    selector: 'trailer-settings',
    templateUrl: 'app/dashboard/features/settings/trailerSettings/trailerSettingsTemplate.html',
    //directives: [TrailerSettingsListComponent, TrailerSettingsAddComponent, TrailerSettingsEditComponent, TrailerSettingsSearchBarComponent]
})

export class TrailerSettingsComponent implements OnInit, OnChanges {

    trailerListDisplay: boolean = true;
    trailerAddDisplay: boolean;
    trailerEditDisplay: boolean;
    broadcastTrailerID: any;
    sendTrailerToEdit: any[];
    trailerSearchBarDisplay: boolean;

    constructor() {

    }

    ngOnInit() {
        
    }

    ngOnChanges() {
   
    }

    onClickTrailerList(){
        this.trailerListDisplay = true;
        this.trailerAddDisplay = false;
        this.trailerEditDisplay = false;
    }

    onClickAddTrailer() {
        this.trailerListDisplay = false;
        this.trailerAddDisplay = true;
        this.trailerEditDisplay = false;
    }

    onDisplayEditForm($event){
        this.trailerListDisplay = false;
        this.trailerAddDisplay = false;
        this.trailerEditDisplay = true;

        this.broadcastTrailerID = $event.trailerId;
        this.sendTrailerToEdit = $event.trailerDetail;
    }

    onDisplayTrailerList(){
        this.onClickTrailerList();
    }

    onClickSearchTrailer(){
        this.trailerSearchBarDisplay = ! this.trailerSearchBarDisplay;
    }

}