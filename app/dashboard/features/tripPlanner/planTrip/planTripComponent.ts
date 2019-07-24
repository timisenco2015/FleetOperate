import {Component, OnInit, OnChanges} from '@angular/core';
import {NgClass} from '@angular/common';
import { FormBuilder, FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import {FleetService} from '../../fleet/fleetList/fleetListService';
import {TrailerService} from '../../trailers/trailerList/trailerListService';
//import {DriverService} from '../../drivers/driverList/driverListService';
import {DriverService} from '../../drivers/driverService';
import {TripPlannerService} from '../tripPlannerService';
import {ErrorHandlingComponent} from '../../../../errorHandling/errorHandlingComponent';

@Component({
    selector: 'plan-trip',
    templateUrl: 'app/dashboard/features/tripPlanner/planTrip/planTripTemplate.html',
   // directives: [FORM_DIRECTIVES, ErrorHandlingComponent, NgClass]
})

export class PlanTripComponent implements OnInit, OnChanges {

    private planTripForm: FormGroup;
    private consignmentForm: FormGroup;
    private startDate: any;
    private endDate: any;
    private source: any;
    private destination: any;
    private trucks: any[];
    private errorMessage: any;
    private enableTruckModalOkButton: boolean = false;
    private truckDetails: any;
    private trailers: any[];
    private trailersDetails: any=[];
    private addTrailers: boolean = false;
    private drivers: any[];
    private driversDetails: any=[];
    private addDrivers: boolean;
    private fileList: any[]=[];
    private fileName: any[];
    private fileIndex: any;
   // trailerID: Control[];
    private showError: boolean = false;
    private broadcastPlanTripError: number;
    private showAddConsignment: boolean = false;
    private tripId: number;
    private createTripInfoMessage: boolean = false;
    private disableAddConsignmentButton: boolean = false;
    private disableCreateTripButton: boolean = false;
    private showPlanTrip: boolean = true;
    private companyId: any = localStorage.getItem("token_2");

    constructor(private _formBuilder: FormBuilder, private _fleetService: FleetService,
                private _trailerService: TrailerService, private _driverService: DriverService,
                private tripPlannerService: TripPlannerService) {

        this.planATripForm();
        this.consignmentFormInitiation();
        console.log("plan a trip constructor executed")

    }

    ngOnInit() {
        console.log("planATrip ngOnInit executed")
    }

    ngOnChanges() {
        this.planTripForm
    }

    planATripForm(){
        this.planTripForm = this._formBuilder.group({
            startDate: this._formBuilder.control(null),
            endDate: this._formBuilder.control(null),
            source: this._formBuilder.control(null),
            destination: this._formBuilder.control(null),
            fleetId: this._formBuilder.control(null),            
            trailersDetails:  new FormArray([]),
            driversDetails: new FormArray([])    

        });
        console.log("planATripForm executed")
    }

    addTruck(){
        console.log("addTruck executed")
        this._fleetService.getFleets()
            .subscribe(
            fleets => {
                this.trucks = fleets.json();
            },
            error => this.errorMessage = <any>error)
    }

    // onSelectingTruck
    onSelectingTruck(truckId: any, truckNumber: any) {
        
        return truckId && truckNumber;
    }
    // sendTruckData to truck details table
    sendTruckData(truckId: any){

        this.truckDetails = truckId;
        console.log('truckId:..', this.truckDetails)
        
    }

    addTrailer(){
        this._trailerService.getTrailer()
            .subscribe(
            trailer =>{ this.trailers = trailer.json();

            console.log('trailers are:..', this.trailers)},
            
            error => this.errorMessage = <any>error)
    }

    onSelectingTrailer(trailerId: any){
        
        return trailerId;
    }

    sendTrailerData(trailerId: any){
        console.log('selected trailer ID are:..', trailerId);
        this.addTrailers = true;
       // this.trailersDetails.push( trailerId);

        (<FormArray>this.planTripForm.controls['trailersDetails']).push(this._formBuilder.group({
        fleetId: this._formBuilder.control(trailerId)
    }));

    }

    removeTrailer(trailerId){

        let deleteTrailer = (<any>(<FormGroup>this.planTripForm.controls['trailersDetails']).controls);
        for(var i = 0; i < deleteTrailer.length; i++) {
        console.log("each consignment", trailerId);
        if(deleteTrailer[i] == trailerId) {
            console.log("consignment to remove", deleteTrailer[i]);
            deleteTrailer.splice(i, 1);
            (<FormGroup>this.planTripForm.controls['trailersDetails']).updateValueAndValidity();
            break;
        } 
    }

    }

    addDriver(){
        this._driverService.getDrivers(this.companyId)
            .subscribe(
            driver => {
            this.drivers = driver.json();
            console.log("getDrivers + companyId", this.companyId);
            console.log("drivers", this.drivers);
            },

            error => this.errorMessage = <any>error)
    }

    onSelectingDriver(driverId: any){
        return driverId;
    }

    sendDriverData(driverId){
        this.addDrivers = true;

        (<FormArray>this.planTripForm.controls['driversDetails']).push(this._formBuilder.group({
        driverId: this._formBuilder.control(driverId)
    }));

        //this.driversDetails.push(driverId);

       /* this.driversDetails.forEach((value, index) => {
            this.planTripForm.addControl('driverID' + index, new Control())
        })*/
    }

    removeDriver(driverId){

        let deleteDriver = (<any>(<FormGroup>this.planTripForm.controls['driversDetails']).controls);
        for(var i = 0; i < deleteDriver.length; i++) {
        console.log("each consignment", driverId);
        if(deleteDriver[i] == driverId) {
            console.log("consignment to remove", deleteDriver[i]);
            deleteDriver.splice(i, 1);
            (<FormGroup>this.planTripForm.controls['driversDetails']).updateValueAndValidity();
            break;
        }
    }
        /*var index = this.driversDetails.indexOf(driverId);
        this.driversDetails.splice(index, 1)*/
    }

    consignmentFormInitiation(){
        this.consignmentForm = this._formBuilder.group({
        tripId: this._formBuilder.control(null),    
        consignmentId: this._formBuilder.control(null),
        consignmentType: this._formBuilder.control(null),
        source: this._formBuilder.control(null),
        destination: this._formBuilder.control(null),
        pickUpDate: this._formBuilder.control(null),
        deliveryDate: this._formBuilder.control(null),
        fileName: this._formBuilder.control(null),
    });
    }

    consignmentFormReset(){
        this.consignmentForm.reset();
    }


    onClickAddConsignment(){
        if (this.tripId != null) {
            this.showAddConsignment = true;
            this.createTripInfoMessage = false;
            this.disableAddConsignmentButton = true;
        }else{
            this.createTripInfoMessage = true;
            this.showAddConsignment = false;
            this.disableAddConsignmentButton = false;
        }
           
        
    }

    onSelectDocument(event){
        
        this.fileList = event.target.files;
        console.log("file: ", this.fileList);
        for (let i = 0; i < this.fileList.length; i++) {
            var file = this.fileList[i];
            console.log("files are: ", file);
            this.fileName = file.name;

        }
    }

    onClickPlanTripSaveButton(planTripFormData: any[]){
        console.log("planTripFormData is:..", this.planTripForm.value)
        let body = JSON.stringify({ planTripFormData });
        console.log("JSON planTripFormData is:..", body)

        this.tripPlannerService.createTrip(planTripFormData)
            .subscribe(
                trip => {
                let response: any = trip;
                console.log("response:..",response);
                if (response.status == 200) {
                   this.tripId = response._body;
                   this.disableCreateTripButton = true;
                }
            },

            error => {this.errorMessage = <any>error;
                console.log("errorMessage:..",this.errorMessage);
                if (this.errorMessage != null) {
                    this.broadcastPlanTripError = this.errorMessage.status;
                    this.showError= true;
                }else{
                    this.showError= false;
                }
            })
            
        console.log("sent trip")
            

        /*this.tripPlannerService.createTrip(this.planTripForm.value)
                .subscribe( 
                   ()  => {
                            console.log("documents:.. sent");
                    }
                );

                this.tripPlannerService.progress
            .subscribe(
            data => {
                console.log('progress = ' + data + '%');
            })*/

        //this.planATripForm();
    }

    onClickAddConsignmentSaveButton(consignmentFormData: any){
        console.log("consignmentFormData is:..", consignmentFormData);
        
        this.tripPlannerService.addConsignment(consignmentFormData, this.fileList)
                .subscribe( 
                   response  => {
                            console.log("consignment:.. sent", response);
                            console.log("server response in compoenet:..", this.tripPlannerService.addConsignmentResponse);
                            if (response != null) {
                     /*this.showAddConsignment = false;
                        setTimeout(() => { 
                           // this.fileName = [];
                           // this.fleetId = [];
                           // this.consignmentFormInitiation();
                           this.consignmentFormReset();
                            
                        });
                        this.showAddConsignment = true;*/
                        this.consignmentFormReset();
                        setTimeout(() => {
                            this.tripId = response;
                            }, 0.5);
                        console.log("consignment:..response._body..", this.tripId);
                        }
                    }
                );
                

               /* this.tripPlannerService.progress
            .subscribe(
            data => {
                console.log('progress = ' + data + '%');
                console.log("server response in compoenet:..", this.tripPlannerService.addConsignmentResponse);
                
            })*/
    }

    onClickSaveTripButton(){
        this.tripId = null;
        this.startDate = null;
        this.endDate = null;
        this.source = null;
        this.destination = null;
        this.showPlanTrip = false;
        setTimeout(() => {
                        this.planATripForm();
                        this.consignmentFormInitiation();
                        this.showPlanTrip = true;
            });
        
        this.disableCreateTripButton = false;
        this.onClickAddConsignment();
        
    }


}