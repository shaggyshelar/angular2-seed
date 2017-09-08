import { Component,AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { OnActivate, ROUTER_DIRECTIVES, Router } from '@angular/router';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { TOOLTIP_DIRECTIVES } from 'ng2-bootstrap';
import {   InterviewType, MyMasterDataService} from '../index';
import { ResponseFromAPI} from '../../shared/model/index';
import { APIResult } from '../../shared/constantValue/index';
@Component({
  moduleId: module.id,
  selector: 'skype-master',
  templateUrl: 'InterviewType.component.html',
  directives: [ROUTER_DIRECTIVES, TOOLTIP_DIRECTIVES]
})



export class InterviewTypeComponent implements OnActivate, AfterViewInit {
  errorMessage: string;
  ShowTable: boolean = false;
  idFound: boolean = false;
  data: InterviewType = new InterviewType();
  typeData: Array<InterviewType> = new Array<InterviewType>();
   checkDetails: Array<InterviewType> = new Array<InterviewType>();
  Action: string = 'Add';
  constructor(private _MyMasterDataService: MyMasterDataService,
    private toastr: ToastsManager,
    private _router: Router) {
  }
  @ViewChild('focus') firstNameElement: ElementRef;
    ngAfterViewInit() {
        this.firstNameElement.nativeElement.focus();
    }
  routerOnActivate() {
    this.getInterviewTypeData();
    this.Action = 'Add';
  }
  /** GET Interview Type FOR THE INTERVIEWERS */
  getInterviewTypeData() {
    this._MyMasterDataService.getInterviewTypeData()
      .subscribe(
      (results: any) => {
        if (results !== null && results.length > 0) {
          this.typeData = results;
          this.checkDetails = results;
          if (this.typeData.length > 0) {
            this.typeData.sort(function(a:any, b:any){return a.Sequence-b.Sequence;});
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
    this.data = new InterviewType();
    this.getInterviewTypeData();
    this.ngAfterViewInit();
  }
  EditData(typedetails: any) {
    this.data = typedetails;
    this.Action = 'Update';
  }
  AddEditData() {
    if (this.Action === 'Add') {
      this.AddInterviewModeData();
    } else if (this.Action === 'Update') {
      this.EditInterviewModeData();
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
  EditInterviewModeData() {
// for(var i=0;i<this.checkDetails.length;i++) {
//       if(this.checkDetails[i].Value===this.data.Value) {
//         this.idFound=true;
//       }
//     }
//     if(this.idFound === false) {
    var checkData = this.data.Value.trim();
    if (checkData !== "") {
      this.data.Value=this.UpperCasefunction(checkData);
      this._MyMasterDataService.editInterviewTypeData(this.data)
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
    // } else {
    //   this.toastr.error('Value Already Exists.');
    // }
  }
  AddInterviewModeData() {
    // for(var i=0;i<this.typeData1.length;i++) {
    //   if(parseInt(this.typeData1[i].Sequence)=== parseInt(this.data.Sequence)) {
    //     this.idFound=true;
    //   }
    // }
    // if(this.idFound === false) {
      var checkData = this.data.Value.trim();
      if (checkData !== "") {
        this.data.Value=this.UpperCasefunction(checkData);
        this._MyMasterDataService.addInterviewTypeData(this.data)
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
    // } else {
    //   this.toastr.error('Sequence No Already Exists.');
    // }
  }

  deleteData(skyDelData: any) {
    var deleteData = confirm('Are you sure you want to delete it?');
    if (deleteData === true) {
      this._MyMasterDataService.deleteInterviewTypeData(skyDelData)
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



