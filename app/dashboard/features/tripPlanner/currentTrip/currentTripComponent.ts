import {Component, OnInit, OnChanges} from '@angular/core';
import {CurrentTripListComponent} from './currentTripList/currentTripListComponent';
import {EditCurrentTripComponent} from './editCurrentTrip/editCurrentTripComponent';

@Component({
    selector: 'current-trip',
    templateUrl: 'app/dashboard/features/tripPlanner/currentTrip/currentTripTemplate.html'
})

export class CurrentTripComponent implements OnInit, OnChanges {

    private showCurrentTripList: boolean;
    private showCurrentTripEdit: boolean;
    private showAddConsignmentForCurrentTrip: boolean;
    private broadcastTripID: any;
    private sendTripList: any[];

    constructor(){

    }

    ngOnInit() {
         this.displayCurrentTripList();   
    }

    ngOnChanges() {
        this.displayCurrentTripList();
    }

    displayCurrentTripList(){
        this.showCurrentTripList = true;
        this.showCurrentTripEdit = false;
        this.showAddConsignmentForCurrentTrip = false;
    }

    onDisplayEditTrip($event){
        this.showCurrentTripList = false;
        this.showCurrentTripEdit = true;
        this.showAddConsignmentForCurrentTrip = false;

        this.broadcastTripID = $event.tripId;
        this.sendTripList = $event.tripList;
    }

    displayAddConsignmnet(){
        this.showCurrentTripList = false;
        this.showCurrentTripEdit = false;
        this.showAddConsignmentForCurrentTrip = true;
    }

    
}