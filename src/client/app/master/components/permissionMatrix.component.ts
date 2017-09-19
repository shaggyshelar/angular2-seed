import { Component } from '@angular/core';
import { OnActivate, ROUTER_DIRECTIVES, Router } from '@angular/router';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { TOOLTIP_DIRECTIVES } from 'ng2-bootstrap';
import { MyMasterDataService, VisaMaster, Permission, RolesLookup, FeatureLookup} from '../index';
import { ResponseFromAPI } from '../../shared/model/index';
import { APIResult } from '../../shared/constantValue/index';
import { PermissionMasterFilterPipe } from  '../filter/PermissionMatrixFilter.pipe';

@Component({
  moduleId: module.id,
  selector: 'permission-matrix',
  templateUrl: 'permissionMatrix.component.html',
  directives: [ROUTER_DIRECTIVES, TOOLTIP_DIRECTIVES],
  pipes:[PermissionMasterFilterPipe]
})



export class PermissionMatrixComponent implements OnActivate {
  errorMessage: string;
  visaDetails: VisaMaster[];
  Permissions: Permission[];
  PermissionsList: Permission[];
  RoleType: number;
  FeatureId: number;
  updatePermission: Permission = new Permission();
  SaveFeaturedata: Permission = new Permission();
  Feature: FeatureLookup = new FeatureLookup();
  RoleById: RolesLookup = new RolesLookup();
  Roles: RolesLookup[];
  selectedVisa: VisaMaster = new VisaMaster();
  action: string = 'Add';
  showFeature: boolean = false;
  ShowTable: boolean = false;
  constructor(private _MyMasterDataService: MyMasterDataService,
    private toastr: ToastsManager,
    private _router: Router) {
  }

  routerOnActivate() {
    this.getRoles();
  }

  /** GET VISA DETAILS FOR THE CANDIDATE PROFILES */
  getRoles() {
    this._MyMasterDataService.getRoles()
      .subscribe(
      (results: any) => {
        if (results !== null && results.length > 0) {
          this.Roles = results;
          if (this.Roles.length > 0)
            this.getPermissionsByRole(this.Roles[0].Id);
            this.RoleType=this.Roles[0].Id;
        }
      },
      error => {
        this.errorMessage = <any>error;
        this.toastr.error(<any>error);
      });
  }
  /** GET PERMISSIONS DETAILS FROM DB*/
  getPermissions() {
    this._MyMasterDataService.getPermissions()
      .subscribe(
      (results: any) => {
        if (results !== null && results.length > 0) {
          this.Permissions = results;
          // this.FeatureId=this.Permissions[0].Feature.Id;
          this.ShowTable = true;
        } else {
          this.ShowTable = false;
        }
      },
      error => {
        this.errorMessage = <any>error;
        this.toastr.error(<any>error);
      });
  }
  /** GET VISA DETAILS FOR THE CANDIDATE PROFILES */
  getPermissionsByRole(roleId: number) {
    this._MyMasterDataService.getPermissionsByRole(roleId)
      .subscribe(
      (results: any) => {
        // if (results !== null && results.length > 0) {
        this.Permissions = results;
        if (this.Permissions.length > 0) {
          this.ShowTable = true;
        } else {
          this.ShowTable = false;
        }
      },
      error => {
        this.errorMessage = <any>error;
        this.toastr.error(<any>error);
      });
  }
  setSelectedRole(ModeId: any) {
    this.RoleType = ModeId;
    this.getPermissionsByRole(this.RoleType);
  }
  setSelectedFeature(featureId: any) {
    this.FeatureId = featureId;
  }
  addNewFeature() {
    this.showFeature = true;
    this.getFeatureData();
  }
  getFeatureData() {
    this._MyMasterDataService.getFeatureData()
      .subscribe(
      (results: any) => {
        if (results !== null && results.length > 0) {
          this.PermissionsList = results;
          //TODO :: make available only those features which are not used earlier in permission matrix
          // var res = this.PermissionsList.find(t => this.Permissions.every(e => e.Id !== t.Id));
          this.FeatureId = this.PermissionsList[0].Id;
          this.ShowTable = true;
        } else {
          this.ShowTable = false;
        }
      },
      error => {
        this.errorMessage = <any>error;
        this.toastr.error(<any>error);
      });
  }
  cancelNewFeature() {
    this.showFeature = false;
  }
  getRoleDatabyId(Id: any) {
    this._MyMasterDataService.getRoleDatabyId(Id)
      .subscribe(
      (results: any) => {
        if (results !== null && results.length > 0) {
          this.RoleById.Id = results[0].Id;
          this.RoleById.Value = results[0].Role;
          this.addPermissionsByRole();
        }
      },
      error => {
        this.errorMessage = <any>error;
        this.toastr.error(<any>error);
      });
  }
  getFeatureById(Id: any) {
    this._MyMasterDataService.getFeatureById(Id)
      .subscribe(
      (results: any) => {
        if (results !== null && results.length > 0) {
          this.Feature = results[0];
          this.getRoleDatabyId(this.RoleType);
        }
      },
      error => {
        this.errorMessage = <any>error;
        this.toastr.error(<any>error);
      });
  }
  addPermissionsByRole() {
    this.SaveFeaturedata.Feature = this.Feature;
    this.SaveFeaturedata.Role = this.RoleById;
    //this.SaveFeaturedata.Role.Value=this.RoleById.Role;
    this._MyMasterDataService.addPermissionsByRole(this.SaveFeaturedata)
      .subscribe(
      results => {
        if ((<ResponseFromAPI>results).StatusCode === APIResult.Success) {
          this.toastr.success((<ResponseFromAPI>results).Message);
          this.showFeature = false;
          this.getPermissionsByRole(this.RoleType);
        } else {
          this.toastr.error((<ResponseFromAPI>results).Message);
        }
      },
      error => {
        this.errorMessage = <any>error;
        this.toastr.error(<any>error);
      });
  }

