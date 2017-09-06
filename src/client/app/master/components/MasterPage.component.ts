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
  IEFFunctionMasterComponent,
  PermissionMatrixComponent,
  RRFApproverMasterComponent,
  CityMasterComponent,
  CountryMasterComponent,
  TechnologyMasterComponent,
  ResumeSourceMasterComponent,
  StateMasterComponent
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
  { path: '/IEF', component: IEFFunctionMasterComponent },
  { path: '/Permissions', component: PermissionMatrixComponent },
  { path: '/RRFApprover', component: RRFApproverMasterComponent },
  { path: '/City', component: CityMasterComponent },
  { path: '/Technology', component: TechnologyMasterComponent },
  { path: '/ResumeSource', component: ResumeSourceMasterComponent },
  { path: '/Country', component: CountryMasterComponent },
   { path: '/State', component: StateMasterComponent }
])
export class MasterPageComponent {
}


