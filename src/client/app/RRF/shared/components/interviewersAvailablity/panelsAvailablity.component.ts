import { Component, Input, Output, EventEmitter, OnInit, OnChanges } from '@angular/core';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { RRFDetails} from '../../../myRRF/models/rrfDetails';
import { MasterData } from  '../../../../shared/model/index';
import { PanelsAvailabilityService} from '../../services/panelsAvailability.service';
import { PanelAvailability} from '../../model/panelAvailability.model';
import { ResponseFromAPI  } from '../../../../shared/model/common.model';
import { APIResult } from  '../../../../shared/constantValue/index';

@Component({
    moduleId: module.id,
    selector: 'panel-availablity',
    templateUrl: 'panelsAvailablity.component.html',
    providers: [ToastsManager, PanelsAvailabilityService]
})
export class PanelsAvailablityComponent implements OnInit, OnChanges {
    rrfDetails: RRFDetails;
    errorMessage: any;
    _strr: Array<string> = new Array<string>();
    _availability: Array<PanelAvailability> = new Array<PanelAvailability>();
     ShowErrormsg: boolean = false;
    //Get profiles data

    //Now it will show Interviewers availablity irrespective of RRF 
    //@Input() selectedRRF: RRFDetails;

    @Output() updatedRRF: EventEmitter<RRFDetails> = new EventEmitter<RRFDetails>();
    constructor(private toastr: ToastsManager,
        private _panelsAvailability: PanelsAvailabilityService) {

    }
    ngOnInit() {
        /** */
        //this.rrfDetails = this.selectedRRF;
        this.getPanelAvailablity();
        // for (var index = 0; index < 4; index++) {
        //     this._strr.push(index.toString());
        // }
    }
    getPanelAvailablity() {
        /**Get interviewr's data from service */

        this._panelsAvailability.getAvailabilityForRRF()
            .subscribe(
            (results: any) => {
                if(results.length == 0){
                    this.ShowErrormsg=true;
                }
                else{
                     this.ShowErrormsg=false;
                this._availability = results;        
                }
               
            },
            error => this.errorMessage = <any>error);
    }
    sendrequest(interviewer: MasterData) {
        this._panelsAvailability.sendRequest(interviewer)
            .subscribe(
            (results: any) => {
                //this._availability = results;
                 if (+ (<ResponseFromAPI>results).StatusCode === APIResult.Success) {
                    this.toastr.success((<ResponseFromAPI>results).Message);
                } else {
                    this.toastr.error((<ResponseFromAPI>results).Message);
                }

            },
            error => this.errorMessage = <any>error);
        /** */
    }
    //Format date in "yyyy-mm-dd" format
    formatDate(date: any) {
        var d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();
        if (month.length < 2) month = '0' + month;
        if (day.length < 2) day = '0' + day;

        return [day, month, year].join('-');
    }
    ngOnChanges(changes: any) {
        //
    }
}
