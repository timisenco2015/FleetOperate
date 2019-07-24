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
var router_1 = require("@angular/router");
var userSetNewPasswordService_1 = require("./userSetNewPasswordService");
var UserSetNewPasswordComponent = (function () {
    function UserSetNewPasswordComponent(_formBuilder, userSetNewPasswordService, router) {
        this._formBuilder = _formBuilder;
        this.userSetNewPasswordService = userSetNewPasswordService;
        this.router = router;
        this.createConfirmUserForm();
    }
    UserSetNewPasswordComponent.prototype.ngOnInit = function () {
    };
    UserSetNewPasswordComponent.prototype.onClickCancel = function () {
        this.router.navigate(['login']);
    };
    UserSetNewPasswordComponent.prototype.createConfirmUserForm = function () {
        this.confirmUserForm = this._formBuilder.group({
            //companyId: this._formBuilder.control(null),
            username: this._formBuilder.control(null),
            temporaryPassword: this._formBuilder.control(null),
            newPassword: this._formBuilder.control(null),
            retypeNewPassword: this._formBuilder.control(null),
        });
    };
    UserSetNewPasswordComponent.prototype.onClickSave = function (userData) {
        console.log("userData to confirm account: ", userData);
        var response = this.userSetNewPasswordService.confirmUser(userData);
        console.log("userData to confirm account response: ", response);
    };
    UserSetNewPasswordComponent = __decorate([
        core_1.Component({
            selector: 'userSetNewPassword',
            templateUrl: 'app/userSetNewPassword/userSetNewPasswordTemplate.html'
        }), 
        __metadata('design:paramtypes', [forms_1.FormBuilder, (typeof (_a = typeof userSetNewPasswordService_1.UserSetNewPasswordService !== 'undefined' && userSetNewPasswordService_1.UserSetNewPasswordService) === 'function' && _a) || Object, router_1.Router])
    ], UserSetNewPasswordComponent);
    return UserSetNewPasswordComponent;
    var _a;
}());
exports.UserSetNewPasswordComponent = UserSetNewPasswordComponent;
//# sourceMappingURL=userSetNewPaswordComponent.js.map