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
var TrailerSettingsService = (function () {
    function TrailerSettingsService(_http, appService) {
        this._http = _http;
        this.appService = appService;
        this.url1 = 'app/dashboard/features/trailers/trailerDataBase.json';
        this.url = 'http://localhost:8082/fleetops/trailer';
        this.username = "admin";
        this.password = "admin";
    }
    TrailerSettingsService.prototype.extractData = function (response) {
        var serverResponse = response;
        return serverResponse || {};
    };
    TrailerSettingsService.prototype.createAuthorizationHeader = function () {
        var headers = new http_1.Headers();
        // headers.append("Content-Type", "application/json");
        headers.append('Content-Type', 'application/json');
        headers.append('Accept', 'application/json');
        headers.append('Authorization', 'Basic ' + btoa(this.username + ':' + this.password));
        console.log("Authorization:..", 'Basic ' + btoa(this.username + ':' + this.password));
        // headers.append("Accept", "application/json");
        return headers;
    };
    TrailerSettingsService.prototype.getTrailers = function (companyId) {
        return this._http.get(this.appService.trailerUrl + "/trailerList/" + companyId, { headers: this.createAuthorizationHeader(),
            body: "" })
            .map(this.extractData)
            .catch(this.handleError);
    };
    TrailerSettingsService.prototype.addTrailer = function (newTrailerDetails) {
        console.log("Inside service:..", newTrailerDetails);
        var body = JSON.stringify(newTrailerDetails);
        console.log("Inside service json file:..", body);
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        var options = new http_1.RequestOptions({ headers: headers });
        return this._http.post(this.appService.trailerUrl, body, options)
            .map(this.extractData)
            .catch(this.handleError);
    };
    TrailerSettingsService.prototype.updateTrailer = function (editedTrailerDetails, trailerId) {
        console.log("Inside service updateTrailer:..", editedTrailerDetails);
        console.log("Inside service updateTrailer ID is:..", trailerId);
        var body = JSON.stringify(editedTrailerDetails);
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        var options = new http_1.RequestOptions({ headers: headers });
        return this._http.put(this.appService.trailerUrl + "/" + trailerId, body, options)
            .map(this.extractData)
            .catch(this.handleError);
    };
    TrailerSettingsService.prototype.deleteTrailer = function (trailerId) {
        return this._http.delete(this.appService.trailerUrl + "/" + trailerId)
            .map(this.extractData)
            .catch(this.handleError);
    };
    TrailerSettingsService.prototype.getTrailerToEdit = function (trailerId) {
        console.log("In service edit trailerId:..", trailerId);
        return this._http.get(this.appService.trailerUrl + "/" + trailerId)
            .map(this.extractData)
            .catch(this.handleError);
    };
    TrailerSettingsService.prototype.handleError = function (error) {
        console.error(error);
        return Observable_1.Observable.throw(error.json().error || "Server error");
    };
    TrailerSettingsService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http, app_service_1.AppService])
    ], TrailerSettingsService);
    return TrailerSettingsService;
}());
exports.TrailerSettingsService = TrailerSettingsService;
