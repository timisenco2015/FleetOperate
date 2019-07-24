import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router } from "@angular/router";
import { FleetOperateService } from "../fleetOperate/fleetOperateService";
import { CreateAccountService } from "../createAccount/createAccountService";

@Component({
    selector: 'completeCompanyAccount',
    templateUrl: 'app/completeCompanyAccount/completeCompanyAccountTemplate.html'
})

export class CompleteCompanyAccountComponent implements OnInit, OnChanges {


    private showCompleteCompany: boolean = true;
    private showCompleteAdmin: boolean = false;
    private completeCompanyForm: FormGroup;
    private completeAdminForm: FormGroup;
    private companyAdminInfo: any;
    private displayRequiredFieldError: boolean = false
    private emailIdCheckResponse: any;
    private validEmailId: boolean = false;
    private displayEmailIdExists: boolean = false;
    private errorMessage: any;
    private displayPasswordNotMatch: boolean = false;
    private showCanadaProvinces = true;
    private showUSProvinces = false;
    private companyName: any;
    private adminName: any;
    private completeCompanyAdminProfileResponse: any;
    private errorMsg: any;
    private displayErrorMessage: any;
    private companyAddressId: any;

    constructor(private _formBuilder: FormBuilder,
        private router: Router,
        private fleetOpsService: FleetOperateService) {

        this.createCompleteCompanyForm();
        this.createCompleteAdminForm();
    }

    ngOnChanges() {

    }

    ngOnInit() {

        this.getCompanyAdminInfo();

    }

    createCompleteCompanyForm() {
        this.completeCompanyForm = this._formBuilder.group({
            companyWebsite: this._formBuilder.control(null),
            businessNumber: this._formBuilder.control(null),
            businessName: this._formBuilder.control(null),
            dotNumber: this._formBuilder.control(null),
            companyDayStartTime: this._formBuilder.control(null, Validators.required),
            companyTimezone: this._formBuilder.control(null, Validators.required),
            eldSupportEmailId: this._formBuilder.control(null, Validators.required),
            eldSupportPassword: this._formBuilder.control(null, Validators.required),
            confirmPassword: this._formBuilder.control(null, Validators.required)
        });
    }

    createCompleteAdminForm() {
        this.completeAdminForm = this._formBuilder.group({
            dob: this._formBuilder.control(null, Validators.required),
            gender: this._formBuilder.control(null, Validators.required),
            adminAddressLine1: this._formBuilder.control(null, Validators.required),
            adminAddressLine2: this._formBuilder.control(null),
            adminCity: this._formBuilder.control(null, Validators.required),
            adminProvince: this._formBuilder.control(null, Validators.required),
            adminCountry: this._formBuilder.control(null, Validators.required),
            adminPostalCode: this._formBuilder.control(null, Validators.required)
        });
    }

    getCompanyAdminInfo() {

        // get companyId and admin id from session storage
        let companyId = sessionStorage.getItem("cId")

        let adminId = sessionStorage.getItem("aId")

        this.fleetOpsService.getCompanyAdminInfo(companyId, adminId)
            .subscribe(response => {
                this.companyAdminInfo = response.json();
                //console.log("companyAdminInfo..." + this.companyAdminInfo)

                this.companyName = this.companyAdminInfo.companyInfo.companyName
                //console.log("companyAdminInfo...companyName.." + this.companyName)
                this.adminName = this.companyAdminInfo.adminInfo.firstName + " " + this.companyAdminInfo.adminInfo.lastName
                //console.log("companyAdminInfo...adminName..." + this.adminName)
                this.companyAddressId = this.companyAdminInfo.companyInfo.companyAddressDetails
                //console.log("companyAdminInfo...companyAddressId..." + this.companyAddressId)
                //sessionStorage.setItem("cAId", this.companyAddressId)
            })
    }

    onEmailIdTabOff(formData: any) {
        //console.log("emailId: ", formData.eldSupportEmailId);
        if (formData.eldSupportEmailId == null || formData.eldSupportEmailId == "") {
            //console.log("please enter valid email id ")
        } else {
            this.checkIfUsernameExists(formData.eldSupportEmailId);
        }

    }

    onClickCancel() {
        this.router.navigate(['login'])
    }

    onClickBack() {
        this.showCompleteCompany = true;
        this.showCompleteAdmin = false;
    }

    onClickCountry(value) {
        //console.log("onClickCountry is called..value..", value)
        if (value == "CANADA") {
            this.showCanadaProvinces = true;
            this.showUSProvinces = false;
        } else {
            this.showCanadaProvinces = false;
            this.showUSProvinces = true;
        }

    }

