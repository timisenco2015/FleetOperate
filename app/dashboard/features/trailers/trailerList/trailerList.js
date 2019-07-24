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
var router_deprecated_1 = require('@angular/router-deprecated');
var trailerControlPanelService_1 = require('./trailerControlPanelService');
var trailerSummaryComponent_1 = require('../trailerSummary/trailerSummaryComponent');
var TrailerControlPanelComponent = (function () {
    // constructor to loop the products in product service file and disply in html
    function TrailerControlPanelComponent(_trailerService) {
        this._trailerService = _trailerService;
        this.showSummary = false;
        console.log();
    }
    // initiation of ngOnInit to bind the service or any external data to template on start
    TrailerControlPanelComponent.prototype.ngOnInit = function () {
        var _this = this;
        this._trailerService.getTrailer()
            .subscribe(function (data) { return _this.trailers = data; }, function (error) { return _this.errorMessage = error; });
        //this._trailerService.start();
    };
    // on update of info changes to implement
    TrailerControlPanelComponent.prototype.ngOnChanges = function () {
        /* setInterval(() =>  this._trailerService.getTrailer()
                               .subscribe(
                                   data => this.trailers = data,
                                   error => this.errorMessage = <any>error), 3000);*/
    };
    // on click of each trailer in the control panel
    TrailerControlPanelComponent.prototype.onSelect = function (trailerID) {
        //console.log(truckID);
        this.broadcastDriverID = trailerID;
        this.showSummary = true;
    };
    TrailerControlPanelComponent = __decorate([
        core_1.Component({
            selector: 'trailer-controlPanel',
            templateUrl: 'app/dashboard/features/trailers/trailerControlPanel/trailerControlPanelTemplate.html',
            directives: [router_deprecated_1.ROUTER_DIRECTIVES, trailerSummaryComponent_1.TrailerSummaryComponent]
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof trailerControlPanelService_1.TrailerService !== 'undefined' && trailerControlPanelService_1.TrailerService) === 'function' && _a) || Object])
    ], TrailerControlPanelComponent);
    return TrailerControlPanelComponent;
    var _a;
}());
exports.TrailerControlPanelComponent = TrailerControlPanelComponent;
//# sourceMappingURL=trailerList.js.map