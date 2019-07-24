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
var confirmUserService_1 = require("./confirmUserService");
var ConfirmUserComponent = (function () {
    function ConfirmUserComponent(_formBuilder, _confirmUserService) {
        this._formBuilder = _formBuilder;
        this._confirmUserService = _confirmUserService;
        this.createNewPasswordForm();
    }
    ConfirmUserComponent.prototype.ngOnInit = function () {
    };
    ConfirmUserComponent.prototype.ngOnChanges = function () {
    };
    ConfirmUserComponent.prototype.createNewPasswordForm = function () {
        this.addNewPasswordForm = this._formBuilder.group({
            companyId: this._formBuilder.control(null),
            adminFirstName: this._formBuilder.control(null),
            adminMiddleName: this._formBuilder.control(null),
            adminLastName: this._formBuilder.control(null),
            adminCellPhone: this._formBuilder.control(null),
            adminEmail: this._formBuilder.control(null),
            adminAddressLine1: this._formBuilder.control(null),
            adminAddressLine2: this._formBuilder.control(null),
            adminCity: this._formBuilder.control(null),
            adminProvince: this._formBuilder.control(null),
            adminPostalCode: this._formBuilder.control(null),
            adminCountry: this._formBuilder.control(null),
            adminRole: this._formBuilder.control("admin"),
            adminDob: this._formBuilder.control(null)
        });
    };
    ConfirmUserComponent.prototype.onClickSave = function (formvalue) {
        console.log("The new user details are: ", this.addNewPasswordForm.value);
        var response = this._confirmUserService.addNewUser(formvalue);
        console.log("add new user response..", response);
    };
    ConfirmUserComponent = __decorate([
        core_1.Component({
            selector: 'confirmUser',
            templateUrl: 'app/confirmUser/confirmUserTemplate.html'
        }), 
        __metadata('design:paramtypes', [forms_1.FormBuilder, confirmUserService_1.ConfirmUserService])
    ], ConfirmUserComponent);
    return ConfirmUserComponent;
}());
exports.ConfirmUserComponent = ConfirmUserComponent;
//# sourceMappingURL=confirmUserComponent.js.map