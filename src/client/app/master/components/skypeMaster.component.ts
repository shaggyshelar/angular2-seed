import { Component} from '@angular/core';
import {  OnActivate, Routes, ROUTER_DIRECTIVES,Router } from '@angular/router';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { TOOLTIP_DIRECTIVES } from 'ng2-bootstrap';
import { MyMasterDataService } from '../services/masterData.service';

@Component({
    moduleId: module.id,
    selector: 'skype-Master',
    templateUrl: 'skypeMaster.component.html',
    directives: [ROUTER_DIRECTIVES, TOOLTIP_DIRECTIVES]
})



export class SkypeMasterComponent implements OnActivate {
    errorMessage: string;
    skypeData:{};
    constructor(private _MyMasterDataService: MyMasterDataService,
        private toastr: ToastsManager,
        private _router: Router) {
  
    }
  
     routerOnActivate() {
         this.getSkypeData();
       
    }
getSkypeData(){
    this._MyMasterDataService.getSkypeData()
            .subscribe(
            (results: any) => {
                if (results !== null && results.length > 0) {
                    this.skypeData = results;

                } 
            },
            error => {
                this.errorMessage = <any>error;
                this.toastr.error(<any>error);
            });
}
   

}



