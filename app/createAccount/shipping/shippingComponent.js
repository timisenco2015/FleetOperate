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
var ShippingComponent = (function () {
    function ShippingComponent(_createAccountService, router, _formBuilder) {
        this._createAccountService = _createAccountService;
        this.router = router;
        this._formBuilder = _formBuilder;
        this.showShippingAddress = true;
        this.displayErrorMessage = false;
        this.displayRequiredFieldError = false;
        this.showCanadaProvinces = true;
        this.showUSProvinces = false;
        this.disableButton = false;
        this.sendCompanyOrderInfo = new core_1.EventEmitter();
        this.createShippingForm();
    }
    ShippingComponent.prototype.ngOnInit = function () {
    };
    ShippingComponent.prototype.ngOnChanges = function () {
        //console.log("ShippingComponent...companyData..", this.companyData);
        this.companyAddress = this.companyData.companyInfo.companyAddressLine1 + ", " +
            this.companyData.companyInfo.companyCity + ", " +
            this.companyData.companyInfo.companyProvince + ", " +
            this.companyData.companyInfo.companyCountry + ", " +
            this.companyData.companyInfo.companyPostalCode;
    };
    ShippingComponent.prototype.createShippingForm = function () {
        this.shippingForm = this._formBuilder.group({
            shippingAddressLine1: [null, forms_1.Validators.required],
            shippingAddressLine2: [null],
            shippingCity: [null, forms_1.Validators.required],
            shippingProvince: [null, forms_1.Validators.required],
            shippingCountry: [null, forms_1.Validators.required],
            shippingPostalCode: [null, forms_1.Validators.required]
        });
    };
    ShippingComponent.prototype.onClickSameAddress = function () {
        this.showShippingAddress = !this.showShippingAddress;
        //console.log("ShippingComponent...showShippingAddress..", this.showShippingAddress);
    };
    ShippingComponent.prototype.onClickCountry = function (value) {
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
    ShippingComponent.prototype.onClickContinue = function (formData) {
        //console.log("onClickContinue...showShippingAddress..", this.showShippingAddress);
        //console.log("onClickContinue...formData..", formData.value);
        var _this = this;
        this.disableButton = true;
        var shippingAddress = this.createShippingAddress(this.showShippingAddress, formData);
        //this.storeShippingAddressInSession(shippingAddress);
        var companyOrderProfile = this.createCompanyOrderProfile(shippingAddress);
        var jsoncompanyOrderProfile = JSON.stringify(companyOrderProfile);
        //console.log("jsoncompanyOrderProfile.....", jsoncompanyOrderProfile);
        this._createAccountService.createCompanyOrderProfile(companyOrderProfile)
            .subscribe(function (response) {
            _this.createCompanyOrderProfileResponse = response.json();
            //console.log("createCompanyOrderProfileResponse :...", this.createCompanyOrderProfileResponse)
            //let jsonCompanyOrderProfileResponse = JSON.stringify(this.createCompanyOrderProfileResponse)
            //sessionStorage.setItem('jsonCompanyOrderProfileResponse', jsonCompanyOrderProfileResponse);
            _this.sendCompanyOrderInfo.emit({
                createCompanyOrderProfileResponse: _this.createCompanyOrderProfileResponse,
                ordersBillSummary: _this.companyData.ordersBillSummary,
                billCalculations: _this.companyData.billCalculations
            });
        }, function (error) {
            _this.disableButton = false;
            _this.errorMsg = "Connection error, please try again later.";
            _this.displayErrorMessage = true;
            //console.log("createCompanyOrderProfile error: ", error.status)
        });
    };
    /*storeShippingAddressInSession(shippingAddress){
        sessionStorage.setItem('sAd1', JSON.stringify(shippingAddress.addressLine1));
        sessionStorage.setItem('sAd2', JSON.stringify(shippingAddress.addressLine2));
        sessionStorage.setItem('sct', JSON.stringify(shippingAddress.city));
        sessionStorage.setItem('spv', JSON.stringify(shippingAddress.province));
        sessionStorage.setItem('spc', JSON.stringify(shippingAddress.postalCode));
        sessionStorage.setItem('scy', JSON.stringify(shippingAddress.country));
    }*/
    ShippingComponent.prototype.createShippingAddress = function (showShippingAddress, formData) {
        if (showShippingAddress == false) {
            /*this.shippingAddress = {
                 "addressId": null,
                 "addressLine1": JSON.parse(sessionStorage.getItem('cAd1')),
                 "addressLine2": JSON.parse(sessionStorage.getItem('cAd2')),
                 "city": JSON.parse(sessionStorage.getItem('cct')),
                 "province": JSON.parse(sessionStorage.getItem('cpv')),
                 "postalCode": JSON.parse(sessionStorage.getItem('cpc')),
                 "country": JSON.parse(sessionStorage.getItem('ccy'))
             }*/
            this.shippingAddress = {
                "addressId": null,
                "addressLine1": this.companyData.companyInfo.companyAddressLine1,
                "addressLine2": this.companyData.companyInfo.companyAddressLine2,
                "city": this.companyData.companyInfo.companyCity,
                "province": this.companyData.companyInfo.companyProvince,
                "postalCode": this.companyData.companyInfo.companyPostalCode,
                "country": this.companyData.companyInfo.companyCountry
            };
            return this.shippingAddress;
        }
        else {
            if (formData.status == "INVALID") {
                this.displayRequiredFieldError = true;
                this.disableButton = false;
            }
            else {
                this.displayRequiredFieldError = false;
                this.shippingAddress = {
                    "addressId": null,
                    "addressLine1": this.shippingForm.value.shippingAddressLine1,
                    "addressLine2": this.shippingForm.value.shippingAddressLine2,
                    "city": this.shippingForm.value.shippingCity,
                    "province": this.shippingForm.value.shippingProvince,
                    "postalCode": this.shippingForm.value.shippingCountry,
                    "country": this.shippingForm.value.shippingPostalCode
                };
            }
            return this.shippingAddress;
        }
    };
    ShippingComponent.prototype.createCompanyOrderProfile = function (shippingAddress) {
        //let orderList = this.getOrderList();
        var postCompanyOrderProfile = {
            "companyInfo": {
                "companyId": null,
                "companyName": this.companyData.companyInfo.companyName,
                "companyAddressDetails": {
                    "addressId": null,
                    "addressLine1": this.companyData.companyInfo.companyAddressLine1,
                    "addressLine2": this.companyData.companyInfo.companyAddressLine2,
                    "city": this.companyData.companyInfo.companyCity,
                    "province": this.companyData.companyInfo.companyProvince,
                    "postalCode": this.companyData.companyInfo.companyPostalCode,
                    "country": this.companyData.companyInfo.companyCountry
                },
                "companyStatus": "PAYMENT_PENDING"
            },
            "ordersList": this.companyData.ordersList,
            "shippingAddress": shippingAddress,
            "adminId": this.companyData.adminInfo.adminId
        };
        return postCompanyOrderProfile;
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], ShippingComponent.prototype, "companyData", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], ShippingComponent.prototype, "sendCompanyOrderInfo", void 0);
    ShippingComponent = __decorate([
        core_1.Component({
            selector: 'shipping',
            templateUrl: 'app/createAccount/shipping/shippingTemplate.html'
        }), 
        __metadata('design:paramtypes', [createAccountService_1.CreateAccountService, router_1.Router, forms_1.FormBuilder])
    ], ShippingComponent);
    return ShippingComponent;
}());
exports.ShippingComponent = ShippingComponent;
