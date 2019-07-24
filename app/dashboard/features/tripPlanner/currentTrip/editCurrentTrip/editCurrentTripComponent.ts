import {Component, OnInit, OnChanges, Input} from '@angular/core';
import { FormBuilder, FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import {TripPlannerService} from '../../tripPlannerService';
import {FleetService} from '../../../fleet/fleetList/fleetListService';
import {TrailerService} from '../../../trailers/trailerList/trailerListService';
import {DriverService} from '../../../drivers/driverList/driverListService';

@Component({
    selector: 'edit-current-trip',
    templateUrl: 'app/dashboard/features/tripPlanner/currentTrip/editCurrentTrip/editCurrentTripTemplate.html'
})

export class EditCurrentTripComponent implements OnInit, OnChanges {

    private editTripForm: FormGroup;
    private consignmentEditForm: FormGroup;
    @Input() selectedTripID: any;
    @Input() tripList: any[];
    private tripDetails: any;
    private trucks: any[];
    private errorMessage: any;
    private startDate: any;
    private endDate: any;
    private source: any;
    private destination: any;
    private truckID: any;
    private initialTruckNameValueDisplay: boolean = true;
    private trailers: any[];
    private trailersDetails: any=[];
    private drivers: any[];
    private driversDetails: any=[];
    private editConsignment: boolean = false;
    private consignmentDetails: any;
    private tripId: any;
    private showUploadDoc: boolean = false;

    constructor(private _formBuilder: FormBuilder, private tripPlannerService: TripPlannerService,
                private _fleetService: FleetService,private _trailerService: TrailerService, 
                private _driverService: DriverService) {

        this.createTripDetailsForm();
        this.consignmentEditFormInitiation();
    }

    createTripDetailsForm(){
        this.editTripForm = this._formBuilder.group({
            //companyId: this._formBuilder.control(6),
            startDate: this._formBuilder.control(null),
            endDate: this._formBuilder.control(null),
            source: this._formBuilder.control(null),
            destination: this._formBuilder.control(null),
            truckId: this._formBuilder.control(null),            
            trailersDetails:  new FormArray([]),
            driversDetails: new FormArray([])    

        });
    }

    ngOnInit() {
        this.loadConsignmentInfoToEdit();
        
    }

    ngOnChanges() {
        
    }

    loadConsignmentInfoToEdit(){
        console.log(" selectedTripID:  ", this.selectedTripID)
        console.log(" tripList:  ", this.tripList)
        for (var i = 0; i < this.tripList.length; i++) {

            var editData = this.tripList[i];
             console.log(" fleet summary ID:  ", editData.tripId)
            if (editData.tripId == this.selectedTripID) {

                this.tripDetails = editData;
                this.tripId = this.tripDetails.tripId;
                // iterate trailer Ids and display the values initially for editing
                for (var i = 0; i < this.tripDetails.trailersDetails.length; i++) {
                     var trailersInfo = this.tripDetails.trailersDetails[i];
                     console.log("trailersInfo is:  ", trailersInfo);
                    (<FormArray>this.editTripForm.controls['trailersDetails']).push(this._formBuilder.group({
                     trailerId: this._formBuilder.control(trailersInfo.trailerID)
                    }));
                }
                // iterate driver Ids and display the values initially for editing
                for (var i = 0; i < this.tripDetails.driversDetails.length; i++) {
                     var driversInfo = this.tripDetails.driversDetails[i];
                     (<FormArray>this.editTripForm.controls['driversDetails']).push(this._formBuilder.group({
                      driverId: this._formBuilder.control(driversInfo.driverID)
                     }));
                }
                console.log("tripDetails is:  ", this.tripDetails);

                break;
                

            } else {
                this.tripDetails = null;
            } 
        }
    }

    addTruck(){
        this._fleetService.getFleets()
            .subscribe(
            fleets => {
                this.trucks = fleets;
            },
            error => this.errorMessage = <any>error)
    }

    // onSelectingTruck
    onSelectingTruck(truckId: any) {
        
        return truckId;
    }
    // sendTruckData to truck details table
    sendTruckData(truckId: any){
        this.initialTruckNameValueDisplay = false;
         console.log(" fleet ID 111:  ", truckId)
        this.truckID = truckId;
        console.log(" fleet ID 222:  ", this.truckID)
    }

    addTrailer(){
        this._trailerService.getTrailer()
            .subscribe(
            trailer =>{ this.trailers = trailer;

            console.log('trailers are:..', this.trailers)},
            
            error => this.errorMessage = <any>error)
    }

    onSelectingTrailer(trailerId: any){
        
        return trailerId;
    }

    sendTrailerData(trailerId: any){
        console.log('selected trailer ID are:..', trailerId);

        (<FormArray>this.editTripForm.controls['trailersDetails']).push(this._formBuilder.group({
        trailerId: this._formBuilder.control(trailerId)
    }));

    }

    removeTrailer(trailerId){

        let deleteTrailer = (<any>(<FormGroup>this.editTripForm.controls['trailersDetails']).controls);
        for(var i = 0; i < deleteTrailer.length; i++) {
        console.log("each consignment", trailerId);
        if(deleteTrailer[i] == trailerId) {
            console.log("consignment to remove", deleteTrailer[i]);
            deleteTrailer.splice(i, 1);
            (<FormGroup>this.editTripForm.controls['trailersDetails']).updateValueAndValidity();
            break;
        } 
    }

    }

    addDriver(){
        this._driverService.getDrivers()
            .subscribe(
            driver => {
            this.drivers = driver;
            },

            error => this.errorMessage = <any>error)
    }

    onSelectingDriver(driverId: any){
        return driverId;
    }

    sendDriverData(driverId){

        (<FormArray>this.editTripForm.controls['driversDetails']).push(this._formBuilder.group({
        driverId: this._formBuilder.control(driverId)
    }));
    }

    removeDriver(driverId){

        let deleteDriver = (<any>(<FormGroup>this.editTripForm.controls['driversDetails']).controls);
        for(var i = 0; i < deleteDriver.length; i++) {
        console.log("each consignment", driverId);
        if(deleteDriver[i] == driverId) {
            console.log("consignment to remove", deleteDriver[i]);
            deleteDriver.splice(i, 1);
            (<FormGroup>this.editTripForm.controls['driversDetails']).updateValueAndValidity();
            break;
        }
      }
    }

    onClickTripSave(editedTripDetails){
        console.log("editedTripDetails:.. ", editedTripDetails)
    }

    consignmentEditFormInitiation(){
        this.consignmentEditForm = this._formBuilder.group({
        tripId: this._formBuilder.control(this.tripId),    
        consignmentId: this._formBuilder.control(null),
        consignmentType: this._formBuilder.control(null),
        source: this._formBuilder.control(null),
        destination: this._formBuilder.control(null),
        pickUpDate: this._formBuilder.control(null),
        deliveryDate: this._formBuilder.control(null),
        fileName: this._formBuilder.control(null),
    });
    }

    onClickEditConsignment(consignmentID, consignment){
        this.editConsignment = true;

        console.log("onClickEditConsignment:..: consignmentID ", consignmentID);
        console.log("onClickEditConsignment:..: consignment ", consignment);

        this.consignmentDetails = consignment;
        console.log("consignmentDetails:.. ", this.consignmentDetails);

       /* for(var i = 0; i < consignment.length; i++) {

            if(consignment[i] == consignmentID) {
                this.consignmentDetails = consignment[i];
                console.log("consignmentDetails:.. ", this.consignmentDetails)
                break;
            }else{
                this.consignmentDetails = null;
            }
        }*/
    }

    onClickEditedConsignmentSaveButton(editedConsignmentDetails){
        console.log("editedConsignmentDetails:.. ", this.consignmentEditForm.value)
    }

    onClickConsignmentEditCancel(){
        this.editConsignment = false;
        //this.ngOnInit();
    }
}