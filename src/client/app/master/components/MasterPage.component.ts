import { Component } from '@angular/core';
import { Routes, ROUTER_DIRECTIVES } from '@angular/router';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import {
  MyMasterDataService,
  SkypeMasterComponent,
  VisaMasterComponent,
  ReasonsMasterComponent,
  InterviewModeComponent,
  InterviewTypeComponent,
  PracticeMasterComponent,
  FeatureMasterComponent,
  RoleMasterComponent,
  IEFFunctionMasterComponent
} from '../index';

@Component({
  selector: 'schedule-interview-delivery-component',
  template: '<router-outlet></router-outlet>',
  directives: [ROUTER_DIRECTIVES],
  providers: [ToastsManager, MyMasterDataService],
})

@Routes([
  { path: '/skype', component: SkypeMasterComponent },
  { path: '/Visa', component: VisaMasterComponent },
  { path: '/Reasons', component: ReasonsMasterComponent },
  { path: '/InterviewMode', component: InterviewModeComponent },
  { path: '/InterviewType', component: InterviewTypeComponent },
  { path: '/Practice', component: PracticeMasterComponent },
  { path: '/Features', component: FeatureMasterComponent },
  { path: '/Roles', component: RoleMasterComponent },
  { path: '/IEF', component: IEFFunctionMasterComponent }
])
export class MasterPageComponent {
}


