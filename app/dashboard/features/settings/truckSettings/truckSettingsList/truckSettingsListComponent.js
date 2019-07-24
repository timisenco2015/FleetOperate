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
var fleetListService_1 = require('../../../fleet/fleetList/fleetListService');
var truckSettingsService_1 = require('../truckSettingsService');
var TruckSettingsListComponent = (function () {
    function TruckSettingsListComponent(_fleetService, _truckSettingService) {
        this._fleetService = _fleetService;
        this._truckSettingService = _truckSettingService;
        this.isDeleteClicked = false;
        this.displayEditForm = new core_1.EventEmitter();
        this.showError = false;
        this.companyId = localStorage.getItem("token_2");
    }
    TruckSettingsListComponent.prototype.ngOnInit = function () {
        this.getFleets();
    };
    TruckSettingsListComponent.prototype.ngOnChanges = function () {
    };
    TruckSettingsListComponent.prototype.getFleets = function () {
        var _this = this;
        this._truckSettingService.getFleets(this.companyId)
            .subscribe(function (fleets) {
            _this.trucks = fleets.json();
            _this.httpStatusCode = fleets.status;
            console.log(" truckDetails are:  ", _this.trucks);
            console.log(" httpStatusCode is:  ", _this.httpStatusCode);
            if (_this.httpStatusCode == 200) {
                _this.showError = false;
            }
            else {
                _this.broadcastErrorCode = _this.httpStatusCode;
                _this.showError = true;
                if (_this.showError = true) {
                    window.scrollTo(0, 0);
                }
            }
        }, function (error) {
            _this.errorMessage = error;
            if (error.status != null) {
                _this.broadcastErrorCode = error.status;
                _this.showError = true;
                if (_this.showError = true) {
                    window.scrollTo(0, 0);
                }
            }
            console.log("Options request Error: ", error.status);
        });
    };
    TruckSettingsListComponent.prototype.onClickEditTruck = function (fleetId) {
        var _this = this;
        console.log("onClickEditTruck clicked: ", fleetId);
        this._truckSettingService.getTruckToEdit(fleetId)
            .subscribe(function (truck) {
            console.log("truck to edit: ", truck.json());
            if (truck.status == 200) {
                _this.displayEditForm.emit({ truckId: fleetId, truckDetail: truck.json() });
            }
            else {
                _this.broadcastErrorCode = truck.status;
                _this.showError = true;
                if (_this.showError = true) {
                    window.scrollTo(0, 0);
                }
            }
        });
    };
    TruckSettingsListComponent.prototype.onClickDelete = function (fleetId) {
        this.isDeleteClicked = true;
        for (var i = 0; i < this.trucks.length; i++) {
            var trucks = this.trucks[i];
            // console.log(" fleet summary ID:  ", summaryData.fleetId)
            if (trucks.fleetId == fleetId) {
                this.deleteTruckInfo = trucks;
                console.log(" delete truckDetails is:  ", this.deleteTruckInfo);
                break;
            }
            else {
                this.deleteTruckInfo = null;
            }
        }
    };
    TruckSettingsListComponent.prototype.deleteTruck = function (fleetId) {
        var _this = this;
        this._truckSettingService.deleteTruck(fleetId)
            .subscribe(function (deleteResponse) {
            _this.deleteResponse = deleteResponse;
            if (_this.deleteResponse.status == 200) {
                _this.getFleets();
            }
            else {
                _this.broadcastErrorCode = _this.deleteResponse.status;
                _this.showError = true;
                if (_this.showError = true) {
                    window.scrollTo(0, 0);
                }
            }
        }, function (error) {
            _this.errorMessage = error;
            if (error.status != null) {
                _this.broadcastErrorCode = error.status;
                _this.showError = true;
                if (_this.showError = true) {
                    window.scrollTo(0, 0);
                }
            }
            console.log("Options request Error : ", error.status);
        });
        this.isDeleteClicked = false;
    };
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], TruckSettingsListComponent.prototype, "displayEditForm", void 0);
    TruckSettingsListComponent = __decorate([
        core_1.Component({
            selector: 'truck-settings-list',
            templateUrl: 'app/dashboard/features/settings/truckSettings/truckSettingsList/truckSettingsListTemplate.html',
        }), 
        __metadata('design:paramtypes', [fleetListService_1.FleetService, truckSettingsService_1.TruckSettingsService])
    ], TruckSettingsListComponent);
    return TruckSettingsListComponent;
}());
exports.TruckSettingsListComponent = TruckSettingsListComponent;
