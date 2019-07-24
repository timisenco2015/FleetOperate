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
var TruckSettingsAddComponent = (function () {
    function TruckSettingsAddComponent(_formBuilder, _truckSettingService) {
        this._formBuilder = _formBuilder;
        this._truckSettingService = _truckSettingService;
        this.displayTruckAdded = false;
        this.showForm = true;
        this.showError = false;
        this.displayTruckList = new core_1.EventEmitter();
        this.createAddTruckForm();
    }
    TruckSettingsAddComponent.prototype.ngOnInit = function () {
    };
    TruckSettingsAddComponent.prototype.ngOnChanges = function () {
    };
    TruckSettingsAddComponent.prototype.createAddTruckForm = function () {
        this.addTruckForm = this._formBuilder.group({
            companyId: this._formBuilder.control(localStorage.getItem("token_2")),
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
    TruckSettingsAddComponent.prototype.onClickSave = function (formData) {
        var _this = this;
        console.log("The truck details are: ", this.addTruckForm.value);
        this._truckSettingService.addTruck(formData)
            .subscribe(function (serviceResponse) {
            _this.addTruckResponse = serviceResponse;
            console.log("addTruck response:...", _this.addTruckResponse.status);
            if (_this.addTruckResponse.status == 200) {
                _this.showForm = false;
                setTimeout(function () {
                    _this.createAddTruckForm();
                    _this.showForm = true;
                });
                //this.addTruckForm.reset();
                _this.displayTruckAdded = true;
                window.scrollTo(0, 0);
            }
            else {
                _this.broadcastErrorCode = _this.addTruckResponse.status;
                _this.showError = true;
                if (_this.showError = true) {
                    window.scrollTo(0, 0);
                }
            }
        }, function (error) {
            _this.errorMessage = error;
            if (error.status != null) {
                _this.broadcastErrorCode = error.status;
                _this.displayTruckAdded = false;
                _this.showError = true;
                if (_this.showError = true) {
                    window.scrollTo(0, 0);
                }
            }
            console.log("Add truck error: ", error.status);
        });
        //console.log("addTruck response status:...", this.addTruckResponse.status)
        /*this.displayTruckAdded = true;
        this.showForm = false;
        setTimeout(() => {
this.createAddTruckForm();
this.showError = true;
  this.showForm = true;
});*/
        // this.displayTruckList.emit("displayTruckList");
    };
    TruckSettingsAddComponent.prototype.onClickCancel = function () {
        this.displayTruckList.emit("displayTruckList");
    };
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], TruckSettingsAddComponent.prototype, "displayTruckList", void 0);
    TruckSettingsAddComponent = __decorate([
        core_1.Component({
            selector: 'truck-settings-add',
            templateUrl: 'app/dashboard/features/settings/truckSettings/truckSettingsAdd/truckSettingsAddTemplate.html',
        }), 
        __metadata('design:paramtypes', [forms_1.FormBuilder, truckSettingsService_1.TruckSettingsService])
    ], TruckSettingsAddComponent);
    return TruckSettingsAddComponent;
}());
exports.TruckSettingsAddComponent = TruckSettingsAddComponent;
