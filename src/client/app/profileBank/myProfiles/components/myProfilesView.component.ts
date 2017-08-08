import {Component} from '@angular/core';
import { ROUTER_DIRECTIVES, RouteSegment, Router, OnActivate} from '@angular/router';
import { CandidateProfile, EmploymentHistory,CandidateCompanyObject } from '../../shared/model/myProfilesInfo';
import { ProfileBankService} from  '../../shared/services/profileBank.service';
import { MasterData, Resume } from  '../../../shared/model/index';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { TOOLTIP_DIRECTIVES } from 'ng2-bootstrap';
import { CommonService } from '../../../shared/index';
@Component({
    moduleId: module.id,
    selector: 'rrf-blacklistedprofiles-view',
    templateUrl: '../../shared/views/profileBankView.component.html',

    directives: [ROUTER_DIRECTIVES, TOOLTIP_DIRECTIVES],
    styleUrls: ['../../allProfiles/components/allProfilesView.component.css']
})

export class MyProfilesViewComponent implements OnActivate {
    entries:CandidateCompanyObject=new CandidateCompanyObject();
    CurrentUser: MasterData = new MasterData();
    params: string;
    CandidateID: MasterData = new MasterData();
    EmployersInformationList: Array<EmploymentHistory> = new Array<EmploymentHistory>();
    profile: CandidateProfile;
    errorMessage: string;
    returnPath: string;
    TITLE: string = 'Profiles';
    count: number = 0;
    binaryResume: Resume;
    CurrentCompony: string;
    Designation: string;
    TimeSpent: string;
    regDaysShow: boolean = false;
    regDaysShowNeg: boolean =false;
    ResumeText: string = 'Show Resume';
    IsResumeShow: boolean = false;
    ShowResume: boolean = false;
    showDownloadBtn :boolean=false;
    Resume: string;
    ShowEditButton:boolean=true;
    public technicalSkills : string = '';
    public softSkills : string = '';
    public languageSkills : string = '';
    public tSkills : string = '';
    public sSkills : string = '';
    public lSkills : string = '';
    constructor(private _profileBankService: ProfileBankService,
        private _router: Router,
        public toastr: ToastsManager,
        private _commonService: CommonService) {
        this.profile = new CandidateProfile();
    }
    routerOnActivate(segment: RouteSegment) {
        this.params = segment.getParam('id');
        this.CandidateID.Id = parseInt(this.params.split('ID')[1]);
        this.CandidateID.Value = this.params.split('ID')[0];
        this.returnPath = this.getSessionOf<string>('onProfilesReturnPath', false);
        this.CurrentUser = this._commonService.getLoggedInUser();
        this.getCandidateProfile();
        this.GetEmployersInformationList(this.CandidateID);
        this.GetInHandOffer(this.CandidateID.Value);
    }
    /**Get Candidate Profiles */
    getCandidateProfile() {
        this._profileBankService.getCandidateProfile(this.CandidateID.Value)
            .subscribe(
            (results: any) => {
                this.profile = results;
                if (results.CandidateCareerProfile.length > 0) {
                    for (var index = 0; index < results.CandidateCareerProfile.length; index++) {
                        if (results.CandidateCareerProfile[index].IsCurrentCompany === true) {
                            this.CurrentCompony = results.CandidateCareerProfile[index].Company;
                            this.Designation = results.CandidateCareerProfile[index].DesignationRole;
                            this.TimeSpent = results.CandidateCareerProfile[index].TimeSpentInCompany;
                        }
                    }
                }
                if(this.profile.CandidateSkills.TechnicalSkills.length > 0){
                    this.profile.CandidateSkills.TechnicalSkills.forEach(data=>{
                        this.tSkills = this.tSkills + ',' + data.Value;
                    })
                }
                if(this.profile.CandidateSkills.SoftSkills.length > 0){
                    this.profile.CandidateSkills.SoftSkills.forEach(data=>{
                        this.sSkills = this.sSkills + ',' + data.Value;
                    })
                }
                if(this.profile.CandidateSkills.LanguageSkills.length > 0){
                    this.profile.CandidateSkills.LanguageSkills.forEach(data=>{
                        this.lSkills = this.lSkills + ',' + data.Value;
                    })
                }
                 if(this.profile.ResumeId !== ""){
                   this.showDownloadBtn=true;
                }
                else{
                     this.showDownloadBtn=false;
                }
                 if(this.profile.CandidateOtherDetails.CanJoinIn < 0){
                    var string=this.profile.CandidateOtherDetails.CanJoinIn;
                    var abc=string.replace(/\-/g,'');
                    this.profile.CandidateOtherDetails.CanJoinIn=abc;
                    this.regDaysShowNeg=true;
                }
                else{
                     this.regDaysShow=true;
                }
                this.technicalSkills =this.tSkills? this.tSkills.substring(1) : this.tSkills;
                this.softSkills = this.sSkills? this.sSkills.substring(1) : this.sSkills;
                this.languageSkills=this.lSkills? this.lSkills.substring(1) : this.lSkills;
                this.count = results.CandidateQualification.length;
                this.convertCheckboxesValues();
                 this.profile.CandidateOtherDetails.SourceDate = moment(this.profile.CandidateOtherDetails.SourceDate).format('D-MMM-YYYY');
                 this.profile.ModifiedOn = moment(this.profile.ModifiedOn).format('D-MMM-YYYY');
                this.getEditProfileAccess(this.profile.Owner);    
        },
            error => this.errorMessage = <any>error);
    }
    /**Get data from session */
    getSessionOf<T>(variableName: string, isJson: Boolean): T {
        var _requestedIef = sessionStorage.getItem(variableName);
        if (_requestedIef !== null) {
            var response = isJson ? JSON.parse(_requestedIef) : _requestedIef;
            sessionStorage.setItem(variableName, '');
        } else {
            /** If no information found from Session then it will redirected to existing page */
            console.info('Following variable name is empty form session - ' + variableName);
        }
        return response;
    }
    convertCheckboxesValues() {
        if (this.profile.IsCurrentSameAsPermanent === true) {
            this.profile.IsCurrentSameAsPermanent = 'Yes';
        } else {
            this.profile.IsCurrentSameAsPermanent = 'No';
        }

        if (this.profile.ReadyToRelocate === true) {
            this.profile.ReadyToRelocate = 'Yes';
        } else {
            this.profile.ReadyToRelocate = 'No';
        }

        if (this.profile.OutstationedCandidate === true) {
            this.profile.OutstationedCandidate = 'Yes';
        } else {
            this.profile.OutstationedCandidate = 'No';
        }

        if (this.profile.CandidateTeamManagement.TeamMgmt === true) {
            this.profile.CandidateTeamManagement.TeamMgmt = 'Yes';
        } else {
            this.profile.CandidateTeamManagement.TeamMgmt = 'No';
        }

        if (this.profile.CandidateOtherDetails.AppliedEarlier === true) {
            this.profile.CandidateOtherDetails.AppliedEarlier = 'Yes';
        } else {
            this.profile.CandidateOtherDetails.AppliedEarlier = 'No';
        }

        if (this.profile.CandidateOtherDetails.OfferInHand === true) {
            this.profile.CandidateOtherDetails.OfferInHand = 'Yes';
        } else {
            this.profile.CandidateOtherDetails.OfferInHand = 'No';
        }

        if (this.profile.CandidateSalaryDetails.CTCIncludeVariable === true) {
            this.profile.CandidateSalaryDetails.CTCIncludeVariable = 'Yes';
        } else {
            this.profile.CandidateSalaryDetails.CTCIncludeVariable = 'No';
        }
    }
    Back() {
        if (this.returnPath) {
            this._router.navigate([this.returnPath]);
        } else {
            this._router.navigate(['/App/ProfileBank/MyProfiles']);
        }
    }
    getCandidateHistory(_candidateID: MasterData) {
        sessionStorage.setItem('HistoryOfCandidate', JSON.stringify(_candidateID));
        sessionStorage.setItem('onReturnPath', '/App/ProfileBank/MyProfiles');
        this._router.navigate(['/App/ProfileBank/MyProfiles/History']);
    }
    getResume(candidateID: MasterData) {
        this._profileBankService.getResume(candidateID)
            .subscribe(
            results => {
                this.binaryResume = <any>results;
                if (this.binaryResume) {
                    this.Download(this.binaryResume.BinaryResume, this.binaryResume.ResumeName);
                } else { alert('Resume not available!'); }
            },
            error => this.errorMessage = <any>error);
    }
       /** Download crate file form binary and download in given fyle type */
    Download(binaryResume: string, ResumeName: string) {
        var link = document.createElement('a');
        link.download = ResumeName;
        link.href = 'data:application/octet-stream;charset=utf-8;base64,' + binaryResume;
        link.click();
    }
     GetInHandOffer(candidateIdValue : string) {
        this._profileBankService.getInHandOffer(candidateIdValue)
            .subscribe(
            results => {
                this.entries = <any>results;
            },
            error => {
                this.errorMessage = <any>error;
                this.toastr.error(<any>error);
            });

    }
    showResume() {
        if (this.ResumeText === 'Show Resume') {
            this.ResumeText = 'Hide Resume';
            this.IsResumeShow = true;
            this.getCandidateResume();
        } else {
            this.ResumeText = 'Show Resume';
            this.IsResumeShow = false;
        }
    }
    /** Get Candidate Resume */
    getCandidateResume() {
        this._profileBankService.getResumeInHtml(this.CandidateID)
            .subscribe(
            (results: any) => {
                if (results !== undefined) {
                    this.Resume = results;
                    if(this.Resume === 'File is not in docx format. Cannot read content') {
                        this.ShowResume = true;
                    } else {
                        this.ShowResume = false;
                    }
                } else {
                    this.ShowResume = true;
                }
            },
            error => this.errorMessage = <any>error);
    }
     getEditProfileAccess(owner:MasterData){
        if(owner.Id === this.CurrentUser.Id){
            this.ShowEditButton = true;
        }
        else{
            this.ShowEditButton = false;
        }
    }
    onEditClick(candidateValue:any,candidateID:any){
        this._router.navigate(['/App/ProfileBank/MyProfiles/Edit/'+ candidateValue +'ID'+ candidateID]);
    }
      GetEmployersInformationList(_candidateID: MasterData) {
        this._profileBankService.getCandidateEmploymentHistory(_candidateID)
            .subscribe(
            results => {
                this.EmployersInformationList = <any>results;
            },
            error => {
                this.errorMessage = <any>error;
                this.toastr.error(<any>error);
            });

    }
}
