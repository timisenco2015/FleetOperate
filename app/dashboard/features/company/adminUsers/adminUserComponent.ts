import {Component, OnInit, OnChanges,Input} from '@angular/core';
import {NgClass, NgStyle} from '@angular/common';
import { CompanyService} from '../companyService';
import { CompanyInfoService} from '../companyInfo/companyInfoService';
import { FormBuilder, Validators, FormGroup, FormControl, Validator, ReactiveFormsModule,FormsModule } from '@angular/forms';
@Component({
    selector: 'adminUser',
    templateUrl: 'app/dashboard/features/company/adminUsers/adminUserTemplate.html',
})

export class AdminUserComponent implements OnInit, OnChanges{
     
  
    private adminUserForm: FormGroup;

    private adminUsernameFc: FormControl;
    private adminRoleFc: FormControl;
    private adminEmailFc: FormControl;
    private adminCellPhoneFc: FormControl;
    private adminGenderFc: FormControl;
    private adminDobFc: FormControl;
    private adminAddressLine1Fc: FormControl;
    private adminAddressLine2Fc: FormControl;
    private adminCityFc: FormControl;
    private adminPronviceFc: FormControl;
    private adminCountryFc: FormControl;
    private adminPostalCodeFc: FormControl;
    private submitAttempt: boolean;
    private  showError: boolean;
    private companyCompleteInfo:any;
   private broadcastErrorCode: any;
   private errorMessage:any;
    private isEditInfo:boolean;
    private showErrors:boolean;
    private adminDisplayInfo:any;
    private noInputFeildEdit:boolean;
    private inputFieldCss: any;
    private adminInformation:any;
    @Input()  adminInfo: any;
   
    // as the component loads initially, what should it execute.

    constructor(private companyFullInfoService:CompanyService ,private _formBuilder: FormBuilder)
    {
        this.createAddCompanyAndAdminForm();
        
        this.inputFieldCss = {'outline': 'none','border':'inherit','box-shadow':'none','background':'none'};
      // this. populateFormFields();
       
    }
    ngOnInit(): void 
    {
        this.adminInformation = this.adminInfo;
        this.submitAttempt=false;
        this.isEditInfo=false;
        this.showError = false;
        this.noInputFeildEdit=true;
      this. populateFormFields();
    }
    // on any change of action, what should be executed
    ngOnChanges(): void {

    }


