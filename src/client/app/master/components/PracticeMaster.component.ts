import { Component } from '@angular/core';
import { OnActivate, ROUTER_DIRECTIVES, Router } from '@angular/router';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { TOOLTIP_DIRECTIVES } from 'ng2-bootstrap';
import {   Practice, MyMasterDataService} from '../index';
import { ResponseFromAPI} from '../../shared/model/index';
import { APIResult } from '../../shared/constantValue/index';
@Component({
  moduleId: module.id,
  selector: 'practice-master',
  templateUrl: 'PracticeMaster.component.html',
  directives: [ROUTER_DIRECTIVES, TOOLTIP_DIRECTIVES]
})



export class PracticeMasterComponent implements OnActivate {
  errorMessage: string;
  data: Practice = new Practice();
  practiceData: Array<Practice> = new Array<Practice>();
  Action: string = 'Add';
  constructor(private _MyMasterDataService: MyMasterDataService,
    private toastr: ToastsManager,
    private _router: Router) {
  }

  routerOnActivate() {
    this.getPracticeData();
    this.Action = 'Add';
  }
  /** GET Practice Data FOR THE INTERVIEWERS */
  getPracticeData() {
    this._MyMasterDataService.getPracticeData()
      .subscribe(
      (results: any) => {
        if (results !== null && results.length > 0) {
          this.practiceData = results;
        }
      },
      error => {
        this.errorMessage = <any>error;
        this.toastr.error(<any>error);
      });
  }
  OnCancel() {
    this.Action = 'Add';
    this.data = new Practice();
    this.getPracticeData();
  }
  EditData(modedetails: any) {
    this.data = modedetails;
    this.Action = 'Update';
  }
  AddEditData() {
    if (this.Action === 'Add') {
      this.AddPracticeData();
    } else if (this.Action === 'Update') {
      this.EditPracticeData();
    }
  }
  EditPracticeData() {
    var checkData = this.data.Value.trim();
    if (checkData !== "") {
      this._MyMasterDataService.editPracticeData(this.data)
        .subscribe(
        results => {
          if ((<ResponseFromAPI>results).StatusCode === APIResult.Success) {
            this.toastr.success((<ResponseFromAPI>results).Message);
            this.OnCancel();
            /**Bind new data to list */
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
  AddPracticeData() {
    var checkData = this.data.Value.trim();
    if (checkData !== "") {
      this._MyMasterDataService.addPracticeData(this.data)
        .subscribe(
        results => {
          if ((<ResponseFromAPI>results).StatusCode === APIResult.Success) {
            this.toastr.success((<ResponseFromAPI>results).Message);
            this.OnCancel();
            /**Bind new data to list */
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

  deleteData(DelData: any) {
    var deleteData = confirm('Are you sure you want to delete it?');
    if (deleteData === true) {
      this._MyMasterDataService.deletePracticeData(DelData)
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
      alert('Delete Process Cancelled.');
    }

  }

}



