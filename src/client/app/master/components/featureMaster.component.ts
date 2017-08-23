import { Component } from '@angular/core';
import { OnActivate, ROUTER_DIRECTIVES, Router } from '@angular/router';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { TOOLTIP_DIRECTIVES } from 'ng2-bootstrap';
import { MyMasterDataService, FeatureMaster} from '../index';
import { MasterData, ResponseFromAPI } from '../../shared/model/index';
import { APIResult } from '../../shared/constantValue/index';

@Component({
  moduleId: module.id,
  selector: 'feature-master',
  templateUrl: 'featureMaster.component.html',
  directives: [ROUTER_DIRECTIVES, TOOLTIP_DIRECTIVES]
})



export class FeatureMasterComponent implements OnActivate {
  errorMessage: string;
  Features: FeatureMaster[];
  selectedFeature: FeatureMaster = new FeatureMaster();
  action: string = 'Add';
  constructor(private _MyMasterDataService: MyMasterDataService,
    private toastr: ToastsManager,
    private _router: Router) {
  }

  routerOnActivate() {
    this.getFeatureDetails();
  }

  /** GET FEATURES INFORMATION OF PERMISSION */
  getFeatureDetails() {
    this._MyMasterDataService.getFeatureData()
      .subscribe(
      (results: any) => {
        if (results !== null && results.length > 0) {
          this.Features = results;
        }
      },
      error => {
        this.errorMessage = <any>error;
        this.toastr.error(<any>error);
      });
  }
  /** On Form submit action */
  OnSubmitFeature() {
    if (this.selectedFeature.Id !== null && this.selectedFeature.Id > 0) {
      this.Update(this.selectedFeature);
    } else {
      this.add(this.selectedFeature);
    }
  }
  /**Edit existing Record */
  Update(featureData: FeatureMaster) {
    this._MyMasterDataService.updateFeature(featureData)
      .subscribe(
      results => {
        if ((<ResponseFromAPI>results).StatusCode === APIResult.Success) {
          this.getFeatureDetails();
          this.selectedFeature = new FeatureMaster();
          this.action = 'Add';
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
  add(featureDetails: FeatureMaster) {
    featureDetails.Id = 0;
    this._MyMasterDataService.addFeature(featureDetails)
      .subscribe(
      results => {
        if ((<ResponseFromAPI>results).StatusCode === APIResult.Success) {
          this.getFeatureDetails();
          this.toastr.success((<ResponseFromAPI>results).Message);
          this.selectedFeature.Id = 0;
          this.selectedFeature.Value = '';
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
    this.selectedFeature = null;
  }
  /**Edit existing Record */
  edit(featureData: FeatureMaster) {
    console.log('ID - ' + featureData.Id);
    this.selectedFeature = featureData;
    this.action = 'Update';
  }
  /**Delete existing Record */
  delete(feature: FeatureMaster) {
    if (confirm('Are you sure you want to delete \"' + feature.Value + '\" feature?')) {
      this._MyMasterDataService.deleteFeature(feature)
        .subscribe(
        (results: any) => {
          if ((<ResponseFromAPI>results).StatusCode === APIResult.Success) {
            this.getFeatureDetails();
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



