import { Component } from '@angular/core';
import { OnActivate, ROUTER_DIRECTIVES, Router } from '@angular/router';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { TOOLTIP_DIRECTIVES } from 'ng2-bootstrap';
import {   Technology, MyMasterDataService} from '../index';
import { ResponseFromAPI} from '../../shared/model/index';
import { APIResult } from '../../shared/constantValue/index';
@Component({
  moduleId: module.id,
  selector: 'technology-master',
  templateUrl: 'technology.component.html',
  directives: [ROUTER_DIRECTIVES, TOOLTIP_DIRECTIVES]
})

export class TechnologyMasterComponent implements OnActivate {
  errorMessage: string;
  ShowTable: boolean = false;
  data: Technology = new Technology();
  technologyData: Array<Technology> = new Array<Technology>();
  Action: string = 'Add';
  constructor(private _MyMasterDataService: MyMasterDataService,
    private toastr: ToastsManager,
    private _router: Router) {
  }

  routerOnActivate() {
    this.getTechnologyData();
    this.Action = 'Add';
  }
  /** GET Interview Mode FOR THE INTERVIEWERS */
  getTechnologyData() {
    this._MyMasterDataService.getTechnologyData()
      .subscribe(
      (results: any) => {
        if (results !== null && results.length > 0) {
          this.technologyData = results;
          if (this.technologyData.length > 0) {
            this.ShowTable = true;
          } else {
            this.ShowTable = false;
          }
        }
      },
      error => {
        this.errorMessage = <any>error;
        this.toastr.error(<any>error);
      });
  }
  OnCancel() {
    this.Action = 'Add';
    this.data = new Technology();
    this.getTechnologyData();
  }
  EditData(details: any) {
    this.data = details;
    this.Action = 'Update';
  }
  AddEditData() {
    if (this.Action === 'Add') {
      this.AddTechnologyData();
    } else if (this.Action === 'Update') {
      this.EditTechnologyData();
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
  EditTechnologyData() {
    var checkData = this.data.Value.trim();
    if (checkData !== "") {
      this.data.Value=this.UpperCasefunction(checkData);
      this._MyMasterDataService.editTechnologyData(this.data)
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
  AddTechnologyData() {
    var checkData = this.data.Value.trim();
    if (checkData !== '') {
      this.data.Value=this.UpperCasefunction(checkData);
      this._MyMasterDataService.addTechnologyData(this.data)
        .subscribe(
        results => {
          if ((<ResponseFromAPI>results).StatusCode === APIResult.Success) {
            this.toastr.success((<ResponseFromAPI>results).Message);
            this.OnCancel();
            this.data.Value = '';
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
      this._MyMasterDataService.deleteTechnologyData(DelData)
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
      alert('Deletion Process Is Cancelled Successfully.');
    }
  }

}



