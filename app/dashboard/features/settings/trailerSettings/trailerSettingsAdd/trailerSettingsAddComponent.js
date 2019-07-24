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
var trailerSettingsService_1 = require('../trailerSettingsService');
var TrailerSettingsAddComponent = (function () {
    function TrailerSettingsAddComponent(_formBuilder, _trailerSettingsService) {
        this._formBuilder = _formBuilder;
        this._trailerSettingsService = _trailerSettingsService;
        this.displayTrailerAdded = false;
        this.showError = false;
        this.showForm = true;
        this.displayTrailerList = new core_1.EventEmitter();
        this.createAddTrailerForm();
    }
    TrailerSettingsAddComponent.prototype.ngOnInit = function () {
    };
    TrailerSettingsAddComponent.prototype.ngOnChanges = function () {
    };
    TrailerSettingsAddComponent.prototype.createAddTrailerForm = function () {
        this.addTrailerForm = this._formBuilder.group({
            companyId: this._formBuilder.control(localStorage.getItem("token_2")),
            trailerName: this._formBuilder.control(null),
            trailerNumber: this._formBuilder.control(null),
            make: this._formBuilder.control(null),
            model: this._formBuilder.control(null),
            color: this._formBuilder.control(null),
            maxLoad: this._formBuilder.control(null),
            height: this._formBuilder.control(null),
            length: this._formBuilder.control(null),
            licenseNumber: this._formBuilder.control(null),
            licenseExpiry: this._formBuilder.control(null),
            baseLocation: this._formBuilder.control(null),
            distanceTraveled: this._formBuilder.control(null),
            registrationCompany: this._formBuilder.control(null),
            notes: this._formBuilder.control(null)
        });
    };
    TrailerSettingsAddComponent.prototype.onClickSave = function (formData) {
        var _this = this;
        console.log("The trailer details are: ", formData);
        this._trailerSettingsService.addTrailer(formData)
            .subscribe(function (serviceResponse) {
            _this.addResponse = serviceResponse;
            console.log("add trailer response:...", _this.addResponse);
            if (_this.addResponse.status == 200) {
                _this.showForm = false;
                setTimeout(function () {
                    _this.createAddTrailerForm();
                    _this.showForm = true;
                });
                //this.addTruckForm.reset();
                _this.displayTrailerAdded = true;
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
                _this.displayTrailerAdded = false;
                _this.showError = true;
                if (_this.showError = true) {
                    window.scrollTo(0, 0);
                }
            }
            console.log("Add truck error: ", error.status);
        });
        //this.displayTrailerList.emit("displayTrailerList");
    };
    TrailerSettingsAddComponent.prototype.onClickCancel = function () {
        this.displayTrailerList.emit("displayTruckList");
    };
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], TrailerSettingsAddComponent.prototype, "displayTrailerList", void 0);
    TrailerSettingsAddComponent = __decorate([
        core_1.Component({
            selector: 'trailer-settings-add',
            templateUrl: 'app/dashboard/features/settings/trailerSettings/trailerSettingsAdd/trailerSettingsAddTemplate.html',
        }), 
        __metadata('design:paramtypes', [forms_1.FormBuilder, trailerSettingsService_1.TrailerSettingsService])
    ], TrailerSettingsAddComponent);
    return TrailerSettingsAddComponent;
}());
exports.TrailerSettingsAddComponent = TrailerSettingsAddComponent;
