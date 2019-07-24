import {Component, OnInit, OnChanges, ElementRef,AfterViewInit} from '@angular/core';
import {NgClass, NgStyle} from '@angular/common';
//import {ROUTER_DIRECTIVES} from '@angular/router-deprecated';
import {DriverService} from '../driverService';
import {DriverSummaryComponent} from '../driverSummary/driverSummaryComponent';
import {DriverGeneralComponent} from '../driverGeneral/driverGeneralComponent';
import {DriverLogComponent} from '../driverLog/driverLogComponent';
import {ErrorHandlingComponent} from '../../../../errorHandling/errorHandlingComponent';
import {DriverMapComponent} from '../driverMap/driverMapComponent';
import { FormBuilder, Validators, FormGroup, FormArray, FormControl } from '@angular/forms';
 declare var $;
@Component({
    selector: 'driver-list',
    templateUrl: 'app/dashboard/features/drivers/driverList/driverListTemplate.html',
    /*directives: [ROUTER_DIRECTIVES, NgClass, DriverSummaryComponent, DriverGeneralComponent,
        DriverLogComponent, ErrorHandlingComponent]*/
})

export class DriverListComponent implements OnInit, OnChanges {

    private fleetdrivers: any[];
    private finalFleetdrivers: any[];
    private showSummary: boolean = false;
    private showGeneral: boolean = true;
    private showLog: boolean = false;
    private generalActive: boolean = true;
    private logActive: boolean = false;
    private errorMessage: any;
    private sendDriverData: any;
    private companyId: any;
    private broadcastErrorCode: number;
    private showError: boolean = false;
    private showRODS: boolean = false;
    private dateSearchForm: FormGroup;
    private activeToday: boolean;
    private showLogYesterday: boolean;
    private showLogToday: boolean;
    private activeYesterday: boolean;
    private sendEmailForm: FormGroup;
    private hideFieldsInModal: boolean = true;
    private driverId: any;
    private activeOneWeek: boolean;
    private driverListView :boolean;
    private driverEditView :boolean;
    private closeHidden :boolean; 
    private userSelectedDates: any[]
    private showLogOneWeek:boolean;
    private showLogTwoWeeks:boolean;
    private driversearch: boolean;
    private showLogView: boolean;
    private addNewDriverView:boolean;
    private endDate: any;
    private clickToViewLogEvent:boolean;
    private notCompanyNameEdit:boolean
    // constructor to loop the products in product service file and disply in html
    constructor(private _driverService: DriverService, 
        private _formBuilder: FormBuilder,private elementRef: ElementRef) {
       
        this.createSendEmailForm();
           this.driverListView = true;
        this.driverEditView = false;
         this.closeHidden= false; 
         this.driversearch=false;
         this.addNewDriverView=false;
         this.showLogView=false;
         this.notCompanyNameEdit=false;
         
    }
    // initiation of ngOnInit to bind the service or any external data to template on start
    ngOnInit(): void {
        
            this.getDrivers();
            this.userSelectedDates = [];
            this.showLogYesterday=false;
            this.showLogToday = false;
            this.showLogOneWeek = false;
            this.showLogTwoWeeks=false;
            this.clickToViewLogEvent=false;
          
            
    }
    // on update of info changes to implement
    ngOnChanges(): void {

    }

    ngAfterViewInit() {
        setTimeout(() => {
            this.setFieldTableNotEditable();
        }, 2000);
      
      }

      ngAfterContentInit()
      {
        
      }

    getDrivers(){
        this.companyId = localStorage.getItem("token_2")
       this._driverService.getDrivers(this.companyId)
            .subscribe(
            response => {
                this.fleetdrivers = response.json();
                this.finalFleetdrivers = this.fleetdrivers;
                console.log(" drivers:  ", this.fleetdrivers);
                
                if(response.status == 200){
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
                this.showError = true;
                if(this.showError = true){
                     window.scrollTo(0,0)
                }
            }
            console.log("Options request Error : ", error.status)
        })
    
    }

    // on click of each driver in the driver summary list
    onClickEachDriver(driverData: any) {
        console.log("driverData..",driverData);
        this.sendDriverData = driverData;
        this.showLogView=true;
        this.clickToViewLogEvent=true;
        this.showSummary = false;
        setTimeout(()=>{    
            this.showSummary = true;
        },100);

    }

    onClickGeneral() {
        this.showGeneral = true;
        this.showRODS = false;

        this.generalActive = true;
        this.logActive = false;
    }

    // this method will display the search criteria box
    searchDriver()
    {
         this.driverListView=true
        
        this.driverEditView = false;
         this.closeHidden= false;
        this.addNewDriverView =false;
        if(this.driversearch)
            {
                this.driversearch = false;
            }
        else
            {
                this.driversearch=true;
            }
    }

    //this method is used to set the all the input field in all the table rows to be non editable and transparent
    setFieldTableNotEditable()
    {
        
        var index:number;
        for(index=0; index<this.finalFleetdrivers.length; index++)
        {
            $('#driverTableOptions tr').eq(index).find('td').each(function()
            {
               
                   $(this).css({'pointer-events':'none' }); 
                   
                  
            })
        }
       
    }

