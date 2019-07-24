import {Component, OnInit, OnChanges, EventEmitter, Output} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import {DriverSettingsService} from '../driverSettingsService';
import {ErrorHandlingComponent} from '../../../../../errorHandling/errorHandlingComponent';

@Component({
    selector: 'driver-settings-add',
    templateUrl: 'app/dashboard/features/settings/driverSettings/driverSettingsAdd/driverSettingsAddTemplate.html',
    //directives: [FORM_DIRECTIVES, ErrorHandlingComponent]
})

export class DriverSettingsAddComponent implements OnInit, OnChanges {

    private addDriverForm: FormGroup;
    private addResponse: any;
    private errorMessage: any;
    @Output() displayDriverList: EventEmitter<any> = new EventEmitter<any>();
    private broadcastErrorCode: number;
    private showError: boolean = false;
    private showForm: boolean = true;
    private displayDriverAdded: boolean = false;
    private usernameCheckResponse: any;

    constructor(private _formBuilder: FormBuilder, 
    private _driverSettingsService: DriverSettingsService) {
        this.createAddDriverForm();
    }

    ngOnInit() {
        
    }

    ngOnChanges() {

        
    }

    createAddDriverForm(){
        this.addDriverForm = this._formBuilder.group({
            'companyId': [localStorage.getItem("token_2")],
            //'username': [],
            'firstName': [],
            'middleName': [],
            'lastName': [],
            'dob': [],
            'gender': [],
            'licenseNumber': [],
            'licenseExpiry': [],
            'licenseIssuedAuthority': [],
            'licenseIssuedProvince': [],
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
        console.log("The Driver details are: ", formData)

        this._driverSettingsService.checkIfUsernameExistsInDB(formData.email)
        .subscribe(
             serviceResponse => {
                 this.usernameCheckResponse = serviceResponse.json();
                console.log("checkIfUsernameExists response:...", this.usernameCheckResponse.personEmailIdExists);

                if(this.usernameCheckResponse.personEmailIdExists == false){
                    console.log("username is NOT registered")

                    this._driverSettingsService.addDriver(formData)
                    .subscribe(
                    serviceResponse => {
                        this.addResponse = serviceResponse
                        console.log("add driver response:...", this.addResponse)

                        if(this.addResponse.status == 200){
                            this.showForm = false;
                            setTimeout(() => {
                                this.createAddDriverForm();
                                this.showForm = true;
                            });
                            //this.addTruckForm.reset();
                            this.displayDriverAdded = true;
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
                        this.displayDriverAdded = false;
                        this.showError = true;
                        if(this.showError = true){
                            window.scrollTo(0,0)
                        }
                    }
                        console.log("Add truck error: ", error.status)
                    })
                    }else{
                    console.log("username is registered")
                }
             },
             error => {
                this.errorMessage = error;
                console.log("checkIfUsernameExists error: ", error.status)
             })

        //this.displayDriverList.emit("displayDriverList");
    }

    onClickCancel(){
        this.displayDriverList.emit("displayDriverList");
    }

}