import { Component } from '@angular/core';
import { OnActivate, ROUTER_DIRECTIVES, Router } from '@angular/router';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { TOOLTIP_DIRECTIVES } from 'ng2-bootstrap';
import { CityMaster, MyMasterDataService,State,CountryMaster,City} from '../index';
import { ResponseFromAPI} from '../../shared/model/index';
import { APIResult } from '../../shared/constantValue/index';
@Component({
  moduleId: module.id,
  selector: 'city-master',
  templateUrl: 'cityMaster.component.html',
  directives: [ROUTER_DIRECTIVES, TOOLTIP_DIRECTIVES]
})



export class CityMasterComponent implements OnActivate {
  errorMessage: string;
  ShowTable: boolean = false;
  CountryId:number;
  StateId:number;
  SelectedStateId:number;
  addCitydata: CityMaster = new CityMaster();
  data: City = new City();
  selectedState:State=new State();
  stateData: Array<State> = new Array<State>();
  cityData: Array<CityMaster> = new Array<CityMaster>();
  countryData: Array<CountryMaster> = new Array<CountryMaster>();
  Action: string = 'Add';
  constructor(private _MyMasterDataService: MyMasterDataService,
    private toastr: ToastsManager,
    private _router: Router) {
  }

  routerOnActivate() {
    this.getCountryData();
    //this.getCityData();
    this.Action = 'Add';
  }
  /** GET Interview Mode FOR THE INTERVIEWERS */
  getCountryData() {
    this._MyMasterDataService.getCountryData()
      .subscribe(
      (results: any) => {
        if (results !== null && results.length > 0) {
          this.countryData = results;
          this.getStatebyCountryId(parseInt(this.countryData[0].Id));
          //this.getCountrybyId(parseInt(this.countryData[0].Id));
        }
      },
      error => {
        this.errorMessage = <any>error;
        this.toastr.error(<any>error);
      });
  }
  // getCityData() {
  //   this._MyMasterDataService.getCityData()
  //     .subscribe(
  //     (results: any) => {
  //       if (results !== null && results.length > 0) {
  //         this.cityData = results;
  //         if (this.cityData.length > 0) {
  //           this.ShowTable = true;
  //         } else {
  //           this.ShowTable = false;
  //         }
  //       }
  //     },
  //     error => {
  //       this.errorMessage = <any>error;
  //       this.toastr.error(<any>error);
  //     });
  // }
  setSelectedCountry(ModeId: any) {
    this.CountryId = ModeId;
    this.getStatebyCountryId(this.CountryId);
  }
  setSelectedState(StateId: any) {
    this.StateId = StateId;
    this.getStatebyId(this.StateId);
    this.getCitybyStateId(this.StateId);
  }
  getStatebyId(state:any){
     this._MyMasterDataService.getStateById(state)
      .subscribe(
      (results: any) => {
         if (results !== null && results.length > 0) {
          this.selectedState = results[0].State;
          // if (this.cityData.length > 0) {
          //     this.ShowTable = true;
          //  } else {
          //    this.ShowTable = false;
          //  }
        }
     },
      error => {
        this.errorMessage = <any>error;
        this.toastr.error(<any>error);
      });
  }
  getCitybyStateId(stateId:number) {
     this._MyMasterDataService.getCitybyStateId(stateId)
      .subscribe(
      (results: any) => {
        //  if (results !== null && results.length > 0) {
          this.cityData = results;
          if (this.cityData.length > 0) {
              this.ShowTable = true;
           } else {
             this.ShowTable = false;
           }
       // }
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
         if (results !== null && results.length > 0) {
          this.stateData = results;
          this.getStatebyId(parseInt(this.stateData[0].Id));
          this.getCitybyStateId(parseInt(this.stateData[0].Id));
        }
     },
      error => {
        this.errorMessage = <any>error;
        this.toastr.error(<any>error);
      });
  }
  OnCancel() {
    this.Action = 'Add';
    this.SelectedStateId=parseInt(this.selectedState.Id);
    this.getCitybyStateId(this.SelectedStateId);
    this.data = new City();
  }
  EditData(modedetails: any) {
    this.data = modedetails.City;
    this.Action = 'Update';
  }
  AddEditData() {
    if (this.Action === 'Add') {
      this.AddCityData();
    } else if (this.Action === 'Update') {
      this.EditCityData();
    }
  }
  EditCityData() {
    this.addCitydata.State =this.selectedState;
    this.StateId=parseInt(this.selectedState.Id);
    this.addCitydata.City=this.data;
    var checkData = this.data.Value.trim();
    this.addCitydata.City.Value=this.UpperCasefunction(checkData);
    if (checkData !== "") {
      this._MyMasterDataService.editCityData(this.addCitydata)
        .subscribe(
        results => {
          if ((<ResponseFromAPI>results).StatusCode === APIResult.Success) {
            this.toastr.success((<ResponseFromAPI>results).Message);
            this.getCitybyStateId(this.StateId);
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
  AddCityData() {
    this.addCitydata.State =this.selectedState;
    this.StateId=parseInt(this.selectedState.Id);
    this.addCitydata.City=this.data;
    var checkData = this.data.Value.trim();
    this.addCitydata.City.Value=this.UpperCasefunction(checkData);
    if (checkData !== '') {
      this._MyMasterDataService.addCityData(this.addCitydata)
        .subscribe(
        results => {
          if ((<ResponseFromAPI>results).StatusCode === APIResult.Success) {
            this.toastr.success((<ResponseFromAPI>results).Message);
            this.getCitybyStateId(this.StateId);
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
    this.StateId=parseInt(this.selectedState.Id);
    var deleteData = confirm('Are you sure you want to delete it?');
    if (deleteData === true) {
      this._MyMasterDataService.deleteCityData(DelData)
        .subscribe(
        results => {
          if ((<ResponseFromAPI>results).StatusCode === APIResult.Success) {
            this.toastr.success((<ResponseFromAPI>results).Message);
            this.getCitybyStateId(this.StateId);
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



