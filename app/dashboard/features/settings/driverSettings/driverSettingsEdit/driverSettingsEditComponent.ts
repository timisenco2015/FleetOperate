import {Component, OnInit, OnChanges, Input, EventEmitter, Output} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import {DriverSettingsService} from '../driverSettingsService';
import {ErrorHandlingComponent} from '../../../../../errorHandling/errorHandlingComponent';

@Component({
    selector: 'driver-settings-edit',
    templateUrl: 'app/dashboard/features/settings/driverSettings/driverSettingsEdit/driverSettingsEditTemplate.html',
    //directives: [FORM_DIRECTIVES, ErrorHandlingComponent]
})

export class DriverSettingsEditComponent implements OnInit, OnChanges {

    private editDriverForm: FormGroup;
    @Input() selectedDriverIdToEdit: any;
    @Input() driverToEdit: any;
    private driverDetails: any;
    private updateResponse: any;
    private errorMessage: any;
    @Output() displayDriverList: EventEmitter<any> = new EventEmitter<any>();
    private broadcastErrorCode: number;
    private showError: boolean = false; 

    constructor(private _formBuilder: FormBuilder, private _driverSettingsService: DriverSettingsService) {
        
        this.createForm();
    }

    ngOnInit() {
        console.log(" driver to edit in edit component :  ", this.driverToEdit.addressLine1)
        /*for (var i = 0; i < this.driverList.length; i++) {

            var editData = this.driverList[i];
             console.log(" driver summary ID:  ", editData.driverId)
            if (editData.driverId == this.selectedDriverIdToEdit) {

                this.driverDetails = editData;
                console.log("driverDetails is:  ", this.driverDetails);
                break;

            } else {
                this.driverDetails = null;
            }
        }*/
        this.driverDetails = this.driverToEdit;
    }

    ngOnChanges() {

        
    }

    createForm(){
        this.editDriverForm = this._formBuilder.group({
            'companyId': [localStorage.getItem("token_2")],
            'driverId': [],
            'firstName': [],
            'middleName': [],
            'lastName': [],
            'dob': [],
            'gender': [],
            'licenseNumber': [],
            'licenseExpiry': [],
            'addressLine1': [],
            'addressLine2': [],
            'city':[],
            'province':[],
            'country':[],
            'postalCode':[],
            'cellPhone':[],
            'homePhone':[],
            'email':[],
            'canVisaStatus':[],
            'usaVisaStatus':[],
            'nationality':[],
            'notes': []
        });
    }

    

    onClickSave(formData: any){
        console.log("The edited Driver details are: ", formData)
        this._driverSettingsService.updateDriver(formData, this.selectedDriverIdToEdit)
            .subscribe(
            updateResponse => {
                this.updateResponse = updateResponse
                console.log("updateResponse :...", this.updateResponse.status)
                if(this.updateResponse.status == 200){
                     this.displayDriverList.emit("displayDriverList");
                }else{
                    this.broadcastErrorCode = this.updateResponse.status;
                    console.log("errorMessage 2: ", this.broadcastErrorCode)
                    this.showError = true;
                     if(this.showError = true){
                        window.scrollTo(0,0)
                    }
                }
            },
            error => {this.errorMessage = error;
                        if(error.status != null){
                            console.log("errorMessage 1: ", error.status)
                            this.broadcastErrorCode = error.status;
                            this.showError = true;
                                if(this.showError = true){
                                    window.scrollTo(0,0)
                                }
                        }    
                    })

       // this.displayDriverList.emit("displayDriverList");
        
    }

    onClickCancel(){
        this.displayDriverList.emit("displayDriverList");
    }

}