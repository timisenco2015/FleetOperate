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
var userFirstTimeLogInService_1 = require("./userFirstTimeLogInService");
var loginService_1 = require("../login/loginService");
var UserFirstTimeLogInComponent = (function () {
    function UserFirstTimeLogInComponent(_formBuilder, userFirstTimeLogInService, router, loginService) {
        this._formBuilder = _formBuilder;
        this.userFirstTimeLogInService = userFirstTimeLogInService;
        this.router = router;
        this.loginService = loginService;
        this.displayLogin = false;
        this.createConfirmUserForm();
    }
    UserFirstTimeLogInComponent.prototype.ngOnInit = function () {
    };
    UserFirstTimeLogInComponent.prototype.onClickCancel = function () {
        this.router.navigate(['login']);
    };
    UserFirstTimeLogInComponent.prototype.createConfirmUserForm = function () {
        var _this = this;
        this.loginService.emitLoginCredentials.subscribe(function (loginCredential) {
            _this.loginCredentials = loginCredential;
            console.log("loginCredentials in first login page...", _this.loginCredentials);
        });
        this.confirmUserForm = this._formBuilder.group({
            //companyId: this._formBuilder.control(null),
            username: this._formBuilder.control(this.loginCredentials.username),
            temporaryPassword: this._formBuilder.control(this.loginCredentials.temporaryPassword),
            newPassword: this._formBuilder.control(null),
            confirmNewPassword: this._formBuilder.control(null),
        });
    };
    UserFirstTimeLogInComponent.prototype.onClickSave = function (userData) {
        var _this = this;
        console.log("userData to confirm account: ", userData);
        this.userFirstTimeLogInService.getCognitoPoolData()
            .subscribe(function (response) {
            var poolInfo = response;
            _this.userFirstTimeLogInService.userFirstTimeLogIn(userData, poolInfo);
        });
    };
    UserFirstTimeLogInComponent = __decorate([
        core_1.Component({
            selector: 'userFirstTimeLogIn',
            templateUrl: 'app/userFirstTimeLogIn/userFirstTimeLogInTemplate.html'
        }), 
        __metadata('design:paramtypes', [forms_1.FormBuilder, userFirstTimeLogInService_1.UserFirstTimeLogInService, router_1.Router, loginService_1.LoginService])
    ], UserFirstTimeLogInComponent);
    return UserFirstTimeLogInComponent;
}());
exports.UserFirstTimeLogInComponent = UserFirstTimeLogInComponent;
