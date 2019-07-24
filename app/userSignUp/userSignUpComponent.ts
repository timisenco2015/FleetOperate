import {Component, OnInit, OnChanges} from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { UserSignUpService } from "./userSignUpService";
import { Router } from "@angular/router";

@Component({
    selector: 'userSignUp',
    templateUrl: 'app/userSignUp/userSignUpTemplate.html'
})

export class UserSignUpComponent implements OnInit{

    private addNewUserForm: FormGroup;
    private errorMessage: any;
    private usernameCheckResponse: any;
    private addUserResponse: any;

    constructor(private _formBuilder: FormBuilder,
                private userSignUpService: UserSignUpService,
                private router: Router) {
        this.createNewPasswordForm();
    }

    ngOnInit() {

    }

    onClickCancel(){
        this.router.navigate(['login'])
    }

    createNewPasswordForm(){
        this.addNewUserForm = this._formBuilder.group({
            companyId: this._formBuilder.control(null),
            //username: this._formBuilder.control(null),
            password: this._formBuilder.control(null),
            firstName: this._formBuilder.control(null),
            middleName: this._formBuilder.control(null),
            lastName: this._formBuilder.control(null),
            gender: this._formBuilder.control(null),
            cellPhone: this._formBuilder.control(null),
            email: this._formBuilder.control(null),
            addressLine1: this._formBuilder.control(null),
            addressLine2: this._formBuilder.control(null),
            city: this._formBuilder.control(null),
            province: this._formBuilder.control(null),
            postalCode: this._formBuilder.control(null),
            country: this._formBuilder.control(null),
            dob: this._formBuilder.control(null),
            licenseNumber: this._formBuilder.control(null),
            licenseExpiry: this._formBuilder.control(null),
            licenseIssuedAuthority: this._formBuilder.control(null),
            licenseIssuedProvince: this._formBuilder.control(null),
            homePhone: this._formBuilder.control(null),
            canVisaStatus: this._formBuilder.control(null),
            usaVisaStatus: this._formBuilder.control(null),
            nationality: this._formBuilder.control(null),
            notes: this._formBuilder.control(null)
       });
   }

   onClickSave(formvalue: any){

       console.log("The new user details are: ", this.addNewUserForm.value)
       this.checkIfUsernameExists(formvalue);

       //var response = this.userSignUpService.addNewUser(formvalue);

       //console.log("add new user response..",response);

}

checkIfUsernameExists(formvalue:any){
        console.log("checkIfUsernameExists called: ", formvalue.email)
        
        this.userSignUpService.checkIfUsernameExistsInDB(formvalue.email)
        .subscribe(
             serviceResponse => {
                 this.usernameCheckResponse = serviceResponse.json()
                console.log("checkIfUsernameExists response:...", this.usernameCheckResponse.driverEmailIdExists)

                if(this.usernameCheckResponse.driverEmailIdExists == false){
                    console.log("email id is NOT registered")
                    this.userSignUpService.addNewUser(formvalue)
                        .subscribe(
                            serviceResponse => {
                                this.addUserResponse = serviceResponse
                                console.log("add company response:...", this.addUserResponse.status)
                                this.router.navigate(['login'])
                            },
                            error => {
                                this.errorMessage = error;
                                console.log("Add company error: ", error.status)
                            })
                }else{
                    console.log("email id is registered")
                }
             },
             error => {
                this.errorMessage = error;
                console.log("checkIfUsernameExists error: ", error.status)
             })
      //return this.usernameCheckResponse;
    }
}
