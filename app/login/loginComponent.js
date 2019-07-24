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
var loginService_1 = require('./loginService');
var router_1 = require('@angular/router');
var loginAuthManager_1 = require('./loginAuthManager');
//declare const AWS: any;
var LoginComponent = (function () {
    // constructor to initiate any imported service or angular service.
    function LoginComponent(loginService, router, fb, loginAuthManager) {
        this.loginService = loginService;
        this.router = router;
        this.fb = fb;
        this.loginAuthManager = loginAuthManager;
        this.showError = false;
        this.showLoginMsg = false;
        this.appClientInfo = null;
        this.form = fb.group({
            username: ['',],
            password: ['',],
            companyId: ['',],
            csrfToken: ['']
        });
    }
    LoginComponent.prototype.ngOnInit = function () {
        /* this.loginAuthManager.alreadyLoggedMsg.subscribe(
           response => console.log('logged msg..',response)
         )*/
    };
    // on click of login button, the email n password are taken to backend server via 
    // loginService and on success of login, the page is routed to dashboard page
    LoginComponent.prototype.onSubmit = function (loginCredentials) {
        //console.log("login executed..",loginCredentials.username, "  ",loginCredentials.password);
        var _this = this;
        /*this.loginService.getAppClientInfo(loginCredentials)
            .subscribe( clientInfo => {
              this.appClientInfo = clientInfo;
              //console.log("appClientInfo response is..",this.appClientInfo);
            })
        console.log("appClientInfo is..",this.appClientInfo);*/
        var poolData;
        this.loginService.getCognitoPoolData()
            .subscribe(function (response) {
            poolData = response;
            //console.log("poolData..",poolData);
            _this.authenticateUser(loginCredentials, poolData);
        });
    };
    // on click create account button, navigate to company sign up page 
    LoginComponent.prototype.onClickCreateAccount = function () {
        this.router.navigate(['createAccount']);
    };
    LoginComponent.prototype.onClickAddNewUser = function () {
        this.router.navigate(['userSignUp']);
    };
    /*onClickActivateUserAccount(){
      this.router.navigate(['userSetNewPassword']);
    }*/
    LoginComponent.prototype.onClickForgotPassword = function () {
        this.router.navigate(['forgotPassword']);
    };
    LoginComponent.prototype.navigateToFleetoperatePage = function () {
        //this.companyId = localStorage.getItem('token_2')
        this.router.navigate(['fleetoperate']);
        //console.log("navigateToFleetoperatePage called..");
    };
    LoginComponent.prototype.authenticateUser = function (loginCredentials, poolInfo) {
        var authenticationData = {
            Username: loginCredentials.username,
            Password: loginCredentials.password
        };
        //console.log("authenticationData..",authenticationData);
        var authenticationDetails = new AWSCognito.CognitoIdentityServiceProvider.AuthenticationDetails(authenticationData);
        //console.log("authenticationDetails..",authenticationDetails);
        var poolData = {
            UserPoolId: poolInfo.poolId,
            ClientId: poolInfo.portalClientId // Your client id here
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
        //console.log("cognitoUser..",cognitoUser);
        var self = this;
        try {
            cognitoUser.authenticateUser(authenticationDetails, {
                onSuccess: function (result) {
                    //console.log('access token + ' + result.getAccessToken().getJwtToken());
                    //console.log('result.... ' + JSON.stringify(result));
                    self.authenticationResponse = result;
                    console.log('authenticationResponse is' + JSON.stringify(self.authenticationResponse));
                    cognitoUser.getUserAttributes(function (err, result) {
                        if (err) {
                            alert(err);
                            return;
                        }
                        //sessionStorage.setItem("userAtt", result)
                        console.log('userAttributes is' + JSON.stringify(result));
                        for (var i = 0; i < result.length; i++) {
                            var adminId = result[2];
                            sessionStorage.setItem("aId", adminId.Value);
                            var companyId = result[3];
                            sessionStorage.setItem("cId", companyId.Value);
                            //console.log('companyId is..' + JSON.stringify(companyId.Value));
                            if (self.authenticationResponse.getAccessToken().getJwtToken() != null) {
                                localStorage.setItem('token_1', self.authenticationResponse.getAccessToken().getJwtToken());
                                sessionStorage.setItem('token_1', self.authenticationResponse.getAccessToken().getJwtToken());
                                //localStorage.setItem('token_2', loginCredentials.companyId);
                                //localStorage.setItem('token_3', response.json().controlCenterTimer);
                                //this.isAuthenticated = true;
                                //this.navigateToFleetoperatePage()
                                self.router.navigate(['fleetoperate']);
                            }
                        }
                    });
                    //POTENTIAL: Region needs to be set if not already set previously elsewhere.
                    /*AWS.config.region = 'us-east-1';
    
                    AWS.config.credentials = new AWS.CognitoIdentityCredentials({
                        IdentityPoolId : 'us-east-1_Yr10rpXor', // your identity pool id here
                        Logins : {
                            // Change the key below according to the specific region your user pool is in.
                            'cognito-idp.us-east-1.amazonaws.com/us-east-1_Yr10rpXor' : result.getIdToken().getJwtToken()
                        }
                    });*/
                    // Instantiate aws sdk service objects now that the credentials have been updated.
                    // example: var s3 = new AWS.S3();
                    //this.jwtToken = result.getAccessToken().getJwtToken()
                    /*if(result.getAccessToken().getJwtToken() != null){
                        localStorage.setItem('token_1', result.getAccessToken().getJwtToken());
                        sessionStorage.setItem('token_1', result.getAccessToken().getJwtToken());
                        localStorage.setItem('token_2', loginCredentials.companyId);
                        //localStorage.setItem('token_3', response.json().controlCenterTimer);
                        //this.isAuthenticated = true;
                        //this.navigateToFleetoperatePage()
                        self.router.navigate(['fleetoperate']);
                       // this.jwtToken = result.getAccessToken().getJwtToken()
                       // this.navigateToFleetoperatePage()
                        //return result.getAccessToken().getJwtToken()
                    }*/
                },
                onFailure: function (err) {
                    //console.log('error message: ' + err);
                    alert(err);
                },
                newPasswordRequired: function (userAttributes, requiredAttributes) {
                    // User was signed up by an admin and must provide new
                    // password and required attributes, if any, to complete
                    // authentication.
                    self.loginService.sendLoginCredentialsToFirstTimeLoginPage(loginCredentials);
                    self.router.navigate(['userFirstTimeLogIn']);
                    /*self.sendUsernamePassword.emit({username: loginCredentials.username,
                                                    temporaryPassword: loginCredentials.password})*/
                    //self.emitUsername = loginCredentials.username;
                    //self.emitPassword = loginCredentials.password;
                    //console.log('userAttributes + ' + userAttributes);
                    // console.log('requiredAttributes + ' + requiredAttributes);
                    // the api doesn't accept this field back
                    delete userAttributes.email_verified;
                    // Get these details and call
                    //cognitoUser.completeNewPasswordChallenge(confirmUserData.newPassword, userAttributes, this);
                }
            });
        }
        catch (e) {
        }
    };
    LoginComponent = __decorate([
        core_1.Component({
            selector: 'login',
            templateUrl: './app/login/loginTemplate.html'
        }), 
        __metadata('design:paramtypes', [loginService_1.LoginService, router_1.Router, forms_1.FormBuilder, loginAuthManager_1.LoginAuthManager])
    ], LoginComponent);
    return LoginComponent;
}());
exports.LoginComponent = LoginComponent;
