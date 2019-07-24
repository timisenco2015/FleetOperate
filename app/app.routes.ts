import {Routes, RouterModule} from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import {LoginComponent} from './login/loginComponent';
import {FleetOperateComponent} from './fleetOperate/fleetOperateComponent';
import { LoginAuthManager } from './login/loginAuthManager';
import { CreateAccountComponent } from "./createAccount/createAccountComponent";
import { UserSignUpComponent } from "./UserSignUp/userSignUpComponent";
import { ForgotPasswordComponent } from "./forgotPassword/forgotPasswordComponent";
import { UserFirstTimeLogInComponent } from "./userFirstTimeLogIn/userFirstTimeLogInComponent";
import { AdminEmailVerificationComponent } from "./createAccount/adminEmailVerification/adminEmailVerficationComponent";

const appRoutes: Routes = [
  { path: '', redirectTo:'login', pathMatch: 'full', canActivate: [LoginAuthManager] },
  { path: 'login', component: LoginComponent, canActivate: [LoginAuthManager]},
  { path: 'fleetoperate', component: FleetOperateComponent, canActivate: [LoginAuthManager] },
  { path: 'createAccount', component: CreateAccountComponent },
  //{ path: 'userSignUp', component: UserSignUpComponent },
  { path: 'userFirstTimeLogIn', component: UserFirstTimeLogInComponent },
  { path: 'forgotPassword', component: ForgotPasswordComponent },
  //{ path: 'adminEmailVerification', component: AdminEmailVerificationComponent }
 
];

export const appRoutingProviders: any[] = [

];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);