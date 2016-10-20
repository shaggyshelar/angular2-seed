import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { ToolbarComponent } from './toolbar/index';
import { NavbarComponent } from './navbar/index';
import { NameListService } from './name-list/index';

import { IfAuthorizeDirective } from './directives/ifAuthorize.directive';

/**
 * Do not specify providers for modules that might be imported by a lazy loaded module.
 */

@NgModule({
  imports: [CommonModule, RouterModule],
  declarations: [
    ToolbarComponent
    , NavbarComponent
    , IfAuthorizeDirective
  ],
  exports: [
    ToolbarComponent
    , NavbarComponent
    , CommonModule
    , FormsModule
    , IfAuthorizeDirective
    , RouterModule
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
