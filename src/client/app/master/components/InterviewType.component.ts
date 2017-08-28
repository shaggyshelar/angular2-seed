import { Component } from '@angular/core';
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



export class InterviewTypeComponent implements OnActivate {
    errorMessage: string;
    ShowTable: boolean =false;
    data: InterviewType = new InterviewType();
    typeData : Array<InterviewType> = new Array<InterviewType>();
    Action:string='Add';
    constructor(private _MyMasterDataService: MyMasterDataService,
        private toastr: ToastsManager,
        private _router: Router) {
    }

    routerOnActivate() {
        this.getInterviewTypeData();
        this.Action='Add';
    }
    /** GET Interview Type FOR THE INTERVIEWERS */
    getInterviewTypeData() {
        this._MyMasterDataService.getInterviewTypeData()
            .subscribe(
            (results: any) => {
                if (results !== null && results.length > 0) {
                    this.typeData = results;
                    if(this.typeData.length > 0){
                        this.ShowTable=true;
                    } else {
                        this.ShowTable=false;
                    }
                }
            },
            error => {
                this.errorMessage = <any>error;
                this.toastr.error(<any>error);
            });
    }
    OnCancel(){
        this.Action = 'Add';
        this.data=new InterviewType();
    }
    EditData(typedetails:any) {
       this.data=typedetails;
        this.Action = 'Update';
    }
    AddEditData() {
        if (this.Action === 'Add') {
            this.AddInterviewModeData();
        } else if (this.Action === 'Update') {
           this.EditInterviewModeData();
        }
    }
    EditInterviewModeData() {
        var checkData=this.data.Value.trim();
        if(checkData !== "") {
        this._MyMasterDataService.editInterviewTypeData(this.data)
            .subscribe(
            results => {
                if ((<ResponseFromAPI>results).StatusCode === APIResult.Success) {
                    this.toastr.success((<ResponseFromAPI>results).Message);
                    this.getInterviewTypeData();
                    this.data.Value='';
                    this.data.Sequence='';
                    this.Action='Add';
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
    AddInterviewModeData() {
        var checkData=this.data.Value.trim();
        if(checkData !== "") {
         this._MyMasterDataService.addInterviewTypeData(this.data)
            .subscribe(
            results => {
                if ((<ResponseFromAPI>results).StatusCode === APIResult.Success) {
                    this.toastr.success((<ResponseFromAPI>results).Message);
                    this.getInterviewTypeData();
                    this.data.Value='';
                    this.data.Sequence='';
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

    deleteData(skyDelData:any){
    var deleteData = confirm('Are you sure you want to delete it?');
    if (deleteData === true) {
       this._MyMasterDataService.deleteInterviewTypeData(skyDelData)
            .subscribe(
            results => {
                if ((<ResponseFromAPI>results).StatusCode === APIResult.Success) {
                    this.toastr.success((<ResponseFromAPI>results).Message);
                    this.getInterviewTypeData();
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



