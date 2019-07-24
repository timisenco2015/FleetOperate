import {Component, OnInit, OnChanges, Output, EventEmitter} from '@angular/core';
import {TripPlannerService} from '../../tripPlannerService';
import {Response} from '@angular/http';

@Component({
    selector: 'current-trip-list',
    templateUrl: 'app/dashboard/features/tripPlanner/currentTrip/currentTripList/currentTripListTemplate.html'
})

export class CurrentTripListComponent implements OnInit, OnChanges {

    currentTrips: any[]=[];
    private errorMessage: any;
    showSummary: boolean = false;
    currentTripSummary: any;
    currentTrip: Response;

    constructor(private _tripPlannerService: TripPlannerService){

    }

    ngOnInit() {
        this._tripPlannerService.getCurrentTrips()
            .subscribe(
                (currentTrip: any) => {
                    this.currentTrips = currentTrip.json();
                    console.log("currentTrips are:  ", this.currentTrips);
                },
            error => this.errorMessage = <any>error)
            
    }

    ngOnChanges() {
        
    }

    onSelect(currentTrip: any){

        for (var i = 0; i < this.currentTrips.length; i++) {

            var summaryData = this.currentTrips[i];
            // console.log(" fleet summary ID:  ", summaryData.fleetId)
            if (summaryData.tripId == currentTrip.tripId) {

                this.currentTripSummary = summaryData;
                console.log("current trip summary is:  ", this.currentTripSummary);
                break;

            }
        }
        this.showSummary = true;
    }

    @Output() displayEditTrip: EventEmitter<any> = new EventEmitter<any>();

    editTrip(tripId){
        this.displayEditTrip.emit({tripId: tripId, tripList: this.currentTrips});
    }
}