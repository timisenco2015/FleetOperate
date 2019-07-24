import {Component, OnInit, OnChanges,Input} from '@angular/core';
import {NgClass, NgStyle} from '@angular/common';
import { CompanyService} from '../companyService';
import { FormBuilder, Validators, FormGroup, FormControl, Validator, ReactiveFormsModule,FormsModule } from '@angular/forms';
 declare var $: any;
@Component({
    selector: 'billingPayment',
    templateUrl: 'app/dashboard/features/company/billingPayment/billingPaymentTemplate.html',
})

export class BillingPaymentComponent implements OnInit, OnChanges{
     

 private orderDetailsView: boolean;
 private billPayInformation:any;
 private  displayBillingInfo: any;
 private companyCompleteInfo: any;
 private planOrderList:any;
 private showError:boolean;
 private broadcastErrorCode:any;
 private errorMessage: any;
 private showItem:boolean;
 @Input() billingInfo : any;
 
    constructor(private companyFullInfoService:CompanyService)
    {
       this.orderDetailsView=false;
      
      
       this.showItem=true;
      
    }
    ngOnInit(): void 
    {
        this.displayBillingInfo = this.billingInfo;
        this.orderDetailsView=false;
        
        
        
        this.showItem=true;
    }
    // on any change of action, what should be executed
    ngOnChanges(): void {
       

    }
  
   
  

// this method is used to view sub order information. it listened to click event in the template and checked if the sub oder information is 
// showing or not. if it showing it will hide but if it not then it will display. it also works like accordion. the index its recieved let us know
// the div index the click event is coming from

    onSubDetailsView(index)
    {
        $('.subDetailsViewClicked').removeAttr("hidden");
        let length:number = $('.detailsViewClicked').length;
        let i: number;
        for(i=0; i<length;i++ )
            {
                if (i==index)
                    {
                        if ($($('.detailsViewClicked').eq(index).find('.subDetailsViewClicked')).is(':visible'))
                            {
                                $($('.detailsViewClicked').eq(index).find('.subDetailsViewClicked')).hide()
                            }
                        else
                        {
                            $($('.detailsViewClicked').eq(index).find('.subDetailsViewClicked')).show()  
                        }
                    }
                else{
                        $($('.detailsViewClicked').eq(i).find('.subDetailsViewClicked')).hide()
                    }
            }
     
    }


   
       
   


    

   

}