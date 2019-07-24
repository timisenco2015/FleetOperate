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
var PaymentConfirmationComponent = (function () {
    function PaymentConfirmationComponent(_createAccountService, router, _formBuilder) {
        this._createAccountService = _createAccountService;
        this.router = router;
        this._formBuilder = _formBuilder;
    }
    PaymentConfirmationComponent.prototype.ngOnInit = function () {
    };
    PaymentConfirmationComponent.prototype.ngOnChanges = function () {
    };
    PaymentConfirmationComponent.prototype.onClickGotoSignIn = function () {
        this.router.navigate(['login']);
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], PaymentConfirmationComponent.prototype, "companyId", void 0);
    PaymentConfirmationComponent = __decorate([
        core_1.Component({
            selector: 'paymentConfirmation',
            templateUrl: 'app/createAccount/paymentConfirmation/paymentConfirmationTemplate.html'
        }), 
        __metadata('design:paramtypes', [createAccountService_1.CreateAccountService, router_1.Router, forms_1.FormBuilder])
    ], PaymentConfirmationComponent);
    return PaymentConfirmationComponent;
}());
exports.PaymentConfirmationComponent = PaymentConfirmationComponent;
