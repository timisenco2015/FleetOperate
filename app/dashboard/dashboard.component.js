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
var DashboardComponent = (function () {
    function DashboardComponent() {
        this.showError = false;
        this.notifyFleet = new core_1.EventEmitter();
        this.notifyDrivers = new core_1.EventEmitter();
        this.notifyTrailers = new core_1.EventEmitter();
        this.notifyDocuments = new core_1.EventEmitter();
        this.notifyTripPlanner = new core_1.EventEmitter();
        this.notifySettings = new core_1.EventEmitter();
        this.notifyControlCenter = new core_1.EventEmitter();
        this.notifyCommunications = new core_1.EventEmitter();
        this.notifyCustomerProfile = new core_1.EventEmitter();
    }
    DashboardComponent.prototype.onClickFleet = function () {
        this.notifyFleet.emit('displayFleetPage');
    };
    DashboardComponent.prototype.onClickDrivers = function () {
        this.notifyDrivers.emit('displayDriverPage');
    };
    DashboardComponent.prototype.onClickTrailers = function () {
        this.notifyTrailers.emit('displayTrailerPage');
    };
    DashboardComponent.prototype.onClickDocuments = function () {
        this.notifyDocuments.emit('displayDocumentPage');
    };
    DashboardComponent.prototype.onClickTripPlanner = function () {
        this.notifyTripPlanner.emit('displayTripPlannerPage');
    };
    DashboardComponent.prototype.onClickSettings = function () {
        this.notifySettings.emit('displaySettingsPage');
    };
    DashboardComponent.prototype.onClickControlCenter = function () {
        this.notifyControlCenter.emit('displayControlPanelPage');
    };
    DashboardComponent.prototype.onClickCommunications = function () {
        this.notifyCommunications.emit('displayCommunicationsPage');
    };
    DashboardComponent.prototype.onClickCustomerProfile = function () {
        this.notifyCustomerProfile.emit('displayCustomerProfilePage');
    };
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], DashboardComponent.prototype, "notifyFleet", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], DashboardComponent.prototype, "notifyDrivers", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], DashboardComponent.prototype, "notifyTrailers", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], DashboardComponent.prototype, "notifyDocuments", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], DashboardComponent.prototype, "notifyTripPlanner", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], DashboardComponent.prototype, "notifySettings", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], DashboardComponent.prototype, "notifyControlCenter", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], DashboardComponent.prototype, "notifyCommunications", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], DashboardComponent.prototype, "notifyCustomerProfile", void 0);
    DashboardComponent = __decorate([
        core_1.Component({
            selector: 'dashboard',
            templateUrl: 'app/dashboard/dashboardTemplate.html',
        }), 
        __metadata('design:paramtypes', [])
    ], DashboardComponent);
    return DashboardComponent;
}());
exports.DashboardComponent = DashboardComponent;
