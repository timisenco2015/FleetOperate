import {Component, OnInit, OnChanges} from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router } from "@angular/router";
import { ForgotPasswordService } from "./forgotPasswordService";

@Component({
    selector: 'forgotPassword',
    templateUrl: 'app/forgotPassword/forgotPasswordTemplate.html'
})

export class ForgotPasswordComponent implements OnInit{

    private forgotPasswordForm: FormGroup;

    constructor(private _formBuilder: FormBuilder,
                private forgotPasswordService: ForgotPasswordService,
                private router: Router) {
        this.createForgotPasswordForm();
    }

    ngOnInit() {

    }

    createForgotPasswordForm(){
        this.forgotPasswordForm = this._formBuilder.group({
            
            username: this._formBuilder.control(null)
       });
   }
   onClickSendRequest(username: String){
    //console.log("The username is 11: ", username.valueOf())
        //console.log("The username is 22: ", username['username'])
        this.forgotPasswordService.getCognitoPoolData()
            .subscribe(response => {
                let poolInfo = response;
                this.forgotPasswordService.forgotPassword(username['username'], poolInfo)
            })
        
   }

   onClickCancel(){
       this.router.navigate(['login']);
   }
}