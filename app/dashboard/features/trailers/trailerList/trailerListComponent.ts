import {Component, OnInit, OnChanges} from '@angular/core';
//import {ROUTER_DIRECTIVES} from '@angular/router-deprecated';
import {TrailerService} from './trailerListService';
import {TrailerSummaryComponent} from '../trailerSummary/trailerSummaryComponent';
import {TrailerMapComponent} from '../trailerMap/trailerMapComponent';

@Component({
    selector: 'trailer-list',
    templateUrl: 'app/dashboard/features/trailers/trailerList/trailerListTemplate.html',
    //directives: [ROUTER_DIRECTIVES, TrailerSummaryComponent, TrailerMapComponent]
})

export class TrailerListComponent implements OnInit, OnChanges {

    trailers: any[];
    errorMessage: any;
    broadcastDriverID: any;
    showSummary: boolean = false;
    sendTrailerList: any[];

    // constructor to loop the products in product service file and disply in html
    constructor(private _trailerService: TrailerService) {
        console.log()
    }
    // initiation of ngOnInit to bind the service or any external data to template on start
    ngOnInit(): void {
        this._trailerService.getTrailer()
            .subscribe(
            trailer => this.trailers = trailer.json(),
            error => this.errorMessage = <any>error)

    }
    // on update of info changes to implement
    ngOnChanges(): void {

        /* setInterval(() =>  this._trailerService.getTrailer()
                               .subscribe(
                                   data => this.trailers = data,
                                   error => this.errorMessage = <any>error), 3000);*/

    }

    // on click of each trailer in the list
    onSelect(trailerID: any) {
        //console.log(truckID);
        this.broadcastDriverID = trailerID;
        this.sendTrailerList = this.trailers;
        this.showSummary = true;

    }

}