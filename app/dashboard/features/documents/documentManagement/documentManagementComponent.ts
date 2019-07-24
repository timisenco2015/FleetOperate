import {Component, OnInit, OnChanges, Output, EventEmitter} from '@angular/core';
import {NgClass} from '@angular/common';
import { FormBuilder, Validators, FormGroup, FormArray, FormControl } from '@angular/forms';
//import {ROUTER_DIRECTIVES} from '@angular/router-deprecated';
import {DocumentService} from '../documentList/documentListService';
import {FleetService} from '../../fleet/fleetList/fleetListService';
import {DocumentManagementService} from './documentManagementService';

@Component({
    selector: 'documentManagement',
    templateUrl: 'app/dashboard/features/documents/documentManagement/documentManagementTemplate.html',
    ///directives: [ROUTER_DIRECTIVES, NgClass, FORM_DIRECTIVES]
})

export class DocumentManagementComponent implements OnInit, OnChanges {

    uploadDocumentForm: FormGroup;
    fileName: string[];
    errorMessage: any;
    postResponse: any;
    trucks: any[];
    truckId: any;
    documentIndex: number;
    selectedTruckId: any[] = [];
    fileList: any[];
    fleetId: string[];
    showForm: boolean = true;
    file: any;

    @Output() refreshDocumentList: EventEmitter<any> = new EventEmitter<any>();

    // constructor to load the page
    constructor(private _documentService: DocumentService, private _fleetService: FleetService,
        private _formBuilder: FormBuilder, private _documentManagementService: DocumentManagementService) {

        this.createDocumentForm();

    }

    ngOnInit(): void {
        //  load list of trucks
        this._fleetService.getFleets()
            .subscribe(
            fleets => {
                this.trucks = fleets.json();
                console.log("total trucks in list:..", this.trucks)
            },
            error => this.errorMessage = <any>error)


    }

    ngOnChanges(): void {
        
    }

    createDocumentForm(){
        this.uploadDocumentForm = this._formBuilder.group({
              'name': [],
              'type': [],
              'documentDate': [],
              'fleetId': [],
              'notes': []

        });
    }

    formReset(){
        this.uploadDocumentForm.reset();
    }


    // 
    onClickUploadDocument(event): void {
        console.log("new files ...", event.target.files)
        // this.fileList = null;
        this.fileName = [];
        console.log("clicked")
        this.fileList = event.target.files;
        console.log("files: ", this.fileList);

        for (let i = 0; i < this.fileList.length; i++) {
            var file = this.fileList[i];
            console.log("files are: ", file);
            this.fileName = file.name;
            this.file = file;
        }
        console.log("file name: ", this.fileName);
    }


    // on Click Select Truck button
    selectTruck(index: any) {
        console.log("selectTruck called...fleetId2 is ", index)
        this.documentIndex = index;
    }

    // onClickTruckCheckbox
    onClickTruckCheckbox(truckId: any) {
        return truckId;
    }

    // after selecting truck id on click OK
    sendTruckId(truckId: any) {
        console.log("truck id:..2..", truckId)
        this.fleetId = truckId;
        this.selectedTruckId[this.documentIndex] = truckId;
        console.log("selectedTruckId is ... ", this.selectedTruckId)

    }

    // send document and relate form details to server on click SEND
    sendDocumentsToTruck( ){
       // console.log("documents:..", documents)
       if (this.uploadDocumentForm.value.fleetId == null &&
       this.fileList == null) {
           console.log("pls upload document and select fleet Id");
       }else{
           console.log("documents info:..", this.uploadDocumentForm.value)
        console.log("files:..", this.fileList)

        // below method is temporarily cancelled

           /* this._documentManagementService.postDocument(this.uploadDocumentForm.value, this.fileList)
                .subscribe( 
                   response  => {
                            console.log("documents:.. sent");
                            console.log("response:.. ", response);
                            if (response != null) {*/
                    /* this.showForm = false;
                        setTimeout(() => { 
                            this.fileName = [];
                            this.fleetId = [];
                            this.createDocumentForm();
                            
                        },0.5);
                        this.showForm = true;*/
                       /* this.fleetId = [];
                        this.formReset();
                }
                    }
                );*/

               /* this._documentManagementService.progress
            .subscribe(
            data => {
                console.log('progress = ' + data + '%');
                
            })*/

            //this.refreshDocumentList.emit('refresh document list');

            /*this._documentManagementService.postDocToS3(this.fileList)
                .subscribe(
                    response => {
                        console.log("AWS response:.. ", response);
                    }
                )*/
                this._documentManagementService.postDocToS3(this.file);
       }

      /* this.showForm = false;
        setTimeout(() => {
    this.createDocumentForm();
      this.showForm = true;
    });*/
        
    }

}