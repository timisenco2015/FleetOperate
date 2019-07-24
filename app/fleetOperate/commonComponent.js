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
var dashboard_component_1 = require('../dashboard/dashboard.component');
var fleetControlPanelComponent_1 = require('../dashboard/features/fleet/fleetControlPanel/fleetControlPanelComponent');
var CommonComponent = (function () {
    function CommonComponent() {
    }
    CommonComponent = __decorate([
        core_1.Component({
            selector: 'common',
            templateUrl: 'app/common/commonTemplate.html',
            directives: [router_deprecated_1.ROUTER_DIRECTIVES]
        }),
        router_deprecated_1.RouteConfig([
            { path: '/dashboard', name: 'Dashboard', component: dashboard_component_1.DashboardComponent, useAsDefault: true },
            { path: '/fleet', name: 'Fleet', component: fleetControlPanelComponent_1.FleetControlPanelComponent }
        ]), 
        __metadata('design:paramtypes', [])
    ], CommonComponent);
    return CommonComponent;
}());
exports.CommonComponent = CommonComponent;
//# sourceMappingURL=commonComponent.js.map