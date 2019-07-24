import {Component, OnInit, OnChanges, Input} from '@angular/core';
import {TrailerSummaryService} from './trailerSummaryService';

@Component({
    selector: 'trailer-summary',
    templateUrl: 'app/dashboard/features/trailers/trailerSummary/trailerSummaryTemplate.html'
})

export class TrailerSummaryComponent implements OnChanges {

    trailerSummary: any[];
    @Input() selectedTrailerID: any;
    @Input() trailerList: any[];

    // constructor to loop the products in product service file and disply in html
    constructor(private _trailerSummaryService: TrailerSummaryService) {
        console.log()

    }
    // initiation of ngOnInit to bind the service or any external data to template on start
    ngOnChanges(): void {

        for (var i = 0; i < this.trailerList.length; i++) {
            console.log("list: ", this.trailerList.length)
            var summary = this.trailerList[i];

            if (summary.trailerId == this.selectedTrailerID.trailerId) {

                this.trailerSummary = summary;
                // console.log(this.fleetSummary);
                break;

            } else {
                this.trailerSummary = null;
            }
        }
    }
}