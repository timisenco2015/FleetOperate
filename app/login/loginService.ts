import { Injectable, EventEmitter } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import {AppService} from '../app.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/delay';
import { Router } from '@angular/router';
import { BehaviorSubject } from "rxjs/BehaviorSubject";

//declare const AWS: any;
declare const AWSCognito: any;

@Injectable()
export class LoginService {
  private isAuthenticated: boolean = false;
  private companyId: any;
  private appClientResponse: any;
  private appClientInfo: any;
  private jwtToken: any;
  public emitLoginCredentials: any;

  private poolDataURL = 'app/poolDetails.json';

  

  constructor(private http: Http, private appService: AppService, private router: Router) {
   
  }
  /*--- login to authenticate with an email address and a password. 
         We will use it in the login component and based on it’s result redirect to the home page and store the received token from the server.---*/
  login(value: any): Observable<any>  {
    let body = JSON.stringify(value)
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    //headers.append('Content-Type', 'application/X-www-form-urlencoded');
    headers.append('Authorization', 'Basic '+btoa(value.username+':'+value.password));
    let options = new RequestOptions({ headers: headers });

    return this.http
      .post(
      this.appService.loginUrl, body, options)
      //.map(response => response.json())
      .map((response) => {
        //console.log("login backend response..1..",response);
        if (response.status == 200) {
         // console.log("login backend response..2..",response.json());
         // this.companyId = response.json().companyId;
          if(response.json().auth_token != null){
            localStorage.setItem('token_1', response.json().auth_token);
            sessionStorage.setItem('token_1', response.json().auth_token);
            localStorage.setItem('token_2', response.json().companyId);
            localStorage.setItem('token_3', response.json().controlCenterTimer);
            this.isAuthenticated = true;
          }
         // return response;
        }

        return response;
      })
      .catch(this.handleError);
   
  }

  // logout method
  logout() {
    localStorage.removeItem('token_1');
    localStorage.removeItem('token_2');
    localStorage.removeItem('token_3');
    this.isAuthenticated = false;
  }

  private handleError(error: Response) {
       // console.error(error)
        return Observable.throw(error|| "Server error");
    }

   // fetch user pool info from json file
   getCognitoPoolData(): Observable<any>{
        //console.log("getCognitoPoolData service called..");
        return this.http.get(this.poolDataURL)
            .map(response => {
                //console.log("getAppClientInfo response..1..",response.json());
         
                return response.json()
            })
            .catch(this.handleError);
   }

   // send username and temporary password to first time login page
   sendLoginCredentialsToFirstTimeLoginPage(loginCredentials:any){
    //console.log("login credentials to first time login page initaited.. ",loginCredentials)
    let loginCredential = {"username": loginCredentials.username, 
                            "temporaryPassword": loginCredentials.password}
    let emitUsernamePassord = new BehaviorSubject<any>(loginCredential);
    this.emitLoginCredentials = emitUsernamePassord.asObservable();
    //console.log("emitLoginCredentials.. ",this.emitLoginCredentials)

    //emitUsernamePassord.next(loginCredential);
   } 

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

   authenticateUser(loginCredentials:any, appClientInfo: any){

       var authenticationData = {
            Username : loginCredentials.username,
            Password : loginCredentials.password
        };
        //console.log("authenticationData..",authenticationData);
        var authenticationDetails = new AWSCognito.CognitoIdentityServiceProvider.AuthenticationDetails(authenticationData);
       // console.log("authenticationDetails..",authenticationDetails);
        var poolData = {
            UserPoolId : appClientInfo.userpoolId, // Your user pool id here
            ClientId : appClientInfo.appClientId // Your client id here
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
       // console.log("cognitoUser..",cognitoUser);
        
        cognitoUser.authenticateUser(authenticationDetails, {
            onSuccess: function (result) {
                //console.log('access token + ' + result.getAccessToken().getJwtToken());
                //console.log('idToken + ' + result.idToken.jwtToken);
               
               this.jwtToken = result.getAccessToken().getJwtToken()
               //this.eventCallback.next(this.jwtToken);
               //return this.jwtToken
               //this.router.navigate(['fleetoperate']);
                if(result.getAccessToken().getJwtToken() != null){
                    localStorage.setItem('token_1', result.getAccessToken().getJwtToken());
                    sessionStorage.setItem('token_1', result.getAccessToken().getJwtToken());
                    localStorage.setItem('token_2', loginCredentials.companyId);
                    //localStorage.setItem('token_3', response.json().controlCenterTimer);
                    //this.isAuthenticated = true;
                    this.router.navigate(['fleetoperate']);
                    this.jwtToken = result.getAccessToken().getJwtToken()
                   // this.navigateToFleetoperatePage()
                    //return result.getAccessToken().getJwtToken()
                }
         

            },

            onFailure: function(err) {
                //console.log('error : ' + err);
                alert(err);
            },
        

        })
        /*.map(response => {
        console.log("login AWS cognito response..1..",response);
            
          
         // return response;
        })

      .catch(this.handleError);
        //console.log("jwtToken:..",this.jwtToken)
        //return this.jwtToken;*/

   }
   

   

  // restrict access to the profile page, showing the current authentication state.
  /*isLoggedIn() {
    return this.isAuthenticated;
  }*/
} 