import { Component } from '@angular/core';
import { OnActivate, ROUTER_DIRECTIVES, Router } from '@angular/router';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { TOOLTIP_DIRECTIVES } from 'ng2-bootstrap';
import { Approver,RRFApprover,Practice,MyMasterDataService} from '../index';
import { ResponseFromAPI} from '../../shared/model/index';
import { APIResult } from '../../shared/constantValue/index';

@Component({
    moduleId: module.id,
    selector: 'RRFApprover-master',
    templateUrl: 'RRFApprover.component.html',
    directives: [ROUTER_DIRECTIVES, TOOLTIP_DIRECTIVES]
})



export class RRFApproverMasterComponent implements OnActivate {
    errorMessage: string;
    approverName:string;
    approverID: number;
    practiceName:string;
    selectDeptText: boolean = false;
    rrfApproverData: Array<RRFApprover> = new Array<RRFApprover>();
    data:RRFApprover = new RRFApprover();
    practiceData : Array<Practice> = new Array<Practice>();
    approverData : Array<Approver> = new Array<Approver>();
    // editData:SkypeMaster = new SkypeMaster();
    Action:string='Add';
    constructor(private _MyMasterDataService: MyMasterDataService,
        private toastr: ToastsManager,
        private _router: Router) {
    }

    routerOnActivate() {
        this.getRRFAprroverData();
        this.getPracticeData();
        this.getApproverData();
        this.Action='Add';
        this.data.Department.Id='-1';
        this.selectDeptText=false;
        $('#cmbInterviewer').select2();
    }
    /** GET SKYPE CREDENTIALS FOR THE INTERVIEWERS */
    getRRFAprroverData() {
        this._MyMasterDataService.getRRFAprroverData()
            .subscribe(
            (results: any) => {
                if (results !== null && results.length > 0) {
                    this.rrfApproverData = results;
                }
            },
            error => {
                this.errorMessage = <any>error;
                this.toastr.error(<any>error);
            });
    }
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
    getApproverData() {
        this._MyMasterDataService.getApproverData()
            .subscribe(
            (results: any) => {
                if (results !== null && results.length > 0) {
                    this.approverData = results;
                }
            },
            error => {
                this.errorMessage = <any>error;
                this.toastr.error(<any>error);
            });
    }

    OnCancel(){
        this.Action = 'Add';
        // this.data.InterviewType.Id='-1';
    }
    EditData(rrfapprodata:any) {
        this.data=rrfapprodata;
        var approverId: string[] = new Array();
       
            //approverId=rrfapprodata.Approver.Id.toString();
        // var panelId: string[] = new Array();
       // for (var index = 0; index < rrfapprodata.Approver.length; index++) {
            approverId.push((rrfapprodata.Approver.Id).toString());
      //  }
        $('#cmbInterviewer').select2('val', approverId);
        this.Action = 'Update';
        if(this.data.Department.Id.toString() === '0'){
            this.selectDeptText = true;
        } else {
            this.selectDeptText = false;
        }
    }
     setSelectedDept(ModeId: string) {
        if (ModeId === '0') {
            this.selectDeptText = true;
        } else {
            this.selectDeptText = false;
        }
    }
    AddEditData() {
        if (this.Action === 'Add') {
            this.addRRFAprroverData();
        } else if (this.Action === 'Update') {
            this.editRRFAprroverData();
        }
    }
    editRRFAprroverData(){
        if(this.data.Department.Id !== '-1' || this.data.Approver.Id !== '-1'){
            this._MyMasterDataService.editRRFAprroverData(this.data)
            .subscribe(
            results => {
                if ((<ResponseFromAPI>results).StatusCode === APIResult.Success) {
                    this.toastr.success((<ResponseFromAPI>results).Message);
                    this.getRRFAprroverData();
                    this.data.Approver.Value='';
                    this.data.Department.Id='-1';
                    this.Action = 'Add';
                } else {
                    this.toastr.error((<ResponseFromAPI>results).Message);
                }
            },
            error => {
                this.errorMessage = <any>error;
                this.toastr.error(<any>error);
            });
        } else
        {
            this.toastr.error('Please Select Valid Interview Type');
        }
    }
    addRRFAprroverData(){
        if(this.data.Department.Id !== '-1' || this.data.Approver.Id !== '-1')
        {
            let approver:any = $('#cmbInterviewer');
        if (approver.val() !== null) {
            this.approverID = approver.val();
        }
            for (var i = 0; i < this.approverData.length; i++) {
                if (+this.approverData[i].Id === this.approverID) {
                    this.approverName=this.approverData[i].Value;
                }
            }
            if(this.data.Department.Id === '0'){
                this.practiceName='';
            } else {
                for (var i = 0; i < this.practiceData.length; i++) {
                    if (+this.practiceData[i].Id === +this.data.Department.Id) {
                        this.practiceName=this.practiceData[i].Value;
                        this.data.DepartmentText=this.practiceName;
                    }
                }
            }
            this.data.Approver.Value=this.approverName;
            this.data.Department.Value=this.practiceName;
            this._MyMasterDataService.addRRFAprroverData(this.data)
            .subscribe(
            results => {
                if ((<ResponseFromAPI>results).StatusCode === APIResult.Success) {
                    this.toastr.success((<ResponseFromAPI>results).Message);
                    this.getRRFAprroverData();
                    this.data.Approver.Value='';
                    this.data.Department.Id='-1';
                } else {
                    this.toastr.error((<ResponseFromAPI>results).Message);
                }
            },
            error => {
                this.errorMessage = <any>error;
                this.toastr.error(<any>error);
            });
        } else{
            this.toastr.error('Please Select Valid Interview Type');
        }
    }

    deleteData(DelData:any){
    var deleteData = confirm('Are you sure you want to delete it?');
    if (deleteData === true) {
       this._MyMasterDataService.deleteRRFAprroverData(DelData)
            .subscribe(
            results => {
                if ((<ResponseFromAPI>results).StatusCode === APIResult.Success) {
                    this.toastr.success((<ResponseFromAPI>results).Message);
                    this.getRRFAprroverData();
                    alert('Successfully Deleted.');
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



