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
var TruckSettingsService = (function () {
    // private url1 = 'app/dashboard/features/fleet/fleetList/fleetdataBase.json';
    // private url = 'http://localhost:8082/fleetops/truck';
    function TruckSettingsService(_http, appService) {
        this._http = _http;
        this.appService = appService;
        this.username = "admin";
        this.password = "admin";
    }
    TruckSettingsService.prototype.extractData = function (response) {
        var serverResponse = response;
        var map = response.headers;
        console.log("response in extractData..", serverResponse);
        // console.log("header map:..", map)
        return serverResponse || {};
    };
    TruckSettingsService.prototype.getToken = function () {
        console.log("document is:..", document.cookie);
        var token = document.querySelector('meta[property="csrf-token"]')['content'];
        console.log("token is:..", token);
        return token;
    };
    TruckSettingsService.prototype.getCookie = function () {
        console.log("document.cookie:..", document.cookie);
        var value = "; " + document.cookie;
        var parts = value.split("; " + "XSRF-TOKEN" + "=");
        if (parts.length == 2) {
            var cookieToken = parts.pop().split(";").shift();
            console.log("cookieToken is:..", cookieToken);
            return cookieToken;
        }
    };
    TruckSettingsService.prototype.createAuthorizationHeader = function () {
        var headers = new http_1.Headers();
        // headers.append("Content-Type", "application/json");
        headers.append('Content-Type', 'application/json');
        headers.append('Accept', 'application/json');
        //headers.append('Authorization', 'Basic '+window.btoa(this.username+':'+this.password));
        console.log("Authorization:..", 'Basic ' + btoa(this.username + ':' + this.password));
        console.log("cookie is:..", headers);
        return headers;
    };
    TruckSettingsService.prototype.getFleets = function (companyId) {
        //this.getCookie();
        return this._http.get(this.appService.fleetUrl + "/truckList/" + companyId, { headers: this.createAuthorizationHeader(),
            body: "" })
            .map(this.extractData)
            .catch(this.handleError);
    };
    TruckSettingsService.prototype.addTruck = function (newTruckDetails) {
        console.log("Inside service:..", newTruckDetails);
        var body = JSON.stringify(newTruckDetails);
        console.log("Inside service json file:..", body);
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        headers.append('Authorization', 'Basic ' +
            btoa(this.username + ':' + this.password));
        var options = new http_1.RequestOptions({ headers: headers });
        return this._http.post(this.appService.fleetUrl, body, options)
            .map(this.extractData)
            .catch(this.handleError);
    };
    TruckSettingsService.prototype.updateTruck = function (editedTruckDetails, fleetId) {
        console.log("Inside service updateTruck:..", editedTruckDetails);
        console.log("Inside service updateTruck ID is:..", fleetId);
        var body = JSON.stringify(editedTruckDetails);
        var headers = new http_1.Headers({ 'Content-Type': 'application/json', 'Accept': 'application/json' });
        console.log("headers is:..", headers);
        headers.append('Authorization', 'Basic ' +
            btoa(this.username + ':' + this.password));
        //  headers.append('X-CSRF-Token', this.getCookie())
        /* let updateBody = {
             headers,
             body
         }*/
        var options = new http_1.RequestOptions({ headers: headers, withCredentials: true });
        console.log("options is:..", options);
        // let headers = new Headers({ 'Content-Type': 'application/json', 'X-CSRF-TOKEN': this.getToken()});
        return this._http.put(this.appService.fleetUrl + "/" + fleetId, body, options)
            .map(this.extractData)
            .catch(this.handleError);
    };
    TruckSettingsService.prototype.deleteTruck = function (fleetId) {
        // let headers = new Headers();
        // this.createAuthorizationHeader(headers);
        var deleteCookie = this.getCookie();
        console.log("deleteCookie", deleteCookie);
        var headers = new http_1.Headers({ 'Content-Type': 'application/json', 'Accept': 'application/json' });
        // headers.append('Authorization', 'Basic '+
        // btoa(this.username+':'+this.password));
        // headers.append('X-CSRF-Token', deleteCookie)
        console.log("delete headers is:..", headers);
        return this._http.delete(this.appService.fleetUrl + "/" + fleetId, {
            headers: headers,
            body: ""
        })
            .map(this.extractData)
            .catch(this.handleError);
    };
    TruckSettingsService.prototype.getTruckToEdit = function (truckId) {
        console.log("In service edit truckId:..", truckId);
        return this._http.get(this.appService.fleetUrl + "/" + truckId)
            .map(this.extractData)
            .catch(this.handleError);
    };
    TruckSettingsService.prototype.handleError = function (error) {
        console.error("Error: ", error);
        return Observable_1.Observable.throw(error || "Server error");
    };
    TruckSettingsService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http, app_service_1.AppService])
    ], TruckSettingsService);
    return TruckSettingsService;
}());
exports.TruckSettingsService = TruckSettingsService;
