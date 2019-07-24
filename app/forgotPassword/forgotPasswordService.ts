import {Injectable} from '@angular/core';
import {Http, Response, Headers, RequestOptions, XSRFStrategy, CookieXSRFStrategy} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import { AppService } from '../app.service';
import { Router } from "@angular/router";

declare const AWSCognito: any;
@Injectable()
export class ForgotPasswordService {

    constructor(private _http: Http, private appService: AppService, private router: Router) {

    }

    private handleError(error: Response) {
        //console.error(error)
        return Observable.throw(error|| "Server error");
    }

    private poolDataURL = 'app/poolDetails.json';

    getCognitoPoolData(): Observable<any>{
        //console.log("getCognitoPoolData service called..");
        return this._http.get(this.poolDataURL)
            .map(response => {
                //console.log("getAppClientInfo response..1..",response.json());
         
                return response.json()
            })
            .catch(this.handleError);
    }


    forgotPassword(username: String, poolInfo:any){
       //console.log("forgotPassword called for..", username);

       /*let appClientInfo = {
                        "userpoolId": "us-east-1_ddjrudfNV",
                        "appClientId": "7dv5quvqdu7ra5rstajrhkb5q0"
                        } */
       
       var poolData = {
            UserPoolId : poolInfo.poolId, // Your user pool id here
            ClientId : poolInfo.portalClientId // Your client id here
        };
        //console.log("poolData..",poolData);
        var userPool = new AWSCognito.CognitoIdentityServiceProvider.CognitoUserPool(poolData);
        //console.log("userPool..",userPool);
        var userData = {
            Username : username,
            Pool : userPool
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
            onFailure: function(err) {
                alert(err);
            //console.log('error from forgotPassword: ' + err);
            },
            //Optional automatic callback
            inputVerificationCode: function(data) {
                // console.log('Code sent to: ' + data);
                var verificationCode = prompt('Please input verification code ' ,'');
                var newPassword = prompt('Enter new password ' ,'');
                cognitoUser.confirmPassword(verificationCode, newPassword, this);
            }
        });
    }
}