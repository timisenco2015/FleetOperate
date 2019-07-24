import {Component, OnInit, OnChanges, Input} from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router } from "@angular/router";
import { UserFirstTimeLogInService } from "./userFirstTimeLogInService";
import { LoginService } from "../login/loginService";

@Component({
    selector: 'userFirstTimeLogIn',
    templateUrl: 'app/userFirstTimeLogIn/userFirstTimeLogInTemplate.html'
})

export class UserFirstTimeLogInComponent implements OnInit{

    private confirmUserForm: FormGroup;
    private displayLogin: Boolean = false;
    private loginCredentials: any;

    constructor(private _formBuilder: FormBuilder,
                private userFirstTimeLogInService: UserFirstTimeLogInService,
                private router: Router,
                private loginService: LoginService) {
        this.createConfirmUserForm();
    }

    ngOnInit() {

    }

    onClickCancel(){
        this.router.navigate(['login'])
    }

    createConfirmUserForm(){
        this.loginService.emitLoginCredentials.subscribe(
                loginCredential => {
                    this.loginCredentials = loginCredential;
                    console.log("loginCredentials in first login page...",this.loginCredentials)
                }
            )
        this.confirmUserForm = this._formBuilder.group({
            //companyId: this._formBuilder.control(null),
            username: this._formBuilder.control(this.loginCredentials.username),
            temporaryPassword: this._formBuilder.control(this.loginCredentials.temporaryPassword),
            newPassword: this._formBuilder.control(null),
            confirmNewPassword: this._formBuilder.control(null),
            //appClientName: this._formBuilder.control("fleetOperate-Portal")
       })
   }

   onClickSave(userData: any){

       console.log("userData to confirm account: ", userData)

       this.userFirstTimeLogInService.getCognitoPoolData()
            .subscribe(response => {
                let poolInfo = response;

                this.userFirstTimeLogInService.userFirstTimeLogIn(userData, poolInfo);
            })

       

   }
}
