import {Component} from '@angular/core';
import { ROUTER_DIRECTIVES, OnActivate, Router } from '@angular/router';
import {CandidateProfile, AllCandidateProfiles, MailDetails} from '../../shared/model/myProfilesInfo';
import { AllProfilesService } from '../services/allProfiles.service';
import { MastersService } from '../../../shared/services/masters.service';
import * as  _ from 'lodash';
import { CollapseDirective, TOOLTIP_DIRECTIVES, BUTTON_DIRECTIVES } from 'ng2-bootstrap';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { APIResult } from  '../../../shared/constantValue/index';
import { MasterData, GrdOptions, ResponseFromAPI, SortingMasterData } from  '../../../shared/model/index';
import { DataSharedService } from '../../shared/services/dataShared.service';
import { ProfileBankService } from '../../shared/services/profileBank.service';
import { ProfileBankPipe }from '../../shared/filter/profileBank.pipe';
import {IfAuthorizeDirective} from '../../../shared/directives/ifAuthorize.directive';
import { DetailProfileComponent } from '../../shared/component/detailProfile.component';
import { CommonService } from  '../../../shared/index';
@Component({
    moduleId: module.id,
    selector: 'rrf-allprofiles-list',
    templateUrl: 'allProfilesList.component.html',
    directives: [DetailProfileComponent, BUTTON_DIRECTIVES, ROUTER_DIRECTIVES, IfAuthorizeDirective, CollapseDirective,
        TOOLTIP_DIRECTIVES],
    styleUrls: ['../../myProfiles/components/myProfiles.component.css'],
    pipes: [ProfileBankPipe]
})


export class AllProfilesListComponent implements OnActivate {
    allProfilesList: AllCandidateProfiles = new AllCandidateProfiles();
    AllCheckedItemIds: Array<MasterData> = new Array<MasterData>();
    allProfilesList_1: Array<CandidateProfile>;
    profile: CandidateProfile;
    statusList: Array<MasterData>;
    seletedCandidateID: MasterData = new MasterData();
    selectedStatus = new MasterData();
    Comments: string;
    currentStatus: number;
    errorMessage: string;
    currentCandidate: string;
    selectedRowCount: number = 0;
    allChecked: boolean = false;
    isCollapsed: boolean = false;
    isUpdateStatusCollapsed: boolean = false;
    isAuthourized: boolean = false;
    currentUser: MasterData = new MasterData();
    url: any;
    CandidateProfiles: AllCandidateProfiles = new AllCandidateProfiles();
    //Pagination 
    grdOptions = new GrdOptions();
    public maxSize: number = 3;
    NORECORDSFOUND: boolean = false;
    candidateMailDetails = new MailDetails();
    ColumnList: Array<SortingMasterData> = new Array<SortingMasterData>();
    constructor(private _allProfilesService: AllProfilesService,
        private _dataSharedService: DataSharedService,
        private _router: Router,
        private _commonService: CommonService,
        public toastr: ToastsManager,
        private _profileBankService: ProfileBankService,
        private _masterService: MastersService) {
        this.profile = new CandidateProfile();
    }

    routerOnActivate() {
        sessionStorage.setItem('backToProfile', '/App/ProfileBank/AllProfiles');
        this.getColumnsForSorting();
        this.getLoggedInUser();
        this.getAllProfiles();
        this.getEmail('RMS.RRF.NEEDAPPROVAL');
    }

    setPaginationValues() {
        this.CandidateProfiles.GrdOperations.ButtonClicked = 0;
        this.CandidateProfiles.GrdOperations.PerPageCount = 3;
    }
    getEmail(EmailCode: any) {
        this._profileBankService.getEmail(EmailCode)
            .subscribe(
            results => {
                this.candidateMailDetails = <any>results;
            },
            error => this.errorMessage = <any>error);
    }
    getLoggedInUser() {
        this.currentUser = this._commonService.getLoggedInUser();
    }

    getAllProfiles() {
        try {
            this._allProfilesService.getAllProfiles(this.allProfilesList.GrdOperations)
                .subscribe(
                (results: any) => {
                    if (results.Profiles !== undefined && results.Profiles.length > 0) {
                        this.allProfilesList = <AllCandidateProfiles>results;
                    } else { this.NORECORDSFOUND = true; }
                },
                error => this.errorMessage = <any>error);
        } catch (error) {
            this.allProfilesList = new AllCandidateProfiles();
        }

    }

