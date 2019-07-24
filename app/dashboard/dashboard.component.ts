import {Component, Output, EventEmitter} from '@angular/core';
import {NgClass} from '@angular/common';
//import {ROUTER_DIRECTIVES} from '@angular/router-deprecated';
import {ErrorHandlingComponent} from '../errorHandling/errorHandlingComponent';

@Component({
    selector: 'dashboard',
    templateUrl: 'app/dashboard/dashboardTemplate.html',
   // directives: [ROUTER_DIRECTIVES, NgClass, ErrorHandlingComponent]
})

export class DashboardComponent {

    private showError: boolean = false;
    private broadcastDashboardError: number;

    @Output() notifyFleet: EventEmitter<any> = new EventEmitter<any>();
    @Output() notifyDrivers: EventEmitter<any> = new EventEmitter<any>();
    @Output() notifyTrailers: EventEmitter<any> = new EventEmitter<any>();
    @Output() notifyDocuments: EventEmitter<any> = new EventEmitter<any>();
    @Output() notifyTripPlanner: EventEmitter<any> = new EventEmitter<any>();
    @Output() notifySettings: EventEmitter<any> = new EventEmitter<any>();
    @Output() notifyControlCenter: EventEmitter<any> = new EventEmitter<any>();
    @Output() notifyCommunications: EventEmitter<any> = new EventEmitter<any>();
    @Output() notifyCustomerProfile: EventEmitter<any> = new EventEmitter<any>();

    onClickFleet() {
        this.notifyFleet.emit('displayFleetPage');
    }

    onClickDrivers() {
        this.notifyDrivers.emit('displayDriverPage');
    }

    onClickTrailers() {
        this.notifyTrailers.emit('displayTrailerPage');
    }

    onClickDocuments() {
        this.notifyDocuments.emit('displayDocumentPage');
    }

    onClickTripPlanner(){
        this.notifyTripPlanner.emit('displayTripPlannerPage');
    }

    onClickSettings(){
        this.notifySettings.emit('displaySettingsPage');
    }

    onClickControlCenter(){
        this.notifyControlCenter.emit('displayControlPanelPage');
    }

    onClickCommunications(){
        this.notifyCommunications.emit('displayCommunicationsPage');
    }

    onClickCustomerProfile(){
        this.notifyCustomerProfile.emit('displayCustomerProfilePage');
    }
}