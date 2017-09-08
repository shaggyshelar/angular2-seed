import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { OnActivate, ROUTER_DIRECTIVES, Router } from '@angular/router';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { TOOLTIP_DIRECTIVES } from 'ng2-bootstrap';
import { CountryMaster, StateMaster, MyMasterDataService,State} from '../index';
import { ResponseFromAPI} from '../../shared/model/index';
import { APIResult } from '../../shared/constantValue/index';
@Component({
  moduleId: module.id,
  selector: 'statemaster-master',
  templateUrl: 'StateMaster.component.html',
  directives: [ROUTER_DIRECTIVES, TOOLTIP_DIRECTIVES]
})



export class StateMasterComponent implements OnActivate, AfterViewInit {
  errorMessage: string;
  ShowTable: boolean = false;
  CountryId:number;
  stateData: Array<StateMaster> = new Array<StateMaster>();
  data: State = new State();
  addStateData: StateMaster = new StateMaster();
  countryData: Array<CountryMaster> = new Array<CountryMaster>();
  selectedCountry:CountryMaster =new CountryMaster();
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
    this.getCountryData();
    this.Action = 'Add';
  }
  /** GET SKYPE CREDENTIALS FOR THE INTERVIEWERS */
 setSelectedCountry(ModeId: any) {
    this.CountryId = ModeId;
    this.getStatebyCountryId(this.CountryId);
    this.getCountrybyId(this.CountryId);
  }
  /** GET Country details by ID FOR THE CANDIDATE PROFILES */
  getCountrybyId(roleId: number) {
    this._MyMasterDataService.getCountrybyId(roleId)
      .subscribe(
      (results: any) => {
        if (results !== null && results.length > 0) {
        this.selectedCountry = results[0];
        }
      },
      error => {
        this.errorMessage = <any>error;
        this.toastr.error(<any>error);
      });
  }
  getCountryData() {
    this._MyMasterDataService.getCountryData()
      .subscribe(
      (results: any) => {
        if (results !== null && results.length > 0) {
          this.countryData = results;
          this.getStatebyCountryId(parseInt(this.countryData[0].Id));
          this.getCountrybyId(parseInt(this.countryData[0].Id));
        }
      },
      error => {
        this.errorMessage = <any>error;
        this.toastr.error(<any>error);
      });
  }
  getStatebyCountryId(contryId:number){
     this._MyMasterDataService.getStatebyCountryId(contryId)
      .subscribe(
      (results: any) => {
        // if (results !== null && results.length > 0) {
          this.stateData = results;
          if (this.stateData.length > 0) {
            this.ShowTable = true;
          } else {
            this.ShowTable = false;
          }
      //  }
     },
      error => {
        this.errorMessage = <any>error;
        this.toastr.error(<any>error);
      });
  }
  OnCancel() {
    this.Action = 'Add';
    this.getStatebyCountryId(parseInt(this.selectedCountry.Id));
    this.data = new State();
    this.ngAfterViewInit();
  }
  EditData(details: State) {
    this.data = details;
    this.Action = 'Update';
  }
  AddEditData() {
    if (this.Action === 'Add') {
      this.AddStateData();
    } else if (this.Action === 'Update') {
      this.EditStateData();
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
  EditStateData() {
    this.addStateData.Country=this.selectedCountry;
    this.addStateData.State=this.data;
    var checkData = this.addStateData.State.Value.trim();
    if (this.addStateData.Country.Id !== '-1' && checkData !== "") {
      this.addStateData.State.Value=this.UpperCasefunction(checkData);
      this._MyMasterDataService.editStateData(this.addStateData)
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
      this.toastr.error('Please Fill Proper Data.');
    }

  }
  AddStateData() {
    this.addStateData.Country=this.selectedCountry;
    this.addStateData.State=this.data;
    var checkData = this.addStateData.State.Value.trim();
    if (this.addStateData.Country.Id !== '-1' && checkData !== "") {
      this.addStateData.State.Value=this.UpperCasefunction(checkData);
      this._MyMasterDataService.addStateData(this.addStateData)
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
      this.toastr.error('Please Fill Proper Data.');
    }
  }

  deleteData(DelData: any) {
    var deleteData = confirm('Are you sure you want to delete it?');
    if (deleteData === true) {
      this._MyMasterDataService.deleteStateData(DelData)
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



