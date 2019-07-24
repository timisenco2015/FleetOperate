import {Component, OnInit, OnChanges, EventEmitter, Output} from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControl, Validator, ReactiveFormsModule,FormsModule  } from '@angular/forms';
//import {DriverSettingsService} from '../driverSettingsService';
import {ErrorHandlingComponent} from '../../../../errorHandling/errorHandlingComponent';
import {DriverService} from '../driverService';
@Component({
    selector: 'driver-add',
    templateUrl: 'app/dashboard/features/drivers/driverAdd/driverAddTemplate.html',
    //directives: [FORM_DIRECTIVES, ErrorHandlingComponent]
})

export class DriverAddComponent implements OnInit, OnChanges {

    private addDriverForm: FormGroup;
    private addResponse: any;
    private errorMessage: any;
    //@Output() displayDriverList: EventEmitter<any> = new EventEmitter<any>();
    private broadcastErrorCode: number;
    private showError: boolean = false;
    private showForm: boolean = true;
    private displayDriverAdded: boolean = false;
    private usernameCheckResponse: any;
    private addDriverViewPage2:boolean;
    private addDriverViewPage1:boolean;
    private submitAttempt: boolean;
    private showFieldError: boolean=false;
    private errorMessages:any;
    private firstNameFc :FormControl;
    private middleNameFc :FormControl;
    private lastNameFc :FormControl;
    private genderFc :FormControl;
    private dobFc :FormControl;
    private addressLine1Fc :FormControl;
    private addressLine2Fc :FormControl;
    private cityFc :FormControl;
    private state_provinceFc :FormControl;
    private zip_postal_codeFc :FormControl;
    private countryFc :FormControl;
    private emailFc:FormControl;
    private mobilePhoneFc :FormControl;
    private homePhoneFc :FormControl;
    private driverLincNumberFc :FormControl;
    private driverLicencseExpiryFc :FormControl;
    private driverLincEIssuedAuthorityFc :FormControl;
    private driverLincEIssuedProvinceStateFc :FormControl;
    private candaVisaStatusFc :FormControl;
    private usaVisaStatusFc :FormControl;
    private nationalityFc :FormControl;
    private notesFc :FormControl;
    private inputFirstNameFieldCss:any='';
    private inputMiddleNameFieldCss:any='';
    private inputLastNameFieldCss:any='';
    private inputGenderFieldCss:any='';
    private inputDobFieldCss:any='';
    private inputAddressLine1FieldCss:any='';
    private inputAddressLine2FieldCss:any='';
    private inputCityFieldCss:any='';
    private inputState_provinceFieldCss:any='';
    private inputZip_postal_codFieldCss:any='';
    private inputMobilePhoneFieldCss:any='';
    private inputCountryFieldCss:any='';
    private inputHomePhoneFieldCss:any='';
    private inputDriverLincNumberFieldCss:any='';
    private inputDriverLicencseExpiryFieldCss:any='';
    private inputDriverLincEIssuedAuthorityFieldCss:any='';
    private inputDriverLincEIssuedProvinceStateFieldCss:any='';
    private inputCandaVisaStatusFieldCss:any='';
    private inputUsaVisaStatusFieldCss:any='';
    private inputNationalityFieldCss:any='';
    private inputNotesFieldCss:any;
    constructor(private _formBuilder: FormBuilder, private _driverService: DriverService
) {
        this.createAddDriverForm();
        this.addDriverViewPage1=true;
    }

    ngOnInit() {
        
    }

    ngOnChanges() {

        
    }

