import {Component, OnInit, OnChanges, Input} from '@angular/core';

@Component({
    selector: 'service-unavailable',
    templateUrl: 'app/nonsubscribedServiceHandler/nonsubscribedServiceTemplate.html'
})

export class NonsubscribedServiceComponent implements OnInit, OnChanges {

    private message: string;

    ngOnInit() {
        this.displayMessage();
    }

    ngOnChanges(){
       
    }

    displayMessage(){
        this.message = "Sorry, this feature is currently not subscribed in your service package. "+'\n'+
        "Please contact customer service for more details."
    }

}