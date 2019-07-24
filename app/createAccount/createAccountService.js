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
var http_1 = require('@angular/http');
var Observable_1 = require('rxjs/Observable');
var app_service_1 = require('../app.service');
var CreateAccountService = (function () {
    function CreateAccountService(_http, appService) {
        this._http = _http;
        this.appService = appService;
        this.username = "admin";
        this.password = "admin";
    }
    CreateAccountService.prototype.addCompanyAndAdmin = function (companyAndAdminDetails) {
        //console.log("Inside service companyAndAdminDetails are:..", companyAndAdminDetails)
        var body = JSON.stringify(companyAndAdminDetails);
        //console.log("Inside service companyAndAdminDetails json is:..", body)
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        headers.append('Authorization', 'Basic ' +
            btoa(this.username + ':' + this.password));
        var options = new http_1.RequestOptions({ headers: headers });
        return this._http.post(this.appService.companyUrl, body, options)
            .map(this.extractData)
            .catch(this.handleError);
    };
    CreateAccountService.prototype.checkIfUsernameExistsInDB = function (/*username: string, */ emailId) {
        //console.log("Inside service emailId is:..", emailId)
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        headers.append('Authorization', 'Basic ' +
            btoa(this.username + ':' + this.password));
        var options = new http_1.RequestOptions({ headers: headers });
        return this._http.post(this.appService.companyUrl + "adminEmailIdCheck/" + emailId + "/", options)
            .map(this.extractData)
            .catch(this.handleError);
    };
    CreateAccountService.prototype.createAdminProfile = function (adminProfile) {
        //console.log("createAdminProfile service is called:..", adminProfile);
        var body = JSON.stringify(adminProfile);
        //console.log("Inside service createAdminProfile json is:..", body)
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        headers.append('Authorization', 'Basic ' +
            btoa(this.username + ':' + this.password));
        var options = new http_1.RequestOptions({ headers: headers });
        return this._http.post(this.appService.companyUrl + "adminProfile", body, options)
            .map(this.extractData)
            .catch(this.handleError);
    };
    CreateAccountService.prototype.resendEmailVerificationCode = function (adminId) {
        //console.log("resendEmailVerificationCode service is called:..", adminId);
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        headers.append('Authorization', 'Basic ' +
            btoa(this.username + ':' + this.password));
        var options = new http_1.RequestOptions({ headers: headers });
        return this._http.post(this.appService.companyUrl + "resendEmailVerificationCode/" + adminId, options)
            .map(this.extractData)
            .catch(this.handleError);
    };
    CreateAccountService.prototype.confirmVerificationCode = function (verificationCode) {
        //console.log("confirmVerificationCode service is called:..", verificationCode);
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        headers.append('Authorization', 'Basic ' +
            btoa(this.username + ':' + this.password));
        var options = new http_1.RequestOptions({ headers: headers });
        return this._http.post(this.appService.companyUrl + "confirmAdminVerificationCode/" + verificationCode, options)
            .map(this.extractData)
            .catch(this.handleError);
    };
    CreateAccountService.prototype.createCompanyOrderProfile = function (companyOrderDetails) {
        //console.log("Inside service companyAndAdminDetails are:..", companyOrderDetails)
        var body = JSON.stringify(companyOrderDetails);
        //console.log("Inside service companyAndAdminDetails json is:..", body)
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        headers.append('Authorization', 'Basic ' +
            btoa(this.username + ':' + this.password));
        var options = new http_1.RequestOptions({ headers: headers });
        return this._http.post(this.appService.companyUrl + "companyProfileAndOrder", body, options)
            .map(this.extractData)
            .catch(this.handleError);
    };
    CreateAccountService.prototype.makePayment = function (stripePaymentRequest) {
        //console.log("Inside service stripePaymentRequest are:..", stripePaymentRequest)
        var body = JSON.stringify(stripePaymentRequest);
        //console.log("Inside service companyAndAdminDetails json is:..", body)
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        headers.append('Authorization', 'Basic ' +
            btoa(this.username + ':' + this.password));
        var options = new http_1.RequestOptions({ headers: headers });
        return this._http.post(this.appService.companyUrl + "makePayment", body, options)
            .map(this.extractData)
            .catch(this.handleError);
    };
    CreateAccountService.prototype.extractData = function (response) {
        var serverResponse = response;
        var map = response.headers;
        //console.log("create account response..", serverResponse)
        // console.log("header map:..", map)
        return serverResponse || {};
    };
    CreateAccountService.prototype.handleError = function (error) {
        //console.error("Error: ", error)
        return Observable_1.Observable.throw(error || "Server error");
    };
    CreateAccountService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http, app_service_1.AppService])
    ], CreateAccountService);
    return CreateAccountService;
}());
exports.CreateAccountService = CreateAccountService;