    createAddDriverForm(){
        
         this.firstNameFc = this._formBuilder.control('', Validators.required);
         this.middleNameFc = this._formBuilder.control('', Validators.required);
         this.lastNameFc = this._formBuilder.control('', Validators.required);
         this.genderFc = this._formBuilder.control('', Validators.required);
         this.dobFc = this._formBuilder.control('', Validators.required);
         this.emailFc =  this._formBuilder.control('', Validators.required);
         this.addressLine1Fc = this._formBuilder.control('', Validators.required);
         this.addressLine2Fc = this._formBuilder.control('', Validators.required);
         this.cityFc = this._formBuilder.control('', Validators.required);
         this.state_provinceFc = this._formBuilder.control('', Validators.required);
         this.zip_postal_codeFc = this._formBuilder.control('', Validators.required);
         this.countryFc = this._formBuilder.control('', Validators.required);
         this.mobilePhoneFc = this._formBuilder.control('', Validators.required);
         this.homePhoneFc = this._formBuilder.control('', Validators.required);
         this.driverLincNumberFc= this._formBuilder.control('', Validators.required);
         this.driverLicencseExpiryFc = this._formBuilder.control('', Validators.required);
         this.driverLincEIssuedAuthorityFc = this._formBuilder.control('', Validators.required);
         this.driverLincEIssuedProvinceStateFc = this._formBuilder.control('', Validators.required);
         this.candaVisaStatusFc = this._formBuilder.control('', Validators.required);
         this.usaVisaStatusFc = this._formBuilder.control('', Validators.required);
         this.nationalityFc = this._formBuilder.control('', Validators.required);
         this.notesFc = this._formBuilder.control('', Validators.required);
        
         
          this.addDriverForm = this._formBuilder.group(
              {
                 firstName : this.firstNameFc,
                 middleName: this.middleNameFc,
                 lastName:this.lastNameFc,
                 gender:this.genderFc,
                 dob: this.dobFc,
                 email: this.emailFc,
                 addressLine1:this.addressLine1Fc,
                 addressLine2:this.addressLine2Fc,
                 city: this.cityFc,
                 province: this.state_provinceFc,
                 postalCode:this.zip_postal_codeFc,
                 country:this.countryFc,
                 cellPhone:this.mobilePhoneFc,
                 homePhone:this.homePhoneFc,
                 licenseNumber: this.driverLincNumberFc,
                 licenseExpiry:this.driverLicencseExpiryFc,
                 licenseIssuedAuthority: this.driverLincEIssuedProvinceStateFc,
                 licenseIssuedProvince:this.driverLincEIssuedProvinceStateFc,
                 canVisaStatus: this.candaVisaStatusFc,
                 usaVisaStatus:this.usaVisaStatusFc,
                 nationality:this.nationalityFc,
                 notes: this.notesFc
      });
  
     
         
      }
 
 

     showAddnewDrivePage2()
     {
        this.addDriverViewPage2 = true;
        this.addDriverViewPage1=false;
     }

      showAddnewDrivePage1()
     {
         this.addDriverViewPage1 = true;
        this.addDriverViewPage2=false;
     }

     //this method set input 
     confirmAllInputFieldsValid()
     {
       
        if(this.firstNameFc.hasError('required'))
            {
                
                this.inputFirstNameFieldCss ={'border-left': '4px solid #ff0000'};
            }
        if(this.middleNameFc.hasError('required'))
            {
               
                this.inputMiddleNameFieldCss ={'border-left': '4px solid #ff0000'};
            }
        if(this.lastNameFc.hasError('required'))
            {
                
                this.inputLastNameFieldCss ={'border-left': '4px solid #ff0000'};
            }
        if(this.genderFc.hasError('required'))
            {
                
                this.inputGenderFieldCss ={'border-left': '4px solid #ff0000'};
            }
        if(this.dobFc.hasError('required'))
            {
               
                this.inputDobFieldCss ={'border-left': '4px solid #ff0000'};
            }
        if(this.addressLine1Fc.hasError('required'))
            {
                 
                this.inputAddressLine1FieldCss ={'border-left': '4px solid #ff0000'};
            }
        if(this.addressLine2Fc.hasError('required'))
            {
                 
                this.inputAddressLine2FieldCss ={'border-left': '4px solid #ff0000'};
            }
        if(this.cityFc.hasError('required'))
            {
                
                this.inputCityFieldCss ={'border-left': '4px solid #ff0000'};
            }
        if(this.state_provinceFc.hasError('required'))
            {  
                this.inputState_provinceFieldCss ={'border-left': '4px solid #ff0000'};
            }
        if(this.zip_postal_codeFc.hasError('required'))
            {  
                this.inputZip_postal_codFieldCss ={'border-left': '4px solid #ff0000'};
            }
        if(this.countryFc.hasError('required'))
            {  
                this.inputCountryFieldCss ={'border-left': '4px solid #ff0000'};
            }
        if(this.homePhoneFc.hasError('required'))
            {  
                this.inputHomePhoneFieldCss ={'border-left': '4px solid #ff0000'};
            }
        if(this.mobilePhoneFc.hasError('required'))
            {  
                this.inputMobilePhoneFieldCss ={'border-left': '4px solid #ff0000'};
            }
        if(this.driverLincNumberFc.hasError('required'))
            {  
                this.inputDriverLincNumberFieldCss ={'border-left': '4px solid #ff0000'};
            }
        if(this.driverLicencseExpiryFc.hasError('required'))
            {  
                this.inputDriverLicencseExpiryFieldCss ={'border-left': '4px solid #ff0000'};
            }
        if(this.driverLincEIssuedAuthorityFc.hasError('required'))
            {  
                this.inputDriverLincEIssuedAuthorityFieldCss ={'border-left': '4px solid #ff0000'};
            }
        if(this.driverLincEIssuedProvinceStateFc.hasError('required'))
            {  
                this.inputDriverLincEIssuedProvinceStateFieldCss ={'border-left': '4px solid #ff0000'};
            }
        if(this.candaVisaStatusFc.hasError('required'))
            {  
                this.inputCandaVisaStatusFieldCss ={'border-left': '4px solid #ff0000'};
            }
        if(this.usaVisaStatusFc.hasError('required'))
            {  
                this.inputUsaVisaStatusFieldCss={'border-left': '4px solid #ff0000'};
            }
        if(this.nationalityFc.hasError('required'))
            {  
                this.inputNationalityFieldCss={'border-left': '4px solid #ff0000'};
            }
        if(this.notesFc.hasError('required'))
            {  
                this.inputNotesFieldCss={'border-left': '4px solid #ff0000'};
            }
     }


    



