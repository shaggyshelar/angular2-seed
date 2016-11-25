import {Component} from '@angular/core';
import { ROUTER_DIRECTIVES, Router, OnActivate, RouteSegment} from '@angular/router';
import { AdvancedSearch, OtherDetails,Qualification,CandidateMaster, SalaryDetails,AllCandidateProfiles, CareerProfile, Skills } from '../../shared/model/advancedSearchInfo';
import { AdvanceSearchService } from '../services/advanceSearch.service';
import { MastersService } from '../../../shared/services/masters.service';
import * as  _ from 'lodash';
import { CollapseDirective, TOOLTIP_DIRECTIVES} from 'ng2-bootstrap';
import { MasterData, SortingMasterData, GrdOptions, ResponseFromAPI } from  '../../../shared/model/index';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { APIResult } from  '../../../shared/constantValue/index';
import { ProfileBankService} from  '../../shared/services/profileBank.service';
//import {MyProfilesFilterPipe} from './myProfiles.component.pipe';
import { Headers, Http } from '@angular/http';
import { Candidate } from '../../shared/model/RRF';
import { ProfileBankPipe }from '../../shared/filter/profileBank.pipe';
import {IfAuthorizeDirective} from '../../../shared/directives/ifAuthorize.directive';
import { DetailProfileComponent } from '../../shared/component/detailProfile.component';

@Component({
    moduleId: module.id,
    selector: 'rrf-myprofiles-list',
    templateUrl: 'advanceSearchInSidebar.component.html',
    directives: [DetailProfileComponent, ROUTER_DIRECTIVES, CollapseDirective, TOOLTIP_DIRECTIVES, IfAuthorizeDirective],
    styleUrls: ['../../myProfiles/components/myProfiles.component.css'],
    pipes: [ProfileBankPipe],
    providers: [AdvanceSearchService, ProfileBankService, MastersService, ToastsManager]
})

export class AdvanceSearchInSidebarComponent implements OnActivate {
    candidateAdvancedSearch: AdvancedSearch;
    AdvanceSearchList: AllCandidateProfiles = new AllCandidateProfiles();
    CandidateSkillsDetails: Skills = new Skills();
    CandidateOtherDetails: OtherDetails = new OtherDetails();
    CandidateCareerDetails: CareerProfile = new CareerProfile ();
    CandidateSalaryDetails: SalaryDetails = new SalaryDetails();
    CandidateMasterDetails: CandidateMaster = new CandidateMaster();
    CandidateQualification: Qualification = new Qualification();
    skills: MasterData[];
    district: MasterData[];
    errorMessage: string = '';
    constructor(private _advanceSearchService: AdvanceSearchService,
        private http: Http,
        private _router: Router,
        private _profileBankService: ProfileBankService,
        public toastr: ToastsManager,
        private _masterService: MastersService) {
    this.candidateAdvancedSearch= new AdvancedSearch();
    }

    routerOnActivate(segment: RouteSegment) {
        $('#cmbSkills').select2();
        $('#cmbLocation').select2();
        this.getSkills();
        this.getDistrict();
    }
    getSkills(): void {
        this._masterService.getSkills()
            .subscribe(
            results => {
                this.skills = results;
            },
            error => this.errorMessage = <any>error);
    }
    getDistrict(): void {
        //To Do: Update fuction name getDistricts
        this._masterService.getSkills()
            .subscribe(
            results => {
                this.district = results;
            },
            error => this.errorMessage = <any>error);
    }
    onAdvancedSearch(): void {
        this._advanceSearchService.getAdvancedSearchInSidebar(this.candidateAdvancedSearch)
            .subscribe(
            results => {
                //this.AdvanceSearchList = results;
            },
            error => this.errorMessage = <any>error);
    }
}


