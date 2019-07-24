import {Injectable} from '@angular/core';
import {Http, Response, Headers, RequestOptions, XSRFStrategy, CookieXSRFStrategy} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {AppService} from '../app.service';
import { Router } from "@angular/router";

declare const AWSCognito: any;
@Injectable()
export class UserFirstTimeLogInService {

    private appClientResponse: any;
    private appClientInfo: any;

    private poolInfoURL = 'app/'

    constructor(private _http: Http, private appService: AppService,
                private router: Router) {

    }

    private extractData(response: Response) {
        let serverResponse = response;

        return serverResponse || {};
    }

    private handleError(error: Response) {
        console.error("Error:"+error)
        return Observable.throw(error.json().error || "Server error");
    }

    private poolDataURL = 'app/poolDetails.json';

   getCognitoPoolData(): Observable<any>{
        console.log("getCognitoPoolData service called..");
        return this._http.get(this.poolDataURL)
            .map(response => {
                console.log("getAppClientInfo response..1..",response.json());
         
                return response.json()
            })
            .catch(this.handleError);
   }

    /*getAppClientInfo(userData: any): Observable<any>{

        console.log("userData inside getAppClientInfo..",userData);

        return this._http.get(this.appService.appClientInfo+"/"+userData.companyId+"/"+userData.appClientName)
            .map(this.extractData)

            //.do(data => console.log("Data received: " + JSON.stringify(data)))
            .catch(this.handleError);

    }*/

    userFirstTimeLogIn(confirmUserData: any, poolInfo:any){

        console.log("confirmUserData..",confirmUserData);

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
                    Username : confirmUserData.username,
                    Password : confirmUserData.temporaryPassword
                };
    
                //console.log("authenticationData..",authenticationData);
                var authenticationDetails = new AWSCognito.CognitoIdentityServiceProvider.AuthenticationDetails(authenticationData);
                console.log("authenticationDetails..",authenticationDetails);
                var poolData = {
                    UserPoolId : poolInfo.poolId, // Your user pool id here
                    ClientId : poolInfo.portalClientId // Your client id here
                };
                //console.log("poolData..",poolData);
                var userPool = new AWSCognito.CognitoIdentityServiceProvider.CognitoUserPool(poolData);
                console.log("userPool..",userPool);
                var userData = {
                    Username : confirmUserData.username,
                    Pool : userPool
                };
                //console.log("userData..",userData);
                let self = this;
                var cognitoUser = new AWSCognito.CognitoIdentityServiceProvider.CognitoUser(userData);
                console.log("cognitoUser..",cognitoUser);
                cognitoUser.authenticateUser(authenticationDetails, {
                    onSuccess: function (result) {
                        console.log('access token + ' + result.getAccessToken().getJwtToken());
                        console.log('idToken + ' + result.idToken.jwtToken);
                        //result.getAccessToken().getJwtToken()
                        self.router.navigate(['login']);

                    },

                    onFailure: function(err) {
                        console.log('error : ' + err);
                        alert(err);
                    },

                    newPasswordRequired: function(userAttributes, requiredAttributes) {
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

        
    }
}