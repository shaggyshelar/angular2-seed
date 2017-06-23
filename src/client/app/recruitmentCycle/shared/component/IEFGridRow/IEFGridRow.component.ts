import { Component, Input, AfterViewInit } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';
import { IEFFunction } from '../../model/ief';
import { MasterData} from '../../../../shared/model/common.model';
import {CandidateIEFService} from '../../services/Candidate.IEF.service';

@Component({
    moduleId: module.id,
    selector: 'IEFGridRow',
    templateUrl: 'IEFGridRow.component.html',
    directives: [ROUTER_DIRECTIVES],
    providers: [CandidateIEFService]
})

export class IEFGridRowComponent implements AfterViewInit {
    @Input() InterviewID: MasterData = new MasterData();
    @Input() StaticIEFDetails: Array<IEFFunction> = new Array<IEFFunction>();
    IEFDetails: IEFFunction[] = [];
    IEFValue:IEFFunction[] = [];
    errorMessage: string = '';

    constructor(private _candidateIEFService: CandidateIEFService) {
        //

    }
    ngAfterViewInit() {
        this.getIEFByInterviewID();
    }

    getIEFByInterviewID() {
        this._candidateIEFService.getIEFByInterviewID(this.InterviewID)
            .subscribe(
            (results: any) => {
                this.IEFDetails = results.IEFTransactions;
                this.IEFValue=results.GeneralComments;
            },
            error => {
                this.errorMessage = <any>error;
            });
    }
}
