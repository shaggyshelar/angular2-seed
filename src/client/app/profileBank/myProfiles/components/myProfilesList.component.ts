import { Component } from '@angular/core';
import { ROUTER_DIRECTIVES, Router, OnActivate } from '@angular/router';
import {
    CandidateProfile,
    ResumeMeta,
    AddCandidateResponse,
    AllCandidateProfiles,
    CareerProfile,
    MailDetails
} from '../../shared/model/myProfilesInfo';
import { MyProfilesService } from '../services/myProfiles.service';
import { BlackListedProfilesService } from '../../blackListedProfiles/services/blacklistedProfiles.service';
import { AllProfilesService } from '../../allProfiles/services/allProfiles.service';
import { MastersService } from '../../../shared/services/masters.service';
import * as  _ from 'lodash';
import { CollapseDirective, TOOLTIP_DIRECTIVES } from 'ng2-bootstrap';
import { MasterData, SortingMasterData, GrdOptions, ResponseFromAPI } from '../../../shared/model/index';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { APIResult } from '../../../shared/constantValue/index';
import { ProfileBankService } from '../../shared/services/profileBank.service';
import { Headers, Http } from '@angular/http';
import { Candidate } from '../../shared/model/RRF';
import { ProfileBankPipe } from '../../shared/filter/profileBank.pipe';
import { IfAuthorizeDirective } from '../../../shared/directives/ifAuthorize.directive';
import { DetailProfileComponent } from '../../shared/component/detailProfile.component';
import { RRFDetails } from '../../../RRF/myRRF/index';
import { AssignRRFService } from '../../shared/services/assignRRF.service';
import { RRFCandidateListService } from '../../../RRF/RRFDashboard/services/RRFCandidatesList.service';
import { ViewRRFComponent } from '../../../RRF/shared/components/viewRRF/viewRRF.component';

@Component({
    moduleId: module.id,
    selector: 'rrf-myprofiles-list',
    templateUrl: 'myProfilesList.component.html',
    directives: [DetailProfileComponent, ROUTER_DIRECTIVES, CollapseDirective, TOOLTIP_DIRECTIVES, IfAuthorizeDirective, ViewRRFComponent],
    providers: [AssignRRFService, ToastsManager, RRFCandidateListService, BlackListedProfilesService, AllProfilesService],
    styleUrls: ['myProfiles.component.css'],
    pipes: [ProfileBankPipe]
})

export class MyProfilesListComponent implements OnActivate {
    CandidateID: MasterData = new MasterData();
    myProfilesList: AllCandidateProfiles = new AllCandidateProfiles();
    profile: CandidateProfile;
    existedProfile: CandidateProfile;
    isExist: boolean = false;
    errorMessage: string;
    status: number;
    psdTemplates: any;
    resumeFiles: any;
    statusList: Array<MasterData>;
    seletedCandidateID: MasterData = new MasterData();
    selectedStatus = new MasterData();
    Comments: string;
    currentStatus: number;
    currentCandidate: string;
    selectedRowCount: number = 0;
    allChecked: boolean = false;
    isCollapsed: boolean = false;
    isUpdateStatusCollapsed: boolean = false;
    IsSuccess: boolean = false;
    resumeMeta: ResumeMeta;
    fileUploaded: boolean = false;
    fileName: string;
    searchString: string;
    isCommentsPanelCollapsed: boolean = false;
    seletedCandidateIDForComments: MasterData = new MasterData();
    seletedCandidateIDForUpload: MasterData = new MasterData();
    highlightRow: string;
    public file: File;
    public url: string;
    headers: Headers;
    isUploadPanelCollapsed: boolean = false;
    resumeUploaded: boolean = false;
    resumeName: string;
    Candidate: Candidate;
    selectedCandidates: Array<Candidate>;
    NORECORDSFOUND: boolean = false;
    ColumnList: Array<SortingMasterData> = new Array<SortingMasterData>();
    CandidateName: string;
    /***variables for Upload photo */
    uploadedPhoto: any;
    photoUploaded: boolean = false;
    photoName: string;
    photoMeta: ResumeMeta;
    profilePhoto: string;
    /** For profile picture */
    profilePic: any;
    RRFList: Array<RRFDetails>;
    viewDetailsRRFId: string = '';
    rrfObj: MasterData = new MasterData();
    viewRRFDetails: MasterData = new MasterData();
    isViewRFF: Boolean = false;
    isViewRRFGrid: boolean = true;
    candidateMailDetails = new MailDetails();
    IsDisable: boolean = true;
    FilterByList: Array<SortingMasterData> = new Array<SortingMasterData>();
    modelFilterBy: string = 'my';
    modelFilterByProfile: string = 'all';
    cachedProfileList: any[] = [];
    constructor(private _myProfilesService: MyProfilesService,
        private _blacklistedProfilesService: BlackListedProfilesService,
        private _allProfilesService: AllProfilesService,
        private http: Http,
        private _router: Router,
        private _profileBankService: ProfileBankService,
        public toastr: ToastsManager,
        private _masterService: MastersService,
        private _assignRRFService: AssignRRFService,
        private _rrfCandidatesList: RRFCandidateListService) {
        this.psdTemplates = new Array<File>();
        this.resumeFiles = new Array<File>();
        this.profile = new CandidateProfile();
        this.profile.CandidateCareerProfile = new CareerProfile();
        this.resumeMeta = new ResumeMeta();
        this.selectedCandidates = new Array<Candidate>();
        this.Candidate = new Candidate();
        this.uploadedPhoto = new Array<File>();
        this.photoMeta = new ResumeMeta();
        this.RRFList = new Array<RRFDetails>();
    }

