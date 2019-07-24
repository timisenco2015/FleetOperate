import {Component, OnInit, OnChanges, Input, EventEmitter, Output} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import {TrailerSettingsService} from '../trailerSettingsService';
import {ErrorHandlingComponent} from '../../../../../errorHandling/errorHandlingComponent';

@Component({
    selector: 'trailer-settings-edit',
    templateUrl: 'app/dashboard/features/settings/trailerSettings/trailerSettingsEdit/trailerSettingsEditTemplate.html',
    //directives: [FORM_DIRECTIVES, ErrorHandlingComponent]
})

export class TrailerSettingsEditComponent implements OnInit, OnChanges {

    private editTrailerForm: FormGroup;
    @Input() selectedTrailerIdToEdit: any;
    @Input() trailerToEdit: any[];
    private trailerDetails: any[];
    private updateResponse: any;
    private errorMessage: any; 
    @Output() displayTrailerList: EventEmitter<any> = new EventEmitter<any>();
    private broadcastErrorCode: number;
    private showError: boolean = false;

    constructor(private _formBuilder: FormBuilder, private _trailerSettingsService: TrailerSettingsService) {
        
        this.createForm();
    }

    ngOnInit() {
        console.log(" trailer List received:  ", this.trailerToEdit)
        console.log(" trailer ID received:  ", this.selectedTrailerIdToEdit)
       /* for (var i = 0; i < this.trailerList.length; i++) {

            var editData = this.trailerList[i];
             console.log(" trailer ID need to be edited:  ", editData.fleetId)
            if (editData.fleetId == this.selectedTrailerID) {

                this.trailerDetails = editData;
                console.log(" selected trailerDetails is:  ", this.trailerDetails);
                break;

            } else {
                this.trailerDetails = null;
            }
        }*/
        this.trailerDetails = this.trailerToEdit;
    }

    ngOnChanges() {

        
    }

    createForm(){
        this.editTrailerForm = this._formBuilder.group({
            companyId: this._formBuilder.control(localStorage.getItem("token_2")),
            fleetId: this._formBuilder.control(null),
            trailerName: this._formBuilder.control(null),
            trailerNumber: this._formBuilder.control(null),
            make: this._formBuilder.control(null),
            model: this._formBuilder.control(null),
            color: this._formBuilder.control(null),
            maxLoad: this._formBuilder.control(null),
            height: this._formBuilder.control(null),
            length: this._formBuilder.control(null),
            licenseNumber: this._formBuilder.control(null),
            licenseExpiry: this._formBuilder.control(null),
            baseLocation: this._formBuilder.control(null),
            distanceTraveled: this._formBuilder.control(null),
            registrationCompany: this._formBuilder.control(null),
            notes: this._formBuilder.control(null)
        });
    }

    onClickSave(formData: any){
        console.log("The edited trailer details are: ", formData)
        this._trailerSettingsService.updateTrailer(formData, this.selectedTrailerIdToEdit)
            .subscribe(
            updateResponse => {
                this.updateResponse = updateResponse
                console.log("updateResponse :...", this.updateResponse.status)
                if(this.updateResponse.status == 200){
                     this.displayTrailerList.emit("displayTruckList");
                }else{
                    this.broadcastErrorCode = this.updateResponse.status;
                    this.showError = true;
                     if(this.showError = true){
                        window.scrollTo(0,0)
                    }
                }
            },
            error => {this.errorMessage = error;
                        if(error.status != null){
                            this.broadcastErrorCode = error.status;
                            this.showError = true;
                                if(this.showError = true){
                                    window.scrollTo(0,0)
                                }
                        }    
                    })

       // this.displayTrailerList.emit("displaytrailerist");
        
    }

    onClickCancel(){
        this.displayTrailerList.emit("displayTruckList");
    }

}