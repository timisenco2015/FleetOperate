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
var forgotPasswordService_1 = require("./forgotPasswordService");
var ForgotPasswordComponent = (function () {
    function ForgotPasswordComponent(_formBuilder, forgotPasswordService, router) {
        this._formBuilder = _formBuilder;
        this.forgotPasswordService = forgotPasswordService;
        this.router = router;
        this.createForgotPasswordForm();
    }
    ForgotPasswordComponent.prototype.ngOnInit = function () {
    };
    ForgotPasswordComponent.prototype.createForgotPasswordForm = function () {
        this.forgotPasswordForm = this._formBuilder.group({
            username: this._formBuilder.control(null)
        });
    };
    ForgotPasswordComponent.prototype.onClickSendRequest = function (username) {
        var _this = this;
        //console.log("The username is 11: ", username.valueOf())
        //console.log("The username is 22: ", username['username'])
        this.forgotPasswordService.getCognitoPoolData()
            .subscribe(function (response) {
            var poolInfo = response;
            _this.forgotPasswordService.forgotPassword(username['username'], poolInfo);
        });
    };
    ForgotPasswordComponent.prototype.onClickCancel = function () {
        this.router.navigate(['login']);
    };
    ForgotPasswordComponent = __decorate([
        core_1.Component({
            selector: 'forgotPassword',
            templateUrl: 'app/forgotPassword/forgotPasswordTemplate.html'
        }), 
        __metadata('design:paramtypes', [forms_1.FormBuilder, forgotPasswordService_1.ForgotPasswordService, router_1.Router])
    ], ForgotPasswordComponent);
    return ForgotPasswordComponent;
}());
exports.ForgotPasswordComponent = ForgotPasswordComponent;
