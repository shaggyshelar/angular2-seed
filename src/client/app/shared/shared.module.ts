import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SelectModule, SelectComponent } from 'ng2-select/ng2-select';
import { ToolbarComponent } from './toolbar/index';
import { NavbarComponent } from './navbar/index';
import { NameListService } from './name-list/index';
import { CollapseDirective, Ng2BootstrapModule, TooltipDirective } from 'ng2-bootstrap';
import { IfAuthorizeDirective } from './directives/ifAuthorize.directive';

import {
  //RRFGridRowComponent
  //, FeedbackDataComponent
  //, PanelsAvailablityComponent
  ViewRRFComponent
} from '../RRF/index';

/**
 * Do not specify providers for modules that might be imported by a lazy loaded module.
 */

@NgModule({
  imports: [CommonModule, RouterModule, SelectModule, Ng2BootstrapModule],
  declarations: [
    ToolbarComponent
    , NavbarComponent
    , IfAuthorizeDirective
    //, TooltipDirective
    //, RRFGridRowComponent
    //, FeedbackDataComponent
    //, PanelsAvailablityComponent
    //, ViewRRFComponent
  ],
  exports: [
    ToolbarComponent
    , NavbarComponent
    , CommonModule
    , FormsModule
    , IfAuthorizeDirective
    , SelectComponent
    //, RRFGridRowComponent
    //, FeedbackDataComponent
    //, PanelsAvailablityComponent
    //, ViewRRFComponent
    , RouterModule
    , CollapseDirective
    , TooltipDirective
  ]
})
export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: [NameListService]
    };
  }
}
