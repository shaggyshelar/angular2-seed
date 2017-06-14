import {Component} from '@angular/core';
import {ROUTER_DIRECTIVES, Router} from '@angular/router';
import {IfAuthorizeDirective} from '../../shared/directives/ifAuthorize.directive';

@Component({
  moduleId: module.id,
  selector: 'sidebar-component',
  templateUrl: 'sideBar.component.html',
  directives: [ROUTER_DIRECTIVES, IfAuthorizeDirective]
})
export class SideBarComponent {
  constructor(){}
  checkRouterActive(url : string) {
    if (location.hash === '#' + url){
      return true;
    }  
    return false;
  }
}
