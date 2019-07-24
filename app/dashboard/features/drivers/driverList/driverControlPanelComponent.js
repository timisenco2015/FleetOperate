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
var common_1 = require('@angular/common');
var router_deprecated_1 = require('@angular/router-deprecated');
var driverControlPanelService_1 = require('./driverControlPanelService');
var driverSummaryComponent_1 = require('../driverSummary/driverSummaryComponent');
var driverGeneralComponent_1 = require('../driverGeneral/driverGeneralComponent');
var driverLogComponent_1 = require('../driverLog/driverLogComponent');
var DriverControlPanelComponent = (function () {
    // constructor to loop the products in product service file and disply in html
    function DriverControlPanelComponent(_driverService) {
        this._driverService = _driverService;
        this.showSummary = false;
        this.showGeneral = true;
        this.showLog = false;
        this.generalActive = true;
        this.logActive = false;
    }
    // initiation of ngOnInit to bind the service or any external data to template on start
    DriverControlPanelComponent.prototype.ngOnInit = function () {
        var _this = this;
        // this.drivers = this._driverService.getDrivers();
        this._driverService.getDrivers()
            .subscribe(function (driver) {
            _this.fleetdrivers = driver;
            console.log(_this.fleetdrivers);
        }, function (error) { return _this.errorMessage = error; });
    };
    // on update of info changes to implement
    DriverControlPanelComponent.prototype.ngOnChanges = function () {
        // this.drivers = this._driverService.getDrivers();
    };
    // on click of each driver in the control panel
    DriverControlPanelComponent.prototype.onSelect = function (driverID) {
        //console.log(truckID);
        this.broadcastDriverID = driverID;
        this.showSummary = true;
    };
    DriverControlPanelComponent.prototype.general = function () {
        this.showGeneral = true;
        this.showLog = false;
        this.generalActive = true;
        this.logActive = false;
    };
    DriverControlPanelComponent.prototype.log = function () {
        this.showGeneral = false;
        this.showLog = true;
        this.generalActive = false;
        this.logActive = true;
    };
    DriverControlPanelComponent = __decorate([
        core_1.Component({
            selector: 'driver-controlPanel',
            templateUrl: 'app/dashboard/features/drivers/driverControlPanel/driverControlPanelTemplate.html',
            directives: [router_deprecated_1.ROUTER_DIRECTIVES, common_1.NgClass, driverSummaryComponent_1.DriverSummaryComponent, driverGeneralComponent_1.DriverGeneralComponent,
                driverLogComponent_1.DriverLogComponent]
        }), 
        __metadata('design:paramtypes', [driverControlPanelService_1.DriverService])
    ], DriverControlPanelComponent);
    return DriverControlPanelComponent;
}());
exports.DriverControlPanelComponent = DriverControlPanelComponent;
//# sourceMappingURL=driverControlPanelComponent.js.map