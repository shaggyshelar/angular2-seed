import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { CandidateProfile, MailDetails} from '../../shared/model/myProfilesInfo';
import { MasterData, Resume } from  '../../../shared/model/index';
import { ProfileBankService } from '../../shared/services/profileBank.service';
import { TOOLTIP_DIRECTIVES} from 'ng2-bootstrap';
import { RRFDashboardService } from '../../../RRF/RRFDashboard/services/rrfDashboard.service';
import { CommonService } from '../../../shared/index';
@Component({
    moduleId: module.id,
    selector: 'detail-profile',
    templateUrl: 'detailProfile.component.html',
    directives: [TOOLTIP_DIRECTIVES],
    styleUrls: ['../../myProfiles/components/myProfiles.component.css'],
    providers: [ToastsManager, ProfileBankService, RRFDashboardService]
})
export class DetailProfileComponent implements OnInit {
    profile: CandidateProfile;
    binaryResume: Resume;
    emailDetails: any;
    viewDetailsRRFId: MasterData = new MasterData();
    errorMessage: string;
    showPop:any;
    SourceDate:string;
    //Get profiles data
    @Input() selectedProfile: CandidateProfile;
    @Input() rrfID: string;
    @Input() CandidateRecruitmentMailDetails: MailDetails;
    @Output() updatedProfile: EventEmitter<CandidateProfile> = new EventEmitter<CandidateProfile>();
    CurrentUser: MasterData = new MasterData();
    loginflag: boolean = false;
    public technicalSkills : string = '';
    public tSkills : string = '';
    constructor(
        private toastr: ToastsManager,
        private _commonService: CommonService,
        private _router: Router,
        private _profileBankService: ProfileBankService,
        private _rrfDashboardService: RRFDashboardService) {
        this.loginflag = this.getLoggedInUser();
    }
    ngOnInit() {
        this.profile = this.selectedProfile;
        if(this.profile.CandidateSkills.TechnicalSkills.length > 0){
            this.profile.CandidateSkills.TechnicalSkills.forEach(data=>{
                this.tSkills = this.tSkills + ','+data.Value;
            })
        }
        this.technicalSkills =this.tSkills? this.tSkills.substring(1) : this.tSkills;
        this.profile.ModifiedOn = moment(this.profile.ModifiedOn).format('MMMM D, YYYY h:mm a');
        this.profile.CandidateOtherDetails.SourceDate = moment(this.profile.CandidateOtherDetails.SourceDate).format('D-MMM-YYYY');
        if (this.profile) {
            this.profile.CandidateMailDetails = this.profile ? this.CandidateRecruitmentMailDetails : new MailDetails();
        }
    }
    onViewCandidateClick(rrfID: MasterData, status:string) {
        sessionStorage.setItem('backToRRFDashboardList',sessionStorage.getItem('backToProfile'));
        sessionStorage.setItem('StatusValue', status);
        this._router.navigate(['/App/RRF/RRFDashboard/Candidates/' + rrfID.Value + 'ID' + rrfID.Id]);
    }
    showPopOver(Comments: string, index: string) {
        let rowId: any = 'round' + index;
        let row: any = $('#' + rowId);
        row.popover({
          container:"body",
            placement: 'top',
            toggle: 'popover',
            title: 'Skills',
            html: true,
            trigger: 'hover',
            content: Comments?Comments:'No data found'
        });
    }

    /**Get resume by candidate code */
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
    /** Redirect user to view profiles page. */
    viewProfiles(CandidateID: MasterData) {
        this._router.navigate(['/App/ProfileBank/MyProfiles/View/' + CandidateID.Value + 'ID' + CandidateID.Id]);
    }
    /** Download crate file form binary and download in given fyle type */
    Download(binaryResume: string, ResumeName: string) {
        var link = document.createElement('a');
        link.download = ResumeName;
        link.href = 'data:application/octet-stream;charset=utf-8;base64,' + binaryResume;
        link.click();
    }
    checkOwner(owner: string, isRRFAssigned: any) {
        if (isRRFAssigned && owner !== null) {
            if (this.loginflag) {
                if (owner.toLowerCase() === this.CurrentUser.Value.toLowerCase()) {
                    return true;
                } else {
                    return false;
                }
            } else {
                return false;
            }
        }else {
            return false;
        }


    }
    getLoggedInUser(): boolean {
        this.CurrentUser = this._commonService.getLoggedInUser();
        return this.CurrentUser ? true : false;
    }
}
