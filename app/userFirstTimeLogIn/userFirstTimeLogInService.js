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
var UserFirstTimeLogInService = (function () {
    function UserFirstTimeLogInService(_http, appService, router) {
        this._http = _http;
        this.appService = appService;
        this.router = router;
        this.poolInfoURL = 'app/';
        this.poolDataURL = 'app/poolDetails.json';
    }
    UserFirstTimeLogInService.prototype.extractData = function (response) {
        var serverResponse = response;
        return serverResponse || {};
    };
    UserFirstTimeLogInService.prototype.handleError = function (error) {
        console.error("Error:" + error);
        return Observable_1.Observable.throw(error.json().error || "Server error");
    };
    UserFirstTimeLogInService.prototype.getCognitoPoolData = function () {
        console.log("getCognitoPoolData service called..");
        return this._http.get(this.poolDataURL)
            .map(function (response) {
            console.log("getAppClientInfo response..1..", response.json());
            return response.json();
        })
            .catch(this.handleError);
    };
    /*getAppClientInfo(userData: any): Observable<any>{

        console.log("userData inside getAppClientInfo..",userData);

        return this._http.get(this.appService.appClientInfo+"/"+userData.companyId+"/"+userData.appClientName)
            .map(this.extractData)

            //.do(data => console.log("Data received: " + JSON.stringify(data)))
            .catch(this.handleError);

    }*/
    UserFirstTimeLogInService.prototype.userFirstTimeLogIn = function (confirmUserData, poolInfo) {
        console.log("confirmUserData..", confirmUserData);
        // get pool id and client id from DB
        /*this.getAppClientInfo(confirmUserData)
        .subscribe(
             serviceResponse => {
                this.appClientResponse = serviceResponse
                console.log("getAppClientInfo response:...", this.appClientResponse.json())
                this.appClientInfo = this.appClientResponse.json();
                console.log("appClientInfo:...", this.appClientInfo.userpoolId)*/
        /*let appClientInfo = {
                "userpoolId": "us-east-1_ddjrudfNV",
                "appClientId": "7dv5quvqdu7ra5rstajrhkb5q0"
                } */
        var authenticationData = {
            Username: confirmUserData.username,
            Password: confirmUserData.temporaryPassword
        };
        //console.log("authenticationData..",authenticationData);
        var authenticationDetails = new AWSCognito.CognitoIdentityServiceProvider.AuthenticationDetails(authenticationData);
        console.log("authenticationDetails..", authenticationDetails);
        var poolData = {
            UserPoolId: poolInfo.poolId,
            ClientId: poolInfo.portalClientId // Your client id here
        };
        //console.log("poolData..",poolData);
        var userPool = new AWSCognito.CognitoIdentityServiceProvider.CognitoUserPool(poolData);
        console.log("userPool..", userPool);
        var userData = {
            Username: confirmUserData.username,
            Pool: userPool
        };
        //console.log("userData..",userData);
        var self = this;
        var cognitoUser = new AWSCognito.CognitoIdentityServiceProvider.CognitoUser(userData);
        console.log("cognitoUser..", cognitoUser);
        cognitoUser.authenticateUser(authenticationDetails, {
            onSuccess: function (result) {
                console.log('access token + ' + result.getAccessToken().getJwtToken());
                console.log('idToken + ' + result.idToken.jwtToken);
                //result.getAccessToken().getJwtToken()
                self.router.navigate(['login']);
            },
            onFailure: function (err) {
                console.log('error : ' + err);
                alert(err);
            },
            newPasswordRequired: function (userAttributes, requiredAttributes) {
                // User was signed up by an admin and must provide new
                // password and required attributes, if any, to complete
                // authentication.
                console.log('userAttributes + ' + userAttributes);
                console.log('requiredAttributes + ' + requiredAttributes);
                // the api doesn't accept this field back
                delete userAttributes.email_verified;
                // Get these details and call
                cognitoUser.completeNewPasswordChallenge(confirmUserData.newPassword, userAttributes, this);
            }
        });
        //})
    };
    UserFirstTimeLogInService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http, app_service_1.AppService, router_1.Router])
    ], UserFirstTimeLogInService);
    return UserFirstTimeLogInService;
}());
exports.UserFirstTimeLogInService = UserFirstTimeLogInService;
