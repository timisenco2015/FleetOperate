import {Component, OnInit, OnChanges,Input} from '@angular/core';
import {NgClass, NgStyle} from '@angular/common';
import { CompanyService} from '../companyService';
import { FormBuilder, Validators, FormGroup, FormControl, Validator, ReactiveFormsModule,FormsModule } from '@angular/forms';
@Component({
    selector: 'companyInfo',
    templateUrl: 'app/dashboard/features/company/companyInfo/companyInfoTemplate.html',
})

export class CompanyInfoComponent implements OnInit, OnChanges{
     
  
    private companyInfoForm: FormGroup;

    private companyPhoneNumberFc: FormControl;
    private companyCountryFc: FormControl;
    private companyPostalCodeFc: FormControl;
    private companyProvinceFc: FormControl;
    private companyCityFc: FormControl;
    private companyAddress2Fc: FormControl;
    private companyAddress1Fc: FormControl;
    private companyEmailFc: FormControl;
    private companyWebsiteFc: FormControl;
    private businessNameFc: FormControl;
    private businessNumberFc: FormControl;
    private companyNameFc: FormControl;
    private showError: boolean;

    private notInputFieldEdit: boolean;

    private isEditInfo:boolean;
    private submitAttempt:boolean;
    
    private inputFieldCss: any;
   
    private companyCompleteInfo:any;
   private broadcastErrorCode: any;
   private errorMessage:any;
    
    private showErrors:boolean;
    private companyDisplayInfo:any;
    private noInputFeildEdit:boolean;
    private companyInformation:any;
    @Input() companyInfo : any;
   

   
    // as the component loads initially, what should it execute.

    constructor(private companyDetailsService:CompanyService ,private _formBuilder: FormBuilder)
    {
        
        this.createAddCompanyAndAdminForm();

    
        
      //  this. getCompanyInfoLog();
    }
    ngOnInit(): void 
    {
        this.companyInformation= this.companyInfo;
        this.notInputFieldEdit=true;
        
        this.isEditInfo=false;
        this.showError= false;
        this.submitAttempt=false;
       this.inputFieldCss = {'outline': 'none','border':'none','box-shadow':'none','background':'none'};
       this.populateFormFields();
    }
    // on any change of action, what should be executed
    ngOnChanges(): void {

    }




    populateFormFields()
    {
        
        
         if(this.companyInformation['companyName']!='' && this.companyInformation['companyName']!=null)
            {
               
                this.companyInfoForm['controls']['companyName'].setValue(this.companyInformation['companyName']);
            }
        else
            {
                this.companyInfoForm['controls']['companyName'].setValue('None');
            }

        if(this.companyInformation['companyAddressDetails']['addressLine1']!='' && this.companyInformation['companyAddressDetails']['addressLine1']!=null)
            {
                this.companyInfoForm['controls']['companyAddress1'].setValue(this.companyInformation['companyAddressDetails']['addressLine1']);
            }
        else
            {
                this.companyInfoForm['controls']['companyAddressDetails']['companyAddress1'].setValue('None');
            }
            
        if(this.companyInformation['companyAddressDetails']['addressLine2']!='' && this.companyInformation['companyAddressDetails']['addressLine2']!=null)
            {
                this.companyInfoForm['controls']['companyAddress2'].setValue(this.companyInformation['companyAddressDetails']['addressLine2']);
            }
        else
            {
                this.companyInfoForm['controls']['companyAddress2'].setValue('None');
            }
        if(this.companyInformation['companyAddressDetails']['city']!=null && this.companyInformation['companyAddressDetails']['city']!='')
            {
               
                this.companyInfoForm['controls']['companyCity'].setValue(this.companyInformation['companyAddressDetails']['city']);
            }
        else
            {
                
                this.companyInfoForm['controls']['companyCity'].setValue('None');
            }

        if(this.companyInformation['companyAddressDetails']['province']!='' && this.companyInformation['companyAddressDetails']['province']!=null)
            {
                this.companyInfoForm['controls']['companyProvince'].setValue(this.companyInformation['companyAddressDetails']['province']);
            }
        else
            {
                this.companyInfoForm['controls']['companyProvince'].setValue('None');
            }


        if(this.companyInformation['companyAddressDetails']['postalCode']!='' && this.companyInformation['companyAddressDetails']['postalCode']!=null)
            {
                this.companyInfoForm['controls']['companyPostalCode'].setValue(this.companyInformation['companyAddressDetails']['postalCode']);
            }
        else
            {
                this.companyInfoForm['controls']['companyPostalCode'].setValue('None');
            }


        if(this.companyInformation['companyAddressDetails']['country']!='' && this.companyInformation['companyAddressDetails']['country']!=null)
            {
                this.companyInfoForm['controls']['companyCountry'].setValue(this.companyInformation['companyAddressDetails']['country']);
            }
        else
            {
                this.companyInfoForm['controls']['companyCountry'].setValue('None');
            }


        if(this.companyInformation['phoneNumber']!='' && this.companyInformation['phoneNumber']!=null)
            {
                this.companyInfoForm['controls']['companyPhoneNumber'].setValue(this.companyInformation['phoneNumber']);
            }
        else
            {
                this.companyInfoForm['controls']['companyPhoneNumber'].setValue('None');
            }

        if(this.companyInformation['businessName']!='' && this.companyInformation['businessName']!=null)
            {
                this.companyInfoForm['controls']['businessName'].setValue(this.companyInformation['businessName']);
            }
        else
            {
                this.companyInfoForm['controls']['businessName'].setValue('None');
            }
        if(this.companyInformation['businessNumber']!='' && this.companyInformation['businessNumber']!=null)
            {
                this.companyInfoForm['controls']['businessNumber'].setValue(this.companyInformation['businessNumber']);
            }
        else
            {
                this.companyInfoForm['controls']['businessNumber'].setValue('None');
            }


        if(this.companyInformation['website']!='' && this.companyInformation['website']!=null)
            {
                this.companyInfoForm['controls']['companyWebsite'].setValue(this.companyInformation['website']);
            }
        else
            {
                this.companyInfoForm['controls']['companyWebsite'].setValue('None');
            }

           
        if(this.companyInformation['email']!='' && this.companyInformation['email']!=null)
            {
                this.companyInfoForm['controls']['companyEmail'].setValue(this.companyInformation['email']);
            }
        else
            {
                this.companyInfoForm['controls']['companyEmail'].setValue('None');
            }
           
       
    }

     


   



