import { Routes } from '@angular/router';
import { MyDashboardComponent } from './home/index';
import { AboutRoutes } from './about/index';
import { HomeRoutes } from './home/index';
import { LoginComponent } from './login/index';
import { Error400Component, Error500Component } from './errorPages/index';

const fallbackRoute: Routes = [{
  path: '**',
  component: Error400Component
}];
//FallBackRoute always should be Last in rout config
export const routes: Routes = [
  {
    path: '',
    redirectTo: '/Login',
    pathMatch: 'full'
  },
  ...HomeRoutes,
  ...AboutRoutes,
  { path: 'Home', component: MyDashboardComponent },
  { path: 'Login', component: LoginComponent },
  { path: '404', component: Error400Component },
  { path: '500', component: Error500Component }
  //, fallbackRoute
];
