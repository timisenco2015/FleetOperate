import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router } from "@angular/router";
import { FleetOperateService } from "../fleetOperate/fleetOperateService";
import { CreateAccountService } from "../createAccount/createAccountService";

@Component({
    selector: 'temporaryMessage',
    templateUrl: 'app/temporaryMessage/temporaryMessageTemplate.html'
})

export class TemporaryMessageComponent implements OnInit, OnChanges {

    ngOnChanges() {
        
    }
        
    ngOnInit() {
        
    
    }

   
}