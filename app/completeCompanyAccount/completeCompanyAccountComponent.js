"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var forms_1 = require('@angular/forms');
var router_1 = require("@angular/router");
var fleetOperateService_1 = require("../fleetOperate/fleetOperateService");
var CompleteCompanyAccountComponent = (function () {
    function CompleteCompanyAccountComponent(_formBuilder, router, fleetOpsService) {
        this._formBuilder = _formBuilder;
        this.router = router;
        this.fleetOpsService = fleetOpsService;
        this.showCompleteCompany = true;
        this.showCompleteAdmin = false;
        this.displayRequiredFieldError = false;
        this.validEmailId = false;
        this.displayEmailIdExists = false;
        this.displayPasswordNotMatch = false;
        this.showCanadaProvinces = true;
        this.showUSProvinces = false;
        this.createCompleteCompanyForm();
        this.createCompleteAdminForm();
    }
    CompleteCompanyAccountComponent.prototype.ngOnChanges = function () {
    };
    CompleteCompanyAccountComponent.prototype.ngOnInit = function () {
        this.getCompanyAdminInfo();
    };
    CompleteCompanyAccountComponent.prototype.createCompleteCompanyForm = function () {
        this.completeCompanyForm = this._formBuilder.group({
            companyWebsite: this._formBuilder.control(null),
            businessNumber: this._formBuilder.control(null),
            businessName: this._formBuilder.control(null),
            dotNumber: this._formBuilder.control(null),
            companyDayStartTime: this._formBuilder.control(null, forms_1.Validators.required),
            companyTimezone: this._formBuilder.control(null, forms_1.Validators.required),
            eldSupportEmailId: this._formBuilder.control(null, forms_1.Validators.required),
            eldSupportPassword: this._formBuilder.control(null, forms_1.Validators.required),
            confirmPassword: this._formBuilder.control(null, forms_1.Validators.required)
        });
    };
    CompleteCompanyAccountComponent.prototype.createCompleteAdminForm = function () {
        this.completeAdminForm = this._formBuilder.group({
            dob: this._formBuilder.control(null, forms_1.Validators.required),
            gender: this._formBuilder.control(null, forms_1.Validators.required),
            adminAddressLine1: this._formBuilder.control(null, forms_1.Validators.required),
            adminAddressLine2: this._formBuilder.control(null),
            adminCity: this._formBuilder.control(null, forms_1.Validators.required),
            adminProvince: this._formBuilder.control(null, forms_1.Validators.required),
            adminCountry: this._formBuilder.control(null, forms_1.Validators.required),
            adminPostalCode: this._formBuilder.control(null, forms_1.Validators.required)
        });
    };
    CompleteCompanyAccountComponent.prototype.getCompanyAdminInfo = function () {
        var _this = this;
        // get companyId and admin id from session storage
        var companyId = sessionStorage.getItem("cId");
        var adminId = sessionStorage.getItem("aId");
        this.fleetOpsService.getCompanyAdminInfo(companyId, adminId)
            .subscribe(function (response) {
            _this.companyAdminInfo = response.json();
            //console.log("companyAdminInfo..." + this.companyAdminInfo)
            _this.companyName = _this.companyAdminInfo.companyInfo.companyName;
            //console.log("companyAdminInfo...companyName.." + this.companyName)
            _this.adminName = _this.companyAdminInfo.adminInfo.firstName + " " + _this.companyAdminInfo.adminInfo.lastName;
            //console.log("companyAdminInfo...adminName..." + this.adminName)
            _this.companyAddressId = _this.companyAdminInfo.companyInfo.companyAddressDetails;
            //console.log("companyAdminInfo...companyAddressId..." + this.companyAddressId)
            //sessionStorage.setItem("cAId", this.companyAddressId)
        });
    };
    CompleteCompanyAccountComponent.prototype.onEmailIdTabOff = function (formData) {
        //console.log("emailId: ", formData.eldSupportEmailId);
        if (formData.eldSupportEmailId == null || formData.eldSupportEmailId == "") {
        }
        else {
            this.checkIfUsernameExists(formData.eldSupportEmailId);
        }
    };
    CompleteCompanyAccountComponent.prototype.onClickCancel = function () {
        this.router.navigate(['login']);
    };
    CompleteCompanyAccountComponent.prototype.onClickBack = function () {
        this.showCompleteCompany = true;
        this.showCompleteAdmin = false;
    };
    CompleteCompanyAccountComponent.prototype.onClickCountry = function (value) {
        //console.log("onClickCountry is called..value..", value)
        if (value == "CANADA") {
            this.showCanadaProvinces = true;
            this.showUSProvinces = false;
        }
        else {
            this.showCanadaProvinces = false;
            this.showUSProvinces = true;
        }
    };
    CompleteCompanyAccountComponent.prototype.checkIfUsernameExists = function (eldSupportEmailId) {
        //console.log("checkIfUsernameExists called: ", eldSupportEmailId)
        var _this = this;
        this.fleetOpsService.checkIfAdminUsernameExistsInDB(eldSupportEmailId)
            .subscribe(function (serviceResponse) {
            _this.emailIdCheckResponse = serviceResponse.json();
            //console.log("checkIfUsernameExists response 2:...", this.emailIdCheckResponse)
            if (_this.emailIdCheckResponse == false) {
                //console.log("admin emailId is NOT registered");
                //this.registerCompanyAndAdmin(formData);
                _this.validEmailId = true;
                _this.displayEmailIdExists = false;
                // check email id exists in driver table
                _this.fleetOpsService.checkIfDriverUsernameExistsInDB(eldSupportEmailId)
                    .subscribe(function (serviceResponse) {
                    _this.emailIdCheckResponse = serviceResponse.json();
                    //console.log("checkIfUsernameExists response 2:...", this.emailIdCheckResponse)
                    if (_this.emailIdCheckResponse == false) {
                        //console.log("driver emailId is NOT registered");
                        //this.registerCompanyAndAdmin(formData);
                        _this.validEmailId = true;
                        _this.displayEmailIdExists = false;
                    }
                    else {
                        //console.log("driver emailId is already registered");
                        _this.displayEmailIdExists = true;
                        _this.validEmailId = false;
                    }
                }, function (error) {
                    _this.errorMessage = error;
                    //console.log("checkIfUsernameExists error: ", error.status)
                });
            }
            else {
                //console.log("admin emailId is already registered");
                _this.displayEmailIdExists = true;
                _this.validEmailId = false;
            }
        }, function (error) {
            _this.errorMessage = error;
            //console.log("checkIfUsernameExists error: ", error.status)
        });
    };
    CompleteCompanyAccountComponent.prototype.onClickContinue = function (completeCompanyForm) {
        //console.log("onClickContinue..companyDayStartTime..." + completeCompanyForm.value.companyDayStartTime)
        //console.log("onClickContinue..companyTimezone..." + completeCompanyForm.value.companyTimezone)
        if (completeCompanyForm.status == "INVALID") {
            this.displayRequiredFieldError = true;
            window.scrollTo(0, 0);
        }
        else {
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
                }
                else {
                    this.displayPasswordNotMatch = true;
                }
            }
            else {
                //console.log("createAdminProfile error ");
                this.displayEmailIdExists = true;
            }
        }
    };
    CompleteCompanyAccountComponent.prototype.onClickSubmit = function (completeAdminForm) {
        //console.log("onClickSubmit..dob.. " + completeAdminForm.value.dob);
        var _this = this;
        if (completeAdminForm.status == "INVALID") {
            this.displayRequiredFieldError = true;
            window.scrollTo(0, 0);
        }
        else {
            this.displayRequiredFieldError = false;
            if (this.validEmailId == true) {
                this.displayEmailIdExists = false;
                var completeCompanyProfile = this.createCompanyAccountProfile(completeAdminForm);
                //console.log("onClickSubmit..completeCompanyProfile.. " + JSON.stringify(completeCompanyProfile));
                var jsonCompleteCompanyProfile = JSON.stringify(completeCompanyProfile);
                this.fleetOpsService.postCompleteCompanyAdminProfile(jsonCompleteCompanyProfile)
                    .subscribe(function (response) {
                    _this.completeCompanyAdminProfileResponse = response.json();
                    //console.log("createCompanyOrderProfileResponse :...", this.completeCompanyAdminProfileResponse)
                    var jsonCompanyOrderProfileResponse = _this.completeCompanyAdminProfileResponse.companyInfo;
                    window.location.reload();
                }, function (error) {
                    _this.errorMsg = "Connection error, please try again later.";
                    _this.displayErrorMessage = true;
                    //console.log("createCompanyOrderProfile error: ", error.status)
                });
            }
            else {
                this.displayEmailIdExists = true;
            }
        }
    };
    CompleteCompanyAccountComponent.prototype.createCompanyAccountProfile = function (completeAdminForm) {
        var completeCompanyProfile = {
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
        };
        return completeCompanyProfile;
    };
    CompleteCompanyAccountComponent = __decorate([
        core_1.Component({
            selector: 'completeCompanyAccount',
            templateUrl: 'app/completeCompanyAccount/completeCompanyAccountTemplate.html'
        }), 
        __metadata('design:paramtypes', [forms_1.FormBuilder, router_1.Router, fleetOperateService_1.FleetOperateService])
    ], CompleteCompanyAccountComponent);
    return CompleteCompanyAccountComponent;
}());
exports.CompleteCompanyAccountComponent = CompleteCompanyAccountComponent;
