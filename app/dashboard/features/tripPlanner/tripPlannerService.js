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
var TripPlannerService = (function () {
    function TripPlannerService(_http) {
        this._http = _http;
        this.url1 = 'app/dashboard/features/tripPlanner/tripPlannerJSON.json';
        this.url2 = 'http://localhost:8080/DocumentService/rest/documentManagement/add';
        this.urlPost = 'http://localhost:8082/fleetops/tripPlanner';
        this.username = "admin";
        this.password = "admin";
        /*this.progress = Observable.create(observer => {
            this.progressObserver = observer
        }).share();*/
    }
    TripPlannerService.prototype.extractData = function (response) {
        var serverResponse = response;
        console.log("serverResponse:..", serverResponse);
        return serverResponse || {};
    };
    TripPlannerService.prototype.getCurrentTrips = function () {
        return this._http.get(this.urlPost + "/getCurrentTrips")
            .map(this.extractData)
            .catch(this.handleError);
    };
    TripPlannerService.prototype.getCompletedTrips = function () {
        return this._http.get(this.url1)
            .map(this.extractData)
            .catch(this.handleError);
    };
    TripPlannerService.prototype.createTrip = function (planTripDetails) {
        console.log("Inside service:..", planTripDetails);
        var body = JSON.stringify(planTripDetails);
        console.log("Inside service json file:..", body);
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        var options = new http_1.RequestOptions({ headers: headers });
        return this._http.post(this.urlPost, body, options)
            .map(this.extractData)
            .do(function (data) { return console.log("Data received: " + JSON.stringify(data)); })
            .catch(this.handleError);
    };
    TripPlannerService.prototype.addConsignment = function (consignmentDetails, consignmnetDocument) {
        var _this = this;
        return Observable_1.Observable.create(function (observer) {
            var formData = new FormData(), xhr = new XMLHttpRequest();
            console.log("Inside service the consignmentDetails are:..", consignmentDetails);
            console.log("Inside service file is:..", consignmnetDocument);
            for (var i = 0; i < consignmnetDocument.length; i++) {
                formData.append("file", consignmnetDocument[i]);
            }
            var data = JSON.stringify(consignmentDetails);
            /* formData.append('Authorization', 'Basic '+window.btoa(this.username+':'+this.password));
             formData.append('Content-Type','application/json');
             formData.append('Accept', 'application/json');*/
            formData.append("consignmentDetails", data);
            formData.append('Content-Type', "multipart/form-data");
            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4) {
                    if (xhr.status === 200) {
                        console.log("response in service:..", xhr.response);
                        _this.addConsignmentResponse = xhr.response;
                        observer.next(_this.addConsignmentResponse);
                        observer.complete();
                    }
                    else {
                        observer.error(xhr.response);
                    }
                }
            };
            /*xhr.upload.onprogress = (event) => {
                this.progress = Math.round(event.loaded / event.total * 100);
    
                this.progressObserver.next(this.progress);
            };*/
            xhr.open('POST', _this.urlPost + "/consignments", true);
            xhr.send(formData);
        });
    };
    TripPlannerService.prototype.updateTrip = function (editedTripDetails, tripId) {
        console.log("Inside service updateDriver:..", editedTripDetails);
        console.log("Inside service updateDriverr ID is:..", tripId);
        var body = JSON.stringify({ editedTripDetails: editedTripDetails });
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        var options = new http_1.RequestOptions({ headers: headers });
        return this._http.put(this.url1 + "/" + tripId, body, options)
            .catch(this.handleError);
    };
    TripPlannerService.prototype.deleteTrip = function (tripId) {
        return this._http.delete(this.url1 + "/" + tripId)
            .catch(this.handleError);
    };
    TripPlannerService.prototype.handleError = function (error) {
        console.error("error:..", error);
        return Observable_1.Observable.throw(error || "Server error");
    };
    TripPlannerService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], TripPlannerService);
    return TripPlannerService;
}());
exports.TripPlannerService = TripPlannerService;
