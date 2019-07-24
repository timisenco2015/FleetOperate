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
var driverSettingsService_1 = require('../driverSettingsService');
var DriverSettingsListComponent = (function () {
    function DriverSettingsListComponent(_driverSettingService) {
        this._driverSettingService = _driverSettingService;
        this.isDeleteClicked = false;
        this.displayEditForm = new core_1.EventEmitter();
        this.showError = false;
        this.companyId = localStorage.getItem("token_2");
    }
    DriverSettingsListComponent.prototype.ngOnInit = function () {
        this.getDrivers();
    };
    DriverSettingsListComponent.prototype.ngOnChanges = function () {
    };
    DriverSettingsListComponent.prototype.getDrivers = function () {
        var _this = this;
        this._driverSettingService.getDrivers(this.companyId)
            .subscribe(function (response) {
            _this.drivers = response.json();
            console.log(" drivers:  ", _this.drivers);
            if (response.status == 200) {
                _this.showError = false;
            }
            else {
                _this.broadcastErrorCode = response.status;
                _this.showError = true;
                if (_this.showError = true) {
                    window.scrollTo(0, 0);
                }
            }
        }, function (error) {
            _this.errorMessage = error;
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
    DriverSettingsListComponent.prototype.onClickEditDriver = function (driverId) {
        var _this = this;
        console.log(" driverId ID:  ", driverId);
        //this.displayEditForm.emit({driverId: driverId, driversList: this.drivers});
        // console.log(" driversList:  ", driversList)
        this._driverSettingService.getDriverToEdit(driverId)
            .subscribe(function (driver) {
            console.log("driver to edit: ", driver.json());
            if (driver.status == 200) {
                _this.displayEditForm.emit({ driverId: driverId, driverDetail: driver.json() });
            }
            else {
                _this.broadcastErrorCode = driver.status;
                _this.showError = true;
                if (_this.showError = true) {
                    window.scrollTo(0, 0);
                }
            }
        });
    };
    DriverSettingsListComponent.prototype.onClickDelete = function (driverId) {
        this.isDeleteClicked = true;
        for (var i = 0; i < this.drivers.length; i++) {
            var drivers = this.drivers[i];
            // console.log(" fleet summary ID:  ", summaryData.fleetId)
            if (drivers.driverId == driverId) {
                this.deleteDriverInfo = drivers;
                console.log(" delete driversDetails is:  ", this.deleteDriverInfo);
                break;
            }
            else {
                this.deleteDriverInfo = null;
            }
        }
    };
    DriverSettingsListComponent.prototype.deleteDriver = function (driverId) {
        var _this = this;
        this._driverSettingService.deleteDriver(driverId)
            .subscribe(function (deleteResponse) {
            _this.deleteResponse = deleteResponse;
            if (_this.deleteResponse.status == 200) {
                _this.getDrivers();
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
    ], DriverSettingsListComponent.prototype, "displayEditForm", void 0);
    DriverSettingsListComponent = __decorate([
        core_1.Component({
            selector: 'driver-settings-list',
            templateUrl: 'app/dashboard/features/settings/driverSettings/driverSettingsList/driverSettingsListTemplate.html',
        }), 
        __metadata('design:paramtypes', [driverSettingsService_1.DriverSettingsService])
    ], DriverSettingsListComponent);
    return DriverSettingsListComponent;
}());
exports.DriverSettingsListComponent = DriverSettingsListComponent;
