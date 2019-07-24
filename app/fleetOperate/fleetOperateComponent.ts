import {Component, OnInit, OnChanges, HostListener} from '@angular/core';
import {DashboardComponent} from '../dashboard/dashboard.component';
//import {FleetListComponent} from '../dashboard/features/fleet/fleetList/fleetListComponent';
import {NgClass, Location, NgStyle} from '@angular/common';
import {DriverListComponent} from '../dashboard/features/drivers/driverList/driverListComponent';
import {TrailerListComponent} from '../dashboard/features/trailers/trailerList/trailerListComponent';
import {DocumentListComponent} from '../dashboard/features/documents/documentList/documentListComponent';
import {TruckSettingsComponent} from '../dashboard/features/settings/truckSettings/truckSettingsComponent';
import {TrailerSettingsComponent} from '../dashboard/features/settings/trailerSettings/trailerSettingsComponent';
import {DriverSettingsComponent} from '../dashboard/features/settings/driverSettings/driverSettingsComponent';
import {PlanTripComponent} from '../dashboard/features/tripPlanner/planTrip/planTripComponent';
import {CurrentTripComponent} from '../dashboard/features/tripPlanner/currentTrip/currentTripComponent';
import {FleetOperateService} from './fleetOperateService';
import {NonsubscribedServiceComponent} from '../nonsubscribedServiceHandler/nonsubscribedServiceComponent';
import { ActivatedRoute, Params, Router } from '@angular/router';
import {LoginService} from '../login/loginService';
//import {ControlCenterComponent} from '../dashboard/features/controlCenter/controlCenterComponent';
declare var $;
@Component({
    selector: 'fleetOperate',
    templateUrl: 'app/fleetOperate/fleetOperateTemplate.html'
})

export class FleetOperateComponent implements OnInit, OnChanges {

    private showHomeActive: boolean;
    private showCompanyActive: boolean;
    private showTrucksActive: boolean;
    private showTrailersActive: boolean;
    private showDriversActive: boolean;
    private showDocumentsActive: boolean;
    private showAssetUtilizationActive: boolean;
    private showDriverDairyActive:boolean;
    private showDVIRActive:boolean;
    private showIFTAActive:boolean;
    private showOnDriverViewClicked: boolean;
    private backgroundColor: any;
    private showDriverSearch:boolean
    private tagIndex:any;
    private showDashBoardOptions: boolean;
    
    constructor(private fleetOperateService: FleetOperateService, private activatedRoute: ActivatedRoute,
                private location: Location, private router: Router) {

                  
    }

    ngOnInit() 
    {
        this.showHomeActive = false;
        this.showCompanyActive =  true;
        this. showTrucksActive= false;
        this.showTrailersActive= false;
        this.showDriversActive= false;
        this.showDocumentsActive= false;
        this.showAssetUtilizationActive= false;
        this.showDriverDairyActive= false;
        this.showDVIRActive= false;
        this.showIFTAActive= false;
        this.showOnDriverViewClicked=false;
        this.showDriverSearch = false;
       this.showDashBoardOptions=true
        
    }

    ngOnChanges() {
       
    }

   highlightDashBoardOptions(index)
   {
     
    var i:number;
  
    $('ul li').each(function(i)
    {
        if (i==index && index==1)
            {

            }
        if (i==index)
            {
                
                $(this).css("background-color","#003171", "width","100%"); 
            }
        
        else
            {
                $(this).css("background-color",""); 
            }
      
    });
            
            
       

   }
 

   showMobileBarOptions()
   {
       if(this.showDashBoardOptions)
       {
            this.showDashBoardOptions=false;
       }
       else
       {
            this.showDashBoardOptions=true;
          
       }
   }

 
   onClickComapnyView(index)
   {
    this.highlightDashBoardOptions(index)
    this.showHomeActive = false;
    this.showDashBoardOptions=true;
    this.showDriverSearch=false;
    this.showOnDriverViewClicked=false;
    this.showCompanyActive = true;
    this. showTrucksActive= false;
    this.showTrailersActive= false;
    this.showDriversActive= false;
    this.showDocumentsActive= false;
    this.showAssetUtilizationActive= false;
    this.showDriverDairyActive= false;
    this.showDVIRActive= false;
    this.showIFTAActive= false;
   }

   onClickHomeView(index)
   {
       
      this.highlightDashBoardOptions(index)
    this.showHomeActive = true;
    this.showDashBoardOptions=true;
    this.showDriverSearch=false;
    this.showCompanyActive = false;
    this. showTrucksActive= false;
    this.showTrailersActive= false;
    this.showDriversActive= false;
    this.showDocumentsActive= false;
    this.showAssetUtilizationActive= false;
    this.showDriverDairyActive= false;
    this.showDVIRActive= false;
    this.showIFTAActive= false;
   }

