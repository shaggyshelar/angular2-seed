import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { LayoutModule } from '../layout/layout.module';

import { HomeComponent } from './home.component';
import { MyDashboardComponent } from './components/myDashboard.component';
import { NameListService } from '../shared/name-list/index';
import { TopNavigationBarComponent, SideBarComponent, QuickSidebarComponent } from '../layout/index';
//import { QuickSidebarComponent } from './components/quick_Sidebar.component';
import { IfAuthorizeDirective } from '../shared/index';


@NgModule({
  imports: [CommonModule, SharedModule, LayoutModule],
  declarations: [
    HomeComponent
    , MyDashboardComponent
    , IfAuthorizeDirective
    // , TopNavigationBarComponent
    // , SideBarComponent
    // , QuickSidebarComponent
    //, SpinnerComponent
  ],
  exports: [HomeComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HomeModule { }
