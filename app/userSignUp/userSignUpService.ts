import {Injectable} from '@angular/core';
import {Http, Response, Headers, RequestOptions, XSRFStrategy, CookieXSRFStrategy} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {AppService} from '../app.service';

declare const AWSCognito: any;
@Injectable()
export class UserSignUpService {

    constructor(private _http: Http, private appService: AppService) {

    }

    private username: any = "admin"
    private password: any = "admin"

    public checkIfUsernameExistsInDB(emailId: string):Observable<any>{
        console.log("Inside service email is:..", emailId)
        let headers = new Headers({ 'Content-Type': 'application/json' });
        headers.append('Authorization', 'Basic ' +
        btoa(this.username+':'+this.password));
    
        let options = new RequestOptions({ headers: headers });
        return this._http.post(this.appService.companyUrl+"/emailIdCheck/"+emailId+"/", options)
            .map(this.extractData)
            //.do(data => console.log("Data received: " + JSON.stringify(data)))
             .catch(this.handleError);

    }

    public addNewUser(newUserData: any){

        console.log("newUserData in service..",newUserData);
        let body = JSON.stringify(newUserData);
        console.log("Inside service companyAndAdminDetails json is:..", body)
        let headers = new Headers({ 'Content-Type': 'application/json' });
        headers.append('Authorization', 'Basic ' +
        btoa(this.username+':'+this.password));
    
        let options = new RequestOptions({ headers: headers });
        return this._http.post(this.appService.driverUrl, body, options)
            .map(this.extractData)
            //.do(data => console.log("Data received: " + JSON.stringify(data)))
             .catch(this.handleError);

    }

    public extractData(response: Response) {
        let serverResponse = response;

        let map = response.headers
        console.log("create account response..",serverResponse)
        

       // console.log("header map:..", map)

        return serverResponse || {};
    }

    public handleError(error: any) {
        console.error("Error: ",error)
        return Observable.throw(error || "Server error");
    }

    /*addNewUser(newUserData: any){

        console.log("newUserData..",newUserData);

        var poolData = {
        UserPoolId : 'us-east-1_Yr10rpXor', // Your user pool id here
        ClientId : '3lk9cdr1vm7p3rqo48r8vblv1d' // Your client id here
    };
    var userPool = new AWSCognito.CognitoIdentityServiceProvider.CognitoUserPool(poolData);

    var attributeList = [];

    var dataEmail = {
        Name : 'email',
        Value : newUserData.adminEmail
    };

    var dataFamilyName = {
        Name : 'family_name',
        Value : newUserData.adminLastName
    };

    var dataBirthDate = {
        Name : 'birthdate',
        Value : newUserData.adminDob
    };

    var dataPhoneNumber = {
        Name : 'phone_number',
        Value : '+15555555555'
    };
    var attributeEmail = new AWSCognito.CognitoIdentityServiceProvider.CognitoUserAttribute(dataEmail);
    var attributePhoneNumber = new AWSCognito.CognitoIdentityServiceProvider.CognitoUserAttribute(dataPhoneNumber);
    var attributeFamilyName = new AWSCognito.CognitoIdentityServiceProvider.CognitoUserAttribute(dataFamilyName);
    var attributeBirthDate = new AWSCognito.CognitoIdentityServiceProvider.CognitoUserAttribute(dataBirthDate);

    attributeList.push(attributeEmail);
    attributeList.push(attributeFamilyName);
    attributeList.push(attributeBirthDate);
    //attributeList.push(attributePhoneNumber);

    return userPool.signUp('hrgrulz', 'passWord', attributeList, null, function(err, result){
        if (err) {
            alert(err);
            console.log('err ' + err);
            return;
        }
        var cognitoUser = result.user;
        console.log('user name is ' + cognitoUser.Object);
    });

    }*/

}