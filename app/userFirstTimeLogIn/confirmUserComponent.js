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
var router_1 = require("@angular/router");
var ConfirmUserComponent = (function () {
    function ConfirmUserComponent(_formBuilder, confirmUserService, router) {
        this._formBuilder = _formBuilder;
        this.confirmUserService = confirmUserService;
        this.router = router;
        this.createConfirmUserForm();
    }
    ConfirmUserComponent.prototype.ngOnInit = function () {
    };
    ConfirmUserComponent.prototype.onClickCancel = function () {
        this.router.navigate(['login']);
    };
    ConfirmUserComponent.prototype.createConfirmUserForm = function () {
        this.confirmUserForm = this._formBuilder.group({
            //companyId: this._formBuilder.control(null),
            username: this._formBuilder.control(null),
            temporaryPassword: this._formBuilder.control(null),
            newPassword: this._formBuilder.control(null),
            retypeNewPassword: this._formBuilder.control(null),
        });
    };
    ConfirmUserComponent.prototype.onClickSave = function (userData) {
        console.log("userData to confirm account: ", userData);
        var response = this.confirmUserService.confirmUser(userData);
        console.log("userData to confirm account response: ", response);
    };
    ConfirmUserComponent = __decorate([
        core_1.Component({
            selector: 'confirmUser',
            templateUrl: 'app/confirmUser/confirmUserTemplate.html'
        }), 
        __metadata('design:paramtypes', [forms_1.FormBuilder, confirmUserService_1.ConfirmUserService, router_1.Router])
    ], ConfirmUserComponent);
    return ConfirmUserComponent;
}());
exports.ConfirmUserComponent = ConfirmUserComponent;
//# sourceMappingURL=confirmUserComponent.js.map