import {Component} from '@angular/core';
import { ROUTER_DIRECTIVES, Router, OnActivate, RouteSegment} from '@angular/router';
import {
    AdvancedSearch,
    OtherDetails,
    Qualification,
    CandidateMaster,
    SalaryDetails,
    AllCandidateProfiles,
    CareerProfile,
    Skills } from '../../shared/model/advancedSearchInfo';
import { AdvanceSearchService } from '../services/advanceSearch.service';
import { MastersService } from '../../../shared/services/masters.service';
import * as  _ from 'lodash';
import { CollapseDirective, TOOLTIP_DIRECTIVES} from 'ng2-bootstrap';
import { MasterData, GrdOptions,} from  '../../../shared/model/index';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { ProfileBankService} from  '../../shared/services/profileBank.service';
import { Http } from '@angular/http';
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
    candidateGrdOperations: GrdOptions = new GrdOptions();
    AdvanceSearchList: AllCandidateProfiles = new AllCandidateProfiles();
    CandidateSkillsDetails: Skills = new Skills();
    CandidateOtherDetails: OtherDetails = new OtherDetails();
    CandidateCareerDetails: CareerProfile = new CareerProfile();
    CandidateSalaryDetails: SalaryDetails = new SalaryDetails();
    CandidateMasterDetails: CandidateMaster = new CandidateMaster();
    CandidateQualification: Qualification = new Qualification();
    skills: MasterData[];
    Cities: MasterData[];
    Componies: MasterData[];
    errorMessage: string = '';
    visaTypes = ['H1', 'L1'];
    CurrentType = [{ id: 'Yes', value: 'Current Employer' },
        { id: 'No', value: 'Previous Employer' },
        { id: 'Both', value: 'Current / Previous Employer' }];
    NORECORDSFOUND: boolean = false;
    RECORDSFOUND: boolean = false;
    constructor(private _advanceSearchService: AdvanceSearchService,
        private http: Http,
        private _router: Router,
        private _profileBankService: ProfileBankService,
        public toastr: ToastsManager,
        private _masterService: MastersService) {
        this.candidateAdvancedSearch = new AdvancedSearch();
        this.candidateAdvancedSearch.CandidateOtherDetails.Visa = 'H1';
        this.candidateAdvancedSearch.CandidateCareerDetails.IsCurrent = 'Yes';
        //For pagination
        this.candidateGrdOperations.CamlString = '';
        this.candidateGrdOperations.NextPageID = 0;
        this.candidateGrdOperations.PreviousPageID = 0;
        this.candidateGrdOperations.PagingEvent = '';
        this.candidateGrdOperations.NextButton = false;
        this.candidateGrdOperations.PreviousButton = false;
    }

    routerOnActivate(segment: RouteSegment) {
        $('#cmbSkills').select2();
        $('#cmbLocation').select2();
        $('#cmbComponies').select2();
        this.getSkills();
        this.getCities();
        this.getComponies();
    }
    getSkills(): void {
        this._masterService.getSkills()
            .subscribe(
            results => {
                this.skills = results;
            },
            error => this.errorMessage = <any>error);
    }
    getCities(): void {
        this._masterService.getCities()
            .subscribe(
            results => {
                this.Cities = results;
            },
            error => this.errorMessage = <any>error);
    }
    getComponies(): void {
        this._masterService.getComponies()
            .subscribe(
            results => {
                this.Componies = results;
            },
            error => this.errorMessage = <any>error);
    }
    onAdvancedSearch(): void {
        this.candidateAdvancedSearch.CandidateSkillsDetails.Skills = undefined;
        this.candidateAdvancedSearch.CandidateMasterDetails.CurrentLocation = undefined;
        this.candidateAdvancedSearch.CandidateCareerDetails.Company = undefined;
        let Skillcmb: any = $('#cmbSkills');
        let SkillValue = Skillcmb.val();
        let Locationcmb: any = $('#cmbLocation');
        let LoationValue = Locationcmb.val();
        let Componycmb: any = $('#cmbComponies');
        let ComponyValue = Componycmb.val();
        if (SkillValue !== null) {
            for (var index = 0; index < SkillValue.length; index++) {
                if (this.candidateAdvancedSearch.CandidateSkillsDetails.Skills !== undefined) {
                    this.candidateAdvancedSearch.CandidateSkillsDetails.Skills = this.candidateAdvancedSearch.CandidateSkillsDetails.Skills
                    + ',' + SkillValue[index];
                }
                if (this.candidateAdvancedSearch.CandidateSkillsDetails.Skills === undefined)
                    this.candidateAdvancedSearch.CandidateSkillsDetails.Skills = SkillValue[index];
            }
        }
        if (LoationValue !== null) {
            for (var index = 0; index < LoationValue.length; index++) {
                if (this.candidateAdvancedSearch.CandidateMasterDetails.CurrentLocation !== undefined) {
                    this.candidateAdvancedSearch.CandidateMasterDetails.CurrentLocation = this.candidateAdvancedSearch.CandidateMasterDetails.CurrentLocation
                    + ',' + LoationValue[index];
                }
                if (this.candidateAdvancedSearch.CandidateMasterDetails.CurrentLocation === undefined)
                    this.candidateAdvancedSearch.CandidateMasterDetails.CurrentLocation = LoationValue[index];
            }
        }
        if (ComponyValue !== null) {
            for (var index = 0; index < ComponyValue.length; index++) {
                if (this.candidateAdvancedSearch.CandidateCareerDetails.Company !== undefined) {
                    this.candidateAdvancedSearch.CandidateCareerDetails.Company = this.candidateAdvancedSearch.CandidateCareerDetails.Company
                    + ',' + ComponyValue[index];
                }
                if (this.candidateAdvancedSearch.CandidateCareerDetails.Company === undefined)
                    this.candidateAdvancedSearch.CandidateCareerDetails.Company = ComponyValue[index];
            }
        }
        this._advanceSearchService.getAdvancedSearchInSidebar(this.candidateAdvancedSearch, this.candidateGrdOperations)
            .subscribe(
            (results: any) => {
                if (results.Profiles !== null && results.Profiles !== undefined && results.Profiles.length > 0) {
                    this.AdvanceSearchList = <any>results;
                    this.RECORDSFOUND = true;
                    this.NORECORDSFOUND = false;
                }else {
                    this.NORECORDSFOUND = true;
                    this.RECORDSFOUND = true;
                }

            },
            error => this.errorMessage = <any>error);
    }
    onSelectVisa(visa: string) {
        this.candidateAdvancedSearch.CandidateOtherDetails.Visa = visa;
    }
    onSelectCurrentCompony(current: string) {
        this.candidateAdvancedSearch.CandidateCareerDetails.IsCurrent = current;
    }
    onSelectSkills(skills: string) {
        this.candidateAdvancedSearch.CandidateSkillsDetails.Skills = skills;
    }
}


