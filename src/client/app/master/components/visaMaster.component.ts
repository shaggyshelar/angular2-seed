import { Component } from '@angular/core';
import { OnActivate, ROUTER_DIRECTIVES, Router } from '@angular/router';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { TOOLTIP_DIRECTIVES } from 'ng2-bootstrap';
import { MyMasterDataService } from '../services/masterData.service';

@Component({
    moduleId: module.id,
    selector: 'visa-master',
    templateUrl: 'visaMaster.component.html',
    directives: [ROUTER_DIRECTIVES, TOOLTIP_DIRECTIVES]
})



export class VisaMasterComponent implements OnActivate {
    errorMessage: string;
    visaDetails: {};
    constructor(private _MyMasterDataService: MyMasterDataService,
        private toastr: ToastsManager,
        private _router: Router) {
    }

    routerOnActivate() {
        this.getVisaDetails();
    }
    /** GET VISA DETAILS FOR THE CANDIDATE PROFILES */
    getVisaDetails() {
        this._MyMasterDataService.getVisaDetails()
            .subscribe(
            (results: any) => {
                if (results !== null && results.length > 0) {
                    this.visaDetails = results;
                }
            },
            error => {
                this.errorMessage = <any>error;
                this.toastr.error(<any>error);
            });
    }
    /** Cancel action to reset fields */
    OnCancel() {
        this.visaDetails = null;
    }
}