     onClickSave(formData: any){
        
        
                console.log("The Driver details are: ", formData)
        
                this.submitAttempt = true;
                    
                  if (this.addDriverForm.status=='INVALID')
                      {

                          this.confirmAllInputFieldsValid();
                          this.showFieldError = true;
                          this.errorMessages = "You have error in one of the fields below"
                      }
                      else
                        {
                                  //this.registerCompanyAndAdmin(formData); 
          
             
        
                 this._driverService.addDrivers(formData).subscribe(
                    response => {
                        alert( response.json());
                       
                    //console.log(" drivers logs:  ", this.driverAllLogs);
                        if(response.status == 200){
                             this.showError = false;
                         }else{
                             this.broadcastErrorCode = response.status;
                             this.showError = true;
                             if(this.showError = true){
                            //    window.scrollTo(0,0)
                            }
                         }
                    },
                    error => {
                    this.errorMessage = error;
                    if(error != null){
                        this.broadcastErrorCode = error;
                        this.showError = true;
                        if(this.showError = true){
                        //     window.scrollTo(0,0)
                        }
                    }
                    console.log("Options request Error : ", error.status)
                });
        
            }
        

       /* this._driverSettingsService.checkIfUsernameExistsInDB(formData.email)
        .subscribe(
             serviceResponse => {
                 this.usernameCheckResponse = serviceResponse.json();
                console.log("checkIfUsernameExists response:...", this.usernameCheckResponse.personEmailIdExists);

                if(this.usernameCheckResponse.personEmailIdExists == false){
                    console.log("username is NOT registered")

                    this._driverSettingsService.addDriver(formData)
                    .subscribe(
                    serviceResponse => {
                        this.addResponse = serviceResponse
                        console.log("add driver response:...", this.addResponse)

                        if(this.addResponse.status == 200){
                            this.showForm = false;
                            setTimeout(() => {
                                this.createAddDriverForm();
                                this.showForm = true;
                            });
                            //this.addTruckForm.reset();
                            this.displayDriverAdded = true;
                            window.scrollTo(0,0)
                        }else{
                            this.broadcastErrorCode = this.addResponse.status;
                            this.showError = true;
                            if(this.showError = true){
                                window.scrollTo(0,0)
                            }
                        }
                    },
                    error => {
                        this.errorMessage = error;
                        if(error.status != null){
                        this.broadcastErrorCode = error.status;
                        this.displayDriverAdded = false;
                        this.showError = true;
                        if(this.showError = true){
                            window.scrollTo(0,0)
                        }
                    }
                        console.log("Add truck error: ", error.status)
                    })
                    }else{
                    console.log("username is registered")
                }
             },
             error => {
                this.errorMessage = error;
                console.log("checkIfUsernameExists error: ", error.status)
             })

        //this.displayDriverList.emit("displayDriverList");
        */
    }

    onClickCancel(){
        //this.displayDriverList.emit("displayDriverList");
    }

}