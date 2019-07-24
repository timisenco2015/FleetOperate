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
var DriverSettingsAddComponent = (function () {
    function DriverSettingsAddComponent(_formBuilder, _driverSettingsService) {
        this._formBuilder = _formBuilder;
        this._driverSettingsService = _driverSettingsService;
        this.displayDriverList = new core_1.EventEmitter();
        this.showError = false;
        this.showForm = true;
        this.displayDriverAdded = false;
        this.createAddDriverForm();
    }
    DriverSettingsAddComponent.prototype.ngOnInit = function () {
    };
    DriverSettingsAddComponent.prototype.ngOnChanges = function () {
    };
    DriverSettingsAddComponent.prototype.createAddDriverForm = function () {
        this.addDriverForm = this._formBuilder.group({
            'companyId': [localStorage.getItem("token_2")],
            //'username': [],
            'firstName': [],
            'middleName': [],
            'lastName': [],
            'dob': [],
            'gender': [],
            'licenseNumber': [],
            'licenseExpiry': [],
            'licenseIssuedAuthority': [],
            'licenseIssuedProvince': [],
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
    DriverSettingsAddComponent.prototype.onClickSave = function (formData) {
        var _this = this;
        console.log("The Driver details are: ", formData);
        this._driverSettingsService.checkIfUsernameExistsInDB(formData.email)
            .subscribe(function (serviceResponse) {
            _this.usernameCheckResponse = serviceResponse.json();
            console.log("checkIfUsernameExists response:...", _this.usernameCheckResponse.personEmailIdExists);
            if (_this.usernameCheckResponse.personEmailIdExists == false) {
                console.log("username is NOT registered");
                _this._driverSettingsService.addDriver(formData)
                    .subscribe(function (serviceResponse) {
                    _this.addResponse = serviceResponse;
                    console.log("add driver response:...", _this.addResponse);
                    if (_this.addResponse.status == 200) {
                        _this.showForm = false;
                        setTimeout(function () {
                            _this.createAddDriverForm();
                            _this.showForm = true;
                        });
                        //this.addTruckForm.reset();
                        _this.displayDriverAdded = true;
                        window.scrollTo(0, 0);
                    }
                    else {
                        _this.broadcastErrorCode = _this.addResponse.status;
                        _this.showError = true;
                        if (_this.showError = true) {
                            window.scrollTo(0, 0);
                        }
                    }
                }, function (error) {
                    _this.errorMessage = error;
                    if (error.status != null) {
                        _this.broadcastErrorCode = error.status;
                        _this.displayDriverAdded = false;
                        _this.showError = true;
                        if (_this.showError = true) {
                            window.scrollTo(0, 0);
                        }
                    }
                    console.log("Add truck error: ", error.status);
                });
            }
            else {
                console.log("username is registered");
            }
        }, function (error) {
            _this.errorMessage = error;
            console.log("checkIfUsernameExists error: ", error.status);
        });
        //this.displayDriverList.emit("displayDriverList");
    };
    DriverSettingsAddComponent.prototype.onClickCancel = function () {
        this.displayDriverList.emit("displayDriverList");
    };
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], DriverSettingsAddComponent.prototype, "displayDriverList", void 0);
    DriverSettingsAddComponent = __decorate([
        core_1.Component({
            selector: 'driver-settings-add',
            templateUrl: 'app/dashboard/features/settings/driverSettings/driverSettingsAdd/driverSettingsAddTemplate.html',
        }), 
        __metadata('design:paramtypes', [forms_1.FormBuilder, driverSettingsService_1.DriverSettingsService])
    ], DriverSettingsAddComponent);
    return DriverSettingsAddComponent;
}());
exports.DriverSettingsAddComponent = DriverSettingsAddComponent;
