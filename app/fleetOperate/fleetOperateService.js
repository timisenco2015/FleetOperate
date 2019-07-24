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
var FleetOperateService = (function () {
    function FleetOperateService(_http, appService) {
        this._http = _http;
        this.appService = appService;
        this.url = 'app/fleetOperate/fleetOperateFeatures.json';
        this.username = "admin";
        this.password = "admin";
    }
    FleetOperateService.prototype.extractData = function (response) {
        var serverResponse = response;
        //console.log("serverResponse..", serverResponse)
        return serverResponse;
    };
    FleetOperateService.prototype.checkIfAdminUsernameExistsInDB = function (/*username: string, */ emailId) {
        //console.log("Inside service emailId is:..", emailId)
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        headers.append('Authorization', 'Basic ' +
            btoa(this.username + ':' + this.password));
        var options = new http_1.RequestOptions({ headers: headers });
        return this._http.post(this.appService.companyUrl + "adminEmailIdCheck/" + emailId + "/", options)
            .map(this.extractData)
            .catch(this.handleError);
    };
    FleetOperateService.prototype.checkIfDriverUsernameExistsInDB = function (/*username: string, */ emailId) {
        //console.log("Inside service emailId is:..", emailId)
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        headers.append('Authorization', 'Basic ' +
            btoa(this.username + ':' + this.password));
        var options = new http_1.RequestOptions({ headers: headers });
        return this._http.post(this.appService.companyUrl + "driverEmailIdCheck/" + emailId + "/", options)
            .map(this.extractData)
            .catch(this.handleError);
    };
    FleetOperateService.prototype.getCompanyStatus = function (companyId) {
        return this._http.get(this.appService.companyUrl + "companyStatus/" + companyId)
            .map(this.extractData)
            .catch(this.handleError);
    };
    FleetOperateService.prototype.getCompanyAdminInfo = function (companyId, adminId) {
        return this._http.get(this.appService.companyUrl + "companyAdminInfo/" + companyId + "/" + adminId)
            .map(function (response) {
            //console.log("getCompanyAdminInfo response...", response.json());
            return response;
        })
            .catch(this.handleError);
    };
    FleetOperateService.prototype.postCompleteCompanyAdminProfile = function (companyAdminInfo) {
        // console.log("postCompleteCompanyAdminProfile service is called:..", companyAdminInfo);
        //let body = JSON.stringify(companyAdminInfo);
        // console.log("Inside service createAdminProfile json is:..", body)
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        headers.append('Authorization', 'Basic ' +
            btoa(this.username + ':' + this.password));
        var options = new http_1.RequestOptions({ headers: headers });
        return this._http.post(this.appService.companyUrl + "companyAdminProfile", companyAdminInfo, options)
            .map(this.extractData)
            .catch(this.handleError);
    };
    FleetOperateService.prototype.getFeaturesList = function (companyId) {
        return this._http.get(this.url)
            .map(this.extractData)
            .catch(this.handleError);
    };
    FleetOperateService.prototype.handleError = function (error) {
        // console.error(error)
        return Observable_1.Observable.throw(error.json().error || "Server error");
    };
    FleetOperateService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http, app_service_1.AppService])
    ], FleetOperateService);
    return FleetOperateService;
}());
exports.FleetOperateService = FleetOperateService;
