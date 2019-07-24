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
var driverSummaryService_1 = require('./driverSummaryService');
var DriverSummaryComponent = (function () {
    // constructor to loop the products in product service file and disply in html
    function DriverSummaryComponent(_driverSummaryService) {
        this._driverSummaryService = _driverSummaryService;
    }
    // render something initially 
    DriverSummaryComponent.prototype.ngOnInit = function () {
        // this.trucksSummary = this._fleetSummaryService.getFleetSummary();
    };
    // render trucksSummary on constant changes
    DriverSummaryComponent.prototype.ngOnChanges = function () {
        // console.log(this.selectedTruckID.iD);
        for (var i = 0; i < this.driverList.length; i++) {
            var summary = this.driverList[i];
            if (summary.driverId == this.selectedDriverID.driverId) {
                this.driverSummary = summary;
                // console.log(this.fleetSummary);
                break;
            }
            else {
                this.driverSummary = null;
            }
        }
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], DriverSummaryComponent.prototype, "selectedDriverID", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array)
    ], DriverSummaryComponent.prototype, "driverList", void 0);
    DriverSummaryComponent = __decorate([
        core_1.Component({
            selector: 'driverSummary',
            templateUrl: 'app/dashboard/features/drivers/driverSummary/driverSummaryTemplate.html',
        }), 
        __metadata('design:paramtypes', [driverSummaryService_1.DriverSummaryService])
    ], DriverSummaryComponent);
    return DriverSummaryComponent;
}());
exports.DriverSummaryComponent = DriverSummaryComponent;
