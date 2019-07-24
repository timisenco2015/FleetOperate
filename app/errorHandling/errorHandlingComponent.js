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
var ErrorHandlingComponent = (function () {
    function ErrorHandlingComponent() {
    }
    ErrorHandlingComponent.prototype.ngOnInit = function () {
        if (this.loginErrorCode != null) {
            this.loginErrors(this.loginErrorCode);
        }
        else if (this.errorCode != null) {
            this.dashboardError(this.errorCode);
        }
    };
    ErrorHandlingComponent.prototype.ngOnChanges = function () {
        if (this.loginErrorCode != null) {
            this.loginErrors(this.loginErrorCode);
        }
        else if (this.errorCode != null) {
            this.dashboardError(this.errorCode);
        }
    };
    ErrorHandlingComponent.prototype.loginErrors = function (errorCode) {
        //console.log("login error executed..", errorCode)
        if (errorCode == 401 && 403) {
            this.errorMessage = "Username and Password does not match, please enter valid Username and Password and try again.";
        }
        else {
            this.errorMessage = "Username and Password does not match, please enter valid Username and Password and try again..";
        }
    };
    ErrorHandlingComponent.prototype.dashboardError = function (errorCode) {
        //console.log("dashboardError executed..", errorCode)
        window.scrollTo(0, 0);
        if (errorCode == 401 && 403 && 503 && 504 && 408) {
            this.errorMessage = "Session timeout, please login again.";
        }
        else {
            this.errorMessage = "Connection error, please try after some time.";
        }
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], ErrorHandlingComponent.prototype, "loginErrorCode", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], ErrorHandlingComponent.prototype, "errorCode", void 0);
    ErrorHandlingComponent = __decorate([
        core_1.Component({
            selector: 'error',
            templateUrl: 'app/errorHandling/errorHandlingTemplate.html'
        }), 
        __metadata('design:paramtypes', [])
    ], ErrorHandlingComponent);
    return ErrorHandlingComponent;
}());
exports.ErrorHandlingComponent = ErrorHandlingComponent;
