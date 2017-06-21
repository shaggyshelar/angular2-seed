import {Component} from '@angular/core';
import { ROUTER_DIRECTIVES, Router, OnActivate} from '@angular/router';
import {AssignRRFDetails} from '../model/RRF';
import {AssignRRFService} from '../services/assignRRF.service';
import { APIResult } from  '../../../shared/constantValue/index';
import { ResponseFromAPI, MasterData } from  '../../../shared/model/index';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { RRFDetails } from  '../../../RRF/myRRF/index';
import * as  _ from 'lodash';
import { CandidateProfile } from '../../shared/model/myProfilesInfo';
@Component({
    moduleId: module.id,
    selector: 'profiles-assignrrf',
    templateUrl: 'assignRRF.component.html',
    directives: [ROUTER_DIRECTIVES],
    providers: [AssignRRFService, ToastsManager],
    styleUrls: ['../../myProfiles/components/myProfiles.component.css']
})

export class ProfileBankAssignRRFComponent implements OnActivate {
    CandidateIDs: Array<MasterData> = new Array<MasterData>();
    returnPath: string;
    returnPathToSchedule: string;
    Title: string;
    errorMessage: string;
    isRRFSelected: boolean = false;
    CandidateAssigment: AssignRRFDetails;
    RRFList: Array<RRFDetails>;
    selectedRRF: RRFDetails;
    profile: CandidateProfile;

    constructor(private _router: Router,
        private toastr: ToastsManager,
        private _assignRRFService: AssignRRFService) {
        this.CandidateAssigment = new AssignRRFDetails();
        this.RRFList = new Array<RRFDetails>();
        this.selectedRRF = new RRFDetails();
    }

    routerOnActivate() {
        this.returnPath = sessionStorage.getItem('returnPath');
        this.returnPathToSchedule = sessionStorage.getItem('returnPathToSchedule');
        if (this.returnPathToSchedule.includes('MyProfiles')) {
            this.Title = 'My Profiles';
        } else {
            this.Title = 'Company Profiles';
        }
        this.getCandidateIDs();
        this.getMyOpenAssignedRRF();
    }

    getCandidateIDs() {
        this.CandidateAssigment.Candidates = JSON.parse(sessionStorage.getItem('Candidates'));
        this.CandidateAssigment.CandidateIDs = new Array<MasterData>();
        for (var index = 0; index < this.CandidateAssigment.Candidates.length; index++) {
            this.CandidateAssigment.CandidateIDs.push(this.CandidateAssigment.Candidates[index].CandidateID);
        }
    }

    getMyOpenAssignedRRF() {
        this._assignRRFService.getMyOpenRRF()
            .subscribe(
            (results: any) => {
                this.RRFList = results;
            },
            error => {
                this.errorMessage = <any>error;
                this.toastr.error(<any>error);
            });
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
    Back() {
        sessionStorage.removeItem('CandidateIDs');
        if (this.returnPathToSchedule.toLowerCase().includes('schedule')) {
            sessionStorage.setItem('RRFID', JSON.stringify(this.selectedRRF.RRFID));
            sessionStorage.setItem('Candidate', JSON.stringify(this.CandidateAssigment.Candidates[0]));
        }
        if (this.returnPathToSchedule !== undefined)
            this._router.navigate([this.returnPathToSchedule]);
    }

    onSelectRRF(RRFID: string) {
        for (var index = 0; index < this.RRFList.length; index++) {
            if (this.RRFList[index].RRFID.Id === parseInt(RRFID)) {
                this.selectedRRF = this.RRFList[index];
            }
        }
        this.isRRFSelected = true;
    }

    onDelete(candidate: any) {
        var chkItemIndex = _.findIndex(this.CandidateAssigment.CandidateIDs, candidate.CandidateID);
        this.CandidateAssigment.CandidateIDs.splice(chkItemIndex, 1);

        chkItemIndex = _.findIndex(this.CandidateAssigment.Candidates, candidate);
        this.CandidateAssigment.Candidates.splice(chkItemIndex, 1);
    }
    nextToSchedule() {

        sessionStorage.removeItem('CandidateIDs');
        if (this.returnPathToSchedule.toLowerCase().includes('schedule')) {
            sessionStorage.setItem('RRFID', JSON.stringify(this.selectedRRF.RRFID));
            sessionStorage.setItem('Candidate', JSON.stringify(this.CandidateAssigment.Candidates[0]));
            sessionStorage.setItem('returnPath', 'App/ProfileBank/MyProfiles');
        }
        if (this.returnPathToSchedule !== undefined) {
            this._router.navigate([this.returnPathToSchedule]);
        } else {
            this._router.navigate([this.returnPath]);
        }
    }
    onAssignRRF() {
        if (this.selectedRRF.RRFID.Id !== undefined) {
            sessionStorage.removeItem('CandidateIDs');
            this.CandidateAssigment.RRFID = this.selectedRRF.RRFID;
            if (this.CandidateAssigment.Candidates.length > 0) {
                this._assignRRFService.assignRRFToCandidates(this.CandidateAssigment)
                    .subscribe(
                    results => {
                        if ((<ResponseFromAPI>results).StatusCode === APIResult.Success) {
                            this.toastr.success((<ResponseFromAPI>results).Message);
                            this.nextToSchedule();
                        } else {
                            this.toastr.error((<ResponseFromAPI>results).Message);
                        }
                    },
                    error => {
                        this.errorMessage = <any>error;
                        this.toastr.error(<any>error);
                    });
            } else {
                this.toastr.error('No Candidates Selected');
            }
        } else {
            this.toastr.error('Please Select RRF');
        }

    }
}