    listDriver()

    {
       
        this.driverEditView = false;
         this.closeHidden= false; 
          this.driversearch = false;
        this.driverListView=true;
        this.addNewDriverView =false;
    }

    addDriver(data: any)
    {
        var reponse: any
        this.driverEditView = false;
         this.closeHidden= false; 
          this.driversearch = false;
        this.driverListView=false;
        this.addNewDriverView =true;

    }

    //this method will change the display row in the drrivers table. The total number of rows display will depend on the
    // number selected by the user

    setTableListDisplay(value)
    {
       // var div =  this.elementRef.nativeElement.querySelector('#driverTable');
       // alert(div.find('tr'));
        var i:number;
        this.finalFleetdrivers=[];
        
        if (value==0)
        {
            
            for (i=0; i<this.fleetdrivers.length ; i++)
            {  
              
                     this.finalFleetdrivers[i]=this.fleetdrivers[i];
                    
            } 
        }
        else
        {
            for (i=0; i<this.fleetdrivers.length && i<value; i++)
            {  
          
                 this.finalFleetdrivers[i]=this.fleetdrivers[i];
                
            }
        }  
    }



   

    onKeySearchId(driverSearchId)
    {
        
        let i: number;
        let j: number =0;
       // alert(driverSearchId);
        this.finalFleetdrivers=null;
        
        this.finalFleetdrivers=[];
        
     for (i=0; i<this.fleetdrivers.length; i++)
           {
               
               if (this.fleetdrivers[i]["driverId"].indexOf(driverSearchId)==0)
                {
                    
                    this.finalFleetdrivers[j]=this.fleetdrivers[i];
                    j++;
                }

            }
          
        
    }

    onKeySearchDriverName(searchDriverName)
    {
        
        let i: number;
        let j: number =0;
       // alert(driverSearchId);
        this.finalFleetdrivers=null;
        
        this.finalFleetdrivers=[];
        
     for (i=0; i<this.fleetdrivers.length; i++)
           {
               
               if (this.fleetdrivers[i]["firstName"].indexOf(searchDriverName)==0 || this.fleetdrivers[i]["lastName"].indexOf(searchDriverName)==0)
                {
                    
                    this.finalFleetdrivers[j]=this.fleetdrivers[i];
                    j++;
                }

            }
          
        
    }

    onKeySearchLincNumber(searchLincNumber)
    {
        
        let i: number;
        let j: number =0;
       // alert(driverSearchId);
        this.finalFleetdrivers=null;
        
        this.finalFleetdrivers=[];
        
     for (i=0; i<this.fleetdrivers.length; i++)
           {
               
               if (this.fleetdrivers[i]["licenseNumber"].indexOf(searchLincNumber)==0)
                {
                    
                    this.finalFleetdrivers[j]=this.fleetdrivers[i];
                    j++;
                }

            }
          
        
    }


   

    getDateRangeArrays (days: any)
    {
        let i: number
        for (i=0; i<days; i++)
            {
                let currentDate = new Date();
                var dateRange = new Date();
                dateRange.setDate( currentDate.getDate() - i);
               
                this.userSelectedDates[i]=dateRange;
            }
    }
    createSendEmailForm(){
        this.sendEmailForm = this._formBuilder.group({
              'emailId': [],
              'subject': [],
              'body': [],
              'fromDate': [],
              'toDate': [],
              'driverId': [],
              'month': []
        });
    }

    onClickEmail(){
        console.log("onClickEmail is called..", this.sendDriverData.driverId)
        this.driverId = this.sendDriverData.driverId;
        let currentDate = new Date();
      //  this.fromDate = currentDate;

        
    }
    onClickEmailSend(emailData: any){
        console.log("onClickEmailSend ..", emailData)
    }




    onClickEdit(index)
    {
    
        if(this.notCompanyNameEdit)
        {
           
            $('#driverTableOptions tr').eq(index).find('td').each(function()
            {
                   $(this).css({'pointer-events':'none' });     
            })
            this.notCompanyNameEdit = false;
        }

        else
        {
           
            $('#driverTableOptions tr').eq(index).find('td').each(function()
            {
                   $(this).css({'pointer-events':'all' });      
            })
            this.notCompanyNameEdit=true;
            
        }
    }


    onClickDelete(iindex)
    {

    }

    onClickEditDriver(driverId: any){
        console.log("onClickEditTruck clicked: ", driverId);
         
    /*    this._truckSettingService.getTruckToEdit(fleetId)
            .subscribe(
            truck => {
                    console.log("truck to edit: ", truck.json());
                    if(truck.status == 200){
                        this.displayEditForm.emit({truckId: fleetId, truckDetail:truck.json()});
                    }else{
                        this.broadcastErrorCode = truck.status;
                        this.showError = true;
                            if(this.showError = true){
                                window.scrollTo(0,0)
                            }
                    }
                }
            )
            */
        
    }

    onClickViewDriverList()
    {
          this.driverListView = true;
        this.driverEditView = false;
         this.closeHidden= false; 
    }
}