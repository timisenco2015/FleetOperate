import {Component, OnInit, OnChanges} from '@angular/core';
import {NgClass, NgStyle} from '@angular/common';
import { CompanyService } from "./companyService";

@Component({
    selector: 'company',
    templateUrl: 'app/dashboard/features/company/companyTemplate.html'
})

export class CompanyComponent implements OnInit, OnChanges{

    private isCompanyInfoActive: boolean;
    private isAccountActive: boolean;
    private isAdminUsersActive:boolean;
    private isBillingPaymentActive: boolean;
    private  companyCompleteInfo: any;
    private billingInfo: any="hi";
    private companyInfo: any="hi";
    private adminInfo: any="hi";
    private broadcastErrorCode:any;
    private errorMessage:any;
    private showError: boolean;

   constructor(private companyDetailsService:CompanyService){
      
   }
  
   // as the component loads initially, what should it execute.
   ngOnInit(): void 
   {
       this.getCompanyDetails();
      
       
   }
   // on any change of action, what should be executed
   ngOnChanges(): void {

   }

   onClickCompanyInfo()
   {
       
       this.isCompanyInfoActive=true;
       this.isAccountActive = false;
       this.isAdminUsersActive=false;
       this.isBillingPaymentActive= false;
   }

   
   onAccount()
   {
       this.isCompanyInfoActive=false
       this.isAccountActive = true;
       this.isAdminUsersActive=false;
       this.isBillingPaymentActive= false;
       
   }

   onBillingPayment()
   {
       this.isCompanyInfoActive=false
       this.isAccountActive = false;
       this.isAdminUsersActive=false;
       this.isBillingPaymentActive= true;
   }

   onAdminUser()
   {
       this.isCompanyInfoActive=false
       this.isAccountActive = false;
       this.isAdminUsersActive=true;
       this.isBillingPaymentActive= false;
   }


   getCompanyDetails()
   {
       
       this.companyDetailsService.getCompanyDetails().subscribe(
           response => {
               this.companyCompleteInfo = response.json();
               
              this.readCompanyDetailsFunction(this.companyCompleteInfo);
               console.log("Company Details ", this.companyCompleteInfo);
               if(response.status == 200){
                   this.onClickCompanyInfo();
                    this.showError = false;
                }else{
                    this.broadcastErrorCode = response.status;
                    this.showError = true;
                    if(this.showError = true){
                       window.scrollTo(0,0)
                   }
                }
           },
           error => {
           this.errorMessage = error;
           if(error != null){
               this.broadcastErrorCode = error;
               
              
           }
           console.log("Options request Error : ", error.status)
       });
    
    
   }

   readCompanyDetailsFunction(companyDetails:any)
   {
     
       this.billingInfo= companyDetails['billingInfo'];
       
       this.companyInfo=companyDetails['companyInfo'];
       this.adminInfo=companyDetails['adminInfo'];
   }

}