   onClickTruckView(index)
   {
    this.highlightDashBoardOptions(index)
    this.showCompanyActive = false;
    this.showDashBoardOptions=true;
    this.showHomeActive = false;
    this.showDriverSearch=false;
    this.showOnDriverViewClicked=false;
    this. showTrucksActive= true;
    this.showTrailersActive= false;
    this.showDriversActive= false;
    this.showDocumentsActive= false;
    this.showAssetUtilizationActive= false;
    this.showDriverDairyActive= false;
    this.showDVIRActive= false;
    this.showIFTAActive= false;
   }

   onClickTrailerView(index)
   {
    this.highlightDashBoardOptions(index);
    this.showDriverSearch=false;
    this.showDashBoardOptions=true;
    this.showHomeActive = false;
    this.showCompanyActive = false;
    this.showOnDriverViewClicked=false;
    this. showTrucksActive= false;
    this.showTrailersActive= true;
    this.showDriversActive= false;
    this.showDocumentsActive= false;
    this.showAssetUtilizationActive= false;
    this.showDriverDairyActive= false;
    this.showDVIRActive= false;
    this.showIFTAActive= false;
   }


   onClickDriverView(index)
   {
    this.highlightDashBoardOptions(index);
    this.showDriverSearch=true;
    this.showCompanyActive = false;
    this.showDashBoardOptions=true;
    this.showHomeActive = false;
    this. showTrucksActive= false;
    this.showTrailersActive= false;
    this.showDriversActive= true;
    this.showDocumentsActive= false;
    this.showAssetUtilizationActive= false;
    this.showDriverDairyActive= false;
    this.showDVIRActive= false;
    this.showIFTAActive= false;
   }

   onClickDocumentView(index)
   {
    this.highlightDashBoardOptions(index)
    this.showCompanyActive = false;
    this.showOnDriverViewClicked=false;
    this.showDashBoardOptions=true;
    this.showHomeActive = false;
    this. showTrucksActive= false;
    this.showTrailersActive= false;
    this.showDriversActive= false;
    this.showDocumentsActive= true;
    this.showAssetUtilizationActive= false;
    this.showDriverDairyActive= false;
    this.showDVIRActive= false;
    this.showIFTAActive= false;
   }

   onClickAssetUtilizationView(index)
   {
    this.highlightDashBoardOptions(index)
    this.showCompanyActive = false;
    this.showOnDriverViewClicked=false;
    this.showDashBoardOptions=true;
    this.showHomeActive = false;
    this. showTrucksActive= false;
    this.showTrailersActive= false;
    this.showDriversActive= false;
    this.showDocumentsActive= false;
    this.showAssetUtilizationActive= true;
    this.showDriverDairyActive= false;
    this.showDVIRActive= false;
    this.showIFTAActive= false;
   }


   onClickDriverDairyView(index)
   {
    this.highlightDashBoardOptions(index)
    this.showCompanyActive = false;
    this.showOnDriverViewClicked=false;
    this.showDashBoardOptions=true;
    this.showHomeActive = false;
    this. showTrucksActive= false;
    this.showTrailersActive= false;
    this.showDriversActive= false;
    this.showDocumentsActive= false;
    this.showAssetUtilizationActive= false;
    this.showDriverDairyActive= true;
    this.showDVIRActive= false;
    this.showIFTAActive= false;
   }

   onClickDVIRView(index)
   {
    this.highlightDashBoardOptions(index)
    this.showCompanyActive = false;
    this.showOnDriverViewClicked=false;
    this.showDashBoardOptions=true;
    this.showHomeActive = false;
    this. showTrucksActive= false;
    this.showTrailersActive= false;
    this.showDriversActive= false;
    this.showDocumentsActive= false;
    this.showAssetUtilizationActive= false;
    this.showDriverDairyActive = true;
    this.showIFTAActive= false;
   }

   onClickIFTAView(index)
   {
    this.highlightDashBoardOptions(index)
    this.showCompanyActive = false;
    this.showOnDriverViewClicked=false;
    this.showDashBoardOptions=true;
    this.showHomeActive = false;
    this. showTrucksActive= false;
    this.showTrailersActive= false;
    this.showDriversActive= false;
    this.showDocumentsActive= false;
    this.showAssetUtilizationActive= false;
    this.showDriverDairyActive= false;
    this.showDVIRActive= false;
    this.showIFTAActive= true;
   }

  


}