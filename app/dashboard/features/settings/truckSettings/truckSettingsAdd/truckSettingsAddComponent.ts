import {Component, OnInit, OnChanges, EventEmitter, Output} from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import {TruckSettingsService} from '../truckSettingsService';
import {ErrorHandlingComponent} from '../../../../../errorHandling/errorHandlingComponent';

@Component({
    selector: 'truck-settings-add',
    templateUrl: 'app/dashboard/features/settings/truckSettings/truckSettingsAdd/truckSettingsAddTemplate.html',
    //directives: [FORM_DIRECTIVES, ErrorHandlingComponent]
})

export class TruckSettingsAddComponent implements OnInit, OnChanges {

    private addTruckForm: FormGroup;

    private addTruckResponse: any;
    private errorMessage: any;
    private displayTruckAdded: boolean = false;
    private showForm: boolean = true;
    private broadcastErrorCode: number;
    private showError: boolean = false;
    @Output() displayTruckList: EventEmitter<any> = new EventEmitter<any>();

    constructor(private _formBuilder: FormBuilder, 
                private _truckSettingService: TruckSettingsService) {
        this.createAddTruckForm();
    }

    ngOnInit() {
        
    }

    ngOnChanges() {
           
    }

    createAddTruckForm(){
        this.addTruckForm = this._formBuilder.group({
            companyId: this._formBuilder.control(localStorage.getItem("token_2")),
            truckName: this._formBuilder.control(null),
            truckNumber: this._formBuilder.control(null),
            make: this._formBuilder.control(null),
            model: this._formBuilder.control(null),
            fleetClass: this._formBuilder.control(null),
            color: this._formBuilder.control(null),
            height: this._formBuilder.control(null),
            axelWeight: this._formBuilder.control(null),
            tareWeight: this._formBuilder.control(null),
            grossWeight: this._formBuilder.control(null),
            length: this._formBuilder.control(null),
            vin: this._formBuilder.control(null),
            baseLocation: this._formBuilder.control(null),
            notes: this._formBuilder.control(null)
        });
    }

     

    onClickSave(formData: any){
        console.log("The truck details are: ", this.addTruckForm.value)

        this._truckSettingService.addTruck(formData)
            .subscribe(
             serviceResponse => {
                this.addTruckResponse = serviceResponse
                console.log("addTruck response:...", this.addTruckResponse.status)

                if(this.addTruckResponse.status == 200){
                    this.showForm = false;
                    setTimeout(() => {
                        this.createAddTruckForm();
                        this.showForm = true;
                    });
                    //this.addTruckForm.reset();
                    this.displayTruckAdded = true;
                    window.scrollTo(0,0)
                }else{
                    this.broadcastErrorCode = this.addTruckResponse.status;
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
                this.displayTruckAdded = false;
                this.showError = true;
                if(this.showError = true){
                    window.scrollTo(0,0)
                }
            }
                console.log("Add truck error: ", error.status)
            })

            //console.log("addTruck response status:...", this.addTruckResponse.status)
            /*this.displayTruckAdded = true;
            this.showForm = false;
            setTimeout(() => {
    this.createAddTruckForm();
    this.showError = true;
      this.showForm = true;
    });*/

       // this.displayTruckList.emit("displayTruckList");
    }

    onClickCancel(){
        this.displayTruckList.emit("displayTruckList");
    }

}