     createAddCompanyAndAdminForm(){
       this.companyPhoneNumberFc = this._formBuilder.control('', Validators.required);
        this.companyCountryFc = this._formBuilder.control('', Validators.required);
        this.companyPostalCodeFc = this._formBuilder.control(null);
        this.companyProvinceFc = this._formBuilder.control('', Validators.required);
        this. companyCityFc = this._formBuilder.control('', Validators.required);
        this. companyAddress2Fc = this._formBuilder.control('', Validators.required);
        this. companyAddress1Fc = this._formBuilder.control('', Validators.required);
        this.companyEmailFc = this._formBuilder.control('', Validators.required);
        this.companyWebsiteFc = this._formBuilder.control('', Validators.required);
        this.businessNameFc= this._formBuilder.control('', Validators.required);
        this.businessNumberFc = this._formBuilder.control('', Validators.nullValidator);
        this. companyNameFc= this._formBuilder.control('', Validators.nullValidator);
       
        this.companyInfoForm = this._formBuilder.group(
            {
            companyPhoneNumber : this.companyPhoneNumberFc,
            companyCountry : this.companyCountryFc,
            companyPostalCode : this.companyPostalCodeFc,
            companyProvince :this.companyProvinceFc,
            companyCity : this. companyCityFc,
            companyAddress2 : this. companyAddress2Fc,
            companyAddress1 : this. companyAddress1Fc,
            companyEmail : this.companyEmailFc,
            companyWebsite : this.companyWebsiteFc,
            businessName : this.businessNameFc,
            businessNumber :  this.businessNumberFc,
            companyName :  this. companyNameFc
    });

   
       
    }


    

   onEnableFieldInput(event)
    {
        //let elementName:any = event.target.parentNode.parentNode.parentNode.parentNode.children[1].children[0].attributes.name.value
        if(!this.notInputFieldEdit)
            {
                this.notInputFieldEdit= true;
                this.inputFieldCss = {'outline': 'none','border':'inherit','box-shadow':'none','background':'none'};
                this.isEditInfo=false;
            }
        else
            {
                this.notInputFieldEdit= false;
                this.inputFieldCss = null;
                this.isEditInfo=true;
            }
            
        
            
    }

    onUpdate(companyInfoFormValue)
    {
         this.submitAttempt = true;
      
          
        if (this.companyInfoForm.status=='INVALID')
            {
                this.showError = true;
              
               
            }
            else
                {
                        //this.registerCompanyAndAdmin(formData); 

    }
}


}