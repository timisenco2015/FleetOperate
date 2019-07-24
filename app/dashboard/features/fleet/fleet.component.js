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
var fleetService_1 = require('./fleetService');
var fleetSummaryComponent_1 = require('./fleetSummary/fleetSummaryComponent');
var FleetComponent = (function () {
    // constructor to loop the products in product service file and disply in html
    function FleetComponent(_fleetService) {
        this._fleetService = _fleetService;
    }
    // initiation of ngOnInit to bind the service or any external data to template
    FleetComponent.prototype.ngOnInit = function () {
        this.trucks = this._fleetService.getFleet();
    };
    FleetComponent = __decorate([
        core_1.Component({
            //selector: '',
            templateUrl: 'app/dashboard/features/fleet/fleetTemplate.html',
            directives: [router_deprecated_1.ROUTER_DIRECTIVES],
            providers: [router_deprecated_1.ROUTER_PROVIDERS]
        }),
        router_deprecated_1.RouteConfig([
            { path: '/', name: 'Fleet', component: FleetComponent, useAsDefault: true },
            { path: '/id', name: 'FleetSummary', component: fleetSummaryComponent_1.FleetSummaryComponent }
        ]), 
        __metadata('design:paramtypes', [fleetService_1.FleetService])
    ], FleetComponent);
    return FleetComponent;
}());
exports.FleetComponent = FleetComponent;
//# sourceMappingURL=fleet.component.js.map