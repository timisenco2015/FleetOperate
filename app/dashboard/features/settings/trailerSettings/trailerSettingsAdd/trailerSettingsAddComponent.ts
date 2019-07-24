import {Component, OnInit, OnChanges, EventEmitter, Output} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import {TrailerSettingsService} from '../trailerSettingsService';
import {ErrorHandlingComponent} from '../../../../../errorHandling/errorHandlingComponent';

@Component({
    selector: 'trailer-settings-add',
    templateUrl: 'app/dashboard/features/settings/trailerSettings/trailerSettingsAdd/trailerSettingsAddTemplate.html',
    //directives: [FORM_DIRECTIVES, ErrorHandlingComponent]
})

export class TrailerSettingsAddComponent implements OnInit, OnChanges {

    private addTrailerForm: FormGroup;
    private addResponse: any;
    private errorMessage: any;
    private displayTrailerAdded: boolean = false;
    private broadcastErrorCode: number;
    private showError: boolean = false;
    private showForm: boolean = true;
    @Output() displayTrailerList: EventEmitter<any> = new EventEmitter<any>();

    constructor(private _formBuilder: FormBuilder, 
                private _trailerSettingsService: TrailerSettingsService) {
        this.createAddTrailerForm();
    }

    ngOnInit() {
        
    }

    ngOnChanges() {

        
    }

   createAddTrailerForm(){
       this.addTrailerForm = this._formBuilder.group({
            companyId: this._formBuilder.control(localStorage.getItem("token_2")),
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
        console.log("The trailer details are: ", formData)

        this._trailerSettingsService.addTrailer(formData)
            .subscribe(
             serviceResponse => {
                this.addResponse = serviceResponse
                console.log("add trailer response:...", this.addResponse)

                 if(this.addResponse.status == 200){
                    this.showForm = false;
                    setTimeout(() => {
                        this.createAddTrailerForm();
                        this.showForm = true;
                    });
                    //this.addTruckForm.reset();
                    this.displayTrailerAdded = true;
                    window.scrollTo(0,0)
                }else{
                    this.broadcastErrorCode = this.addResponse.status;
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
                this.displayTrailerAdded = false;
                this.showError = true;
                if(this.showError = true){
                    window.scrollTo(0,0)
                }
            }
                console.log("Add truck error: ", error.status)
            })

        //this.displayTrailerList.emit("displayTrailerList");
    }

    onClickCancel(){
        this.displayTrailerList.emit("displayTruckList");
    }

}