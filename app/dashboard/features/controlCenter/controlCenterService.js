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
var ControlCenterService = (function () {
    function ControlCenterService(_http, appService) {
        this._http = _http;
        this.appService = appService;
        this.url = 'app/dashboard/features/controlCenter/locations.json';
    }
    ControlCenterService.prototype.extractData = function (response) {
        var requestResponse = response;
        return requestResponse || {};
    };
    /*
        getFleetsLocation(companyId, timeNumber): Observable<any> {
            console.log('control center service: companyId...', companyId);
            console.log('control center service: timeNumber...', timeNumber);
            return this._http.get(/*this.appService.controlCenterUrl+"/"+companyIdthis.url)
                .map(this.extractData)
                //.do(data => console.log("Data received: " + JSON.stringify(data)))
                .catch(this.handleError);
    
        }
    */
    ControlCenterService.prototype.getFleetsLocation = function () {
        // console.log('control center service: companyId...', companyId);
        // console.log('control center service: timeNumber...', timeNumber);
        return this._http.get(/*this.appService.controlCenterUrl+"/"+companyId*/ this.url)
            .map(this.extractData)
            .catch(this.handleError);
    };
    ControlCenterService.prototype.handleError = function (error) {
        console.error(error);
        return Observable_1.Observable.throw(error.json().error || "Server error");
    };
    ControlCenterService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http, app_service_1.AppService])
    ], ControlCenterService);
    return ControlCenterService;
}());
exports.ControlCenterService = ControlCenterService;
