import { Component } from '@angular/core';
import { OnActivate, ROUTER_DIRECTIVES, Router } from '@angular/router';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { TOOLTIP_DIRECTIVES } from 'ng2-bootstrap';
import { MyMasterDataService } from '../services/masterData.service';

@Component({
    moduleId: module.id,
    selector: 'reasons-master',
    templateUrl: 'reasonsMaster.component.html',
    directives: [ROUTER_DIRECTIVES, TOOLTIP_DIRECTIVES]
})



export class ReasonsMasterComponent implements OnActivate {
    errorMessage: string;
    reasonsData: {};
    constructor(private _MyMasterDataService: MyMasterDataService,
        private toastr: ToastsManager,
        private _router: Router) {
    }

    routerOnActivate() {
        this.getReasonsData();
    }
    /** GET REASONS DETAILS FOR "IEF REJECT" AND "RRF CLOSE" */
    getReasonsData() {
        this._MyMasterDataService.getResonsData()
            .subscribe(
            (results: any) => {
                if (results !== null && results.length > 0) {
                    this.reasonsData = results;
                }
            },
            error => {
                this.errorMessage = <any>error;
                this.toastr.error(<any>error);
            });
    }
     /** Cancel action to reset fields */
    OnCancel() {
        this.reasonsData = null;
    }
}



