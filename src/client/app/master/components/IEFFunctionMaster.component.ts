import { Component } from '@angular/core';
import { OnActivate, ROUTER_DIRECTIVES, Router } from '@angular/router';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { TOOLTIP_DIRECTIVES } from 'ng2-bootstrap';
import { IEFFunctions, MyMasterDataService} from '../index';
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
    iefData: Array<IEFFunctions> = new Array<IEFFunctions>();
    data:IEFFunctions = new IEFFunctions();
    // editData:SkypeMaster = new SkypeMaster();
    Action:string='Add';
    constructor(private _MyMasterDataService: MyMasterDataService,
        private toastr: ToastsManager,
        private _router: Router) {
    }

    routerOnActivate() {
        this.getSkypeData();
        this.Action='Add';
    }
    /** GET SKYPE CREDENTIALS FOR THE INTERVIEWERS */
    getSkypeData() {
        this._MyMasterDataService.getIEFData()
            .subscribe(
            (results: any) => {
                if (results !== null && results.length > 0) {
                    this.iefData = results;
                }
            },
            error => {
                this.errorMessage = <any>error;
                this.toastr.error(<any>error);
            });
    }
    OnCancel(){
        this.Action = 'Add';
    }
    EditData(skydata:any) {
       this.data=skydata;
        this.Action = 'Update';
    }
    AddEditData() {
        if (this.Action === 'Add') {
         //   this.AddSkypeData();
        } else if (this.Action === 'Update') {
         //  this.EditSkypeData();
        }
    }
    // EditSkypeData(){
    //     this._MyMasterDataService.editSkypeData(this.data)
    //         .subscribe(
    //         results => {
    //             if ((<ResponseFromAPI>results).StatusCode === APIResult.Success) {
    //                 this.toastr.success((<ResponseFromAPI>results).Message);
    //                 this.getSkypeData();
    //                 this.data.Value='';
    //                 this.data.Password='';
    //                 this.Action='Add';
    //                 /**Bind new data to list */
    //             } else {
    //                 this.toastr.error((<ResponseFromAPI>results).Message);
    //             }
    //         },
    //         error => {
    //             this.errorMessage = <any>error;
    //             this.toastr.error(<any>error);
    //         });
    // }
    // AddSkypeData(){
    //      this._MyMasterDataService.addSkypeData(this.data)
    //         .subscribe(
    //         results => {
    //             if ((<ResponseFromAPI>results).StatusCode === APIResult.Success) {
    //                 this.toastr.success((<ResponseFromAPI>results).Message);
    //                 this.getSkypeData();
    //                 this.data.Value='';
    //                 this.data.Password='';
    //                 /**Bind new data to list */
    //             } else {
    //                 this.toastr.error((<ResponseFromAPI>results).Message);
    //             }
    //         },
    //         error => {
    //             this.errorMessage = <any>error;
    //             this.toastr.error(<any>error);
    //         });
    // }

    deleteData(skyDelData:any){
        
    var deleteData = confirm("Are you sure you want to delete it?");
    if (deleteData == true) {
       this._MyMasterDataService.deleteSkypeData(skyDelData)
            .subscribe(
            results => {
                if ((<ResponseFromAPI>results).StatusCode === APIResult.Success) {
                    this.toastr.success((<ResponseFromAPI>results).Message);
                    this.getSkypeData();
                    alert('Successfully Deleted Skype Id.');
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
        alert('Delete Skype Id Process Cancelled.');
    }
        
    }

}



