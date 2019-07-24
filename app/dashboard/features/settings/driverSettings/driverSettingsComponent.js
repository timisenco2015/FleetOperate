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
var DriverSettingsComponent = (function () {
    function DriverSettingsComponent() {
        this.driverListDisplay = true;
    }
    DriverSettingsComponent.prototype.ngOnInit = function () {
    };
    DriverSettingsComponent.prototype.ngOnChanges = function () {
    };
    DriverSettingsComponent.prototype.onClickDriverList = function () {
        this.driverListDisplay = true;
        this.driverAddDisplay = false;
        this.driverEditDisplay = false;
        this.driverConfirmDisplay = false;
    };
    DriverSettingsComponent.prototype.onClickAddDriver = function () {
        this.driverListDisplay = false;
        this.driverAddDisplay = true;
        this.driverEditDisplay = false;
        this.driverConfirmDisplay = false;
    };
    DriverSettingsComponent.prototype.onDisplayEditForm = function ($event) {
        this.driverListDisplay = false;
        this.driverAddDisplay = false;
        this.driverEditDisplay = true;
        this.driverConfirmDisplay = false;
        this.broadcastDriverID = $event.driverId;
        this.sendDriverToEdit = $event.driverDetail;
        console.log(" $event.driversDetails:  ", $event.driverDetail);
    };
    DriverSettingsComponent.prototype.onDisplayDriverList = function () {
        this.onClickDriverList();
    };
    DriverSettingsComponent.prototype.onClickSearchDriver = function () {
        this.driverSearchBarDisplay = !this.driverSearchBarDisplay;
    };
    DriverSettingsComponent.prototype.onClickConfirmDriver = function () {
        this.driverListDisplay = false;
        this.driverAddDisplay = false;
        this.driverEditDisplay = false;
        this.driverConfirmDisplay = true;
    };
    DriverSettingsComponent = __decorate([
        core_1.Component({
            selector: 'driver-settings',
            templateUrl: 'app/dashboard/features/settings/driverSettings/driverSettingsTemplate.html',
        }), 
        __metadata('design:paramtypes', [])
    ], DriverSettingsComponent);
    return DriverSettingsComponent;
}());
exports.DriverSettingsComponent = DriverSettingsComponent;
