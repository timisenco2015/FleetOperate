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
var TrailerSettingsEditComponent = (function () {
    function TrailerSettingsEditComponent(_formBuilder, _trailerSettingsService) {
        this._formBuilder = _formBuilder;
        this._trailerSettingsService = _trailerSettingsService;
        this.displayTrailerList = new core_1.EventEmitter();
        this.showError = false;
        this.createForm();
    }
    TrailerSettingsEditComponent.prototype.ngOnInit = function () {
        console.log(" trailer List received:  ", this.trailerToEdit);
        console.log(" trailer ID received:  ", this.selectedTrailerIdToEdit);
        /* for (var i = 0; i < this.trailerList.length; i++) {
 
             var editData = this.trailerList[i];
              console.log(" trailer ID need to be edited:  ", editData.fleetId)
             if (editData.fleetId == this.selectedTrailerID) {
 
                 this.trailerDetails = editData;
                 console.log(" selected trailerDetails is:  ", this.trailerDetails);
                 break;
 
             } else {
                 this.trailerDetails = null;
             }
         }*/
        this.trailerDetails = this.trailerToEdit;
    };
    TrailerSettingsEditComponent.prototype.ngOnChanges = function () {
    };
    TrailerSettingsEditComponent.prototype.createForm = function () {
        this.editTrailerForm = this._formBuilder.group({
            companyId: this._formBuilder.control(localStorage.getItem("token_2")),
            fleetId: this._formBuilder.control(null),
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
    TrailerSettingsEditComponent.prototype.onClickSave = function (formData) {
        var _this = this;
        console.log("The edited trailer details are: ", formData);
        this._trailerSettingsService.updateTrailer(formData, this.selectedTrailerIdToEdit)
            .subscribe(function (updateResponse) {
            _this.updateResponse = updateResponse;
            console.log("updateResponse :...", _this.updateResponse.status);
            if (_this.updateResponse.status == 200) {
                _this.displayTrailerList.emit("displayTruckList");
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
        // this.displayTrailerList.emit("displaytrailerist");
    };
    TrailerSettingsEditComponent.prototype.onClickCancel = function () {
        this.displayTrailerList.emit("displayTruckList");
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], TrailerSettingsEditComponent.prototype, "selectedTrailerIdToEdit", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array)
    ], TrailerSettingsEditComponent.prototype, "trailerToEdit", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], TrailerSettingsEditComponent.prototype, "displayTrailerList", void 0);
    TrailerSettingsEditComponent = __decorate([
        core_1.Component({
            selector: 'trailer-settings-edit',
            templateUrl: 'app/dashboard/features/settings/trailerSettings/trailerSettingsEdit/trailerSettingsEditTemplate.html',
        }), 
        __metadata('design:paramtypes', [forms_1.FormBuilder, trailerSettingsService_1.TrailerSettingsService])
    ], TrailerSettingsEditComponent);
    return TrailerSettingsEditComponent;
}());
exports.TrailerSettingsEditComponent = TrailerSettingsEditComponent;
