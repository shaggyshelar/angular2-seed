import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { APP_BASE_HREF } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { routes } from './app.routes';

import { AboutModule } from './about/about.module';
import { HomeModule } from './home/home.module';
import { SharedModule } from './shared/shared.module';
import { LoginComponent } from './login/index';
import { Error400Component, Error500Component } from './errorPages/index';
import { AuthHttp } from './shared/services/authHttp.service';
import { CommonService } from './shared/services/common.service';
//import { NavbarComponent, ToolbarComponent } from './shared/index';
import { ToastModule, ToastOptions } from 'ng2-toastr/ng2-toastr';


let options = <ToastOptions>{
  animate: 'flyRight',
  positionClass: 'toast-top-right',
};

@NgModule({
  imports: [ToastModule, BrowserModule, HttpModule, RouterModule.forRoot(routes), AboutModule,
    HomeModule, SharedModule.forRoot(), ToastModule.forRoot(options)],
  declarations: [AppComponent, LoginComponent, Error400Component, Error500Component],
  providers: [{
    provide: APP_BASE_HREF,
    useValue: '<%= APP_BASE %>'
  },
    AuthHttp,
    CommonService
  ],
  bootstrap: [AppComponent]

})

export class AppModule {
  constructor() {
    console.log('I am AppModule');
  }
}
