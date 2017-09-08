import { Component } from '@angular/core';
import { OnActivate, ROUTER_DIRECTIVES, Router } from '@angular/router';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { TOOLTIP_DIRECTIVES } from 'ng2-bootstrap';
import { InterviewType, IEFFunctions, MyMasterDataService} from '../index';
import { ResponseFromAPI} from '../../shared/model/index';
import { APIResult } from '../../shared/constantValue/index';
@Component({
  moduleId: module.id,
  selector: 'IEFFunctionMaster-master',
  templateUrl: 'IEFFunctionMaster.component.html',
  directives: [ROUTER_DIRECTIVES, TOOLTIP_DIRECTIVES]
})



export class IEFFunctionMasterComponent implements OnActivate {
  errorMessage: string;
  ShowTable: boolean = false;
  iefData: Array<IEFFunctions> = new Array<IEFFunctions>();
  data: IEFFunctions = new IEFFunctions();
  typeData: Array<InterviewType> = new Array<InterviewType>();
  // editData:SkypeMaster = new SkypeMaster();
  Action: string = 'Add';
  constructor(private _MyMasterDataService: MyMasterDataService,
    private toastr: ToastsManager,
    private _router: Router) {
  }

  routerOnActivate() {
    this.getIEFData();
    this.getInterviewTypeData();
    this.Action = 'Add';
    this.data.InterviewType.Id = '-1';
  }
  /** GET SKYPE CREDENTIALS FOR THE INTERVIEWERS */
  getIEFData() {
    this._MyMasterDataService.getIEFData()
      .subscribe(
      (results: any) => {
        if (results !== null && results.length > 0) {
          this.iefData = results;
          if (this.iefData.length > 0) {
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

  getInterviewTypeData() {
    this._MyMasterDataService.getInterviewTypeData()
      .subscribe(
      (results: any) => {
        if (results !== null && results.length > 0) {
          this.typeData = results;
        }
      },
      error => {
        this.errorMessage = <any>error;
        this.toastr.error(<any>error);
      });
  }
  OnCancel() {
    this.Action = 'Add';
    this.data = new IEFFunctions();
    this.data.DisplayRatings = 'false';
    this.getIEFData();
    // this.data.InterviewType.Id='-1';
  }
  EditData(iefdata: any) {
    this.data = iefdata;
    this.Action = 'Update';
  }
  AddEditData() {
    if (this.Action === 'Add') {
      this.AddIEFData();
    } else if (this.Action === 'Update') {
      this.EditIEFData();
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
  EditIEFData() {
    var checkData = this.data.FunctionName.trim();
    if (this.data.InterviewType.Id !== '-1' && checkData !== "") {
      this.data.FunctionName=this.UpperCasefunction(checkData);
      this._MyMasterDataService.editIEFData(this.data)
        .subscribe(
        results => {
          if ((<ResponseFromAPI>results).StatusCode === APIResult.Success) {
            this.toastr.success((<ResponseFromAPI>results).Message);
            this.getIEFData();
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
      this.toastr.error('Please Fill Proper Data.');
    }

  }
  AddIEFData() {
    var checkData = this.data.FunctionName.trim();
    if (this.data.InterviewType.Id !== '-1' && checkData !== "") {
      this.data.FunctionName=this.UpperCasefunction(checkData);
      this._MyMasterDataService.addIEFData(this.data)
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
      this.toastr.error('Please Fill Proper Data.');
    }
  }

  deleteData(skyDelData: any) {
    var deleteData = confirm('Are you sure you want to delete it?');
    if (deleteData === true) {
      this._MyMasterDataService.deleteIEFData(skyDelData)
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
      alert('Deletion Process Is Cancelled.');
    }
  }

}



