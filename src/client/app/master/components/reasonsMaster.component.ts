import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { OnActivate, ROUTER_DIRECTIVES, Router } from '@angular/router';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { TOOLTIP_DIRECTIVES } from 'ng2-bootstrap';
import { MasterData, ResponseFromAPI } from '../../shared/model/index';
import { APIResult } from '../../shared/constantValue/index';
import { MyMasterDataService, ReasonsMaster } from '../index';

@Component({
  moduleId: module.id,
  selector: 'reasons-master',
  templateUrl: 'reasonsMaster.component.html',
  directives: [ROUTER_DIRECTIVES, TOOLTIP_DIRECTIVES]
})

export class ReasonsMasterComponent implements OnActivate, AfterViewInit {
  errorMessage: string;
  reasonsData: ReasonsMaster[];
  selectedReason: ReasonsMaster = new ReasonsMaster();
  action: string = 'Add';
  constructor(private _MyMasterDataService: MyMasterDataService,
    private toastr: ToastsManager,
    private _router: Router) {
  }
  @ViewChild('focus') firstNameElement: ElementRef;
    ngAfterViewInit() {
        this.firstNameElement.nativeElement.focus();
    }
  routerOnActivate() {
    this.getReasonsData();
  }
  /** GET REASONS DETAILS FOR "IEF REJECT" AND "RRF CLOSE" */
  getReasonsData() {
    this._MyMasterDataService.getResonsData()
      .subscribe(
      (results: any) => {
        if (results !== null && results.length > 0) {
          this.reasonsData = results;
        }
      },
      error => {
        this.errorMessage = <any>error;
        this.toastr.error(<any>error);
      });
  }
  /** Cancel action to reset fields */
  OnCancel() {
    this.selectedReason = new ReasonsMaster();
    this.action = 'Add';
    this.getReasonsData();
    this.ngAfterViewInit();
  }
  /** On Form submit action */
  OnSubmitReason() {
    if (this.selectedReason.ID !== null && this.selectedReason.ID > 0) {
      this.Update(this.selectedReason);
    } else {
      this.add(this.selectedReason);
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
  /**Edit existing Record */
  Update(reasonData: ReasonsMaster) {
    var checkData = reasonData.Reason.trim();
    if (checkData !== "") {
    reasonData.Reason=this.UpperCasefunction(checkData);
    this._MyMasterDataService.updateReasons(reasonData)
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
  /**Add new Record */
  add(reasonData: ReasonsMaster) {
    reasonData.ID = 0;
    var checkData = reasonData.Reason.trim();
    if (checkData !== "") {
    reasonData.Reason=this.UpperCasefunction(checkData);
    this._MyMasterDataService.addReasons(reasonData)
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
  /**Edit existing Record */
  edit(reasonData: ReasonsMaster) {
    console.log('ID - ' + reasonData.ID);
    this.selectedReason = reasonData;
    this.action = 'Update';
  }
  /**Delete existing Record */
  delete(reasonData: ReasonsMaster) {
    if (confirm('Are you sure you want to delete \"' + reasonData.Category + '\" reason?')) {
      this._MyMasterDataService.deleteReasons(reasonData)
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



