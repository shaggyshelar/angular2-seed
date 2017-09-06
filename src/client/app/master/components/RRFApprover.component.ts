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
    ShowTable:boolean=false;
    errorMessage: string;
    approverName:string;
    approverID: string;
    practiceName:string;
    selectDeptText: boolean = false;
    rrfApproverData: Array<RRFApprover> = new Array<RRFApprover>();
    data:RRFApprover = new RRFApprover();
    practiceData : Array<Practice> = new Array<Practice>();
    practiceOtherData : Array<Practice> = new Array<Practice>();
    approverData : Array<Approver> = new Array<Approver>();
    Action:string='Add';
    constructor(private _MyMasterDataService: MyMasterDataService,
        private toastr: ToastsManager,
        private _router: Router) {
    }

    routerOnActivate() {
        this.getRRFAprroverData();
        this.getApproverData();
        this.Action='Add';
        this.data.Department.Id='-1';
        this.selectDeptText=false;
        $('#cmbInterviewer').select2();
        this.practiceOtherData = [{ Id:'0', Value: 'Other', Isenable: false}];
    }
    /** GET RRf Approvers FOR THE INTERVIEWERS */
    getRRFAprroverData() {
        this._MyMasterDataService.getRRFAprroverData()
            .subscribe(
            (results: any) => {
                if (results !== null && results.length > 0) {
                    this.rrfApproverData = results;
                    if(this.rrfApproverData.length > 0){
                        this.ShowTable=true;
                    } else {
                        this.ShowTable=false;
                    }
                    this.getPracticeData();
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
                    this.practiceData.forEach((data, idx) => {
                    var idFound = this.rrfApproverData.find(rrfdept => rrfdept.Department.Id === data.Id);
                    if(idFound !== undefined){
                        data.Isenable=true;
                    } else {
                        data.Isenable=false;
                    }
				  });
                  console.log(this.practiceData);
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
        this.data=new RRFApprover();
        this.selectDeptText = false;
        $('#cmbInterviewer').select2('val', '-1');
        this.getRRFAprroverData();
    }
    EditData(rrfapprodata:any) {
        this.data=rrfapprodata;
        var approverId: string[] = new Array();
        approverId.push((rrfapprodata.Approver.Id).toString());
        $('#cmbInterviewer').select2('val', approverId);
        this.Action = 'Update';
        if(this.data.Department.Id.toString() === '0'){
            this.data.Department.Id='0';
            this.selectDeptText = true;
        } else {
            this.selectDeptText = false;
        }
    }
     setSelectedDept(ModeId: string) {
        // if (ModeId === '0') {
        if (ModeId === '1: 0') {
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
        if(this.data.Department.Id !== '-1'){
            let approver:any = $('#cmbInterviewer');
            if (approver.val() !== null) {
                this.approverID = approver.val();
            }
            for (var i = 0; i < this.approverData.length; i++) {
                if (parseInt(this.approverData[i].Id) === parseInt(this.approverID)) {
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
            this.data.Approver.Id = this.approverID;
            this.data.Approver.Value=this.approverName;
            this.data.Department.Value=this.practiceName;
            this._MyMasterDataService.editRRFAprroverData(this.data)
            .subscribe(
            results => {
                if ((<ResponseFromAPI>results).StatusCode === APIResult.Success) {
                    this.toastr.success((<ResponseFromAPI>results).Message);
                    this.getRRFAprroverData();
                    this.data.Department.Id='-1';
                    this.data.DepartmentText=' ';
                    this.selectDeptText = false;
                    $('#cmbInterviewer').select2('val', '-1');
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
            this.toastr.error('Please Select Valid Department.');
        }
    }
    addRRFAprroverData(){
        if(this.data.Department.Id !== '-1')
        {
            let approver:any = $('#cmbInterviewer');
            if (approver.val() !== null) {
                this.approverID = approver.val();
            }
            for (var i = 0; i < this.approverData.length; i++) {
                if (parseInt(this.approverData[i].Id) === parseInt(this.approverID)) {
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
            this.data.Approver.Id = this.approverID;
            this.data.Approver.Value=this.approverName;
            this.data.Department.Value=this.practiceName;
            this._MyMasterDataService.addRRFAprroverData(this.data)
            .subscribe(
            results => {
                if ((<ResponseFromAPI>results).StatusCode === APIResult.Success) {
                    this.toastr.success((<ResponseFromAPI>results).Message);
                    this.getRRFAprroverData();
                    this.data.Department.Id='-1';
                    this.data.DepartmentText=' ';
                    this.selectDeptText = false;
                    $('#cmbInterviewer').select2('val', '-1');
                } else {
                    this.toastr.error((<ResponseFromAPI>results).Message);
                }
            },
            error => {
                this.errorMessage = <any>error;
                this.toastr.error(<any>error);
            });
        } else{
            this.toastr.error('Please Select Valid Department');
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
                    this.getRRFAprroverData();this.OnCancel();
                    //alert('Successfully Deleted.');
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