  saveNewFeature(permissionData: Permission) {
    this.getFeatureById(this.FeatureId);
  }
  updateManage(e: any, data: any) {
    this.updatePermission = data;
    this.updatePermission.Manage = e.target.checked;
    this.Update(this.updatePermission);
  }
  updateRead(e: any, data: any) {
    this.updatePermission = data;
    this.updatePermission.Read = e.target.checked;
    this.Update(this.updatePermission);
  }
  updateAdd(e: any, data: any) {
    this.updatePermission = data;
    this.updatePermission.Add = e.target.checked;
    this.Update(this.updatePermission);
  }
  updateUpdate(e: any, data: any) {
    this.updatePermission = data;
    this.updatePermission.Update = e.target.checked;
    this.Update(this.updatePermission);
  }
  updateDelete(e: any, data: any) {
    this.updatePermission = data;
    this.updatePermission.Delete = e.target.checked;
    this.Update(this.updatePermission);
  }
  /**Edit existing Record */
  Update(permissionData: Permission) {
    this._MyMasterDataService.updatePermissionsByRole(permissionData)
      .subscribe(
      results => {
        if ((<ResponseFromAPI>results).StatusCode === APIResult.Success) {
          this.getPermissionsByRole(this.RoleType);
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
  // /**Add new Record */
  // add(visaDetails: VisaMaster) {
  //   visaDetails.Id = 0;
  //   this._MyMasterDataService.addVisaType(visaDetails)
  //     .subscribe(
  //     results => {
  //       if ((<ResponseFromAPI>results).StatusCode === APIResult.Success) {
  //         //this.getVisaDetails();
  //         this.toastr.success((<ResponseFromAPI>results).Message);
  //         this.selectedVisa.Id = 0;
  //         this.selectedVisa.Value = '';
  //       } else {
  //         this.toastr.error((<ResponseFromAPI>results).Message);
  //       }
  //     },
  //     error => {
  //       this.errorMessage = <any>error;
  //       this.toastr.error(<any>error);
  //     });
  // }
  // /** Cancel action to reset fields */
  // OnCancel() {
  //   this.selectedVisa = null;
  //   this.action = 'Add';
  // }
  /**Delete existing Record */
  delete(permissionData: Permission) {
    if (confirm('Are you sure you want to delete ?')) {
      this._MyMasterDataService.deletePermissionsByRole(permissionData)
        .subscribe(
        (results: any) => {
          if ((<ResponseFromAPI>results).StatusCode === APIResult.Success) {
            this.toastr.success((<ResponseFromAPI>results).Message);
            this.getPermissionsByRole(this.RoleType);
          } else {
            this.toastr.error((<ResponseFromAPI>results).Message);
          }
        },
        error => this.toastr.error(<any>error));
    } else {
      this.toastr.success('Deletion Process Cancelled Successfully');
    }
  }
}



