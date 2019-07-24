import {Component, OnInit, OnChanges, SimpleChanges, Output, EventEmitter} from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { CreateAccountService } from "../createAccountService";
import { Router } from "@angular/router";

@Component({
    selector: 'createCompanyAdminOrders',
    templateUrl: 'app/createAccount/createCompanyAdminOrders/createCompanyAdminOrdersTemplate.html'
})

export class CreateCompanyAdminOrdersComponent implements OnInit, OnChanges {

    private addCompanyForm: FormGroup;
    private addCompanyResponse: any;
    private errorMessage: any;
    private usernameCheckResponse: any;
    private displayUsernameExists: boolean = false;
    private displayEmailIdExists: boolean = false;
    private displayRequiredFieldError: boolean =false;
    private validEmailId:boolean = false;
    private displayAcceptTermsConditions: boolean = false;
    private minimumOrderCondition: boolean = false;
    private displayMinimumOrderCondition: boolean = false;
    @Output() displayBilling: EventEmitter<any> = new EventEmitter<any>();
    private acceptTerms: boolean;

    constructor(private _formBuilder: FormBuilder,
        private _createAccountService: CreateAccountService,
        private router: Router) {
            
            this.createAddCompanyAndAdminForm();
}

    ngOnChanges(changes: SimpleChanges): void {
        //throw new Error("Method not implemented.");
    }
    ngOnInit(): void {
        this.extractLocalTimezone();
    }

    onClickCancel(){
        this.router.navigate(['login']);
   }

   createAddCompanyAndAdminForm(){
       this.addCompanyForm = this._formBuilder.group({
           companyName: [null, Validators.required],
           companyAddressLine1: [null, Validators.required],
           companyAddressLine2: [null],
           companyCity: [null, Validators.required],
           companyProvince: [null, Validators.required],
           companyPostalCode: [null, Validators.required],
           companyCountry: [null, Validators.required],

           adminFirstName: [null, Validators.required],
           adminMiddleName: [null],
           adminLastName: [null, Validators.required],
           adminCellPhone: [null, Validators.required],
           adminEmail: [null, Validators.required],

           standardQuantity: [0],
           enhancedQuantity: [0],
           premierQuantity: [0],

       })
   }

   extractLocalTimezone(){
       //console.log("The extractLocalTimezone is called: ");
       let currentDate = new Date();
       //console.log("The currentDate is: ", currentDate);
   }

   //=============THIS BELOW METHOD NOT REQUIRED ANYMORE==========================
   onClickSave(formData: any){
       //console.log("The company details are: ", formData.value)
       //console.log("The company details are: ", formData.status)
       this.displayUsernameExists = false;
       this.displayEmailIdExists = false;
       
       this.checkIfUsernameExists(formData);
       //console.log("checkIfUsernameExists response is...: ", this.usernameCheckResponse)

   }
   //=============THIS ABOVE METHOD NOT REQUIRED ANYMORE==========================



   checkIfUsernameExists(adminEmailId:any){
       //console.log("checkIfUsernameExists called: ", adminEmailId)
       
       this._createAccountService.checkIfUsernameExistsInDB(/*formData.adminUsername,*/ adminEmailId)
       .subscribe(
            serviceResponse => {
               this.usernameCheckResponse = serviceResponse.json()
               //console.log("checkIfUsernameExists response 1:...", this.usernameCheckResponse.usernameExists)
               //console.log("checkIfUsernameExists response 2:...", this.usernameCheckResponse.personEmailIdExists)

                   if(this.usernameCheckResponse.personEmailIdExists == false){
                       //console.log("emailId is NOT registered");
                       //this.registerCompanyAndAdmin(formData);
                       this.validEmailId = true;
                       this.displayEmailIdExists = false;
                   }else{
                       //console.log("emailId is already registered");
                       this.displayEmailIdExists = true;
                       window.scrollTo(0, 0);
                       this.validEmailId = false;
                   }

            },
            error => {
               this.errorMessage = error;
               //console.log("checkIfUsernameExists error: ", error.status)
            })
     //return this.usernameCheckResponse;
   }

   registerCompanyAndAdmin(formData: any){
       this._createAccountService.addCompanyAndAdmin(formData)
           .subscribe(
               serviceResponse => {
                   this.addCompanyResponse = serviceResponse
                   //console.log("add company response:...", this.addCompanyResponse.status)
                   if(this.addCompanyResponse.status == 200){
                       //console.log("Add company and admin successful: ");
                       document.getElementById("showModal").click();
                   }else{
                       //console.log("Add company error saving: ")
                   }
               },
               error => {
                   this.errorMessage = error;
                   //console.log("Add company error: ", error.status)
               })
   }

   onEmailIdTabOff(formData: any){
    //console.log("emailId: ", formData.adminEmail);
    this.checkIfUsernameExists(formData.adminEmail);
   }

   onClickTermAndConditions(){
    //console.log("onClickTermAndConditions: ")
    document.getElementById("showTermsConditionsModal").click();
   }

   checkIfAtleastOneOrderIsMade(formData: any): Boolean{
    //console.log("checkIfAtleastOneOrderIsMade, formData: ", formData);

    if(formData.standardQuantity != 0 
        || formData.enhancedQuantity != 0 
        || formData.premierQuantity != 0){
        //this.minimumOrderCondition = false;
        //console.log("checkIfAtleastOneOrderIsMade, standardQuantity: ", formData.standardQuantity);
        //console.log("checkIfAtleastOneOrderIsMade, enhancedQuantity: ", formData.enhancedQuantity);
        //console.log("checkIfAtleastOneOrderIsMade, premierQuantity: ", formData.enhancedQuantity);
        return true;
    }else{
        //this.minimumOrderCondition = true;
        return false;
    }


    //console.log("minimumOrderCondition: ", this.minimumOrderCondition);

    //return this.minimumOrderCondition;

   }

   onClickNext(formData: any){
    //console.log("onClickNext: formData..", formData.value)

    // check if all form fields are filled
    if(formData.status == "INVALID"){
        //console.log("formData.status: ", formData.value);
        this.displayRequiredFieldError = true;
        window.scrollTo(0, 0);
    }else{
        //console.log("formData.status: ", formData.value);
        this.displayRequiredFieldError = false;

        // check if email id exits in db or not
        if(this.validEmailId == true){
            //console.log("valid email id: ");
            this.displayEmailIdExists = false;
           //console.log("checking to diaplay form data: ", formData.value);
            // check if atleast one order is made
            let minOrderCondition = this.checkIfAtleastOneOrderIsMade(formData.value);
            //console.log("minOrderCondition: ",minOrderCondition);
            if(minOrderCondition == true){
                //console.log("minimum order is made: ");
                this.displayMinimumOrderCondition = false;

                 // check if terms and conditions are accepted or not
                if(this.acceptTerms == true){
                    //console.log("check box clicked : ");
                    this.displayAcceptTermsConditions = false;
                    
                    //console.log("proceed to next page : ");

                    this.displayBilling.emit({companyAdminOrders: formData.value})

                }else{
                    //console.log("check box NOT checked : ");
                    this.displayAcceptTermsConditions = true;
                    window.scrollTo(0, 0);
                }
            }else{
                //console.log("minimum order is NOT made: ");
                this.displayMinimumOrderCondition = true;
                window.scrollTo(0, 0);
            }

        }else{
            //console.log("not valid email id: ");
            this.displayEmailIdExists = true;
            window.scrollTo(0, 0);
        }
        
    }
   }

}