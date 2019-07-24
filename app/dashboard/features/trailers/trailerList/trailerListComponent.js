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
//import {ROUTER_DIRECTIVES} from '@angular/router-deprecated';
var trailerListService_1 = require('./trailerListService');
var TrailerListComponent = (function () {
    // constructor to loop the products in product service file and disply in html
    function TrailerListComponent(_trailerService) {
        this._trailerService = _trailerService;
        this.showSummary = false;
        console.log();
    }
    // initiation of ngOnInit to bind the service or any external data to template on start
    TrailerListComponent.prototype.ngOnInit = function () {
        var _this = this;
        this._trailerService.getTrailer()
            .subscribe(function (trailer) { return _this.trailers = trailer.json(); }, function (error) { return _this.errorMessage = error; });
    };
    // on update of info changes to implement
    TrailerListComponent.prototype.ngOnChanges = function () {
        /* setInterval(() =>  this._trailerService.getTrailer()
                               .subscribe(
                                   data => this.trailers = data,
                                   error => this.errorMessage = <any>error), 3000);*/
    };
    // on click of each trailer in the list
    TrailerListComponent.prototype.onSelect = function (trailerID) {
        //console.log(truckID);
        this.broadcastDriverID = trailerID;
        this.sendTrailerList = this.trailers;
        this.showSummary = true;
    };
    TrailerListComponent = __decorate([
        core_1.Component({
            selector: 'trailer-list',
            templateUrl: 'app/dashboard/features/trailers/trailerList/trailerListTemplate.html',
        }), 
        __metadata('design:paramtypes', [trailerListService_1.TrailerService])
    ], TrailerListComponent);
    return TrailerListComponent;
}());
exports.TrailerListComponent = TrailerListComponent;
