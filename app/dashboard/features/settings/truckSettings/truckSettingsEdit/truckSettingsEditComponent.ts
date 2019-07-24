import {Component, OnInit, OnChanges, Input, EventEmitter, Output} from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import {TruckSettingsService} from '../truckSettingsService';
import {ErrorHandlingComponent} from '../../../../../errorHandling/errorHandlingComponent';

@Component({
    selector: 'truck-settings-edit',
    templateUrl: 'app/dashboard/features/settings/truckSettings/truckSettingsEdit/truckSettingsEditTemplate.html',
   // directives: [FORM_DIRECTIVES, ErrorHandlingComponent]
})

export class TruckSettingsEditComponent implements OnInit, OnChanges {

    private editTruckForm: FormGroup;
    @Input() selectedTruckIdToEdit: any;
    @Input() truckToEdit: any[];
    private truckDetails: any[];
    private updateResponse: any;
    private errorMessage: any; 
    @Output() displayTruckList: EventEmitter<any> = new EventEmitter<any>();
    private broadcastErrorCode: number;
    private showError: boolean = false;

    constructor(private _formBuilder: FormBuilder, private _truckSettingService: TruckSettingsService) {
       
        this.createForm();
        
    }

    createForm(){
        this.editTruckForm = this._formBuilder.group({
            companyId: this._formBuilder.control(localStorage.getItem("token_2")),
            fleetId: this._formBuilder.control(null),
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

    ngOnInit() {
        /*for (var i = 0; i < this.truckList.length; i++) {

            var editData = this.truckList[i];
            // console.log(" fleet summary ID:  ", summaryData.fleetId)
            if (editData.fleetId == this.selectedTruckID) {

                this.truckDetails = editData;
                console.log("truckDetails is:  ", this.truckDetails);
                break;

            } else {
                this.truckDetails = null;
            }
        }*/
       // this.getTruckDetails();
       console.log("truckToEdit:..", this.truckToEdit);
       this.truckDetails = this.truckToEdit;
        
    }

    ngOnChanges() {
   
    }
    
    onClickSave(formData: any){
        console.log("The edited truck details are: ", formData)
        this._truckSettingService.updateTruck(formData, this.selectedTruckIdToEdit)
            .subscribe(
            updateResponse => {
                this.updateResponse = updateResponse
                console.log("updateResponse :...", this.updateResponse.status)
                if(this.updateResponse.status == 200){
                     this.displayTruckList.emit("displayTruckList");
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

       
        
    }

    onClickCancel(){
        this.displayTruckList.emit("displayTruckList");
    }

}