import { Component } from '@angular/core';
import { OnActivate, ROUTER_DIRECTIVES, Router } from '@angular/router';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { TOOLTIP_DIRECTIVES } from 'ng2-bootstrap';
import { CountryMaster, MyMasterDataService} from '../index';
import { ResponseFromAPI} from '../../shared/model/index';
import { APIResult } from '../../shared/constantValue/index';
@Component({
  moduleId: module.id,
  selector: 'country-master',
  templateUrl: 'countryMaster.component.html',
  directives: [ROUTER_DIRECTIVES, TOOLTIP_DIRECTIVES]
})



export class CountryMasterComponent implements OnActivate {
  errorMessage: string;
  ShowTable: boolean = false;
  data: CountryMaster = new CountryMaster();
  countryData: Array<CountryMaster> = new Array<CountryMaster>();
  Action: string = 'Add';
  constructor(private _MyMasterDataService: MyMasterDataService,
    private toastr: ToastsManager,
    private _router: Router) {
  }

  routerOnActivate() {
    this.getCountryData();
    this.Action = 'Add';
  }
  /** GET Country Master FOR THE INTERVIEWERS */
  getCountryData() {
    this._MyMasterDataService.getCountryData()
      .subscribe(
      (results: any) => {
        if (results !== null && results.length > 0) {
          this.countryData = results;
          if (this.countryData.length > 0) {
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
    this.getCountryData();
    this.data = new CountryMaster();
  }
  EditData(modedetails: any) {
    this.data = modedetails;
    this.Action = 'Update';
  }
  AddEditData() {
    if (this.Action === 'Add') {
      this.AddCountryData();
    } else if (this.Action === 'Update') {
      this.EditCountryData();
    }
  }
  EditCountryData() {
    var checkData = this.data.Value.trim();
    this.data.Value=this.UpperCasefunction(checkData);
    if (checkData !== "") {
      this._MyMasterDataService.editCountryData(this.data)
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
  AddCountryData() {
    var checkData = this.data.Value.trim();
    this.data.Value=this.UpperCasefunction(checkData);
    if (checkData !== '') {
      this._MyMasterDataService.addCountryData(this.data)
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

  deleteData(DelData: any) {

    var deleteData = confirm('Are you sure you want to delete it?');
    if (deleteData === true) {
      this._MyMasterDataService.deleteCountryData(DelData)
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



