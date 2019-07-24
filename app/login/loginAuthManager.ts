import { Injectable, EventEmitter } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import {LoginService} from './loginService';
import {LoginComponent} from './loginComponent';
import { Observable } from 'rxjs/Observable';
//import {LoginAuthenticationMessageComponent} from'./loginAuthenticationMessageComponent';
 
@Injectable()
export class LoginAuthManager implements CanActivate {

    //alreadyLoggedMsg = new Observable();
    //loginMsg = new Observable();

    constructor(private router: Router, private loginService: LoginService,
                /*private loginAuthMsg: LoginAuthenticationMessageComponent*/){

    }

    canActivate(activatedRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot){

        if(activatedRoute.url[0].path == 'login'){
            if(window.localStorage.getItem('token_1') && sessionStorage.getItem('token_1')){
                //console.log('already logged in..');
                window.alert('You are already logged in !')
               // this.loginAuthMsg.displayAlreadyLoggedMsg();
                //this.alreadyLoggedMsg.map(this.displayMsg)
                this.router.navigate(['fleetoperate'])
              // this.loginService.navigateToFleetoperatePage();
               
                return false;
                
            }else
                return true;
            
        }

       /* if(activatedRoute.url[0].path == 'fleetoperate'){
            if(window.localStorage.getItem('auth_token')){
                console.log('already logged in..',activatedRoute );
                //this.router.navigate(['fleetoperate/10'])
                return true;
            }else
                return false;
            
        }*/

        if(window.localStorage.getItem('token_1') && sessionStorage.getItem('token_1'))
       // console.log('')
        return true;

       // console.log('please login')
        
        //this.loginAuthMsg.displayLoginMsg();
        //this.loginMsg.map(this.displayMsg)
        this.router.navigate(['login']);
        window.alert('Please Login to use the service !')
        return false;
    }

    displayMsg(){

        return "displayMsg"
    }

    /*canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    console.log('AuthGuard#canActivate called');
    let url: string = state.url;
    return this.loginService.isLoggedIn();
  }*/


}