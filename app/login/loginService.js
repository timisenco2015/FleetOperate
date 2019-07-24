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
var Observable_1 = require('rxjs/Observable');
require('rxjs/add/observable/of');
require('rxjs/add/operator/do');
require('rxjs/add/operator/delay');
var router_1 = require('@angular/router');
var BehaviorSubject_1 = require("rxjs/BehaviorSubject");
var LoginService = (function () {
    function LoginService(http, appService, router) {
        this.http = http;
        this.appService = appService;
        this.router = router;
        this.isAuthenticated = false;
        this.poolDataURL = 'app/poolDetails.json';
    }
    /*--- login to authenticate with an email address and a password.
           We will use it in the login component and based on it’s result redirect to the home page and store the received token from the server.---*/
    LoginService.prototype.login = function (value) {
        var _this = this;
        var body = JSON.stringify(value);
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        //headers.append('Content-Type', 'application/X-www-form-urlencoded');
        headers.append('Authorization', 'Basic ' + btoa(value.username + ':' + value.password));
        var options = new http_1.RequestOptions({ headers: headers });
        return this.http
            .post(this.appService.loginUrl, body, options)
            .map(function (response) {
            //console.log("login backend response..1..",response);
            if (response.status == 200) {
                // console.log("login backend response..2..",response.json());
                // this.companyId = response.json().companyId;
                if (response.json().auth_token != null) {
                    localStorage.setItem('token_1', response.json().auth_token);
                    sessionStorage.setItem('token_1', response.json().auth_token);
                    localStorage.setItem('token_2', response.json().companyId);
                    localStorage.setItem('token_3', response.json().controlCenterTimer);
                    _this.isAuthenticated = true;
                }
            }
            return response;
        })
            .catch(this.handleError);
    };
    // logout method
    LoginService.prototype.logout = function () {
        localStorage.removeItem('token_1');
        localStorage.removeItem('token_2');
        localStorage.removeItem('token_3');
        this.isAuthenticated = false;
    };
    LoginService.prototype.handleError = function (error) {
        // console.error(error)
        return Observable_1.Observable.throw(error || "Server error");
    };
    // fetch user pool info from json file
    LoginService.prototype.getCognitoPoolData = function () {
        //console.log("getCognitoPoolData service called..");
        return this.http.get(this.poolDataURL)
            .map(function (response) {
            //console.log("getAppClientInfo response..1..",response.json());
            return response.json();
        })
            .catch(this.handleError);
    };
    // send username and temporary password to first time login page
    LoginService.prototype.sendLoginCredentialsToFirstTimeLoginPage = function (loginCredentials) {
        //console.log("login credentials to first time login page initaited.. ",loginCredentials)
        var loginCredential = { "username": loginCredentials.username,
            "temporaryPassword": loginCredentials.password };
        var emitUsernamePassord = new BehaviorSubject_1.BehaviorSubject(loginCredential);
        this.emitLoginCredentials = emitUsernamePassord.asObservable();
        //console.log("emitLoginCredentials.. ",this.emitLoginCredentials)
        //emitUsernamePassord.next(loginCredential);
    };
    /*getAppClientInfo(loginCredentials: any): Observable<any>{
 
         console.log("userData inside getAppClientInfo..",loginCredentials);
 
         let appClientName = "fleetOperate-Portal"
 
         return this.http.get(this.appService.appClientInfo+"/"+loginCredentials.companyId+"/"+appClientName)
             .map(response => {
                 console.log("getAppClientInfo response..1..",response.json());
          
                 return response.json()
             })
             .catch(this.handleError);
 
     }*/
    /*awsAuth(loginCredentials: any){
 
     console.log("login executed..",loginCredentials.username, "  ",loginCredentials.password);
 
     this.companyId = loginCredentials.companyId;
 
     let appClientInfo = {
                         "userpoolId": "us-east-1_ddjrudfNV",
                         "appClientId": "7dv5quvqdu7ra5rstajrhkb5q0"
                         }
 
     var authResponse = this.authenticateUser(loginCredentials, appClientInfo);
     console.log("authResponse in service:...", authResponse)*/
    /*return this.getAppClientInfo(loginCredentials)
    .subscribe(
             serviceResponse => {
                var authResponse = serviceResponse
                console.log("getAppClientInfo response:...", authResponse)
                console.log("getAppClientInfo this.jwtToken:...", this.jwtToken)
                /*this.appClientInfo = this.appClientResponse.json();
                console.log("appClientInfo:...", this.appClientInfo.userpoolId)
    //AWS.AWSCognito
    //AWS.config.update({accessKeyId: 'AKIAIRYL5TD4J3OIVK7Q', secretAccessKey: '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'});
    //AWS.config.region = 'us-east-1';
            
        
   })*/
    //return this.authenticationResponse;
    //}
    LoginService.prototype.authenticateUser = function (loginCredentials, appClientInfo) {
        var authenticationData = {
            Username: loginCredentials.username,
            Password: loginCredentials.password
        };
        //console.log("authenticationData..",authenticationData);
        var authenticationDetails = new AWSCognito.CognitoIdentityServiceProvider.AuthenticationDetails(authenticationData);
        // console.log("authenticationDetails..",authenticationDetails);
        var poolData = {
            UserPoolId: appClientInfo.userpoolId,
            ClientId: appClientInfo.appClientId // Your client id here
        };
        //console.log("poolData..",poolData);
        var userPool = new AWSCognito.CognitoIdentityServiceProvider.CognitoUserPool(poolData);
        //console.log("userPool..",userPool);
        var userData = {
            Username: loginCredentials.username,
            Pool: userPool
        };
        //console.log("userData..",userData);
        var cognitoUser = new AWSCognito.CognitoIdentityServiceProvider.CognitoUser(userData);
        // console.log("cognitoUser..",cognitoUser);
        cognitoUser.authenticateUser(authenticationDetails, {
            onSuccess: function (result) {
                //console.log('access token + ' + result.getAccessToken().getJwtToken());
                //console.log('idToken + ' + result.idToken.jwtToken);
                this.jwtToken = result.getAccessToken().getJwtToken();
                //this.eventCallback.next(this.jwtToken);
                //return this.jwtToken
                //this.router.navigate(['fleetoperate']);
                if (result.getAccessToken().getJwtToken() != null) {
                    localStorage.setItem('token_1', result.getAccessToken().getJwtToken());
                    sessionStorage.setItem('token_1', result.getAccessToken().getJwtToken());
                    localStorage.setItem('token_2', loginCredentials.companyId);
                    //localStorage.setItem('token_3', response.json().controlCenterTimer);
                    //this.isAuthenticated = true;
                    this.router.navigate(['fleetoperate']);
                    this.jwtToken = result.getAccessToken().getJwtToken();
                }
            },
            onFailure: function (err) {
                //console.log('error : ' + err);
                alert(err);
            },
        });
        /*.map(response => {
        console.log("login AWS cognito response..1..",response);
            
          
         // return response;
        })

      .catch(this.handleError);
        //console.log("jwtToken:..",this.jwtToken)
        //return this.jwtToken;*/
    };
    LoginService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http, app_service_1.AppService, router_1.Router])
    ], LoginService);
    return LoginService;
}());
exports.LoginService = LoginService;
