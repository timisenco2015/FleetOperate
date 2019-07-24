import { Component, OnInit, OnChanges, Output, EventEmitter } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { CreateAccountService } from "../createAccountService";
import { Router } from "@angular/router";
import { Observable } from 'rxjs/Observable';

@Component({
    selector: 'adminProfile',
    templateUrl: 'app/createAccount/adminProfile/adminProfileTemplate.html'
})

export class AdminProfileComponent implements OnInit, OnChanges {

    private adminProfileForm: FormGroup;
    private usernameCheckResponse: any;
    private validEmailId: boolean = false;
    private displayEmailIdExists: boolean = false;
    private errorMessage: any;
    private displayRequiredFieldError: boolean = false;
    private createAdminProfileResponse: any;
    private displayErrorMessage: boolean = false;
    private showAdminProfile: boolean = true;
    private showTermsService: boolean = false;
    private showPrivacyPolicy: boolean = false;
    private disableButton: boolean = false;
    @Output() sendAdminInfo: EventEmitter<any> = new EventEmitter<any>();

    constructor(private _createAccountService: CreateAccountService,
        private router: Router,
        private _formBuilder: FormBuilder) {

        this.createAdminForm()
    }

    ngOnInit() {



    }

    ngOnChanges() {

    }

    createAdminForm() {
        this.adminProfileForm = this._formBuilder.group({

            adminFirstName: [null, Validators.required],
            adminLastName: [null, Validators.required],
            adminCellPhone: [null, Validators.required],
            adminExt: [null],
            adminEmail: [null, Validators.required]

        })
    }

    gotoLogin() {
        this.router.navigate(['login'])
    }

    checkIfUsernameExists(adminEmailId: any) {
        //console.log("checkIfUsernameExists called: ", adminEmailId)

        this._createAccountService.checkIfUsernameExistsInDB(adminEmailId)
            .subscribe(
            serviceResponse => {
                this.usernameCheckResponse = serviceResponse.json()
                //console.log("checkIfUsernameExists response 1:...", this.usernameCheckResponse.usernameExists)
                //console.log("checkIfUsernameExists response 2:...", this.usernameCheckResponse)

                if (this.usernameCheckResponse.personEmailIdExists == false) {
                    //console.log("emailId is NOT registered");
                    //this.registerCompanyAndAdmin(formData);
                    this.validEmailId = true;
                    this.displayEmailIdExists = false;
                } else {
                    //console.log("emailId is already registered");
                    this.displayEmailIdExists = true;
                    window.scrollTo(0, 0);
                    this.validEmailId = false;
                }

            },
            error => {
                this.errorMessage = error;
                //console.log("checkIfUsernameExists error: ", error.status)
                this.disableButton = false;
                this.errorMessage = "Connection error, please try again later.";
                this.displayErrorMessage = true;
            })
        //return this.usernameCheckResponse;
    }

    onEmailIdTabOff(formData: any) {
        //console.log("emailId: ", formData.adminEmail);
        if (formData.adminEmail == null || formData.adminEmail == "") {
            //console.log("please enter valid email id ")
        } else {
            this.checkIfUsernameExists(formData.adminEmail);
        }

    }

    onClickTermAndConditions() {
        //console.log("onClickTermAndConditions: ")
        //document.getElementById("showTermsConditionsModal").click();
        this.showTermsService = true;
        this.showPrivacyPolicy = false;
        this.showAdminProfile = false;
        window.scrollTo(0, 0);
    }

    onClickPrivacyPolicy() {
        this.showTermsService = false;
        this.showPrivacyPolicy = true;
        this.showAdminProfile = false;
        window.scrollTo(0, 0);
    }

    onClickOk() {
        //console.log("onClickOk: ")
        this.showTermsService = false;
        this.showPrivacyPolicy = false;
        this.showAdminProfile = true;
    }

    onClickGetStarted(formData: any) {
        //console.log("onClickGetStarted: formData..", formData.value)

        this.disableButton = true;

        // check if all form fields are filled
        if (formData.status == "INVALID") {
            //console.log("formData.status: ", formData.value);
            this.disableButton = false;
            this.displayRequiredFieldError = true;
            window.scrollTo(0, 0);
        } else {
            //console.log("formData.status: ", formData.value);
            this.displayRequiredFieldError = false;

            // check if email id exits in db or not
            if (this.validEmailId == true) {
                //console.log("valid email id: ");
                this.displayEmailIdExists = false;
                //console.log("checking FINAL form data: ", formData.value);

                // send admin profile to DB
                this._createAccountService.createAdminProfile(formData.value)
                    .subscribe(
                    serviceResponse => {
                        this.createAdminProfileResponse = serviceResponse.json()
                        //console.log("createAdminProfileResponse :...", this.createAdminProfileResponse)

                        if (this.createAdminProfileResponse.message == "Basic_Admin_Info_Created") {
                            //console.log("admin created");
                            this.displayErrorMessage = false;

                            let adminInfo = {
                                adminId: this.createAdminProfileResponse.adminId,
                                adminEmailId: this.createAdminProfileResponse.adminEmailId,
                                adminFirstName: this.createAdminProfileResponse.adminFirstName,
                                adminLastName: this.createAdminProfileResponse.adminLastName,
                                adminCellPhone: this.createAdminProfileResponse.adminCellPhone,
                                adminExt: this.createAdminProfileResponse.adminExt,
                                adminUsername: this.createAdminProfileResponse.adminEmailId
                            }

                            //console.log("adminInfo created:...",adminInfo);

                            /*sessionStorage.setItem('adId', JSON.stringify(this.createAdminProfileResponse.adminId));
                            sessionStorage.setItem('adEId', JSON.stringify(this.createAdminProfileResponse.adminEmailId));
                            sessionStorage.setItem('adFN', JSON.stringify(this.createAdminProfileResponse.adminFirstName));
                            sessionStorage.setItem('adLN', JSON.stringify(this.createAdminProfileResponse.adminLastName));
                            sessionStorage.setItem('adPh', JSON.stringify(this.createAdminProfileResponse.adminCellPhone));
                            sessionStorage.setItem('adExt', JSON.stringify(this.createAdminProfileResponse.adminExt));*/

                            // show verification code page
                            this.sendAdminInfo.emit({ adminInfo: adminInfo });


                        } else {
                            //console.log("emailId is already registered");
                            this.disableButton = false;
                            this.errorMessage = "Failed to Create Admin Profile, please try again."
                            this.displayErrorMessage = true;
                            window.scrollTo(0, 0);
                        }

                    },
                    error => {
                        this.disableButton = false;
                        this.errorMessage = "Connection error, please try again later.";
                        this.displayErrorMessage = true;
                        //console.log("createAdminProfile error: ", error.status)
                    })

            } else {
                //console.log("createAdminProfile error ");
                this.disableButton = false;
                this.displayEmailIdExists = true;
                window.scrollTo(0, 0);
            }

        }
    }


}