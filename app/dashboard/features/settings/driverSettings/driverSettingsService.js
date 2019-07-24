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
var app_service_1 = require('../../../../app.service');
var DriverSettingsService = (function () {
    // private url1 = 'app/dashboard/features/drivers/driverDataBase.json';
    // private url = 'http://localhost:8082/fleetops/driver';
    function DriverSettingsService(_http, appService) {
        this._http = _http;
        this.appService = appService;
        this.username = "user";
        this.password = "user";
    }
    DriverSettingsService.prototype.extractData = function (response) {
        var serverResponse = response;
        return serverResponse || {};
    };
    DriverSettingsService.prototype.handleError = function (error) {
        console.error(error);
        return Observable_1.Observable.throw(error.json().error || "Server error");
    };
    DriverSettingsService.prototype.createAuthorizationHeader = function () {
        var headers = new http_1.Headers();
        // headers.append("Content-Type", "application/json");
        headers.append('Content-Type', 'application/json');
        headers.append('Accept', 'application/json');
        headers.append('Authorization', 'Basic ' + btoa(this.username + ':' + this.password));
        console.log("Authorization:..", 'Basic ' + btoa(this.username + ':' + this.password));
        // headers.append("Accept", "application/json");
        return headers;
    };
    DriverSettingsService.prototype.checkIfUsernameExistsInDB = function (emailId) {
        console.log("Inside service username is:..", emailId);
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        headers.append('Authorization', 'Basic ' +
            btoa(this.username + ':' + this.password));
        var options = new http_1.RequestOptions({ headers: headers });
        return this._http.post(this.appService.companyUrl + "/emailIdCheck/" + emailId + "/", options)
            .map(this.extractData)
            .catch(this.handleError);
    };
    DriverSettingsService.prototype.getDrivers = function (companyId) {
        return this._http.get(this.appService.driverUrl + "/driverList/" + companyId, { headers: this.createAuthorizationHeader(),
            body: "" })
            .map(this.extractData)
            .catch(this.handleError);
    };
    DriverSettingsService.prototype.addDriver = function (newDriverDetails) {
        console.log("Inside service:..", newDriverDetails);
        var body = JSON.stringify(newDriverDetails);
        console.log("Inside service json file:..", body);
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        var options = new http_1.RequestOptions({ headers: headers });
        return this._http.post(this.appService.driverUrl, body, options)
            .map(this.extractData)
            .catch(this.handleError);
    };
    DriverSettingsService.prototype.updateDriver = function (editedDriverDetails, driverId) {
        console.log("Inside service updateDriver:..", editedDriverDetails);
        console.log("Inside service updateDriverr ID is:..", driverId);
        var body = JSON.stringify(editedDriverDetails);
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        var options = new http_1.RequestOptions({ headers: headers });
        return this._http.put(this.appService.driverUrl + "/" + driverId, body, options)
            .catch(this.handleError);
    };
    DriverSettingsService.prototype.deleteDriver = function (driverId) {
        return this._http.delete(this.appService.driverUrl + "/" + driverId)
            .map(this.extractData)
            .catch(this.handleError);
    };
    DriverSettingsService.prototype.getDriverToEdit = function (driverId) {
        console.log("In service edit driverId:..", driverId);
        return this._http.get(this.appService.driverUrl + "/" + driverId)
            .map(this.extractData)
            .catch(this.handleError);
    };
    DriverSettingsService.prototype.confirmDriver = function (username) {
        console.log("username in service :..", username);
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        var options = new http_1.RequestOptions({ headers: headers });
        return this._http.post(this.appService.driverUrl + "/adminConfirmDriver/" + username, options)
            .map(this.extractData)
            .catch(this.handleError);
    };
    DriverSettingsService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http, app_service_1.AppService])
    ], DriverSettingsService);
    return DriverSettingsService;
}());
exports.DriverSettingsService = DriverSettingsService;
