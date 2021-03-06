import { Component, OnInit } from '@angular/core';
import { ROUTER_DIRECTIVES, Routes, Router } from '@angular/router';
import { HTTP_PROVIDERS} from '@angular/http';

import { AboutComponent } from './+about/index';
import { HomeComponent } from './home/index';
import { NameListService, NavbarComponent, ToolbarComponent } from './shared/index';

import { LoginComponent } from './login/index';

@Component({
  selector: 'sd-app',
  viewProviders: [NameListService, HTTP_PROVIDERS],
  templateUrl: 'app/app.component.html',
  directives: [ROUTER_DIRECTIVES, NavbarComponent, ToolbarComponent]
})
@Routes([
  { path: '/App', component: HomeComponent },
  { path: '/about', component: AboutComponent },
  { path: '/Login', component: LoginComponent }
])
/**
 * This class represents the main application component.
 * Within the @Routes annotation is the configuration of the
 * applications routes, configuring the paths for the lazy
 * loaded components (HomeComponent, AboutComponent).
 */
export class AppComponent implements OnInit {
  constructor(private _router: Router) {
  }

  ngOnInit() {
    this._router.navigate(['/App']);
    //this._router.navigate(['/Login']);
    // if (this._loginService.isAuthenticated()) {
    //   this._router.navigate(['/Home']);
    // } else {
    //   this._router.navigate(['/Login']);
    // }
  }
}
