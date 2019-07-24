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
var fleetListService_1 = require('./fleetListService');
var forms_1 = require('@angular/forms');
var FleetListComponent = (function () {
    // constructor to loop the products in product service file and disply in html
    function FleetListComponent(_fleetService, _formBuilder) {
        this._fleetService = _fleetService;
        this._formBuilder = _formBuilder;
        this.showSummary = false;
        this.showGeneral = true;
        //private showDocuments: boolean = false;
        this.showDiagnostics = false;
        //private showDriverInfo: boolean = false;
        this.generalActive = true;
        //private documentsActive: boolean = false;
        this.diagnosticsActive = false;
        this.listFilter = '';
        this.statusOption = 'All';
        this.showDiagnosticsInfo = false;
        this.createDateSearchForm();
        this.date = new Date();
    }
    // initiation of ngOnInit to bind the service or any external data to template
    FleetListComponent.prototype.ngOnInit = function () {
        var _this = this;
        this._fleetService.getFleets()
            .subscribe(function (fleets) {
            _this.trucks = fleets.json();
            console.log('list of fleet...1..', _this.trucks);
        }, function (error) { return _this.errorMessage = error; });
    };
    // on update of information, changes to implement
    FleetListComponent.prototype.ngOnChanges = function () {
        //fleet list filter
        /* console.log("clcik event: ..", this.trucks);
         for (var i = 0; i < this.trucks.length; i++) {
             if (this.trucks != null) {
                 return this.totalFleet = this.trucks.length;
             } else if (this.trucks != null) {
                 return this.availableFleet = this.trucks.indexOf("status");
             }
         }*/
    };
    // on click of each fleet in list of truck summary
    FleetListComponent.prototype.onSelectEachTruck = function (truckData) {
        console.log("truckData....", truckData);
        this.sendTruckData = truckData;
        this.showSummary = true;
    };
    // on click of general tab
    FleetListComponent.prototype.onClickGeneral = function () {
        this.showGeneral = true;
        //this.showDocuments = false;
        this.showDiagnostics = false;
        //this.showDriverInfo = false;
        this.generalActive = true;
        //this.documentsActive = false;
        this.diagnosticsActive = false;
        //this.driverInfoActive = false;
    };
    // on click of diagnostics tab
    FleetListComponent.prototype.onClickDiagnostics = function () {
        this.showGeneral = false;
        //this.showDocuments = false;
        this.showDiagnostics = true;
        //this.showDriverInfo = false;
        this.generalActive = false;
        //this.documentsActive = false;
        this.diagnosticsActive = true;
        //this.driverInfoActive = false;
        this.onClickToday();
    };
    FleetListComponent.prototype.onClickToday = function () {
        var _this = this;
        console.log("onClickToday() called..");
        this.activeToday = true;
        this.activeYesterday = false;
        var currentDate = new Date();
        console.log("onClickToday() currentDate..", currentDate.getDate());
        this._fleetService.getFleetdiagnostics()
            .subscribe(function (response) {
            _this.diagnosticsInfoForDay = response.json();
            console.log("diagnosticsInfoForDay in fleetList....", _this.diagnosticsInfoForDay);
            _this.showDiagnosticsInfo = true;
        });
    };
    FleetListComponent.prototype.onClickYesterday = function () {
        var _this = this;
        console.log("onClickYesterday() called..");
        this.activeToday = false;
        this.activeYesterday = true;
        var currentDate = new Date();
        console.log("onClickYesterday() currentDate..", currentDate);
        this._fleetService.getFleetdiagnostics()
            .subscribe(function (response) {
            _this.diagnosticsInfoForDay = response.json();
            console.log("diagnosticsInfoForDay in fleetList....", _this.diagnosticsInfoForDay);
            _this.showDiagnosticsInfo = true;
        });
    };
    FleetListComponent.prototype.createDateSearchForm = function () {
        this.dateSearchForm = this._formBuilder.group({
            'fromDate': []
        });
    };
    FleetListComponent.prototype.onClickDateSearch = function (date) {
        var _this = this;
        console.log("onClickDateSearch() called..date..", date.fromDate);
        this.activeToday = false;
        this.activeYesterday = false;
        this._fleetService.getFleetdiagnostics()
            .subscribe(function (response) {
            _this.diagnosticsInfoForDay = response.json();
            console.log("diagnosticsInfoForDay in fleetList....", _this.diagnosticsInfoForDay);
            _this.showDiagnosticsInfo = true;
        });
    };
    FleetListComponent = __decorate([
        core_1.Component({
            selector: 'fleet-list',
            templateUrl: 'app/dashboard/features/fleet/fleetList/fleetListTemplate.html',
        }), 
        __metadata('design:paramtypes', [fleetListService_1.FleetService, forms_1.FormBuilder])
    ], FleetListComponent);
    return FleetListComponent;
}());
exports.FleetListComponent = FleetListComponent;
