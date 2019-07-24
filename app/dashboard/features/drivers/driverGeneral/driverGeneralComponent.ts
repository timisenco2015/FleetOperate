import {Component, Input, OnChanges, OnInit} from '@angular/core';
//import {ROUTER_DIRECTIVES} from '@angular/router-deprecated';
import {DriverService} from '../driverService';

@Component({
    selector: 'driver-general',
    templateUrl: 'app/dashboard/features/drivers/driverGeneral/driverGeneralTemplate.html',
    //directives: [ROUTER_DIRECTIVES]
})

export class DriverGeneralComponent implements OnChanges, OnInit {

    @Input() driverData: any;
    private driverGeneral: any;
    private broadcastErrorCode: number;
    private showError: boolean = false;

    // constructor to loop the products in product service file and disply in html
    constructor(private _driverService: DriverService) {

    }

    ngOnInit(): void {

    }

    // render something on constant changes when clicked on driver summary list
    ngOnChanges(): void {

        this.driverGeneral = this.driverData;
        //this.getDriverDetails()
    }

    getDriverDetails(){
        //console.log(this.selectedTruckID.iD);
         this._driverService.getDriverGeneral(this.driverData.driverId)
            .subscribe(
            driver => {
                    console.log("driver details: ", driver.json());
                          
                    if(driver.status == 200){
                        this.driverGeneral = driver.json();
                    }else{
                        this.broadcastErrorCode = driver.status;
                        this.showError = true;
                            if(this.showError = true){
                                window.scrollTo(0,0)
                            }
                    }
                },
            error => {
            //this.errorMessage = error;
            if(error != null){
                this.broadcastErrorCode = error;
                this.showError = true;
                if(this.showError = true){
                     window.scrollTo(0,0)
                }
            }
            console.log("Options request Error : ", error.status)
            }
        )
    }

}