    checkIfUsernameExists(eldSupportEmailId: any) {
        //console.log("checkIfUsernameExists called: ", eldSupportEmailId)

        this.fleetOpsService.checkIfAdminUsernameExistsInDB(eldSupportEmailId)
            .subscribe(
            serviceResponse => {
                this.emailIdCheckResponse = serviceResponse.json()
                //console.log("checkIfUsernameExists response 2:...", this.emailIdCheckResponse)

                if (this.emailIdCheckResponse == false) {
                    //console.log("admin emailId is NOT registered");
                    //this.registerCompanyAndAdmin(formData);
                    this.validEmailId = true;
                    this.displayEmailIdExists = false;

                    // check email id exists in driver table
                    this.fleetOpsService.checkIfDriverUsernameExistsInDB(eldSupportEmailId)
                        .subscribe(
                        serviceResponse => {
                            this.emailIdCheckResponse = serviceResponse.json()
                            //console.log("checkIfUsernameExists response 2:...", this.emailIdCheckResponse)

                            if (this.emailIdCheckResponse == false) {
                                //console.log("driver emailId is NOT registered");
                                //this.registerCompanyAndAdmin(formData);
                                this.validEmailId = true;
                                this.displayEmailIdExists = false;
                            } else {
                                //console.log("driver emailId is already registered");
                                this.displayEmailIdExists = true;
                                this.validEmailId = false;
                            }

                        },
                        error => {
                            this.errorMessage = error;
                            //console.log("checkIfUsernameExists error: ", error.status)
                        })

                } else {
                    //console.log("admin emailId is already registered");
                    this.displayEmailIdExists = true;
                    this.validEmailId = false;
                }

            },
            error => {
                this.errorMessage = error;
                //console.log("checkIfUsernameExists error: ", error.status)
            })


    }

    onClickContinue(completeCompanyForm: any) {
        //console.log("onClickContinue..companyDayStartTime..." + completeCompanyForm.value.companyDayStartTime)
        //console.log("onClickContinue..companyTimezone..." + completeCompanyForm.value.companyTimezone)
        if (completeCompanyForm.status == "INVALID") {
            this.displayRequiredFieldError = true;
            window.scrollTo(0, 0);
        } else {
            this.displayRequiredFieldError = false;
            if (this.validEmailId == true) {
                //console.log("valid email id: ");
                this.displayEmailIdExists = false;

                // check password validation
                if (completeCompanyForm.value.eldSupportPassword ==
                    completeCompanyForm.value.confirmPassword) {

                    this.displayPasswordNotMatch = false;

                    this.showCompleteCompany = false;
                    this.showCompleteAdmin = true;
                    window.scrollTo(0, 0);

                } else {
                    this.displayPasswordNotMatch = true;
                }
            } else {
                //console.log("createAdminProfile error ");
                this.displayEmailIdExists = true;
            }
        }
    }

    onClickSubmit(completeAdminForm: any) {
        //console.log("onClickSubmit..dob.. " + completeAdminForm.value.dob);

        if (completeAdminForm.status == "INVALID") {
            this.displayRequiredFieldError = true;
            window.scrollTo(0, 0);
        } else {
            this.displayRequiredFieldError = false;
            if (this.validEmailId == true) {
                this.displayEmailIdExists = false;

                let completeCompanyProfile = this.createCompanyAccountProfile(completeAdminForm);
                //console.log("onClickSubmit..completeCompanyProfile.. " + JSON.stringify(completeCompanyProfile));

                let jsonCompleteCompanyProfile = JSON.stringify(completeCompanyProfile);

                this.fleetOpsService.postCompleteCompanyAdminProfile(jsonCompleteCompanyProfile)
                    .subscribe(response => {

                        this.completeCompanyAdminProfileResponse = response.json()
                        //console.log("createCompanyOrderProfileResponse :...", this.completeCompanyAdminProfileResponse)
                        let jsonCompanyOrderProfileResponse = this.completeCompanyAdminProfileResponse.companyInfo
                        window.location.reload();
                        

                    },
                    error => {
                        this.errorMsg = "Connection error, please try again later.";
                        this.displayErrorMessage = true;
                        //console.log("createCompanyOrderProfile error: ", error.status)
                    })
            } else {
                this.displayEmailIdExists = true;
            }
        }

    }

    createCompanyAccountProfile(completeAdminForm) {

        let completeCompanyProfile = {

            "companyInfo": {
                "companyId": JSON.parse(sessionStorage.getItem('cId')),
                "companyName": this.companyName,
                "businessNumber": this.completeCompanyForm.value.businessNumber,
                "businessName": this.completeCompanyForm.value.businessName,
                "website": this.completeCompanyForm.value.businessNumber,
                "companyAddressDetails": this.companyAdminInfo.companyInfo.companyAddressDetails,
                "companyDayStartTime": "2000-01-01T" + this.completeCompanyForm.value.companyDayStartTime + ":00Z",
                "companyTimezone": this.completeCompanyForm.value.companyTimezone,
                "companyStatus": "ACTIVE",
                "dotNumber": this.completeCompanyForm.value.dotNumber
            },
            "adminInfo": {
                "adminId": JSON.parse(sessionStorage.getItem('aId')),
                "adminFirstName": this.companyAdminInfo.adminInfo.firstName,
                "adminMiddleName": this.companyAdminInfo.adminInfo.middleName,
                "adminLastName": this.companyAdminInfo.adminInfo.lastName,
                "adminDob": completeAdminForm.value.dob + "T00:00:00Z",
                "adminEmail": this.companyAdminInfo.adminInfo.email,
                "adminAddressLine1": completeAdminForm.value.adminAddressLine1,
                "adminAddressLine2": completeAdminForm.value.adminAddressLine2,
                "adminCity": completeAdminForm.value.adminCity,
                "adminProvince": completeAdminForm.value.adminProvince,
                "adminCountry": completeAdminForm.value.adminCountry,
                "adminPostalCode": completeAdminForm.value.adminPostalCode,
                "adminGender": completeAdminForm.value.gender,
                "adminCellPhone": this.companyAdminInfo.adminInfo.cellPhone
            },
            "eldSupportEmailId": this.completeCompanyForm.value.eldSupportEmailId,
            "eldSupportPassword": this.completeCompanyForm.value.eldSupportPassword
        }

        return completeCompanyProfile;
    }


}