    redirectToView(CandidateID: MasterData) {
        //Changed as per Backend Request and Bug 
        //this._router.navigate(['/App/ProfileBank/AllProfiles/View/' + CandidateID.Value]);
        this._router.navigate(['/App/ProfileBank/MyProfiles/View/' + CandidateID.Value + 'ID' + CandidateID.Id]);
    }
    /**Takes confirmation from end User to delete profile */
    confirmDelete(candidateId: MasterData) {
        let modl: any = $('#deleteProfile' + candidateId.Value);
        modl.modal('toggle');
    }
    /** OnRejection hide the confimation box and exit the delete process */
    onClearSelection(_candidateId: MasterData) {
        let cnfrmBox: any = $('#deleteProfile' + _candidateId.Value);
        cnfrmBox.modal('hide');
    }
    /** Delete Prfile will be available only to the Recruitment Head*/
    deleteCandidate(CandidateID: MasterData) {
        this._profileBankService.deleteProfile(CandidateID)
            .subscribe(
            (results: any) => {
                this.profile.Comments = results.Comments;
                this.profile.Status = results.Status;
                setTimeout(() => { this.getAllProfiles(); }, 1000);
                this.toastr.success((<ResponseFromAPI>results).Message);
            },
            error => this.toastr.error(<any>error));
        this.onClearSelection(CandidateID);
    }
    /**Redirecting to candidate's all interview history page */
    getCandidateHistory(_candidateID: MasterData) {
        sessionStorage.setItem('HistoryOfCandidate', JSON.stringify(_candidateID));
        sessionStorage.setItem('onReturnPath', '/App/ProfileBank/AllProfiles');
        this._router.navigate(['/App/ProfileBank/AllProfiles/History']);
    }

    redirectToEditProfile(CandidateID: MasterData) {
        this._router.navigate(['/App/ProfileBank/AllProfiles/Edit/' + CandidateID.Value + 'ID' + CandidateID.Id]);
    }

    SaveCandidateID(id: MasterData) {
        this.seletedCandidateID = id;

        var index = _.findIndex(this.allProfilesList.Profiles, { CandidateID: this.seletedCandidateID });
        this.currentCandidate = this.allProfilesList.Profiles[index].Candidate;
        this._profileBankService.getStatusById(id.Value)
            .subscribe(
            (results: any) => {
                this.profile.Comments = results.Comments;
                this.profile.Status = results.Status;
            },
            error => this.toastr.error(<any>error));

        //Auto Scroll up
        window.scrollTo(0, 40);
        if (this.isCollapsed === false)
            this.isCollapsed = !this.isCollapsed;
        if (this.isUpdateStatusCollapsed === true)
            this.isUpdateStatusCollapsed = !this.isUpdateStatusCollapsed;
    }
    onUpdateStatusClick(id: MasterData) {
        this.seletedCandidateID = id;

        var index = _.findIndex(this.allProfilesList.Profiles, { CandidateID: this.seletedCandidateID });
        this.currentCandidate = this.allProfilesList.Profiles[index].Candidate;
        this.getUpdateStatus(this.seletedCandidateID.Value);
        this._profileBankService.getStatusById(id.Value)
            .subscribe(
            (results: any) => {
                this.profile.Comments = results.Comments;
                this.profile.Status = results.Status;
            },
            error => this.toastr.error(<any>error));

        //Auto Scroll up
        window.scrollTo(0, 40);
        if (this.isUpdateStatusCollapsed === false)
            this.isUpdateStatusCollapsed = !this.isUpdateStatusCollapsed;
        if (this.isCollapsed === true)
            this.isCollapsed = !this.isCollapsed;
    }
    getUpdateStatus(candidateID: any) {
        this.statusList = Array<MasterData>();
        this._masterService.getUpdateStatus(candidateID)
            .subscribe(
            results => {
                this.statusList = <any>results;
            },
            error => this.errorMessage = <any>error);
    }
    getCandidateStatuses() {
        this._masterService.getCandidateStatuses()
            .subscribe(
            results => {
                this.statusList = results;
            }, error => {
                this.toastr.error(<any>error);
            });

    }

    onSelectStatus(statusId: string) {
        this.selectedStatus.Id = parseInt(statusId);
        this.selectedStatus.Value = null;
    }