    routerOnActivate() {
        window.onbeforeunload = function () {
            return 'Data will be lost if you leave the page, are you sure?';
        };
        sessionStorage.setItem('backToProfile', '/App/ProfileBank/MyProfiles');
        this.getColumnsForSorting();
        this.initFilterBy();
        this.getMyOpenAssignedRRF();
        this.myProfilesList.GrdOperations = new GrdOptions();
         setTimeout(() => { this.getMyProfiles(); }, 300);
        this.getCandidateStatuses();
        this.getEmail('RMS.RRF.NEEDAPPROVAL');
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
    SaveCandidateID(id: MasterData) {
        this.seletedCandidateID = id;
        var index = _.findIndex(this.myProfilesList.Profiles, { CandidateID: this.seletedCandidateID });
        this.currentCandidate = this.myProfilesList.Profiles[index].Candidate;
        this._profileBankService.getStatusById(id.Value)
            .subscribe(
            (results: any) => {
                this.profile.Comments = results.Comments;
                this.profile.Status = results.Status;
            },
            error => this.toastr.error(<any>error));
        if (this.isCollapsed === false)
            this.isCollapsed = !this.isCollapsed;
        if (this.isCommentsPanelCollapsed === true)
            this.isCommentsPanelCollapsed = !this.isCommentsPanelCollapsed;
        if (this.isUploadPanelCollapsed === true)
            this.isUploadPanelCollapsed = !this.isUploadPanelCollapsed;
        if (this.isUpdateStatusCollapsed === true)
            this.isUpdateStatusCollapsed = !this.isUpdateStatusCollapsed;

        window.scrollTo(0, 40);
    }
    onUpdateStatusClick(id: MasterData) {
        this.seletedCandidateID = id;
        var index = _.findIndex(this.myProfilesList.Profiles, { CandidateID: this.seletedCandidateID });
        this.getUpdateStatus(this.seletedCandidateID.Value);
        this.currentCandidate = this.myProfilesList.Profiles[index].Candidate;
        this._profileBankService.getStatusById(id.Value)
            .subscribe(
            (results: any) => {
                this.profile.Comments = results.Comments;
                this.profile.Status = results.Status;
            },
            error => this.toastr.error(<any>error));
        if (this.isUpdateStatusCollapsed === false)
            this.isUpdateStatusCollapsed = !this.isUpdateStatusCollapsed;
        if (this.isCollapsed === true)
            this.isCollapsed = !this.isCollapsed;
        if (this.isCommentsPanelCollapsed === true)
            this.isCommentsPanelCollapsed = !this.isCommentsPanelCollapsed;
        if (this.isUploadPanelCollapsed === true)
            this.isUploadPanelCollapsed = !this.isUploadPanelCollapsed;

        window.scrollTo(0, 40);
    }

    initFilterBy() {
        this.FilterByList = [
            {
                Id: 'My Profiles',
                Value: 'my'
            }
            , {
                Id: 'All Profiles',
                Value: 'all'
            }
            , {
                Id: 'Incomplete Profiles',
                Value: 'incomplete'
            }
            , {
                Id: 'Black Listed Profiles',
                Value: 'blackList'
            }
        ];
    }
    // Get Updated status
    getUpdateStatus(candidateID: any) {
        this.statusList = Array<MasterData>();
        this._masterService.getUpdateStatus(candidateID)
            .subscribe(
            results => {
                this.statusList = <any>results;
            },
            error => this.errorMessage = <any>error);
    }
    /** Check is current information is already exist in database.*/
    IsExist() {
        this._myProfilesService.isExist(this.profile)
            .subscribe(
            (results: any) => {
                if (results.isExist) {
                    if (results.profileBankObjects !== null && results.profileBankObjects !== undefined) {
                        this.existedProfile = <any>results.profileBankObjects;
                        this.isExist = <any>results.isExist;
                        this.toastr.error('Profile already exist');
                    }
                } else {
                    this.isExist = false;
                }
            },
            error => this.toastr.error(<any>error));
    }
    focusIn() {
        this.IsDisable = true;
    }
    focusOut() {
        this.IsDisable = false;
    }
    getMyProfiles() {
        this._myProfilesService.getMyProfiles(this.myProfilesList.GrdOperations)
            .subscribe(
            (results: any) => {
                if (results.Profiles !== null && results.Profiles !== undefined && results.Profiles.length > 0) {
                    this.myProfilesList = <any>results;
                    this.cachedProfileList = <any>results.Profiles;
                    this.NORECORDSFOUND = false;
                    this.filterByProfile();
                } else { this.NORECORDSFOUND = true; }
            },
            error => this.errorMessage = <any>error);
    }
    getEmail(EmailCode: any) {
        this._profileBankService.getEmail(EmailCode)
            .subscribe(
            results => {
                this.candidateMailDetails = <any>results;
            },
            error => this.errorMessage = <any>error);
    }
    redirectToView(CandidateID: MasterData) {
        this._router.navigate(['/App/ProfileBank/MyProfiles/View/' + CandidateID.Value + 'ID' + CandidateID.Id]);
    }
    /**Takes confirmation from end User to delete profile */
    confirmDelete(ID: MasterData) {
        this.CandidateID = ID;
        let modl: any = $('#deleteProfile' + ID.Value);
        modl.modal('toggle');
    }
    /** OnRejection hide the confimation box and exit the delete process */
    onClearSelection(ID: MasterData) {
        let cnfrmBox: any = $('#deleteProfile' + ID.Value);
        cnfrmBox.modal('hide');
    }
    /** Delete Prfile will be available only to the Recruitment Head*/
    deleteCandidate(CandidateID: MasterData) {
        this._profileBankService.deleteProfile(CandidateID)
            .subscribe(
            (results: any) => {
                setTimeout(() => { this.getMyProfiles(); }, 1000);
                this.toastr.success((<ResponseFromAPI>results).Message);
            },
            error => this.toastr.error(<any>error));
        this.onClearSelection(this.CandidateID);
    }
    /**Redirecting to candidate's all interview history page */
    getCandidateHistory(_candidateID: MasterData) {
        sessionStorage.setItem('HistoryOfCandidate', JSON.stringify(_candidateID));
        sessionStorage.setItem('onReturnPath', '/App/ProfileBank/MyProfiles');
        this._router.navigate(['/App/ProfileBank/MyProfiles/History']);
    }

    /**Funtion to Quick Add candidate */
    OnSubmitCandidate(): void {
        var _candidateID: MasterData = null;
        /**Add condidate to profile bank */
        this._myProfilesService.addCandidateProfile(this.profile)
            .subscribe(
            results => {
                if ((<AddCandidateResponse>results).StatusCode === APIResult.Success) {
                    _candidateID = (<AddCandidateResponse>results).CandidateID;
                    /**upload resume of currently added canidate IFF AVAILABLE */
                    if (this.fileName !== '' || this.fileName !== undefined) {
                        this.uploadResume(_candidateID, this.psdTemplates[0]);
                    }
                    /**upload photo of currently added canidate IFF AVAILABLE */
                    if (this.photoName !== '' || this.photoName !== undefined) {
                        this.postProfilePhoto(_candidateID, this.uploadedPhoto[0]);
                    }
                    /**update Profile grid*/
                    this.toastr.success((<ResponseFromAPI>results).Message);
                    this.myProfilesList.GrdOperations = new GrdOptions();
                    setTimeout(() => { this.getMyProfiles(); }, 1000);
                    this.profile = new CandidateProfile();
                } else {
                    this.toastr.error((<ResponseFromAPI>results).ErrorMsg);
                }
            },
            error => { this.errorMessage = <any>error; this.toastr.error(this.errorMessage); });
    }

    uploadResume(CandidateLookupId: MasterData, File: any) {
        this.resumeMeta.CandidateID = CandidateLookupId;
        this.resumeMeta.Overwrite = false;
        this.resumeMeta.Profile = File;
        this._myProfilesService.upload(this.resumeMeta).then(
            results => {
                if ((<ResponseFromAPI>results).StatusCode === APIResult.Success) {
                    this.toastr.success((<ResponseFromAPI>results).Message);
                    this.fileUploaded = false;
                    this.fileName = '';
                    setTimeout(() => { this.getMyProfiles(); }, 1000);
                } else {
                    this.toastr.error((<ResponseFromAPI>results).Message);
                }
            },
            (error: any) => this.errorMessage = <any>error);
    }

    getCandidateStatuses() {
        this._masterService.getCandidateStatuses()
            .subscribe(
            results => {
                this.statusList = results;
            },
            error => this.errorMessage = <any>error);
    }

    onSelectStatus(statusId: string) {
        this.selectedStatus.Id = parseInt(statusId);
        this.selectedStatus.Value = null;
    }

    onUpdateStauts() {
        this._profileBankService.updateCandidateStatus(this.seletedCandidateID, this.selectedStatus, this.profile.Comments)
            .subscribe(
            results => {
                if ((<ResponseFromAPI>results).StatusCode === APIResult.Success) {
                    this.toastr.success((<ResponseFromAPI>results).Message);
                    this.isUpdateStatusCollapsed = false;
                    this.profile.Status = new MasterData();
                    this.myProfilesList.GrdOperations = new GrdOptions();
                    setTimeout(() => { this.getMyProfiles(); }, 1000);
                } else {
                    this.toastr.error((<ResponseFromAPI>results).ErrorMsg);
                }
                this.profile.Status = new MasterData();
            },
            error => this.errorMessage = <any>error);
        this.isCollapsed = false;
    }
    onBlackListProfile() {
        this._profileBankService.blackListCandidate(this.seletedCandidateID, this.profile.Comments)
            .subscribe(
            results => {
                if ((<ResponseFromAPI>results).StatusCode === APIResult.Success) {
                    this.toastr.success((<ResponseFromAPI>results).Message);
                    this.isUpdateStatusCollapsed = false;
                    this.profile.Status = new MasterData();
                    this.myProfilesList.GrdOperations = new GrdOptions();
                    setTimeout(() => { this.getMyProfiles(); }, 1000);
                } else {
                    this.toastr.error((<ResponseFromAPI>results).ErrorMsg);
                }
                this.profile.Status = new MasterData();
            },
            error => this.errorMessage = <any>error);
        this.isCollapsed = false;
    }

    onBlacklistedProfiles() {
        this._profileBankService.blackListCandidate(this.seletedCandidateID, this.profile.Comments)
            .subscribe(
            results => {
                if ((<ResponseFromAPI>results).StatusCode === APIResult.Success) {
                    this.toastr.success((<ResponseFromAPI>results).Message);
                    this.isUpdateStatusCollapsed = false;
                    this.profile.Status = new MasterData();
                    this.myProfilesList.GrdOperations = new GrdOptions();
                    setTimeout(() => { this.getMyProfiles(); }, 1000);
                } else {
                    this.toastr.error((<ResponseFromAPI>results).ErrorMsg);
                }
                this.profile.Status = new MasterData();
            },
            error => this.errorMessage = <any>error);
        this.isCollapsed = false;
    }

    closeUpdatePanel() {
        this.isCollapsed = false;
    }
    closeUpdateStatus() {
        this.isUpdateStatusCollapsed = false;
    }

    onStateChange(e: any): void {
        if (e.target.checked) {
            this.selectedRowCount++;
        } else {
            this.selectedRowCount--;
        }

        if (this.selectedRowCount === this.myProfilesList.Profiles.length) {
            this.allChecked = true;
        } else {
            this.allChecked = false;
        }
    }

    onAllSelect(e: any): void {
        var state: boolean;
        if (e.target.checked) {
            state = true;
            this.selectedRowCount = this.myProfilesList.Profiles.length;
        } else {
            state = false;
            this.selectedRowCount = 0;
        }

        for (var index = 0; index < this.myProfilesList.Profiles.length; index++) {
            this.myProfilesList.Profiles[index].IsChecked = state;
        }
    }

    openMailWindow() {
        var mailto: string = '';
        var mailcc: string = '';
        var mailsubject: string = '';
        var mailbody: string = '';
        for (var index = 0; index < this.myProfilesList.Profiles.length; index++) {
            if (this.myProfilesList.Profiles[index].IsChecked) {
                mailto = mailto + this.myProfilesList.Profiles[index].Email + ';';
                mailcc = mailcc + this.myProfilesList.Profiles[index].CandidateMailDetails.CC + ';';
                mailsubject = this.myProfilesList.Profiles[index].CandidateMailDetails.Subject;
                mailbody = this.myProfilesList.Profiles[index].CandidateMailDetails.Body;
                mailbody += window.location.href;
                mailbody += '>';
                this.myProfilesList.Profiles[index].IsChecked = false;
            }
            this.selectedRowCount = 0;
        }
        this.allChecked = false;
        var str = 'mailto:' + mailto + '?cc=' + mailcc + '&subject=' + mailsubject + '&body=' + mailbody;
        window.location.href = str;
    }

    onClickFollowUpComments(id: MasterData) {
        this.seletedCandidateIDForComments = id;
        var index = _.findIndex(this.myProfilesList.Profiles, { CandidateID: this.seletedCandidateIDForComments });
        this.profile.Candidate = this.myProfilesList.Profiles[index].Candidate;
        this.profile.FollowUpComments = this.myProfilesList.Profiles[index].FollowUpComments;
        this.profile.PreviousFollowupComments = this.profile.FollowUpComments;
        window.scrollTo(0, 40);
        if (this.isCommentsPanelCollapsed === false)
            this.isCommentsPanelCollapsed = !this.isCommentsPanelCollapsed;

        //If updateStatus or Resume row is open close those
        if (this.isCollapsed === true)
            this.isCollapsed = !this.isCollapsed;
        if (this.isUploadPanelCollapsed === true)
            this.isUploadPanelCollapsed = !this.isUploadPanelCollapsed;
        if (this.isUpdateStatusCollapsed === true)
            this.isUpdateStatusCollapsed = !this.isUpdateStatusCollapsed;
    }

    closeCommentsPanel() {
        this.isCommentsPanelCollapsed = !this.isCommentsPanelCollapsed;
        this.highlightRow = '';
    }
    /**START Upload photo funcationality*/
    /**Function to add file in collection which will be used while uplaoding file. */
    uploadPhoto(selectedFile: any) {
        try {
            let FileList: FileList = selectedFile.target.files;
            if (selectedFile.target.files.length > 0) {
                if (selectedFile.target.files[0].size < 2000000) {
                    if (selectedFile.target.files[0].type === 'image/jpeg'
                        || selectedFile.target.files[0].type === 'image/png'
                        || selectedFile.target.files[0].type === 'image/jpg') {
                        if (this.uploadedPhoto)
                            this.uploadedPhoto.length = 0;
                        for (let i = 0, length = FileList.length; i < length; i++) {
                            this.uploadedPhoto.push(FileList.item(i));
                            this.photoUploaded = true;
                            this.photoName = FileList.item(i).name;
                        }
                    } else {
                        this.toastr.error('Please upload image of type .jpg, .png, .jpeg');
                    }
                } else {
                    this.toastr.error('Please upload image of size less than 2 MB');
                }
            }
        } catch (error) {
            document.write(error);
        }
    }
    /** This function sends file to service to upload in library/DB
    * after click on save buttong or Form submission
   */
    postProfilePhoto(CandidateLookupId: MasterData, File: any) {
        this.photoMeta.CandidateID = CandidateLookupId;
        this.photoMeta.Overwrite = false;
        this.photoMeta.Profile = File;
        this._profileBankService.uploadProfilePhoto(this.photoMeta).then(
            results => {
                if ((<ResponseFromAPI>results).StatusCode === APIResult.Success) {
                    this.toastr.success((<ResponseFromAPI>results).Message);
                    this.photoUploaded = false;
                    this.photoName = '';
                    setTimeout(() => { this.getMyProfiles(); }, 1000);
                } else {
                    this.toastr.error((<ResponseFromAPI>results).Message);
                }
            },
            (error: any) => this.errorMessage = <any>error);
    }

    /**END Upload photo funcationality*/
    onSubmitFollowupComment() {
        //check if comment is actually updated regardless of spaces
        if (this.profile.PreviousFollowupComments !== this.profile.FollowUpComments.trim()) {
            //Update Comments
            this._profileBankService.updateFollowUpComments(this.seletedCandidateIDForComments,
                this.profile.FollowUpComments.trim())
                .subscribe(
                results => {
                    if ((<ResponseFromAPI>results).StatusCode === APIResult.Success) {
                        this.toastr.success((<ResponseFromAPI>results).Message);
                        this.myProfilesList.GrdOperations = new GrdOptions();
                        setTimeout(() => { this.getMyProfiles(); }, 1000);
                        this.profile = new CandidateProfile();
                    } else {
                        this.toastr.error((<ResponseFromAPI>results).ErrorMsg);
                    }
                },
                error => this.errorMessage = <any>error);
            this.isCommentsPanelCollapsed = !this.isCommentsPanelCollapsed;
            this.highlightRow = '';
        }

    }
    /**Function to add file in collection which will be used while uplaoding file. */
    uploadFile(inputValue: any): void {
        try {
            let FileList: FileList = inputValue.target.files;
            if (inputValue.target.files[0].size < 2000000) {
                if (inputValue.target.files[0].type === 'application/pdf'
                    || inputValue.target.files[0].name.split('.')[1] === 'docx' ||
                    inputValue.target.files[0].name.split('.')[1] === 'doc') {
                    this.psdTemplates.length = 0;
                    for (let i = 0, length = FileList.length; i < length; i++) {
                        this.psdTemplates.push(FileList.item(i));
                        this.fileUploaded = true;
                        this.fileName = FileList.item(i).name;
                    }
                } else {
                    this.toastr.error('Please upload document of type .doc, .docx, .pdf');
                }
            } else {
                this.toastr.error('Please upload document of size less than 2 MB');
            }
        } catch (error) {
            document.write(error);
        }

    }

    postFile(inputValue: any): void {
        try {
            let FileList: FileList = inputValue.target.files;
            if (inputValue.target.files[0].size < 2000000) {
                if (inputValue.target.files[0].type === 'application/pdf' ||
                    inputValue.target.files[0].name.split('.')[1] === 'docx' ||
                    inputValue.target.files[0].name.split('.')[1] === 'doc') {
                    this.resumeFiles.length = 0;
                    for (let i = 0, length = FileList.length; i < length; i++) {
                        this.resumeFiles.push(FileList.item(i));
                        this.resumeUploaded = true;
                        this.resumeName = FileList.item(i).name;
                    }
                } else {
                    this.toastr.error('Please upload document of type .doc, .docx, .pdf');
                }
            } else {
                this.toastr.error('Please upload document of size less than 2 MB');
            }
        } catch (error) {
            document.write(error);
        }

    }

    onClickUploadResume(CandidateId: MasterData) {
        window.scrollTo(0, 40);
        this.seletedCandidateIDForUpload = CandidateId;
        var index = _.findIndex(this.myProfilesList.Profiles, { CandidateID: this.seletedCandidateIDForUpload });
        this.profile.Candidate = this.myProfilesList.Profiles[index].Candidate;
        if (this.isUploadPanelCollapsed === false)
            this.isUploadPanelCollapsed = !this.isUploadPanelCollapsed;
        //Close Other Panel
        if (this.isCollapsed === true)
            this.isCollapsed = !this.isCollapsed;
        if (this.isCommentsPanelCollapsed === true)
            this.isCommentsPanelCollapsed = !this.isCommentsPanelCollapsed;
        if (this.isUpdateStatusCollapsed === true)
            this.isUpdateStatusCollapsed = !this.isUpdateStatusCollapsed;

    }

    closeUploadPanel() {
        this.isUploadPanelCollapsed = !this.isUploadPanelCollapsed;
    }

    onSubmitUploadResume() {
        this.uploadResume(this.seletedCandidateIDForUpload, this.resumeFiles[0]);
        this.resumeFiles = new Array<File>();
        this.resumeName = '';
        this.isUploadPanelCollapsed = !this.isUploadPanelCollapsed;
    }

    //Assign RRf 
    AssignRRFClick() {
        let chkStatus = false;
        let chkRRFAssigned = false;

        for (var index = 0; index < this.myProfilesList.Profiles.length; index++) {
            if (this.myProfilesList.Profiles[index].IsChecked) {
                //Check for open / rejected Status
                //if (this.myProfilesList.Profiles[index].Status.Value.toLowerCase() === 'open') {
                //if (!this.myProfilesList.Profiles[index].RRFAssigned.isRRFAssigned) {
                //Add to selectedCandidates array
                this.Candidate.CandidateID = this.myProfilesList.Profiles[index].CandidateID;
                this.Candidate.Candidate = this.myProfilesList.Profiles[index].Candidate;
                this.Candidate.Status = this.myProfilesList.Profiles[index].Status;
                this.selectedCandidates.push(this.Candidate);
                this.Candidate = new Candidate();
                //} else { chkRRFAssigned = true; break; }
                // } else {
                //   chkStatus = true;
                //    break;
                //}
            }
        }
        if (chkStatus) {
            this.toastr.warning('Only Open status candidates can be Assigned to RRF');
            this.selectedCandidates = new Array<CandidateProfile>();
        } else if (chkRRFAssigned) {
            this.toastr.warning('Candidate already assigned to RRF');
            this.selectedCandidates = new Array<CandidateProfile>();
        } else {
            sessionStorage.setItem('Candidates', JSON.stringify(this.selectedCandidates));
            sessionStorage.setItem('returnPathToSchedule', '/App/ProfileBank/MyProfiles');
            this._router.navigate(['/App/ProfileBank/MyProfiles/Assign']);
        }
    }

    onClickScheduleInterview(CandidateID: string) {
        var index = _.findIndex(this.myProfilesList.Profiles, { CandidateID: CandidateID });
        let chkStatus = false;
        let selectedCandidate: CandidateProfile = this.myProfilesList.Profiles[index];

        if (selectedCandidate.Status.Value.toLowerCase() === 'in process') {
            sessionStorage.setItem('RRFID', JSON.stringify(selectedCandidate.RRFAssigned.RRFID));
            sessionStorage.setItem('Candidate', JSON.stringify(selectedCandidate));
            sessionStorage.setItem('returnPath', 'App/ProfileBank/MyProfiles');
            this._router.navigate(['/App/Recruitment Cycle/Schedule/New']);
        } else {
            if (selectedCandidate.Status.Value.toLowerCase() === 'open') {
                this.Candidate = new Candidate();
                this.Candidate.CandidateID = this.myProfilesList.Profiles[index].CandidateID;
                this.Candidate.Candidate = this.myProfilesList.Profiles[index].Candidate;
                this.Candidate.Status = this.myProfilesList.Profiles[index].Status;
                this.selectedCandidates.push(this.Candidate);
            } else {
                chkStatus = true;
            }
            if (chkStatus) {
                this.toastr.warning('Candidate must be assigned to RRF. Only Open status candidates can be Assigned to RRF');
                this.selectedCandidates = new Array<CandidateProfile>();
            } else {
                sessionStorage.setItem('Candidates', JSON.stringify(this.selectedCandidates));
                sessionStorage.setItem('returnPath', 'App/ProfileBank/MyProfiles');
                sessionStorage.setItem('returnPathToSchedule', 'App/ProfileBank/MyProfiles');
                this._router.navigate(['/App/ProfileBank/MyProfiles/Assign']);
            }

        }

    }
    onChange() {
        this.myProfilesList.GrdOperations.Order = this.myProfilesList.GrdOperations.Order === 'asc' ? 'desc' : 'asc';
        this.myProfilesList.GrdOperations.ButtonClicked = 0;
        this.myProfilesList.GrdOperations.NextPageUrl = new Array<string>();
        console.log('onChange model =>', this.modelFilterByProfile);
        // this.modelFilterByProfile = 'all';
        // this.filterByProfile();
        this.filterBy();
        // this.filterByProfile();
    }
    disableDelete(Status: MasterData) {
        if (Status.Value !== null) {
            if (Status.Value.toLowerCase() !== 'Open'.toLowerCase()
                && Status.Value.toLowerCase() !== 'Incomplete'.toLowerCase()) {
                return true;
            } else { return false; }
        } else {
            return false;
        }
    }
    OnPaginationClick(ButtonClicked: string) {
        /* ButtonClicked 
                i. Initial - 0
                ii.Next - 1
                iii.Prev - (-1)
           PerPageCount = No of items shown per page
                */
        this.myProfilesList.GrdOperations.ButtonClicked = parseInt(ButtonClicked);
        this.filterBy();
    }
    getColumnsForSorting() {
        this._profileBankService.getColumsForSorting('COMPANYPROFILS')
            .subscribe(
            (results: any) => {
                this.ColumnList = results;
            },
            error => this.toastr.error(<any>error));
    }
    onSelectRRF(rrfID: string) {
        //this.rrfId = 'RRF6866237939ID76';
        if (rrfID === '-1') {
            this.viewDetailsRRFId = '';
            this.getMyProfiles();
            this.NORECORDSFOUND = false;
        } else {
            this.viewDetailsRRFId = rrfID;
            this._rrfCandidatesList.getCandidateProfilesByRRF(rrfID)
                .subscribe(
                (results: any) => {
                    if (results.length > 0) {
                        this.myProfilesList.GrdOperations = new GrdOptions();
                        this.myProfilesList.Profiles = <any>results;
                        this.NORECORDSFOUND = false;;
                    } else {
                        //If No data present
                        this.NORECORDSFOUND = true;
                    }
                },
                error => this.errorMessage = <any>error);
        }

    }
    showRRFDetails(rrfId: string) {
        this.rrfObj = { Id: 0, Value: rrfId };
        this.viewRRFDetails = this.rrfObj;
        this.isViewRFF = true;
        this.isViewRRFGrid = false;
    }
    showListOfRRF() {
        this.isViewRFF = false;
        this.isViewRRFGrid = true;
        this.viewDetailsRRFId = '';
        this.myProfilesList.GrdOperations = new GrdOptions();
        this.getMyProfiles();
    }
    getUpdateStatusAccess(Status: MasterData) {
        try {
            if (Status.Value !== null) {
                if (Status.Value.toLowerCase() === 'offered' ||
                    Status.Value.toLowerCase() === 'offer accepted' || Status.Value.toLowerCase() === 'joined') {
                    return false;
                } else { return true; }
            } else { return true; }
        } catch (error) {
            this.toastr.error(error);
            return false;
        }

    }

    filterBy() {
        switch (this.modelFilterBy) {
            case 'all':
                this.getAllProfiles();
                break;
            case 'my':
                this.getMyProfiles();
                break;
            case 'incomplete':
                this.getIncompleteProfiles();
                break;
            case 'blackList':
                this.getBlacklistedProfiles();
                break;

            default:
                break;
        }
    }
    getAllProfiles() {
        this._allProfilesService.getAllProfiles(this.myProfilesList.GrdOperations)
            .subscribe(
            (results: any) => {
                if (results.Profiles !== undefined && results.Profiles.length > 0) {
                    this.myProfilesList = <any>results;
                    this.cachedProfileList = <any>results.Profiles;
                    this.filterByProfile();
                } else { this.NORECORDSFOUND = true; }
            },
            error => this.errorMessage = <any>error);
    }
    getIncompleteProfiles() {
        this._allProfilesService.getIncompleteProfiles(this.myProfilesList.GrdOperations)
            .subscribe(
            (results: any) => {
                if (results.Profiles !== undefined && results.Profiles.length > 0) {
                    this.myProfilesList = <any>results;
                    this.cachedProfileList = <any>results.Profiles;
                    this.filterByProfile();
                } else {
                    this.NORECORDSFOUND = true;
                }
            },
            error => this.errorMessage = <any>error);
    }
    getBlacklistedProfiles() {
        this._blacklistedProfilesService.getBlackListedProfiles(this.myProfilesList.GrdOperations)
            .subscribe(
            (results: AllCandidateProfiles) => {
                if (results.Profiles !== undefined && results.Profiles.length > 0) {
                    this.myProfilesList = <any>results;
                    this.cachedProfileList = <any>results.Profiles;
                    this.filterByProfile();
                } else { this.NORECORDSFOUND = true; }
            },
            error => {
                this.errorMessage = <any>error;
            });
    }

    showNewProfileModal() {
        let modl: any = $('#CountDetails');
        modl.modal({ 'backdrop': 'static' });
    }

    modelFilterByProfileChanged(event: any) {
        this.modelFilterByProfile = event.target.value;
        console.log('event =>', event.target.value, 'model =>', this.modelFilterByProfile);
        this.filterByProfile();
    }

    filterByProfile() {
        console.log('model =>', this.modelFilterByProfile);
        let profUntagged: any[] = ['Open', 'Rejected', 'Absconded'];
        let profTagged: any[] = ['In Process', 'Offered', 'Joined', 'Accepted'];
        this.myProfilesList.Profiles = [];
        let temp: any = this.cachedProfileList;
        switch (this.modelFilterByProfile) {
            case 'all':
                this.myProfilesList.Profiles = this.cachedProfileList;
                break;
            case 'tagged':
                this.myProfilesList.Profiles = temp.filter((element: any) => {
                    let retVal;
                    if (element.Status.Value) {
                        retVal = ((element.Status.Value.indexOf(profTagged[0]) > -1 ||
                            element.Status.Value.indexOf(profTagged[1]) > -1 ||
                            element.Status.Value.indexOf(profTagged[2]) > -1 ||
                            element.Status.Value.indexOf(profTagged[3]) > -1));
                        retVal ? null : console.log(element.Status.Value);
                    }
                    return retVal;
                });
                break;
            case 'untagged':
                this.myProfilesList.Profiles = temp.filter((element: any) => {
                    let retVal;
                    if (element.Status.Value) {
                        retVal = ((element.Status.Value.indexOf(profUntagged[0]) > -1 ||
                            element.Status.Value.indexOf(profUntagged[1]) > -1 ||
                            element.Status.Value.indexOf(profUntagged[2]) > -1));
                        retVal ? null : console.log(element.Status.Value);
                    }
                    return retVal;
                });
                break;
            default:
                break;
        }
    }
}


