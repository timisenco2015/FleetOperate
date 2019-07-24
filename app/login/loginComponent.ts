import {Component, EventEmitter, Output, OnInit} from '@angular/core';
import { NgIf} from '@angular/common';
import { FormBuilder, Validators,  FormGroup } from '@angular/forms';
import {LoginService} from './loginService';
import {ErrorHandlingComponent} from '../errorHandling/errorHandlingComponent';
import {Router} from '@angular/router';
import {LoginAuthManager} from './loginAuthManager';
//import {LoginAuthenticationMessageComponent} from './loginAuthenticationMessageComponent';

declare const AWSCognito: any;
//declare const AWS: any;

@Component({
  selector: 'login',
  templateUrl: './app/login/loginTemplate.html' 
})

export class LoginComponent implements OnInit {

  private form: FormGroup;
  private showError: boolean = false;
  private broadcastLoginError: number;
  private authToken: string;
  private companyId: number;
  private optionsError: any;
  private showLoginMsg: boolean = false;
  private appClientInfo = null;
  private authenticationResponse: any;

  // constructor to initiate any imported service or angular service.
  constructor(private loginService: LoginService,
              private router: Router, private fb: FormBuilder, 
              private loginAuthManager: LoginAuthManager) {

            this.form = fb.group({
              username: ['', ],
              password: ['', ],
              companyId: ['', ],
              csrfToken: ['']
            });
  }

  ngOnInit() {
    /* this.loginAuthManager.alreadyLoggedMsg.subscribe(
       response => console.log('logged msg..',response)
     )*/
  }

  // on click of login button, the email n password are taken to backend server via 
  // loginService and on success of login, the page is routed to dashboard page
   onSubmit(loginCredentials: any) {

    //console.log("login executed..",loginCredentials.username, "  ",loginCredentials.password);

    /*this.loginService.getAppClientInfo(loginCredentials)
        .subscribe( clientInfo => {
          this.appClientInfo = clientInfo;
          //console.log("appClientInfo response is..",this.appClientInfo);
        })
    console.log("appClientInfo is..",this.appClientInfo);*/
    let poolData: any;
    this.loginService.getCognitoPoolData()
        .subscribe(response => {
            poolData = response;
            //console.log("poolData..",poolData);
            this.authenticateUser(loginCredentials, poolData);
        })
   
   }



   // on click create account button, navigate to company sign up page 
   onClickCreateAccount(){

     this.router.navigate(['createAccount']);
   }

   onClickAddNewUser(){
     this.router.navigate(['userSignUp']);
   }

   /*onClickActivateUserAccount(){
     this.router.navigate(['userSetNewPassword']);
   }*/

   onClickForgotPassword(){
    this.router.navigate(['forgotPassword']);
   }

   navigateToFleetoperatePage(){
      //this.companyId = localStorage.getItem('token_2')
     this.router.navigate(['fleetoperate']);
     //console.log("navigateToFleetoperatePage called..");
   }

   
  authenticateUser(loginCredentials:any, poolInfo:any){

       var authenticationData = {
            Username : loginCredentials.username,
            Password : loginCredentials.password
        };
        //console.log("authenticationData..",authenticationData);
        var authenticationDetails = new AWSCognito.CognitoIdentityServiceProvider.AuthenticationDetails(authenticationData);
        //console.log("authenticationDetails..",authenticationDetails);
        var poolData = {
            UserPoolId : poolInfo.poolId, // Your user pool id here
            ClientId : poolInfo.portalClientId // Your client id here
        };
        //console.log("poolData..",poolData);
        var userPool = new AWSCognito.CognitoIdentityServiceProvider.CognitoUserPool(poolData);
        //console.log("userPool..",userPool);
        var userData = {
            Username : loginCredentials.username,
            Pool : userPool
        };
        //console.log("userData..",userData);
        var cognitoUser = new AWSCognito.CognitoIdentityServiceProvider.CognitoUser(userData);
        //console.log("cognitoUser..",cognitoUser);

        let self = this;
        
        try{
        cognitoUser.authenticateUser(authenticationDetails, {
            onSuccess: function (result) {
                //console.log('access token + ' + result.getAccessToken().getJwtToken());
                //console.log('result.... ' + JSON.stringify(result));

                self.authenticationResponse = result;
                console.log('authenticationResponse is' + JSON.stringify(self.authenticationResponse));

                cognitoUser.getUserAttributes(function(err, result) {
                    if (err) {
                        alert(err);
                    return;
                    }
                    //sessionStorage.setItem("userAtt", result)
                    console.log('userAttributes is' + JSON.stringify(result));
                    for (var i = 0; i < result.length; i++) {
                        var adminId = result[2];
                        sessionStorage.setItem("aId",adminId.Value);
                        var companyId = result[3];
                        sessionStorage.setItem("cId", companyId.Value)
                        //console.log('companyId is..' + JSON.stringify(companyId.Value));

                        if(self.authenticationResponse.getAccessToken().getJwtToken() != null){
                            localStorage.setItem('token_1', self.authenticationResponse.getAccessToken().getJwtToken());
                            sessionStorage.setItem('token_1', self.authenticationResponse.getAccessToken().getJwtToken());
                            //localStorage.setItem('token_2', loginCredentials.companyId);
                            //localStorage.setItem('token_3', response.json().controlCenterTimer);
                            //this.isAuthenticated = true;
                            //this.navigateToFleetoperatePage()
                            self.router.navigate(['fleetoperate']);
                           // this.jwtToken = result.getAccessToken().getJwtToken()
                           // this.navigateToFleetoperatePage()
                            //return result.getAccessToken().getJwtToken()
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

            onFailure: function(err) {
                //console.log('error message: ' + err);
                alert(err);
            },
            newPasswordRequired: function(userAttributes, requiredAttributes) {
                        // User was signed up by an admin and must provide new
                        // password and required attributes, if any, to complete
                        // authentication.
                        self.loginService.sendLoginCredentialsToFirstTimeLoginPage(loginCredentials)
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
        

        })

        
        }catch(e){
            //console.log("exception:..", e)
        }
        

   }

}