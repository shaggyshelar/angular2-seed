import { Component } from '@angular/core';
import { OnActivate, ROUTER_DIRECTIVES, Router } from '@angular/router';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { TOOLTIP_DIRECTIVES } from 'ng2-bootstrap';
import {   InterviewMode, MyMasterDataService} from '../index';
import { ResponseFromAPI} from '../../shared/model/index';
import { APIResult } from '../../shared/constantValue/index';
@Component({
    moduleId: module.id,
    selector: 'skype-master',
    templateUrl: 'InterviewMode.component.html',
    directives: [ROUTER_DIRECTIVES, TOOLTIP_DIRECTIVES]
})



export class InterviewModeComponent implements OnActivate {
    errorMessage: string;
    ShowTable:boolean =false;
    data: InterviewMode = new InterviewMode();
    modeData : Array<InterviewMode> = new Array<InterviewMode>();
    Action:string='Add';
    constructor(private _MyMasterDataService: MyMasterDataService,
        private toastr: ToastsManager,
        private _router: Router) {
    }

    routerOnActivate() {
        this.getInterviewModeData();
        this.Action='Add';
    }
    /** GET Interview Mode FOR THE INTERVIEWERS */
    getInterviewModeData() {
        this._MyMasterDataService.getInterviewModeData()
            .subscribe(
            (results: any) => {
                if (results !== null && results.length > 0) {
                    this.modeData = results;
                    if(this.modeData.length > 0){
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
        this.data=new InterviewMode();
    }
    EditData(modedetails:any) {
       this.data=modedetails;
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
        this._MyMasterDataService.editInterviewModeData(this.data)
            .subscribe(
            results => {
                if ((<ResponseFromAPI>results).StatusCode === APIResult.Success) {
                    this.toastr.success((<ResponseFromAPI>results).Message);
                    this.getInterviewModeData();
                    this.data.Value='';
                    this.Action='Add';
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
    AddInterviewModeData() {
        var checkData=this.data.Value.trim();
        if(checkData !== "") {
         this._MyMasterDataService.addInterviewModeData(this.data)
            .subscribe(
            results => {
                if ((<ResponseFromAPI>results).StatusCode === APIResult.Success) {
                    this.toastr.success((<ResponseFromAPI>results).Message);
                    this.getInterviewModeData();
                    this.data.Value='';
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

    deleteData(skyDelData:any){
        
    var deleteData = confirm('Are you sure you want to delete it?');
    if (deleteData == true) {
       this._MyMasterDataService.deleteInterviewModeData(skyDelData)
            .subscribe(
            results => {
                if ((<ResponseFromAPI>results).StatusCode === APIResult.Success) {
                    this.toastr.success((<ResponseFromAPI>results).Message);
                    this.getInterviewModeData();
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



