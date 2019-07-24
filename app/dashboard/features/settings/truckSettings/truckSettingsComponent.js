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
var TruckSettingsComponent = (function () {
    function TruckSettingsComponent() {
    }
    TruckSettingsComponent.prototype.ngOnInit = function () {
        this.onClickTruckList();
    };
    TruckSettingsComponent.prototype.ngOnChanges = function () {
    };
    TruckSettingsComponent.prototype.onClickTruckList = function () {
        this.truckListDisplay = true;
        this.truckAddDisplay = false;
        this.truckEditDisplay = false;
    };
    TruckSettingsComponent.prototype.onClickAddTruck = function () {
        this.truckListDisplay = false;
        this.truckAddDisplay = true;
        this.truckEditDisplay = false;
    };
    TruckSettingsComponent.prototype.onDisplayEditForm = function ($event) {
        this.truckListDisplay = false;
        this.truckAddDisplay = false;
        this.truckEditDisplay = true;
        this.broadcastTruckID = $event.truckId;
        this.sendTruckToEdit = $event.truckDetail;
    };
    TruckSettingsComponent.prototype.onDisplayTruckList = function () {
        this.onClickTruckList();
        //this.reloadTruckList.emit("reload truck list");
    };
    TruckSettingsComponent.prototype.onClickSearchTruck = function () {
        this.truckSearchBarDisplay = !this.truckSearchBarDisplay;
    };
    TruckSettingsComponent = __decorate([
        core_1.Component({
            selector: 'truck-settings',
            templateUrl: 'app/dashboard/features/settings/truckSettings/truckSettingsTemplate.html',
        }), 
        __metadata('design:paramtypes', [])
    ], TruckSettingsComponent);
    return TruckSettingsComponent;
}());
exports.TruckSettingsComponent = TruckSettingsComponent;
