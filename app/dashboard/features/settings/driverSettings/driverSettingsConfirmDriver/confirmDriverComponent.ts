import {Component, OnInit, OnChanges, Input, EventEmitter, Output} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DriverSettingsService } from "../driverSettingsService";


@Component({
    selector: 'driver-settings-confirm',
    templateUrl: 'app/dashboard/features/settings/driverSettings/driverSettingsConfirmDriver/confirmDriverTemplate.html'
})

export class ConfirmDriverComponent {

    private confirmDriverForm: FormGroup;
    private showForm: boolean = true;
    private displayDriverConfirmed: boolean = false;
    @Output() displayDriverList: EventEmitter<any> = new EventEmitter<any>();
    private confirmDriverResponse: any;

    constructor(private _formBuilder: FormBuilder,
                private _driverSettingsService: DriverSettingsService) {
        this.createConfirmDriverForm();
    }

    createConfirmDriverForm(){
        this.confirmDriverForm = this._formBuilder.group({
              username: ['', ]
            });
    }

    onClickConfirm(username: string){
        console.log("username to be confirmed..", username)

        this._driverSettingsService.confirmDriver(username)
            .subscribe(response => {
                this.confirmDriverResponse = response;
                console.log("confirm driver response..", this.confirmDriverResponse)
            })
    }

    onClickCancel(){
        this.displayDriverList.emit("displayDriverList");
    }
}

