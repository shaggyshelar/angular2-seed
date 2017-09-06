import { Component } from '@angular/core';
import { OnActivate, ROUTER_DIRECTIVES, Router } from '@angular/router';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { TOOLTIP_DIRECTIVES } from 'ng2-bootstrap';
import { MyMasterDataService, RolesMaster, } from '../index';
import { MasterData, ResponseFromAPI } from '../../shared/model/index';
import { APIResult } from '../../shared/constantValue/index';

@Component({
  moduleId: module.id,
  selector: 'role-master',
  templateUrl: 'roleMaster.component.html',
  directives: [ROUTER_DIRECTIVES, TOOLTIP_DIRECTIVES]
})



export class RoleMasterComponent implements OnActivate {
  errorMessage: string;
  Roles: RolesMaster[];
  selectedRole: RolesMaster = new RolesMaster();
  action: string = 'Add';
  constructor(private _MyMasterDataService: MyMasterDataService,
    private toastr: ToastsManager,
    private _router: Router) {
  }

  routerOnActivate() {
    this.getRolesDetails();
  }

  /** GET Role details of permission matrix */
  getRolesDetails() {
    this._MyMasterDataService.getRoleData()
      .subscribe(
      (results: any) => {
        if (results !== null && results.length > 0) {
          this.Roles = results;
        }
      },
      error => {
        this.errorMessage = <any>error;
        this.toastr.error(<any>error);
      });
  }
  /** On Form submit action */
  OnSubmitRoles() {
    if (this.selectedRole.Id !== null && this.selectedRole.Id > 0) {
      this.Update(this.selectedRole);
    } else {
      this.add(this.selectedRole);
    }
  }
  /**Edit existing Record */
  Update(roleData: RolesMaster) {
    this._MyMasterDataService.updateRole(roleData)
      .subscribe(
      results => {
        if ((<ResponseFromAPI>results).StatusCode === APIResult.Success) {
          this.OnCancel();
          this.toastr.success((<ResponseFromAPI>results).Message);
        } else {
          this.toastr.error((<ResponseFromAPI>results).Message);
        }
      },
      error => {
        this.errorMessage = <any>error;
        this.toastr.error(<any>error);
      });
  }
  /**Add new Record */
  add(roleDetails: RolesMaster) {
    roleDetails.Id = 0;
    this._MyMasterDataService.addRole(roleDetails)
      .subscribe(
      results => {
        if ((<ResponseFromAPI>results).StatusCode === APIResult.Success) {
          this.OnCancel();
          this.toastr.success((<ResponseFromAPI>results).Message);
          // this.selectedRole.Id = 0;
          // this.selectedRole.SequenceNo = '';
          // this.selectedRole.RoleId = '';
          // this.selectedRole.Role = '';
        } else {
          this.toastr.error((<ResponseFromAPI>results).Message);
        }
      },
      error => {
        this.errorMessage = <any>error;
        this.toastr.error(<any>error);
      });
  }
  /** Cancel action to reset fields */
  OnCancel() {
    this.selectedRole = new RolesMaster();
    this.action = 'Add';
    this.getRolesDetails();
  }
  /**Edit existing Record */
  edit(roleData: RolesMaster) {
    console.log('ID - ' + roleData.Id);
    this.selectedRole = roleData;
    this.action = 'Update';
  }
  /**Delete existing Record */
  delete(roleData: RolesMaster) {
    if (confirm('Are you sure you want to delete \"' + roleData.Role + '\" role?')) {
      this._MyMasterDataService.deleteRole(roleData)
        .subscribe(
        (results: any) => {
          if ((<ResponseFromAPI>results).StatusCode === APIResult.Success) {
            this.OnCancel();
            this.toastr.success((<ResponseFromAPI>results).Message);
          } else {
            this.toastr.error((<ResponseFromAPI>results).Message);
          }
        },
        error => this.toastr.error(<any>error));
    } else {
      return;
    }
  }
}

