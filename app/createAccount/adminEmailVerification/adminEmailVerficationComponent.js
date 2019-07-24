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
var AdminEmailVerificationComponent = (function () {
    function AdminEmailVerificationComponent(_createAccountService, router, _formBuilder) {
        this._createAccountService = _createAccountService;
        this.router = router;
        this._formBuilder = _formBuilder;
        this.displayRequiredFieldError = false;
        this.displayErrorMessage = false;
        this.displayVerificationCodeResent = false;
        this.disableButton = false;
        this.transferAdminInfoToSubscription = new core_1.EventEmitter();
        this.createEmailVerificationCodeForm();
    }
    AdminEmailVerificationComponent.prototype.ngOnInit = function () {
    };
    AdminEmailVerificationComponent.prototype.ngOnChanges = function () {
        this.adminEmail = this.adminInfo.adminEmailId;
    };
    AdminEmailVerificationComponent.prototype.createEmailVerificationCodeForm = function () {
        this.emailVerificationCodeForm = this._formBuilder.group({
            verificationCode: [null, forms_1.Validators.required]
        });
    };
    AdminEmailVerificationComponent.prototype.resendVerificationCode = function () {
        var _this = this;
        this._createAccountService.resendEmailVerificationCode(this.adminInfo.adminId)
            .subscribe(function (response) {
            var jsonResponse = response.json();
            if (jsonResponse = "email sent") {
                _this.displayVerificationCodeResent = true;
                _this.displayErrorMessage = false;
            }
            else {
                _this.displayVerificationCodeResent = false;
                _this.errorMsg = "Failed to resend verification code, please try again.";
                _this.displayErrorMessage = true;
                window.scrollTo(0, 0);
            }
        }, function (error) {
            _this.errorMsg = "Connection error, please try again later.";
            _this.displayErrorMessage = true;
            //console.log("createAdminProfile error: ", error.status)
        });
    };
    AdminEmailVerificationComponent.prototype.onClickConfirmCode = function (formData) {
        var _this = this;
        //console.log("emailVerificationCodeForm...", formData);
        this.disableButton = true;
        // confirm code
        this._createAccountService.confirmVerificationCode(formData)
            .subscribe(function (response) {
            var jsonResponse = response.json();
            //console.log("code verification result...",jsonResponse)
            if (jsonResponse == true) {
                _this.displayVerificationCodeResent = true;
                _this.displayErrorMessage = false;
                // send admin info to subscription page
                _this.transferAdminInfoToSubscription.emit({ adminInfo: _this.adminInfo });
            }
            else {
                _this.disableButton = false;
                _this.displayVerificationCodeResent = false;
                _this.errorMsg = "Entered Verification Code is not valid, please enter valid code.";
                _this.displayErrorMessage = true;
                window.scrollTo(0, 0);
            }
        }, function (error) {
            _this.disableButton = false;
            _this.errorMsg = "Connection error, please try again later.";
            _this.displayErrorMessage = true;
            // console.log("createAdminProfile error: ", error.status)
        });
        // check if the form is not empty
        /*if (formData.status == "INVALID") {
            console.log("VerificationCode: ", formData.value);
            this.displayRequiredFieldError = true;
            window.scrollTo(0, 0);
        } else {
            console.log("VerificationCode: ", formData.value)
            let verificationCode = formData.value;
            console.log("emailVerificationCodeForm...verificationCode...", verificationCode);
            this.displayRequiredFieldError = false;

            // confirm code
            this._createAccountService.confirmVerificationCode(this.code)
                .subscribe(response => {

                    let jsonResponse = response.json()
                    console.log("code verification result...",jsonResponse)
                    if (jsonResponse == true) {
                        this.displayVerificationCodeResent = true;
                        this.displayErrorMessage = false;

                        // send admin info to subscription page
                        this.transferAdminInfoToSubscription.emit({adminInfo: this.adminInfo});
                    } else {
                        this.displayVerificationCodeResent = false;
                        this.errorMsg = "Entered Verification Code is not valid, please enter valid code."
                        this.displayErrorMessage = true;
                        window.scrollTo(0, 0);

                    }
                },
                error => {
                    this.errorMsg = "Connection error, please try again later.";
                    this.displayErrorMessage = true;
                    console.log("createAdminProfile error: ", error.status)
                })
        }*/
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], AdminEmailVerificationComponent.prototype, "adminInfo", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], AdminEmailVerificationComponent.prototype, "transferAdminInfoToSubscription", void 0);
    AdminEmailVerificationComponent = __decorate([
        core_1.Component({
            selector: 'adminEmailVerification',
            templateUrl: 'app/createAccount/adminEmailVerification/adminEmailVerificationTemplate.html'
        }), 
        __metadata('design:paramtypes', [createAccountService_1.CreateAccountService, router_1.Router, forms_1.FormBuilder])
    ], AdminEmailVerificationComponent);
    return AdminEmailVerificationComponent;
}());
exports.AdminEmailVerificationComponent = AdminEmailVerificationComponent;
