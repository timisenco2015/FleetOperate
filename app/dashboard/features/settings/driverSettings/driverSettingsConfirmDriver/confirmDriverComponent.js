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
var driverSettingsService_1 = require("../driverSettingsService");
var ConfirmDriverComponent = (function () {
    function ConfirmDriverComponent(_formBuilder, _driverSettingsService) {
        this._formBuilder = _formBuilder;
        this._driverSettingsService = _driverSettingsService;
        this.showForm = true;
        this.displayDriverConfirmed = false;
        this.displayDriverList = new core_1.EventEmitter();
        this.createConfirmDriverForm();
    }
    ConfirmDriverComponent.prototype.createConfirmDriverForm = function () {
        this.confirmDriverForm = this._formBuilder.group({
            username: ['',]
        });
    };
    ConfirmDriverComponent.prototype.onClickConfirm = function (username) {
        var _this = this;
        console.log("username to be confirmed..", username);
        this._driverSettingsService.confirmDriver(username)
            .subscribe(function (response) {
            _this.confirmDriverResponse = response;
            console.log("confirm driver response..", _this.confirmDriverResponse);
        });
    };
    ConfirmDriverComponent.prototype.onClickCancel = function () {
        this.displayDriverList.emit("displayDriverList");
    };
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], ConfirmDriverComponent.prototype, "displayDriverList", void 0);
    ConfirmDriverComponent = __decorate([
        core_1.Component({
            selector: 'driver-settings-confirm',
            templateUrl: 'app/dashboard/features/settings/driverSettings/driverSettingsConfirmDriver/confirmDriverTemplate.html'
        }), 
        __metadata('design:paramtypes', [forms_1.FormBuilder, driverSettingsService_1.DriverSettingsService])
    ], ConfirmDriverComponent);
    return ConfirmDriverComponent;
}());
exports.ConfirmDriverComponent = ConfirmDriverComponent;