    populateFormFields()
    {
      // alert(this.adminInfo)
        
         if(this.adminInformation['username']!='' && this.adminInformation['username']!=null)
            {
                this.adminUserForm['controls']['adminUsername'].setValue(this.adminInformation['username']);
            }
        else
            {
                this.adminUserForm['controls']['adminUsername'].setValue('none');
            }


         if(this.adminInformation['email']!='' && this.adminInformation['email']!=null)
            {
                this.adminUserForm['controls']['adminEmail'].setValue(this.adminInformation['email']);
            }
        else
            {
                this.adminUserForm['controls']['adminEmail'].setValue('None');
            }

        if(this.adminInformation['cellPhone']!='' && this.adminInformation['cellPhone']!=null)
            {
                this.adminUserForm['controls']['adminCellPhone'].setValue(this.adminInformation['cellPhone']);
            }
        else
            {
                this.adminUserForm['controls']['adminCellPhone'].setValue('None');
            }

        if(this.adminInformation['gender']!='' && this.adminInformation['gender']!=null)
            {
                this.adminUserForm['controls']['adminGender'].setValue(this.adminInformation['gender']);
            }
        else
            {
                this.adminUserForm['controls']['adminGender'].setValue('None');
            }
        if(this.adminInformation['dob']!=null && this.adminInformation['dob']!='')
            {
               
                this.adminUserForm['controls']['adminDob'].setValue(this.adminInformation['dob']);
            }
        else
            {
                
                this.adminUserForm['controls']['adminDob'].setValue('None');
            }
        if(this.adminInformation['addressLine1']!='' && this.adminInformation['addressLine1']!=null)
            {
                this.adminUserForm['controls']['adminAddressLine1'].setValue(this.adminInformation['addressLine1']);
            }
        else
            {
                this.adminUserForm['controls']['adminAddressLine1'].setValue('None');
            }
        if(this.adminInformation['addressLine2']!='' && this.adminInformation['addressLine2']!=null)
            {
                this.adminUserForm['controls']['adminAddressLine2'].setValue(this.adminInformation['addressLine2']);
            }
        else
            {
                this.adminUserForm['controls']['adminAddressLine2'].setValue('None');
            }
        if(this.adminInformation['city']!='' && this.adminInformation['city']!=null)
            {
                this.adminUserForm['controls']['adminCity'].setValue(this.adminInformation['city']);
            }
        else
            {
                this.adminUserForm['controls']['adminCity'].setValue('None');
            }
        if(this.adminInformation['province']!='' && this.adminInformation['province']!=null)
            {
                 this.adminUserForm['controls']['adminPronvice'].setValue(this.adminInformation['province']);
            }
        else
            {
                this.adminUserForm['controls']['adminPronvice'].setValue('None');
            }
        if(this.adminInformation['country']!='' && this.adminInformation['country']!=null)
            {
                this.adminUserForm['controls']['adminCountry'].setValue(this.adminInformation['country']);
            }
        else
            {
                this.adminUserForm['controls']['adminCountry'].setValue('None');
            }
        if(this.adminInformation['postalCode']!='' && this.adminInformation['postalCode']!=null)
            {
                this.adminUserForm['controls']['adminPostalCode'].setValue(this.adminInformation['postalCode']);
            }
        else
            {
                this.adminUserForm['controls']['adminPostalCode'].setValue('None');
            }
       
    }

     createAddCompanyAndAdminForm(){
       this.adminUsernameFc = this._formBuilder.control('', Validators.required);
       
        this.adminEmailFc = this._formBuilder.control(null);
        this.adminCellPhoneFc = this._formBuilder.control('', Validators.required);
        this. adminGenderFc = this._formBuilder.control('', Validators.required);
        this. adminDobFc = this._formBuilder.control('', Validators.required);
        this. adminAddressLine1Fc = this._formBuilder.control('', Validators.required);
        this.adminAddressLine2Fc = this._formBuilder.control('', Validators.required);
        this.adminCityFc = this._formBuilder.control('', Validators.required);
        this.adminPronviceFc= this._formBuilder.control('', Validators.required);
        this.adminCountryFc = this._formBuilder.control('', Validators.nullValidator);
        this. adminPostalCodeFc= this._formBuilder.control('', Validators.nullValidator);
       
        this.adminUserForm = this._formBuilder.group(
            {
            adminUsername : this.adminUsernameFc,
         
            adminEmail : this.adminEmailFc,
            adminCellPhone :this.adminCellPhoneFc,
            adminGender : this. adminGenderFc,
            adminDob : this. adminDobFc,
            adminAddressLine1 : this. adminAddressLine1Fc,
            adminAddressLine2 : this.adminAddressLine2Fc,
            adminCity : this.adminCityFc,
            adminPronvice : this.adminPronviceFc,
            adminCountry :  this.adminCountryFc,
            adminPostalCode :  this. adminPostalCodeFc
    });

   
       
    }


    


   onEnableFieldInput(event)
    {
        
        if(!this.noInputFeildEdit)
            {
                this.noInputFeildEdit= true;
                this.inputFieldCss = {'outline': 'none','border':'inherit','box-shadow':'none','background':'none'};
                this.isEditInfo=false;
            }
        else
            {
                this.noInputFeildEdit= false;
                this.inputFieldCss=null
                this.isEditInfo=true;
            }
        
           
    }

    onUpdate(adminUserFormValue)
    {
        this.submitAttempt = true;
        
            
          if (this.adminUserForm.status=='INVALID')
              {
                  this.showError = true;
                
                 
              }
              else
                  {
                          //this.registerCompanyAndAdmin(formData); 
  
      }
    }


}