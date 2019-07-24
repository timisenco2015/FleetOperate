import {Component, OnInit, OnChanges, EventEmitter, Output} from '@angular/core';
import {NgStyle} from '@angular/common';
import {TrailerSettingsService} from '../trailerSettingsService';
import {ErrorHandlingComponent} from '../../../../../errorHandling/errorHandlingComponent';

@Component({
    selector: 'trailer-settings-list',
    templateUrl: 'app/dashboard/features/settings/trailerSettings/trailerSettingsList/trailerSettingsListTemplate.html',
    //directives: [NgStyle, ErrorHandlingComponent]
})

export class TrailerSettingsListComponent implements OnInit, OnChanges {

    private trailers: any[];
    private errorMessage: any;
    private deleteTrailerInfo: any;
    private deleteResponse: any;
    private isDeleteClicked: boolean = false;
    @Output() displayEditForm: EventEmitter<any> = new EventEmitter<any>();
    private broadcastErrorCode: number;
    private showError: boolean = false;
    private companyId: any = localStorage.getItem("token_2");

    constructor(private _trailerSettingService: TrailerSettingsService) {

    }

    ngOnInit() {
        this.getTrailers();
    }

    ngOnChanges() {

        
    }

    getTrailers(){
        this._trailerSettingService.getTrailers(this.companyId)
            .subscribe(
            response => {
                this.trailers = response.json();
                console.log(" trailers:  ", this.trailers);
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

    onClickEditTrailer(trailerId: any){
        console.log(" trailer ID sent to edit:  ", trailerId)
       // this.displayEditForm.emit({trailerId: trailerId, trailersList: this.trailers});
        this._trailerSettingService.getTrailerToEdit(trailerId)
            .subscribe(
            trailer => {
                    console.log("trailer to edit: ", trailer.json());
                    if(trailer.status == 200){
                        this.displayEditForm.emit({trailerId: trailerId, trailerDetail:trailer.json()});
                    }else{
                        this.broadcastErrorCode = trailer.status;
                        this.showError = true;
                            if(this.showError = true){
                                window.scrollTo(0,0)
                            }
                    }
                }
            )
    }

    onClickDelete(trailerId: any){
        this.isDeleteClicked = true;
        for (var i = 0; i < this.trailers.length; i++) {

            var trailers = this.trailers[i];
            // console.log(" fleet summary ID:  ", summaryData.fleetId)
            if (trailers.fleetId == trailerId) {

                this.deleteTrailerInfo = trailers;
                console.log(" delete trailersDetails is:  ", this.deleteTrailerInfo);
                break;

            } else {
                this.deleteTrailerInfo = null;
            }
        }
    }

    deleteTrailer(trailerId: any){
        this._trailerSettingService.deleteTrailer(trailerId)
            .subscribe(
                deleteResponse => {
                    this.deleteResponse = deleteResponse
                    if(this.deleteResponse.status == 200){
                        this.getTrailers();
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