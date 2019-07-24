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
var FleetDiagnosticsComponent = (function () {
    // constructor to loop the products in product service file and disply in html
    function FleetDiagnosticsComponent() {
        this.sliderPosition = 0;
        this.showMap = false;
    }
    // render fleetDiagnostics on constant changes in truck summary list
    FleetDiagnosticsComponent.prototype.ngOnChanges = function () {
        var _this = this;
        console.log("diagnosticsInfo....", this.diagnosticsInfo);
        this.fleetDiagnostics = this.diagnosticsInfo;
        console.log("this.fleetDiagnostics :  ", this.fleetDiagnostics);
        for (var i = 0; i < this.fleetDiagnostics.length; i++) {
            this.eachDiag = this.fleetDiagnostics[0];
            //console.log("eachDiag :  ", this.eachDiag);
            this.diagTime = this.eachDiag.eventTime;
        }
        this.firstObjectRange = 1;
        this.lastObjectRange = this.fleetDiagnostics.length;
        this.showMap = false;
        setTimeout(function () {
            _this.showMap = true;
        }, 500);
        this.broadcastTruckLoc = this.fleetDiagnostics[0];
    };
    FleetDiagnosticsComponent.prototype.onSliderMove = function (event, sliderPosition, diags) {
        var _this = this;
        console.log("on slider move..diag...", diags);
        console.log("on slider move sliderPosition...", sliderPosition);
        for (var i = 0; i < diags.length; i++) {
            //console.log("diags :  ", diags);
            var diag = diags[i];
            console.log("diag :  ", diag);
            if (sliderPosition == diag.id) {
                this.eachDiag = diag;
                console.log("eachDiag :  ", diag);
                this.diagTime = diag.eventTime;
            }
        }
        this.showMap = false;
        setTimeout(function () {
            _this.showMap = true;
        }, 500);
        this.broadcastTruckLoc = this.eachDiag;
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array)
    ], FleetDiagnosticsComponent.prototype, "diagnosticsInfo", void 0);
    FleetDiagnosticsComponent = __decorate([
        core_1.Component({
            selector: 'fleet-diagnostics',
            templateUrl: 'app/dashboard/features/fleet/fleetDiagnostics/fleetDiagnosticsTemplate.html',
        }), 
        __metadata('design:paramtypes', [])
    ], FleetDiagnosticsComponent);
    return FleetDiagnosticsComponent;
}());
exports.FleetDiagnosticsComponent = FleetDiagnosticsComponent;
