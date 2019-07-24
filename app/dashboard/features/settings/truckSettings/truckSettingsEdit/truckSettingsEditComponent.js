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
var truckSettingsService_1 = require('../truckSettingsService');
var TruckSettingsEditComponent = (function () {
    function TruckSettingsEditComponent(_formBuilder, _truckSettingService) {
        this._formBuilder = _formBuilder;
        this._truckSettingService = _truckSettingService;
        this.displayTruckList = new core_1.EventEmitter();
        this.showError = false;
        this.createForm();
    }
    TruckSettingsEditComponent.prototype.createForm = function () {
        this.editTruckForm = this._formBuilder.group({
            companyId: this._formBuilder.control(localStorage.getItem("token_2")),
            fleetId: this._formBuilder.control(null),
            truckName: this._formBuilder.control(null),
            truckNumber: this._formBuilder.control(null),
            make: this._formBuilder.control(null),
            model: this._formBuilder.control(null),
            fleetClass: this._formBuilder.control(null),
            color: this._formBuilder.control(null),
            height: this._formBuilder.control(null),
            axelWeight: this._formBuilder.control(null),
            tareWeight: this._formBuilder.control(null),
            grossWeight: this._formBuilder.control(null),
            length: this._formBuilder.control(null),
            vin: this._formBuilder.control(null),
            baseLocation: this._formBuilder.control(null),
            notes: this._formBuilder.control(null)
        });
    };
    TruckSettingsEditComponent.prototype.ngOnInit = function () {
        /*for (var i = 0; i < this.truckList.length; i++) {

            var editData = this.truckList[i];
            // console.log(" fleet summary ID:  ", summaryData.fleetId)
            if (editData.fleetId == this.selectedTruckID) {

                this.truckDetails = editData;
                console.log("truckDetails is:  ", this.truckDetails);
                break;

            } else {
                this.truckDetails = null;
            }
        }*/
        // this.getTruckDetails();
        console.log("truckToEdit:..", this.truckToEdit);
        this.truckDetails = this.truckToEdit;
    };
    TruckSettingsEditComponent.prototype.ngOnChanges = function () {
    };
    TruckSettingsEditComponent.prototype.onClickSave = function (formData) {
        var _this = this;
        console.log("The edited truck details are: ", formData);
        this._truckSettingService.updateTruck(formData, this.selectedTruckIdToEdit)
            .subscribe(function (updateResponse) {
            _this.updateResponse = updateResponse;
            console.log("updateResponse :...", _this.updateResponse.status);
            if (_this.updateResponse.status == 200) {
                _this.displayTruckList.emit("displayTruckList");
            }
            else {
                _this.broadcastErrorCode = _this.updateResponse.status;
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
        });
    };
    TruckSettingsEditComponent.prototype.onClickCancel = function () {
        this.displayTruckList.emit("displayTruckList");
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], TruckSettingsEditComponent.prototype, "selectedTruckIdToEdit", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array)
    ], TruckSettingsEditComponent.prototype, "truckToEdit", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], TruckSettingsEditComponent.prototype, "displayTruckList", void 0);
    TruckSettingsEditComponent = __decorate([
        core_1.Component({
            selector: 'truck-settings-edit',
            templateUrl: 'app/dashboard/features/settings/truckSettings/truckSettingsEdit/truckSettingsEditTemplate.html',
        }), 
        __metadata('design:paramtypes', [forms_1.FormBuilder, truckSettingsService_1.TruckSettingsService])
    ], TruckSettingsEditComponent);
    return TruckSettingsEditComponent;
}());
exports.TruckSettingsEditComponent = TruckSettingsEditComponent;
