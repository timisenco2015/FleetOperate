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
var userSignUpService_1 = require("./userSignUpService");
var router_1 = require("@angular/router");
var UserSignUpComponent = (function () {
    function UserSignUpComponent(_formBuilder, userSignUpService, router) {
        this._formBuilder = _formBuilder;
        this.userSignUpService = userSignUpService;
        this.router = router;
        this.createNewPasswordForm();
    }
    UserSignUpComponent.prototype.ngOnInit = function () {
    };
    UserSignUpComponent.prototype.onClickCancel = function () {
        this.router.navigate(['login']);
    };
    UserSignUpComponent.prototype.createNewPasswordForm = function () {
        this.addNewUserForm = this._formBuilder.group({
            companyId: this._formBuilder.control(null),
            //username: this._formBuilder.control(null),
            password: this._formBuilder.control(null),
            firstName: this._formBuilder.control(null),
            middleName: this._formBuilder.control(null),
            lastName: this._formBuilder.control(null),
            gender: this._formBuilder.control(null),
            cellPhone: this._formBuilder.control(null),
            email: this._formBuilder.control(null),
            addressLine1: this._formBuilder.control(null),
            addressLine2: this._formBuilder.control(null),
            city: this._formBuilder.control(null),
            province: this._formBuilder.control(null),
            postalCode: this._formBuilder.control(null),
            country: this._formBuilder.control(null),
            dob: this._formBuilder.control(null),
            licenseNumber: this._formBuilder.control(null),
            licenseExpiry: this._formBuilder.control(null),
            licenseIssuedAuthority: this._formBuilder.control(null),
            licenseIssuedProvince: this._formBuilder.control(null),
            homePhone: this._formBuilder.control(null),
            canVisaStatus: this._formBuilder.control(null),
            usaVisaStatus: this._formBuilder.control(null),
            nationality: this._formBuilder.control(null),
            notes: this._formBuilder.control(null)
        });
    };
    UserSignUpComponent.prototype.onClickSave = function (formvalue) {
        console.log("The new user details are: ", this.addNewUserForm.value);
        this.checkIfUsernameExists(formvalue);
        //var response = this.userSignUpService.addNewUser(formvalue);
        //console.log("add new user response..",response);
    };
    UserSignUpComponent.prototype.checkIfUsernameExists = function (formvalue) {
        var _this = this;
        console.log("checkIfUsernameExists called: ", formvalue.email);
        this.userSignUpService.checkIfUsernameExistsInDB(formvalue.email)
            .subscribe(function (serviceResponse) {
            _this.usernameCheckResponse = serviceResponse.json();
            console.log("checkIfUsernameExists response:...", _this.usernameCheckResponse.driverEmailIdExists);
            if (_this.usernameCheckResponse.driverEmailIdExists == false) {
                console.log("email id is NOT registered");
                _this.userSignUpService.addNewUser(formvalue)
                    .subscribe(function (serviceResponse) {
                    _this.addUserResponse = serviceResponse;
                    console.log("add company response:...", _this.addUserResponse.status);
                    _this.router.navigate(['login']);
                }, function (error) {
                    _this.errorMessage = error;
                    console.log("Add company error: ", error.status);
                });
            }
            else {
                console.log("email id is registered");
            }
        }, function (error) {
            _this.errorMessage = error;
            console.log("checkIfUsernameExists error: ", error.status);
        });
        //return this.usernameCheckResponse;
    };
    UserSignUpComponent = __decorate([
        core_1.Component({
            selector: 'userSignUp',
            templateUrl: 'app/userSignUp/userSignUpTemplate.html'
        }), 
        __metadata('design:paramtypes', [forms_1.FormBuilder, userSignUpService_1.UserSignUpService, router_1.Router])
    ], UserSignUpComponent);
    return UserSignUpComponent;
}());
exports.UserSignUpComponent = UserSignUpComponent;
