import {Component, OnInit, OnChanges} from '@angular/core';
import {NgClass} from '@angular/common';
//import { FORM_DIRECTIVES } from '@angular/forms';
//import {ROUTER_DIRECTIVES} from '@angular/router-deprecated';
import {DocumentDetailsComponent} from '../documentDetails/documentDetailsComponent';
import {DocumentManagementComponent} from '../documentManagement/documentManagementComponent';
import {DocumentService} from './documentListService';


@Component({
    selector: 'document-list',
    templateUrl: 'app/dashboard/features/documents/documentList/documentListTemplate.html',
    //directives: [ROUTER_DIRECTIVES, FORM_DIRECTIVES, NgClass, DocumentDetailsComponent, DocumentManagementComponent]
})

export class DocumentListComponent implements OnInit, OnChanges {

    showDetails: boolean = false;
    showManagenment: boolean = true;
    documents: any[];
    officeUploadedDocuments: any[] = [];
    truckUploadedDocuments: any[] = [];
    errorMessage: any;
    deleteResponse: any;
    editMode: any = [];
    updateResponse: any;
    documentation: any;
    editedIndex: number;
    checkbox: any;
    documentID: any = [];
    trucks: any[];
    TruckID: any = [];
    selectedTruck: boolean;


    // constructor to loop the products in product service file and disply in html
    constructor(private _documentService: DocumentService) {


    }

    // initiation of ngOnInit to bind the service or any external data to template on start
    ngOnInit(): void {
        // list documents when page initially loads
        this._documentService.getDocuments()
            .subscribe(
            document => {
                this.documents = document
                console.log("all docs..", this.documents)
                for (var i = 0; i < this.documents.length; i++) {
                    var documents = this.documents[i];
                    //  console.log("looped docs..",documents)
                    if (documents.source == "Office") {
                        console.log("Office docs..", documents)
                        this.officeUploadedDocuments.push(documents);

                    } else if (documents.source == "Truck") {
                        console.log("Truck docs..", documents)
                        this.truckUploadedDocuments.push(documents);

                    }
                }

            },

            error => this.errorMessage = <any>error)

    }

    // on update of info changes to implement
    ngOnChanges(): void {

    }

    // on click of each document in the document list
    onSelect(document: any) {

        this.showDetails = true;

    }

    // on click edit in the document list
    edit(document: any, i: any) {

        this.editedIndex = i;

        // this.editMode[document.documentId] = true;

        this.documentation = {
            type: '',
            source: '',
            date: '',
            tripId: '',
            notes: ''
        }
    }

    // on click save in the document list
    save(document: any, value: any, documentId: any) {
        console.log("document is..", value + "documentId is..", documentId);

        this._documentService.updateDocument(value, documentId)
            .subscribe(
            documentResponse => {
                this.updateResponse = documentResponse
                console.log("delete response:...", this.updateResponse)
            },
            error => this.errorMessage = <any>error)

        this.editMode[document.documentId] = false;
        this.editedIndex = null;
    }

    // on click delete in the document list
    delete(documentId: any) {
        console.log(documentId)
        this._documentService.deleteDocuments(documentId)
            .subscribe(
            document => {
                this.deleteResponse = document
                console.log("delete response:...", this.deleteResponse)
                if (this.deleteResponse.ok == true) {
                    this.onRefreshDocumentList();
                }
            },

            error => this.errorMessage = <any>error)
    }

    // refresh or get document list from server
    onRefreshDocumentList() {
        console.log("on refresh document list trigerred")

        this._documentService.getDocuments()
            .subscribe(
            document => {
                this.documents = document
                console.log(this.documents)
            },

            error => this.errorMessage = <any>error)
        console.log("on refresh document complete")
    }

}