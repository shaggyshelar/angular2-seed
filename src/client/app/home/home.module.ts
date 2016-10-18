import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
//import { SpinnerComponent } from '../shared/index';
import { HomeComponent } from './home.component';
//import { MyDashboardComponent } from './components/myDashboard.component';
import { NameListService } from '../shared/name-list/index';
//import { TopNavigationBarComponent, SideBarComponent, QuickSidebarComponent } from '../layout/index';


@NgModule({
  imports: [CommonModule, SharedModule],
  declarations: [
    HomeComponent
    //, MyDashboardComponent
    // TopNavigationBarComponent,
    // SideBarComponent,
    // QuickSidebarComponent
    //,SpinnerComponent
  ],
  exports: [HomeComponent],
  providers: [NameListService]
})
export class HomeModule { }
