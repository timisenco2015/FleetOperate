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
var driverService_1 = require('../driverService');
var DriverGeneralComponent = (function () {
    // constructor to loop the products in product service file and disply in html
    function DriverGeneralComponent(_driverService) {
        this._driverService = _driverService;
        this.showError = false;
    }
    DriverGeneralComponent.prototype.ngOnInit = function () {
    };
    // render something on constant changes when clicked on driver summary list
    DriverGeneralComponent.prototype.ngOnChanges = function () {
        this.driverGeneral = this.driverData;
        //this.getDriverDetails()
    };
    DriverGeneralComponent.prototype.getDriverDetails = function () {
        var _this = this;
        //console.log(this.selectedTruckID.iD);
        this._driverService.getDriverGeneral(this.driverData.driverId)
            .subscribe(function (driver) {
            console.log("driver details: ", driver.json());
            if (driver.status == 200) {
                _this.driverGeneral = driver.json();
            }
            else {
                _this.broadcastErrorCode = driver.status;
                _this.showError = true;
                if (_this.showError = true) {
                    window.scrollTo(0, 0);
                }
            }
        }, function (error) {
            //this.errorMessage = error;
            if (error != null) {
                _this.broadcastErrorCode = error;
                _this.showError = true;
                if (_this.showError = true) {
                    window.scrollTo(0, 0);
                }
            }
            console.log("Options request Error : ", error.status);
        });
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], DriverGeneralComponent.prototype, "driverData", void 0);
    DriverGeneralComponent = __decorate([
        core_1.Component({
            selector: 'driver-general',
            templateUrl: 'app/dashboard/features/drivers/driverGeneral/driverGeneralTemplate.html',
        }), 
        __metadata('design:paramtypes', [driverService_1.DriverService])
    ], DriverGeneralComponent);
    return DriverGeneralComponent;
}());
exports.DriverGeneralComponent = DriverGeneralComponent;
