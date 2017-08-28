import { Component } from '@angular/core';
import { OnActivate, ROUTER_DIRECTIVES, Router } from '@angular/router';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { TOOLTIP_DIRECTIVES } from 'ng2-bootstrap';
import { MyMasterDataService, VisaMaster} from '../index';
import { MasterData, ResponseFromAPI } from '../../shared/model/index';
import { APIResult } from '../../shared/constantValue/index';

@Component({
  moduleId: module.id,
  selector: 'visa-master',
  templateUrl: 'visaMaster.component.html',
  directives: [ROUTER_DIRECTIVES, TOOLTIP_DIRECTIVES]
})



export class VisaMasterComponent implements OnActivate {
  errorMessage: string;
  visaDetails: VisaMaster[];
  selectedVisa: VisaMaster = new VisaMaster();
  action: string = 'Add';
  constructor(private _MyMasterDataService: MyMasterDataService,
    private toastr: ToastsManager,
    private _router: Router) {
  }

  routerOnActivate() {
    this.getVisaDetails();
  }

  /** GET VISA DETAILS FOR THE CANDIDATE PROFILES */
  getVisaDetails() {
    this._MyMasterDataService.getVisaDetails()
      .subscribe(
      (results: any) => {
        if (results !== null && results.length > 0) {
          this.visaDetails = results;
        }
      },
      error => {
        this.errorMessage = <any>error;
        this.toastr.error(<any>error);
      });
  }
  /** On Form submit action */
  OnSubmitVisaDetails() {
    if (this.selectedVisa.Id !== null && this.selectedVisa.Id > 0) {
      this.Update(this.selectedVisa);
    } else {
      this.add(this.selectedVisa);
    }
  }
  /**Edit existing Record */
  Update(visaData: VisaMaster) {
    this._MyMasterDataService.updateVisaType(visaData)
      .subscribe(
      results => {
        if ((<ResponseFromAPI>results).StatusCode === APIResult.Success) {
          this.getVisaDetails();
          this.selectedVisa = new VisaMaster();
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
  add(visaDetails: VisaMaster) {
    visaDetails.Id = 0;
    this._MyMasterDataService.addVisaType(visaDetails)
      .subscribe(
      results => {
        if ((<ResponseFromAPI>results).StatusCode === APIResult.Success) {
          this.getVisaDetails();
          this.toastr.success((<ResponseFromAPI>results).Message);
          this.selectedVisa.Id = 0;
          this.selectedVisa.Value = '';
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
    this.action = 'Add';
    this.selectedVisa = new VisaMaster();
  }
  /**Edit existing Record */
  edit(visaData: VisaMaster) {
    console.log('ID - ' + visaData.Id);
    this.selectedVisa = visaData;
    this.action = 'Update';
  }
  /**Delete existing Record */
  delete(visaId: VisaMaster) {
    if (confirm('Are you sure you want to delete \"' + visaId.Value + '\" visa type?')) {
      this._MyMasterDataService.deleteVisaType(visaId)
        .subscribe(
        (results: any) => {
          if ((<ResponseFromAPI>results).StatusCode === APIResult.Success) {
            this.getVisaDetails();
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



