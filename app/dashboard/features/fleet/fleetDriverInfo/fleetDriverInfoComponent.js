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
var FleetDriverInfoComponent = (function () {
    // constructor to loop the products in product service file and disply in html
    function FleetDriverInfoComponent() {
    }
    // render fleetDriverInfo on constant changes
    FleetDriverInfoComponent.prototype.ngOnChanges = function () {
        //console.log(this.selectedTruckID.iD);
        for (var i = 0; i < this.truckList.length; i++) {
            var summaryData = this.truckList[i];
            // console.log(" fleet summary ID:  ", summaryData.fleetId)
            if (summaryData.fleetId == this.selectedTruckID.fleetId) {
                this.fleetDriverInfo = summaryData;
                console.log("fleet summary is:  ", this.fleetDriverInfo);
                break;
            }
            else {
                this.fleetDriverInfo = null;
            }
        }
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], FleetDriverInfoComponent.prototype, "selectedTruckID", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array)
    ], FleetDriverInfoComponent.prototype, "truckList", void 0);
    FleetDriverInfoComponent = __decorate([
        core_1.Component({
            selector: 'fleet-driverInfo',
            templateUrl: 'app/dashboard/features/fleet/fleetDriverInfo/fleetDriverInfoTemplate.html',
        }), 
        __metadata('design:paramtypes', [])
    ], FleetDriverInfoComponent);
    return FleetDriverInfoComponent;
}());
exports.FleetDriverInfoComponent = FleetDriverInfoComponent;
