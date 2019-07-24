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
var createAccountService_1 = require("./createAccountService");
var router_1 = require("@angular/router");
var CreateAccountComponent = (function () {
    function CreateAccountComponent(_createAccountService, router, _formBuilder) {
        this._createAccountService = _createAccountService;
        this.router = router;
        this._formBuilder = _formBuilder;
        this.showAdmin = true;
        this.showConfirmEmail = false;
        this.showSubscription = false;
        this.showCompany = false;
        this.showShipping = false;
        this.showPayment = false;
        this.showPaymentConfirmation = false;
        this.adminActive = true;
        this.confirmEmailActive = false;
        this.subscriptionActive = false;
        this.companyActive = false;
        this.shippingActive = false;
        this.paymentActive = false;
    }
    CreateAccountComponent.prototype.ngOnInit = function () {
    };
    CreateAccountComponent.prototype.ngOnChanges = function () {
    };
    CreateAccountComponent.prototype.receiveAdminId = function ($event) {
        this.onClickConfirmEmail();
        //console.log("receiveAdminId in CreateAccount...", $event.adminInfo)
        this.emitAdminInfoToVerify = $event.adminInfo;
    };
    CreateAccountComponent.prototype.adminInfoFromEmailConfirmaion = function ($event) {
        this.onClickSubscription();
        //console.log("receiveAdminId in CreateAccount...", $event.adminInfo)
        this.emitAdminInfoToSubscription = $event.adminInfo;
    };
    CreateAccountComponent.prototype.dataFromSubscription = function ($event) {
        this.onClickCompanyProfile();
        //console.log("dataFromSubscription in CreateAccount...", $event.adminInfo)
        //console.log("dataFromSubscription in CreateAccount...", $event.orderQuantities)
        this.emitSubscriptionDataToCompany = $event;
    };
    CreateAccountComponent.prototype.dataFromCompany = function ($event) {
        this.onClickShipping();
        //console.log("dataFromCompany in CreateAccount...", $event.companyInfo)
        //console.log("dataFromCompany in CreateAccount...", $event.adminInfo)
        //console.log("dataFromCompany in CreateAccount...", $event)
        this.emitCompanyDataToShipping = $event;
    };
    CreateAccountComponent.prototype.dataFromShipping = function ($event) {
        this.onClickPayment();
        //console.log("dataFromCompany in CreateAccount...", $event)
        this.emitShippingDataToPayment = $event;
    };
    CreateAccountComponent.prototype.dataFromPayment = function ($event) {
        this.onClickPaymentConfirmation();
        //console.log("dataFromCompany in CreateAccount...", $event)
        this.emitPaymentToPaymentConfirmation = $event;
    };
    CreateAccountComponent.prototype.onClickAdmin = function () {
        this.showAdmin = true;
        this.showConfirmEmail = false;
        this.showSubscription = false;
        this.showCompany = false;
        this.showShipping = false;
        this.showPayment = false;
        this.showPaymentConfirmation = false;
        this.adminActive = false;
        this.confirmEmailActive = false;
        this.subscriptionActive = false;
        this.companyActive = false;
        this.shippingActive = false;
        this.paymentActive = false;
    };
    CreateAccountComponent.prototype.onClickConfirmEmail = function () {
        this.showAdmin = false;
        this.showConfirmEmail = true;
        this.showSubscription = false;
        this.showCompany = false;
        this.showShipping = false;
        this.showPayment = false;
        this.showPaymentConfirmation = false;
        this.adminActive = false;
        this.confirmEmailActive = true;
        this.subscriptionActive = false;
        this.companyActive = false;
        this.shippingActive = false;
        this.paymentActive = false;
    };
    CreateAccountComponent.prototype.onClickSubscription = function () {
        this.showAdmin = false;
        this.showConfirmEmail = false;
        this.showSubscription = true;
        this.showCompany = false;
        this.showShipping = false;
        this.showPayment = false;
        this.showPaymentConfirmation = false;
        this.adminActive = false;
        this.confirmEmailActive = false;
        this.subscriptionActive = true;
        this.companyActive = false;
        this.shippingActive = false;
        this.paymentActive = false;
    };
    CreateAccountComponent.prototype.onClickCompanyProfile = function () {
        this.showAdmin = false;
        this.showConfirmEmail = false;
        this.showSubscription = false;
        this.showCompany = true;
        this.showShipping = false;
        this.showPayment = false;
        this.showPaymentConfirmation = false;
        this.adminActive = false;
        this.confirmEmailActive = false;
        this.subscriptionActive = false;
        this.companyActive = true;
        this.shippingActive = false;
        this.paymentActive = false;
    };
    CreateAccountComponent.prototype.onClickShipping = function () {
        this.showAdmin = false;
        this.showConfirmEmail = false;
        this.showSubscription = false;
        this.showCompany = false;
        this.showShipping = true;
        this.showPayment = false;
        this.showPaymentConfirmation = false;
        this.adminActive = false;
        this.confirmEmailActive = false;
        this.subscriptionActive = false;
        this.companyActive = false;
        this.shippingActive = true;
        this.paymentActive = false;
    };
    CreateAccountComponent.prototype.onClickPayment = function () {
        this.showAdmin = false;
        this.showConfirmEmail = false;
        this.showSubscription = false;
        this.showCompany = false;
        this.showShipping = false;
        this.showPayment = true;
        this.showPaymentConfirmation = false;
        this.adminActive = false;
        this.confirmEmailActive = false;
        this.subscriptionActive = false;
        this.companyActive = false;
        this.shippingActive = false;
        this.paymentActive = true;
    };
    CreateAccountComponent.prototype.onClickPaymentConfirmation = function () {
        this.showAdmin = false;
        this.showConfirmEmail = false;
        this.showSubscription = false;
        this.showCompany = false;
        this.showShipping = false;
        this.showPayment = false;
        this.adminActive = false;
        this.confirmEmailActive = false;
        this.subscriptionActive = false;
        this.companyActive = false;
        this.shippingActive = false;
        this.paymentActive = false;
        this.showPaymentConfirmation = true;
    };
    CreateAccountComponent = __decorate([
        core_1.Component({
            selector: 'createAccount',
            templateUrl: 'app/createAccount/createAccountTemplate.html'
        }), 
        __metadata('design:paramtypes', [createAccountService_1.CreateAccountService, router_1.Router, forms_1.FormBuilder])
    ], CreateAccountComponent);
    return CreateAccountComponent;
}());
exports.CreateAccountComponent = CreateAccountComponent;
