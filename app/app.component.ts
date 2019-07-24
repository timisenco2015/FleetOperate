import { Component, ViewContainerRef } from '@angular/core';
import {XSRFStrategy, CookieXSRFStrategy} from '@angular/http';
import {LoginComponent} from './login/loginComponent';
import {FleetOperateComponent} from './fleetOperate/fleetOperateComponent';

@Component({
  selector: 'my-app',
  template: `        
        <router-outlet></router-outlet>`,
})

export class AppComponent { 
     
}