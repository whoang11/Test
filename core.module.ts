import { NgModule, ErrorHandler, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

// import all services
import * as svcs from '@app/core/services';

@NgModule({
  providers: [
      svcs.WorksheetService,
      svcs.ExceptionService,
      svcs.ResponseWrapperService,
      svcs.TestService,
      svcs.ToastService,
      svcs.IdleTimerService,
  ]
})
export class CoreModule {
    constructor( @Optional() @SkipSelf() parentModule: CoreModule) {}
}

// index.ts
/*
    Order matters in this barrel because of dependencies on injecting other services.
*/
export * from "./services";
export * from './rxjs-extensions';

// rxjs-extensions.ts
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/finally';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/fromPromise';
import 'rxjs/add/observable/throw';
import { Observable } from 'rxjs/Observable';
