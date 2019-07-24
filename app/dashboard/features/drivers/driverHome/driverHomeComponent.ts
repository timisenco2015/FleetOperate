import {Component, OnInit, OnChanges} from '@angular/core';
//import {ROUTER_DIRECTIVES} from '@angular/router-deprecated';


@Component({
    selector: 'drivers-home',
    templateUrl: 'app/dashboard/features/drivers/driverHome/driverHomeTemplate.html',
   
})


export class DriverHomeComponent implements OnInit, OnChanges {

    private homeActive: boolean;
    private driverListView: boolean;
    private addDriverView: boolean;
   
    ngOnChanges()
    {

    }
    ngOnInit() 
    {
        this.addDriverView = false;
        this.homeActive=true;
        this.driverListView=true;
    }

   onClickAddDriver()
    {
        this.addDriverView = true;
        this.homeActive=false;
        this.driverListView=false;
    }

   onClickDriverList()
    {
        this.addDriverView = false;
        this.homeActive=true;
        this.driverListView=true;
    }
    
}