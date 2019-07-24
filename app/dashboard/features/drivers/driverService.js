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
var app_service_1 = require('../../../app.service');
var DriverService = (function () {
    function DriverService(_http, appService) {
        this._http = _http;
        this.appService = appService;
        this.url = 'app/dashboard/features/drivers/driverDataBase.json';
        this.username = "admin";
        this.password = "admin";
    }
    DriverService.prototype.extractData = function (response) {
        var requestResponse = response;
        return requestResponse || {};
    };
    DriverService.prototype.createAuthorizationHeader = function () {
        var headers = new http_1.Headers();
        // headers.append("Content-Type", "application/json");
        headers.append('Content-Type', 'application/json');
        headers.append('Accept', 'application/json');
        headers.append('Authorization', 'Basic ' + btoa(this.username + ':' + this.password));
        console.log("Authorization:..", 'Basic ' + btoa(this.username + ':' + this.password));
        // headers.append("Accept", "application/json");
        return headers;
    };
    DriverService.prototype.updateDrivers = function (data) {
        var bodyString = JSON.stringify(data); // Stringify drivers object
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
        var options = new http_1.RequestOptions({ headers: headers }); // Create a request option
        return this._http.put(this.appService.driverUrl, bodyString, options) // ...using put request
            .map(function (res) { return res.json(); }) // ...and calling .json() on the response to return data
            .catch(function (error) { return Observable_1.Observable.throw(error.json().error || 'Server error'); }); //...errors if any
    };
    DriverService.prototype.addDrivers = function (data) {
        var bodyString = JSON.stringify(data); // Stringify drivers object
        var headers = this.createAuthorizationHeader(); // ... Set content type to JSON
        var options = new http_1.RequestOptions({ headers: headers }); // Create a request option
        return this._http.post(this.appService.driverUrl, bodyString, options) // ...using put request
            .map(this.extractData) // ...and calling .json() on the response to return data
            .do(function (data) { return console.log("Data received: " + JSON.stringify(data)); })
            .catch(this.handleError); //...errors if any
    };
    /*getDrivers(companyId: number): Observable<any> {
        return this._http.get(this.appService.driverUrl+"/summary/"+companyId, {headers: this.createAuthorizationHeader(),
            body:""})
            .map(this.extractData)
            //.do(data => console.log("Data received: " + JSON.stringify(data)))
            .catch(this.handleError);

    }*/
    DriverService.prototype.getDrivers = function (companyId) {
        return this._http.get(this.url)
            .map(this.extractData)
            .catch(this.handleError);
    };
    /*getDriverGeneral(driverId): Observable<any> {
        return this._http.get(this.appService.driverUrl+"/"+driverId)
            .map(this.extractData)
            // .do(data => console.log("Data received: " + JSON.stringify(data)))
            .catch(this.handleError);

    }*/
    DriverService.prototype.getDriverGeneral = function (driverId) {
        return this._http.get(this.url)
            .map(this.extractData)
            .catch(this.handleError);
    };
    DriverService.prototype.handleError = function (error) {
        console.error(error);
        return Observable_1.Observable.throw(error.json().error || "Server error");
    };
    DriverService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http, app_service_1.AppService])
    ], DriverService);
    return DriverService;
}());
exports.DriverService = DriverService;
