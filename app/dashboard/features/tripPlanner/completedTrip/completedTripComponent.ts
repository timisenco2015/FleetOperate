import {Component, OnInit, OnChanges} from '@angular/core';
import {TripPlannerService} from '../tripPlannerService'

@Component({
    selector: 'complete-trip',
    templateUrl: 'app/dashboard/features/tripPlanner/completedTrip/completedTripTemplate.html'
})

export class CompleteTripComponent implements OnInit, OnChanges {

    completeTrips: any[];
    private errorMessage: any;
    showSummary: boolean = false;
    completeTripSummary: any;

    constructor(private _tripPlannerService: TripPlannerService){

    }

    ngOnInit() {
        this._tripPlannerService.getCompletedTrips()
            .subscribe(
                currentTrip => {
                    this.completeTrips = currentTrip.json();
                },
            error => this.errorMessage = <any>error)
            
    }

    ngOnChanges() {
        
    }

    onSelect(currentTrip: any){


        for (var i = 0; i < this.completeTrips.length; i++) {

            var summaryData = this.completeTrips[i];
            // console.log(" fleet summary ID:  ", summaryData.fleetId)
            if (summaryData.tripId == currentTrip.tripId) {

                this.completeTripSummary = summaryData;
                console.log("completeTripSummary is:  ", this.completeTripSummary);
                break;

            }
        }

        this.showSummary = true;
    }
}