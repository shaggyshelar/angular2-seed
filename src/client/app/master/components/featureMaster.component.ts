import { Component,AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { OnActivate, ROUTER_DIRECTIVES, Router } from '@angular/router';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { TOOLTIP_DIRECTIVES } from 'ng2-bootstrap';
import { MyMasterDataService, FeatureMaster} from '../index';
import { MasterData, ResponseFromAPI } from '../../shared/model/index';
import { APIResult } from '../../shared/constantValue/index';
import { FeatureMasterFilterPipe } from  '../filter/FeaturesFilter.pipe';


@Component({
  moduleId: module.id,
  selector: 'feature-master',
  templateUrl: 'featureMaster.component.html',
  directives: [ROUTER_DIRECTIVES, TOOLTIP_DIRECTIVES],
  pipes:[FeatureMasterFilterPipe]
})



export class FeatureMasterComponent implements OnActivate, AfterViewInit {
  errorMessage: string;
  Features: FeatureMaster[];
  selectedFeature: FeatureMaster = new FeatureMaster();
  action: string = 'Add';
  ShowTable:boolean=false;
  constructor(private _MyMasterDataService: MyMasterDataService,
    private toastr: ToastsManager,
    private _router: Router) {
  }

  routerOnActivate() {
    this.getFeatureDetails();
  }
  @ViewChild('focus') firstNameElement: ElementRef;
    ngAfterViewInit() {
        this.firstNameElement.nativeElement.focus();
    }
  /** GET FEATURES INFORMATION OF PERMISSION */
  getFeatureDetails() {
    this._MyMasterDataService.getFeatureData()
      .subscribe(
      (results: any) => {
        if (results !== null && results.length > 0) {
          this.Features = results;
          this.ShowTable=true;
        } else {
          this.ShowTable=false;
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
    var checkData = featureData.Value.trim();
    if (checkData !== '') {
    featureData.Value=this.UpperCasefunction(checkData);
    this._MyMasterDataService.updateFeature(featureData)
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
      } else {
      this.toastr.error('Please Fill Data.');
    }
  }
     UpperCasefunction (x:any) {
            var i,txt = '';
            for (i = 0; i < x.length; i++) {
                if (x[i] === ' ') {
                    i++;
                    txt += ' '+x[i].toUpperCase();
                } else {
                    txt += x[i];
                }
            }
            txt = txt.substring(0, 1).toUpperCase() + txt.substring(1);
            return txt;
        };
  /**Add new Record */
  add(featureDetails: FeatureMaster) {
    featureDetails.Id = 0;
    var checkData = featureDetails.Value.trim();
    if (checkData !== '') {
    featureDetails.Value=this.UpperCasefunction(checkData);
    this._MyMasterDataService.addFeature(featureDetails)
      .subscribe(
      results => {
        if ((<ResponseFromAPI>results).StatusCode === APIResult.Success) {
          this.toastr.success((<ResponseFromAPI>results).Message);
          this.OnCancel();
        } else {
          this.toastr.error((<ResponseFromAPI>results).Message);
        }
      },
      error => {
        this.errorMessage = <any>error;
        this.toastr.error(<any>error);
      });
      } else {
      this.toastr.error('Please Fill Data.');
    }
  }
  /** Cancel action to reset fields */
  OnCancel() {
    this.action = 'Add';
    this.getFeatureDetails();
    this.selectedFeature = new FeatureMaster();
    this.ngAfterViewInit();
  }
  /**Edit existing Record */
  edit(featureData: FeatureMaster) {
    //console.log('ID - ' + featureData.Id);
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



