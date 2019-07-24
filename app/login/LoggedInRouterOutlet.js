"use strict";
/*@Directive({
  selector: 'router-outlet'
})
/*export class LoggedInRouterOutlet extends RouterOutlet {
  publicRoutes: Array<any>;
  private parentRouter: Router;
  private loginService: LoginService;

  constructor(
    _elementRef: ViewContainerRef, _loader: DynamicComponentLoader,
    _parentRouter: Router, @Attribute('name') nameAttr: string,
    private userService: LoginService
  ) {
    super(_elementRef, _loader, _parentRouter, nameAttr);

    this.parentRouter = _parentRouter;
    this.publicRoutes = [
      '', 'login', 'signup'
    ];
  }

  activate(instruction: ComponentInstruction) {
    if (this._canActivate(instruction.urlPath)) {
      return super.activate(instruction);
    }

    this.parentRouter.navigate(['Login']);
  }

  _canActivate(url) {
    return this.publicRoutes.indexOf(url) !== -1
      || this.loginService.isLoggedIn();
  }
}*/ 
//# sourceMappingURL=loggedInRouterOutlet.js.map