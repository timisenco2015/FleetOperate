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
var http_1 = require('@angular/http');
var app_service_1 = require('../app.service');
var ConfirmUserService = (function () {
    function ConfirmUserService(_http, appService) {
        this._http = _http;
        this.appService = appService;
    }
    ConfirmUserService.prototype.addNewUser = function (newUserData) {
        console.log("newUserData..", newUserData);
        var poolData = {
            UserPoolId: 'us-east-1_Yr10rpXor',
            ClientId: '3lk9cdr1vm7p3rqo48r8vblv1d' // Your client id here
        };
        var userPool = new AWSCognito.CognitoIdentityServiceProvider.CognitoUserPool(poolData);
        var attributeList = [];
        var dataEmail = {
            Name: 'email',
            Value: newUserData.adminEmail
        };
        var dataFamilyName = {
            Name: 'family_name',
            Value: newUserData.adminLastName
        };
        var dataBirthDate = {
            Name: 'birthdate',
            Value: newUserData.adminDob
        };
        var dataPhoneNumber = {
            Name: 'phone_number',
            Value: '+15555555555'
        };
        var attributeEmail = new AWSCognito.CognitoIdentityServiceProvider.CognitoUserAttribute(dataEmail);
        var attributePhoneNumber = new AWSCognito.CognitoIdentityServiceProvider.CognitoUserAttribute(dataPhoneNumber);
        var attributeFamilyName = new AWSCognito.CognitoIdentityServiceProvider.CognitoUserAttribute(dataFamilyName);
        var attributeBirthDate = new AWSCognito.CognitoIdentityServiceProvider.CognitoUserAttribute(dataBirthDate);
        attributeList.push(attributeEmail);
        attributeList.push(attributeFamilyName);
        attributeList.push(attributeBirthDate);
        //attributeList.push(attributePhoneNumber);
        return userPool.signUp('hrgrulz', 'passWord', attributeList, null, function (err, result) {
            if (err) {
                alert(err);
                console.log('err ' + err);
                return;
            }
            var cognitoUser = result.user;
            console.log('user name is ' + cognitoUser.Object);
        });
    };
    ConfirmUserService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http, app_service_1.AppService])
    ], ConfirmUserService);
    return ConfirmUserService;
}());
exports.ConfirmUserService = ConfirmUserService;
//# sourceMappingURL=confirmUserService.js.map