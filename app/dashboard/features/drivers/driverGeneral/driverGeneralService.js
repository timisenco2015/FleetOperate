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
var DriverGeneralService = (function () {
    function DriverGeneralService(_http, appService) {
        this._http = _http;
        this.appService = appService;
        this.url = 'app/dashboard/features/drivers/driverDataBase.json';
    }
    DriverGeneralService.prototype.extractData = function (response) {
        var serverResponse = response;
        return serverResponse || {};
    };
    DriverGeneralService.prototype.getDriverGeneral = function (driverId) {
        return this._http.get(this.appService.driverUrl + "/driver/" + driverId)
            .map(this.extractData)
            .catch(this.handleError);
    };
    DriverGeneralService.prototype.handleError = function (error) {
        console.error(error);
        return Observable_1.Observable.throw(error.json().error || "Server error");
    };
    DriverGeneralService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http, app_service_1.AppService])
    ], DriverGeneralService);
    return DriverGeneralService;
}());
exports.DriverGeneralService = DriverGeneralService;
