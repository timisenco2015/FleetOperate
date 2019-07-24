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
var fleetControlPanelService_1 = require('./fleetControlPanelService');
var fleetSummaryComponent_1 = require('../fleetSummary/fleetSummaryComponent');
var common_1 = require('@angular/common');
var fleetGeneralComponent_1 = require('../fleetGeneral/fleetGeneralComponent');
var fleetDocumentsComponent_1 = require('../fleetDocuments/fleetDocumentsComponent');
var fleetDiagnosticsComponent_1 = require('../fleetDiagnostics/fleetDiagnosticsComponent');
var fleetDriverInfoComponent_1 = require('../fleetDriverInfo/fleetDriverInfoComponent');
var fleetListFilter_1 = require('./fleetListFilter');
var fleetStatusFilter_1 = require('./fleetStatusFilter');
var FleetControlPanelComponent = (function () {
    // constructor to loop the products in product service file and disply in html
    function FleetControlPanelComponent(_fleetService) {
        this._fleetService = _fleetService;
        this.showSummary = false;
        this.showGeneral = true;
        this.showDocuments = false;
        this.showDiagnostics = false;
        this.showDriverInfo = false;
        this.generalActive = true;
        this.documentsActive = false;
        this.diagnosticsActive = false;
        this.driverInfoActive = false;
        this.listFilter = '';
        this.statusOption = 'All';
    }
    // initiation of ngOnInit to bind the service or any external data to template
    FleetControlPanelComponent.prototype.ngOnInit = function () {
        // this.trucks = this._fleetService.getFleet();
        var _this = this;
        this._fleetService.getFleets()
            .subscribe(function (fleets) {
            _this.trucks = fleets;
        }, function (error) { return _this.errorMessage = error; });
    };
    // on update of info changes to implement
    FleetControlPanelComponent.prototype.ngOnChanges = function () {
        //this.trucks = this._fleetService.getFleet();
        console.log("clcik event: ..", this.trucks);
        for (var i = 0; i < this.trucks.length; i++) {
            if (this.trucks != null) {
                return this.totalFleet = this.trucks.length;
            }
            else if (this.trucks != null) {
                return this.availableFleet = this.trucks.indexOf("status");
            }
        }
    };
    // on click of each fleet in the control panel
    FleetControlPanelComponent.prototype.onSelect = function (trucks) {
        //console.log(truckID);
        this.broadcastTruckID = trucks;
        console.log('list of fleet...', this.trucks);
        this.sendTruckList = this.trucks;
        this.showSummary = true;
    };
    // on click of general tab
    FleetControlPanelComponent.prototype.general = function () {
        this.showGeneral = true;
        this.showDocuments = false;
        this.showDiagnostics = false;
        this.showDriverInfo = false;
        this.generalActive = true;
        this.documentsActive = false;
        this.diagnosticsActive = false;
        this.driverInfoActive = false;
    };
    // on click of documents tab
    FleetControlPanelComponent.prototype.documents = function () {
        this.showGeneral = false;
        this.showDocuments = true;
        this.showDiagnostics = false;
        this.showDriverInfo = false;
        this.generalActive = false;
        this.documentsActive = true;
        this.diagnosticsActive = false;
        this.driverInfoActive = false;
    };
    // on click of diagnostics tab
    FleetControlPanelComponent.prototype.diagnostics = function () {
        this.showGeneral = false;
        this.showDocuments = false;
        this.showDiagnostics = true;
        this.showDriverInfo = false;
        this.generalActive = false;
        this.documentsActive = false;
        this.diagnosticsActive = true;
        this.driverInfoActive = false;
    };
    // on click of driverInfo tab
    FleetControlPanelComponent.prototype.driverInfo = function () {
        this.showGeneral = false;
        this.showDocuments = false;
        this.showDiagnostics = false;
        this.showDriverInfo = true;
        this.generalActive = false;
        this.documentsActive = false;
        this.diagnosticsActive = false;
        this.driverInfoActive = true;
    };
    FleetControlPanelComponent = __decorate([
        core_1.Component({
            selector: 'fleet-controlPanel',
            templateUrl: 'app/dashboard/features/fleet/fleetControlPanel/fleetControlPanelTemplate.html',
            directives: [router_deprecated_1.ROUTER_DIRECTIVES, fleetSummaryComponent_1.FleetSummaryComponent, fleetGeneralComponent_1.FleetGeneralComponent, fleetDocumentsComponent_1.FleetDocumentsComponent,
                fleetDiagnosticsComponent_1.FleetDiagnosticsComponent, fleetDriverInfoComponent_1.FleetDriverInfoComponent, common_1.NgClass],
            pipes: [fleetListFilter_1.FleetFilterPipe, fleetStatusFilter_1.StatusFilterPipe]
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof fleetControlPanelService_1.FleetService !== 'undefined' && fleetControlPanelService_1.FleetService) === 'function' && _a) || Object])
    ], FleetControlPanelComponent);
    return FleetControlPanelComponent;
    var _a;
}());
exports.FleetControlPanelComponent = FleetControlPanelComponent;
//# sourceMappingURL=fleetControlPanelComponent.js.map