    onUpdateStauts() {
        this._profileBankService.updateCandidateStatus(this.seletedCandidateID, this.selectedStatus, this.profile.Comments)
            .subscribe(
            (results: ResponseFromAPI) => {
                if (results.StatusCode === APIResult.Success) {
                    this.toastr.success((<ResponseFromAPI>results).Message);
                    this.isUpdateStatusCollapsed = false;
                    this.profile.Status = new MasterData();
                    setTimeout(() => { this.getAllProfiles(); }, 1000);
                } else {
                    this.toastr.error((<ResponseFromAPI>results).Message);
                }
            },
            error => this.toastr.error(<any>error));
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
                    this.allProfilesList.GrdOperations = new GrdOptions();
                    setTimeout(() => { this.getAllProfiles(); }, 1000);
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

        if (this.selectedRowCount === this.allProfilesList.Profiles.length) {
            this.allChecked = true;
        } else {
            this.allChecked = false;
        }
    }

    onAllSelect(e: any): void {
        var state: boolean;
        if (e.target.checked) {
            state = true;
            this.selectedRowCount = this.allProfilesList.Profiles.length;
        } else {
            state = false;
            this.selectedRowCount = 0;
        }

        for (var index = 0; index < this.allProfilesList.Profiles.length; index++) {
            this.allProfilesList.Profiles[index].IsChecked = state;
        }
    }

    openMailWindow() {
        var mailto: string = '';
        for (var index = 0; index < this.allProfilesList.Profiles.length; index++) {
            if (this.allProfilesList.Profiles[index].IsChecked) {
                mailto = mailto + this.allProfilesList.Profiles[index].Email + ';';
                this.allProfilesList.Profiles[index].IsChecked = false;
            }
            this.selectedRowCount = 0;
        }
        this.allChecked = false;
        window.location.href = 'mailto:' + mailto;
    }

    transferOwnerShipClick() {
        for (var index = 0; index < this.allProfilesList.Profiles.length; index++) {
            if (this.allProfilesList.Profiles[index].IsChecked) {
                this.AllCheckedItemIds.push(this.allProfilesList.Profiles[index].CandidateID);
            }
        }
        if (this.AllCheckedItemIds.length > 0) {
            sessionStorage.setItem('CheckedItemIds', JSON.stringify(this.AllCheckedItemIds));
            this._router.navigate(['/App/ProfileBank/AllProfiles/Transfer/']);
        }
    }

    getEditAccess(Owner: MasterData) {
        try {
            if (Owner.Id === this.currentUser.Id) {
                return false;
            } else { return true; }
        } catch (error) {
            this.toastr.error(error);
            return false;
        }

    }
    getUpdateStatusAccess(Owner: MasterData, Status: MasterData) {
        try {
            if (Status.Value !== null && Owner.Value !== null) {
                if (Owner.Id === this.currentUser.Id && (Status.Value.toLowerCase() === 'offered' ||
                    Status.Value.toLowerCase() === 'offer accepted' || Status.Value.toLowerCase() === 'joined')) {
                    return false;
                } else { return true; }
            } else {
                return true;
            }
        } catch (error) {
            this.toastr.error(error);
            return false;
        }

    }
    disableDelete(Status:MasterData) {
        if(Status.Value !== null) {
            if(Status.Value.toLowerCase() !== 'Open'.toLowerCase()
            && Status.Value.toLowerCase() !== 'Incomplete'.toLowerCase()) {
                return true;
            } else {return false;}
        }else {
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
        this.allProfilesList.GrdOperations.ButtonClicked = parseInt(ButtonClicked);
        this.getAllProfiles();
    }
    onChange() {
        this.allProfilesList.GrdOperations.ButtonClicked = 0;
        this.allProfilesList.GrdOperations.NextPageUrl = new Array<string>();
        this.getAllProfiles();
    }
    getColumnsForSorting() {
        this._profileBankService.getColumsForSorting('ALLPROFILES')
            .subscribe(
            (results: any) => {
                this.ColumnList = results;
            },
            error => this.toastr.error(<any>error));
    }
}


/**
 * //Method for With Pagination
     getAllProfiles_1() {
        try {
            this._allProfilesService.getOpenProfiles(this.CandidateProfiles.GrdOperations)
                .subscribe(
                (results: any) => {
                    if (results.Profiles.length !== undefined) {
                        this.CandidateProfiles = <AllCandidateProfiles>results;
                    }
                },
                error => this.errorMessage = <any>error);
        } catch (error) {
            this.allProfilesList = new Array<CandidateProfile>();
        }

    }
 */
