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
var createAccountService_1 = require("../createAccountService");
var router_1 = require("@angular/router");
var AdminProfileComponent = (function () {
    function AdminProfileComponent(_createAccountService, router, _formBuilder) {
        this._createAccountService = _createAccountService;
        this.router = router;
        this._formBuilder = _formBuilder;
        this.validEmailId = false;
        this.displayEmailIdExists = false;
        this.displayRequiredFieldError = false;
        this.displayErrorMessage = false;
        this.showAdminProfile = true;
        this.showTermsService = false;
        this.showPrivacyPolicy = false;
        this.disableButton = false;
        this.sendAdminInfo = new core_1.EventEmitter();
        this.createAdminForm();
    }
    AdminProfileComponent.prototype.ngOnInit = function () {
    };
    AdminProfileComponent.prototype.ngOnChanges = function () {
    };
    AdminProfileComponent.prototype.createAdminForm = function () {
        this.adminProfileForm = this._formBuilder.group({
            adminFirstName: [null, forms_1.Validators.required],
            adminLastName: [null, forms_1.Validators.required],
            adminCellPhone: [null, forms_1.Validators.required],
            adminExt: [null],
            adminEmail: [null, forms_1.Validators.required]
        });
    };
    AdminProfileComponent.prototype.gotoLogin = function () {
        this.router.navigate(['login']);
    };
    AdminProfileComponent.prototype.checkIfUsernameExists = function (adminEmailId) {
        //console.log("checkIfUsernameExists called: ", adminEmailId)
        var _this = this;
        this._createAccountService.checkIfUsernameExistsInDB(adminEmailId)
            .subscribe(function (serviceResponse) {
            _this.usernameCheckResponse = serviceResponse.json();
            //console.log("checkIfUsernameExists response 1:...", this.usernameCheckResponse.usernameExists)
            //console.log("checkIfUsernameExists response 2:...", this.usernameCheckResponse)
            if (_this.usernameCheckResponse.personEmailIdExists == false) {
                //console.log("emailId is NOT registered");
                //this.registerCompanyAndAdmin(formData);
                _this.validEmailId = true;
                _this.displayEmailIdExists = false;
            }
            else {
                //console.log("emailId is already registered");
                _this.displayEmailIdExists = true;
                window.scrollTo(0, 0);
                _this.validEmailId = false;
            }
        }, function (error) {
            _this.errorMessage = error;
            //console.log("checkIfUsernameExists error: ", error.status)
            _this.disableButton = false;
            _this.errorMessage = "Connection error, please try again later.";
            _this.displayErrorMessage = true;
        });
        //return this.usernameCheckResponse;
    };
    AdminProfileComponent.prototype.onEmailIdTabOff = function (formData) {
        //console.log("emailId: ", formData.adminEmail);
        if (formData.adminEmail == null || formData.adminEmail == "") {
        }
        else {
            this.checkIfUsernameExists(formData.adminEmail);
        }
    };
    AdminProfileComponent.prototype.onClickTermAndConditions = function () {
        //console.log("onClickTermAndConditions: ")
        //document.getElementById("showTermsConditionsModal").click();
        this.showTermsService = true;
        this.showPrivacyPolicy = false;
        this.showAdminProfile = false;
        window.scrollTo(0, 0);
    };
    AdminProfileComponent.prototype.onClickPrivacyPolicy = function () {
        this.showTermsService = false;
        this.showPrivacyPolicy = true;
        this.showAdminProfile = false;
        window.scrollTo(0, 0);
    };
    AdminProfileComponent.prototype.onClickOk = function () {
        //console.log("onClickOk: ")
        this.showTermsService = false;
        this.showPrivacyPolicy = false;
        this.showAdminProfile = true;
    };
    AdminProfileComponent.prototype.onClickGetStarted = function (formData) {
        //console.log("onClickGetStarted: formData..", formData.value)
        var _this = this;
        this.disableButton = true;
        // check if all form fields are filled
        if (formData.status == "INVALID") {
            //console.log("formData.status: ", formData.value);
            this.disableButton = false;
            this.displayRequiredFieldError = true;
            window.scrollTo(0, 0);
        }
        else {
            //console.log("formData.status: ", formData.value);
            this.displayRequiredFieldError = false;
            // check if email id exits in db or not
            if (this.validEmailId == true) {
                //console.log("valid email id: ");
                this.displayEmailIdExists = false;
                //console.log("checking FINAL form data: ", formData.value);
                // send admin profile to DB
                this._createAccountService.createAdminProfile(formData.value)
                    .subscribe(function (serviceResponse) {
                    _this.createAdminProfileResponse = serviceResponse.json();
                    //console.log("createAdminProfileResponse :...", this.createAdminProfileResponse)
                    if (_this.createAdminProfileResponse.message == "Basic_Admin_Info_Created") {
                        //console.log("admin created");
                        _this.displayErrorMessage = false;
                        var adminInfo = {
                            adminId: _this.createAdminProfileResponse.adminId,
                            adminEmailId: _this.createAdminProfileResponse.adminEmailId,
                            adminFirstName: _this.createAdminProfileResponse.adminFirstName,
                            adminLastName: _this.createAdminProfileResponse.adminLastName,
                            adminCellPhone: _this.createAdminProfileResponse.adminCellPhone,
                            adminExt: _this.createAdminProfileResponse.adminExt,
                            adminUsername: _this.createAdminProfileResponse.adminEmailId
                        };
                        //console.log("adminInfo created:...",adminInfo);
                        /*sessionStorage.setItem('adId', JSON.stringify(this.createAdminProfileResponse.adminId));
                        sessionStorage.setItem('adEId', JSON.stringify(this.createAdminProfileResponse.adminEmailId));
                        sessionStorage.setItem('adFN', JSON.stringify(this.createAdminProfileResponse.adminFirstName));
                        sessionStorage.setItem('adLN', JSON.stringify(this.createAdminProfileResponse.adminLastName));
                        sessionStorage.setItem('adPh', JSON.stringify(this.createAdminProfileResponse.adminCellPhone));
                        sessionStorage.setItem('adExt', JSON.stringify(this.createAdminProfileResponse.adminExt));*/
                        // show verification code page
                        _this.sendAdminInfo.emit({ adminInfo: adminInfo });
                    }
                    else {
                        //console.log("emailId is already registered");
                        _this.disableButton = false;
                        _this.errorMessage = "Failed to Create Admin Profile, please try again.";
                        _this.displayErrorMessage = true;
                        window.scrollTo(0, 0);
                    }
                }, function (error) {
                    _this.disableButton = false;
                    _this.errorMessage = "Connection error, please try again later.";
                    _this.displayErrorMessage = true;
                    //console.log("createAdminProfile error: ", error.status)
                });
            }
            else {
                //console.log("createAdminProfile error ");
                this.disableButton = false;
                this.displayEmailIdExists = true;
                window.scrollTo(0, 0);
            }
        }
    };
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], AdminProfileComponent.prototype, "sendAdminInfo", void 0);
    AdminProfileComponent = __decorate([
        core_1.Component({
            selector: 'adminProfile',
            templateUrl: 'app/createAccount/adminProfile/adminProfileTemplate.html'
        }), 
        __metadata('design:paramtypes', [createAccountService_1.CreateAccountService, router_1.Router, forms_1.FormBuilder])
    ], AdminProfileComponent);
    return AdminProfileComponent;
}());
exports.AdminProfileComponent = AdminProfileComponent;
