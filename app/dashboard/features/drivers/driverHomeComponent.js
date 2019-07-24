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
var DriverHomeComponent = (function () {
    function DriverHomeComponent() {
    }
    DriverHomeComponent.prototype.ngOnChanges = function () {
    };
    DriverHomeComponent.prototype.ngOnInit = function () {
        this.driverListDisplay = true;
        this.driverAddDisplay = false;
    };
    DriverHomeComponent.prototype.onClickDriverList = function () {
        this.driverListDisplay = true;
        this.driverAddDisplay = false;
    };
    DriverHomeComponent.prototype.onClickAddDriver = function () {
        this.driverListDisplay = false;
        this.driverAddDisplay = true;
    };
    DriverHomeComponent.prototype.onClickEditDriver = function () {
        this.driverListDisplay = false;
        this.driverAddDisplay = false;
    };
    /* onDisplayEditForm($event){
         this.truckListDisplay = false;
         this.truckAddDisplay = false;
         this.truckEditDisplay = true;
 
        // this.broadcastTruckID = $event.truckId;
       //  this.sendTruckToEdit = $event.truckDetail;
     }
 */
    DriverHomeComponent.prototype.onDisplayTruckList = function () {
        this.onClickDriverList();
        //this.reloadTruckList.emit("reload truck list");
    };
    DriverHomeComponent = __decorate([
        core_1.Component({
            selector: 'driver-home',
            templateUrl: 'app/dashboard/features/drivers/driverHomeTemplate.html',
        }), 
        __metadata('design:paramtypes', [])
    ], DriverHomeComponent);
    return DriverHomeComponent;
}());
exports.DriverHomeComponent = DriverHomeComponent;
