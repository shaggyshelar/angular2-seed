import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/index';
import { LayoutModule } from '../layout/index';
import { HomeComponent } from './home.component';
import { MyDashboardComponent } from './components/myDashboard.component';
import { SelectComponent } from 'ng2-select/ng2-select';
import { ProfileBankModule } from '../profileBank/index';
import { RecruitmentCycleModule } from '../recruitmentCycle/index';
import { RRFModule } from '../RRF/index';


@NgModule({
  imports: [
    CommonModule
    , SharedModule
    , LayoutModule
    //, ProfileBankModule
    , RRFModule
  ],
  declarations: [HomeComponent, MyDashboardComponent, SelectComponent],
  exports: [HomeComponent, SelectComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HomeModule { }
