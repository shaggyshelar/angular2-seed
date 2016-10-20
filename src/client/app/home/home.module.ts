import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { LayoutModule } from '../layout/layout.module';
import { HomeComponent } from './home.component';
import { MyDashboardComponent } from './components/myDashboard.component';
@NgModule({
  imports: [CommonModule, SharedModule, LayoutModule],
  declarations: [HomeComponent, MyDashboardComponent],
  exports: [HomeComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HomeModule { }
