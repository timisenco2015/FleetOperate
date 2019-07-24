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
var CompanyProfileComponent = (function () {
    function CompanyProfileComponent(_createAccountService, router, _formBuilder) {
        this._createAccountService = _createAccountService;
        this.router = router;
        this._formBuilder = _formBuilder;
        this.displayRequiredFieldError = false;
        this.sendCompanyAdminOrderInfo = new core_1.EventEmitter();
        this.showCanadaProvinces = true;
        this.showUSProvinces = false;
        this.disableButton = false;
        this.creatCompanyForm();
    }
    CompanyProfileComponent.prototype.ngOnInit = function () {
    };
    CompanyProfileComponent.prototype.ngOnChanges = function () {
    };
    CompanyProfileComponent.prototype.creatCompanyForm = function () {
        this.companyProfileForm = this._formBuilder.group({
            companyName: [null, forms_1.Validators.required],
            companyAddressLine1: [null, forms_1.Validators.required],
            companyAddressLine2: [null],
            companyCity: [null, forms_1.Validators.required],
            companyProvince: [null, forms_1.Validators.required],
            companyPostalCode: [null, forms_1.Validators.required],
            companyCountry: [null, forms_1.Validators.required]
        });
    };
    CompanyProfileComponent.prototype.onClickCountry = function (value) {
        //console.log("onClickCountry is called..value..",value)
        if (value == "CANADA") {
            this.showCanadaProvinces = true;
            this.showUSProvinces = false;
        }
        else {
            this.showCanadaProvinces = false;
            this.showUSProvinces = true;
        }
    };
    CompanyProfileComponent.prototype.onClickContinue = function (formData) {
        //console.log("onClickContinue..company profile..", formData.value)
        this.disableButton = true;
        if (formData.status == "INVALID") {
            //console.log("onClickContinue..company profile..INVALID..", formData.status)
            this.displayRequiredFieldError = true;
            window.scrollTo(0, 0);
            this.disableButton = false;
        }
        else {
            //console.log("onClickContinue..company profile..VALID..", formData.status)
            this.displayRequiredFieldError = false;
            /*sessionStorage.setItem('cNm', JSON.stringify(formData.value.companyName));
            sessionStorage.setItem('cAd1', JSON.stringify(formData.value.companyAddressLine1));
            sessionStorage.setItem('cAd2', JSON.stringify(formData.value.companyAddressLine2));
            sessionStorage.setItem('cct', JSON.stringify(formData.value.companyCity));
            sessionStorage.setItem('cpv', JSON.stringify(formData.value.companyProvince));
            sessionStorage.setItem('cpc', JSON.stringify(formData.value.companyPostalCode));
            sessionStorage.setItem('ccy', JSON.stringify(formData.value.companyCountry));*/
            this.sendCompanyAdminOrderInfo.emit({
                companyInfo: formData.value,
                adminInfo: this.subscriptionData.adminInfo,
                orderQuantities: this.subscriptionData.orderQuantities,
                ordersList: this.subscriptionData.ordersList,
                ordersBillSummary: this.subscriptionData.ordersBillSummary,
                billCalculations: this.subscriptionData.billCalculations
            });
        }
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], CompanyProfileComponent.prototype, "subscriptionData", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], CompanyProfileComponent.prototype, "sendCompanyAdminOrderInfo", void 0);
    CompanyProfileComponent = __decorate([
        core_1.Component({
            selector: 'companyProfile',
            templateUrl: 'app/createAccount/companyProfile/companyProfileTemplate.html'
        }), 
        __metadata('design:paramtypes', [createAccountService_1.CreateAccountService, router_1.Router, forms_1.FormBuilder])
    ], CompanyProfileComponent);
    return CompanyProfileComponent;
}());
exports.CompanyProfileComponent = CompanyProfileComponent;
