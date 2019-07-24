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
var forms_1 = require('@angular/forms');
var driverSettingsService_1 = require('../driverSettingsService');
var DriverSettingsEditComponent = (function () {
    function DriverSettingsEditComponent(_formBuilder, _driverSettingsService) {
        this._formBuilder = _formBuilder;
        this._driverSettingsService = _driverSettingsService;
        this.displayDriverList = new core_1.EventEmitter();
        this.showError = false;
        this.createForm();
    }
    DriverSettingsEditComponent.prototype.ngOnInit = function () {
        console.log(" driver to edit in edit component :  ", this.driverToEdit.addressLine1);
        /*for (var i = 0; i < this.driverList.length; i++) {

            var editData = this.driverList[i];
             console.log(" driver summary ID:  ", editData.driverId)
            if (editData.driverId == this.selectedDriverIdToEdit) {

                this.driverDetails = editData;
                console.log("driverDetails is:  ", this.driverDetails);
                break;

            } else {
                this.driverDetails = null;
            }
        }*/
        this.driverDetails = this.driverToEdit;
    };
    DriverSettingsEditComponent.prototype.ngOnChanges = function () {
    };
    DriverSettingsEditComponent.prototype.createForm = function () {
        this.editDriverForm = this._formBuilder.group({
            'companyId': [localStorage.getItem("token_2")],
            'driverId': [],
            'firstName': [],
            'middleName': [],
            'lastName': [],
            'dob': [],
            'gender': [],
            'licenseNumber': [],
            'licenseExpiry': [],
            'addressLine1': [],
            'addressLine2': [],
            'city': [],
            'province': [],
            'country': [],
            'postalCode': [],
            'cellPhone': [],
            'homePhone': [],
            'email': [],
            'canVisaStatus': [],
            'usaVisaStatus': [],
            'nationality': [],
            'notes': []
        });
    };
    DriverSettingsEditComponent.prototype.onClickSave = function (formData) {
        var _this = this;
        console.log("The edited Driver details are: ", formData);
        this._driverSettingsService.updateDriver(formData, this.selectedDriverIdToEdit)
            .subscribe(function (updateResponse) {
            _this.updateResponse = updateResponse;
            console.log("updateResponse :...", _this.updateResponse.status);
            if (_this.updateResponse.status == 200) {
                _this.displayDriverList.emit("displayDriverList");
            }
            else {
                _this.broadcastErrorCode = _this.updateResponse.status;
                console.log("errorMessage 2: ", _this.broadcastErrorCode);
                _this.showError = true;
                if (_this.showError = true) {
                    window.scrollTo(0, 0);
                }
            }
        }, function (error) {
            _this.errorMessage = error;
            if (error.status != null) {
                console.log("errorMessage 1: ", error.status);
                _this.broadcastErrorCode = error.status;
                _this.showError = true;
                if (_this.showError = true) {
                    window.scrollTo(0, 0);
                }
            }
        });
        // this.displayDriverList.emit("displayDriverList");
    };
    DriverSettingsEditComponent.prototype.onClickCancel = function () {
        this.displayDriverList.emit("displayDriverList");
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], DriverSettingsEditComponent.prototype, "selectedDriverIdToEdit", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], DriverSettingsEditComponent.prototype, "driverToEdit", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], DriverSettingsEditComponent.prototype, "displayDriverList", void 0);
    DriverSettingsEditComponent = __decorate([
        core_1.Component({
            selector: 'driver-settings-edit',
            templateUrl: 'app/dashboard/features/settings/driverSettings/driverSettingsEdit/driverSettingsEditTemplate.html',
        }), 
        __metadata('design:paramtypes', [forms_1.FormBuilder, driverSettingsService_1.DriverSettingsService])
    ], DriverSettingsEditComponent);
    return DriverSettingsEditComponent;
}());
exports.DriverSettingsEditComponent = DriverSettingsEditComponent;
