import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/index';
import { LayoutModule } from '../layout/index';
import { HomeComponent } from './home.component';
import { MyDashboardComponent } from './components/myDashboard.component';

import { ProfileBankModule } from '../profileBank/index';
import { RecruitmentCycleModule } from '../recruitmentCycle/index';
import { RRFModule } from '../RRF/index';

import { AllProfilesListComponent } from '../profileBank/allProfiles/index';

@NgModule({
  imports: [
    CommonModule
    , SharedModule
    , LayoutModule
    , ProfileBankModule
    //, RecruitmentCycleModule
    //, RRFModule
  ],
  declarations: [HomeComponent, MyDashboardComponent],
  exports: [HomeComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HomeModule { }
