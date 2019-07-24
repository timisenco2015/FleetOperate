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
var Observable_1 = require('rxjs/Observable');
var app_service_1 = require('../app.service');
var router_1 = require("@angular/router");
var ForgotPasswordService = (function () {
    function ForgotPasswordService(_http, appService, router) {
        this._http = _http;
        this.appService = appService;
        this.router = router;
        this.poolDataURL = 'app/poolDetails.json';
    }
    ForgotPasswordService.prototype.handleError = function (error) {
        //console.error(error)
        return Observable_1.Observable.throw(error || "Server error");
    };
    ForgotPasswordService.prototype.getCognitoPoolData = function () {
        //console.log("getCognitoPoolData service called..");
        return this._http.get(this.poolDataURL)
            .map(function (response) {
            //console.log("getAppClientInfo response..1..",response.json());
            return response.json();
        })
            .catch(this.handleError);
    };
    ForgotPasswordService.prototype.forgotPassword = function (username, poolInfo) {
        //console.log("forgotPassword called for..", username);
        /*let appClientInfo = {
                         "userpoolId": "us-east-1_ddjrudfNV",
                         "appClientId": "7dv5quvqdu7ra5rstajrhkb5q0"
                         } */
        var poolData = {
            UserPoolId: poolInfo.poolId,
            ClientId: poolInfo.portalClientId // Your client id here
        };
        //console.log("poolData..",poolData);
        var userPool = new AWSCognito.CognitoIdentityServiceProvider.CognitoUserPool(poolData);
        //console.log("userPool..",userPool);
        var userData = {
            Username: username,
            Pool: userPool
        };
        //console.log("userData..",userData);
        var cognitoUser = new AWSCognito.CognitoIdentityServiceProvider.CognitoUser(userData);
        //console.log("cognitoUser..",cognitoUser);
        cognitoUser.forgotPassword({
            onSuccess: function (result) {
                // successfully initiated reset password request
                //console.log('CodeDeliveryData from forgotPassword: ' + result);
                this.router.navigate(['login']);
            },
            onFailure: function (err) {
                alert(err);
                //console.log('error from forgotPassword: ' + err);
            },
            //Optional automatic callback
            inputVerificationCode: function (data) {
                // console.log('Code sent to: ' + data);
                var verificationCode = prompt('Please input verification code ', '');
                var newPassword = prompt('Enter new password ', '');
                cognitoUser.confirmPassword(verificationCode, newPassword, this);
            }
        });
    };
    ForgotPasswordService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http, app_service_1.AppService, router_1.Router])
    ], ForgotPasswordService);
    return ForgotPasswordService;
}());
exports.ForgotPasswordService = ForgotPasswordService;
