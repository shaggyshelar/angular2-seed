import {Component } from '@angular/core';
import {Location} from '@angular/common';
import { OnActivate, ROUTER_DIRECTIVES, RouteSegment, Router } from '@angular/router';
import { MyRRFService } from '../../myRRF/services/myRRF.service';
import { RRFDashboardService } from '../services/rrfDashboard.service';
import { MastersService } from '../../../shared/services/masters.service';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { APIResult } from  '../../../shared/constantValue/index';
import { MasterData, ResponseFromAPI} from '../../../shared/model/common.model';
import { CandidateProfile, BarChartData } from  '../../../profileBank/shared/model/myProfilesInfo';
import { CHART_DIRECTIVES} from 'ng2-charts/ng2-charts';
import { InterviewMode } from  '../../../shared/constantValue/index';
import { CAROUSEL_DIRECTIVES, TOOLTIP_DIRECTIVES, BUTTON_DIRECTIVES} from 'ng2-bootstrap/ng2-bootstrap';
import { RRFGridRowComponent} from '../../shared/components/RRFGridRow/RRFGridRow.component';
import { RRFCandidateListService} from '../services/RRFCandidatesList.service';
import { RRFSpecificCandidateList, TransferInterview} from '../model/RRFCandidateList';
import { Interview} from '../../../recruitmentCycle/shared/model/interview';
import { RRFDetails } from '../../myRRF/models/rrfDetails';
import { ProfileBankService} from  '../../../profileBank/shared/services/profileBank.service';
import { IfAuthorizeDirective} from '../../../shared/directives/ifAuthorize.directive';
import { MyScheduleInterview } from '../../../recruitmentCycle/interviewersTab/model/myScheduleInterview';
import { IEFGridRowComponent } from '../../../recruitmentCycle/shared/component/IEFGridRow/IEFGridRow.component';
@Component({
    moduleId: module.id,
    selector: 'rrf-candidate-list',
    templateUrl: 'RRFCandidateList.component.html',
    directives: [ROUTER_DIRECTIVES,
        TOOLTIP_DIRECTIVES,
        RRFGridRowComponent,
        CHART_DIRECTIVES,
        CAROUSEL_DIRECTIVES,
        BUTTON_DIRECTIVES,
        IfAuthorizeDirective,
        IEFGridRowComponent
    ],
    styleUrls: ['RRFDashboard.component.css'],
    providers: [ProfileBankService, ToastsManager]
})

export class RRFCandidateListComponent implements OnActivate {
    RRFID: MasterData = new MasterData();
    selectedRRF: RRFDetails;
    /**---------BEGING Transfer Candidate--------------- */
    /**Seleted RRF for Transfer */
    rrfToTrnasfer: number;
    /**To store all Open RRF */
    allOpenRrf: RRFDetails[] = [];
    /**Show trnasferTo option */
    IsAllowTransfer: boolean = false;
    /**Transfer reason */
    transferReason: string;
    /**transfer candidate from current intervieID */
    TransferInterviewID: MasterData = new MasterData();
    TransferInterviewDetails: TransferInterview = new TransferInterview();
    /**---------END Transfer Candidate--------------- */
 InterviewHistory: MyScheduleInterview[] = [];
 viewIEFText: string = 'View IEF';
    hideIEFText: string = 'Hide IEF';
    IEFButtonText: string = '';
    isNull: boolean = false;
    interviewId:string='';
    Candidate: string = 'Jhone DEF';
    doughnutChartLabels: string[] = [];
    doughnutChartData: number[] = [];
    doughnutChartType: string = 'doughnut'; //doughnut
    doughnutChartColors: any[] = [{ backgroundColor: [] }];
    doughnutChartOptions: any = {
        animation: false,
        responsive: true
    };
    isInterviewSchedule: boolean = false;
    errorMessage: string;
    Candidates: Array<CandidateProfile>;
    AllCandidatesForRRF: RRFSpecificCandidateList[];
    OfferedCandidateForRRF: RRFSpecificCandidateList[];
    OtherCandidateForRRF: RRFSpecificCandidateList[];
    CandidateRoundHistory: Array<Interview>;
    CandidateHistoryForActualTime: Interview;
    isRoundHistoryPresent: boolean = false;
    selectedCandidate: string;
    InterviewID: MasterData = new MasterData();
    CandidateID: MasterData = new MasterData();
    modeConstant: InterviewMode = InterviewMode;
    changedStatus: string = '';
    changesStatusComment: string = '';
    actualTime: string = '';
    changeStatusInterviewID: MasterData = new MasterData();
    ActualTimeInterviewID: MasterData = new MasterData();
    showChangeStatus: boolean = false;
    setActualTimeForm: boolean = false;
    changeStatusCandidateID: MasterData = new MasterData();
    IsBarchartDataShow: boolean = false;
    IsHRConducted: boolean = false;
    IsOffered: boolean = false;
    ExpDateOfJoining: Date;
    rejectDate:Date;
    IsOfferGenerate: boolean = false;
    IsReject : boolean = false;
    IsUpdateStatus: boolean = false;
    IsOfferedCandidate: boolean = false;
    IsOtherCandidate: boolean = false;
    UpdatedStatus: any;
    selectedStatus = new MasterData();
    CandidateUpdatedStatus: MasterData = new MasterData();
    candidateStatus: string;
    ReturnPath: string;
    mindate: Date;
    public barChartOptions: any = {
        scaleShowVerticalLines: false,
        responsive: true
    };
    public barChartType: string = 'bar';
    public barChartLegend: boolean = true;
    public InterviewDetails: {};
    UniqueRRFCode: string = '';
    public barChartLabels: string[] = new Array<string>();
    public barChartData: any[] = new Array<string>();
    public FinalStatus : any = [{'Id':4,'Value':'Select'},{'Id':12,'Value':'Reject'}];
    finalStatus = new MasterData();
    public finalStatusComment:any='';
    public candidateInterviewId :MasterData = new MasterData();
    rejectReason:string;
    IsRejectReason:boolean = false;
    constructor(private _myRRFService: MyRRFService,
        private _router: Router,
        private location: Location,
        private _rrfDashboardService: RRFDashboardService,
        private _mastersService: MastersService,
        private _rrfCandidatesList: RRFCandidateListService,
        private _profileBankService: ProfileBankService,
        public toastr: ToastsManager) {
        this.Candidates = new Array<CandidateProfile>();
        this.AllCandidatesForRRF = new Array<RRFSpecificCandidateList>();
        this.OfferedCandidateForRRF = new Array<RRFSpecificCandidateList>();
        this.OtherCandidateForRRF = new Array<RRFSpecificCandidateList>();
        this.CandidateRoundHistory = new Array<Interview>();
    }

    routerOnActivate(segment: RouteSegment) {
        this.RRFID.Id = parseInt((segment.getParam('id')).split('ID')[1]);
        this.RRFID.Value = (segment.getParam('id')).split('ID')[0];
        this.IEFButtonText = this.viewIEFText;
        this.doughnutChartLabels = ['Technical 1', 'HR'];
        this.doughnutChartData = [50, 50];
        this.doughnutChartColors = [{ backgroundColor: ['#E9EF0B', '#32c5d2'] }];
        this.selectedRRF = new RRFDetails();
        this.ReturnPath = sessionStorage.getItem('backToRRFDashboardList');
        this.candidateStatus = sessionStorage.getItem('StatusValue');
        if (this.candidateStatus !== null) {
            if (this.candidateStatus.toLowerCase() === 'offered' || this.candidateStatus.toLowerCase() === 'offer accepted'
                || this.candidateStatus.toLowerCase() === 'joined') {
                $('#mytabs a[href="#tab_Offered_Candidates"]').tab('show');
                sessionStorage.removeItem('StatusValue');
                this.getOfferedCanidatesForRRF();
            }
            if (this.candidateStatus.toLowerCase() === 'blacklisted' || this.candidateStatus.toLowerCase() === 'absconded'
                || this.candidateStatus.toLowerCase() === 'asked to leave') {
                $('#mytabs a[href="#tab_Other_Candidates"]').tab('show');
                sessionStorage.removeItem('StatusValue');
                this.getOtherCanidatesForRRF();
            }
        }
        this.setMinDateToCalender();
        this.getCanidatesForRRF();
        this.getRRFDetails();
    }
    /**Bind candidtes rating in chart */
    BindRatingChart(candidateID: MasterData, rrfID: MasterData) {
        var barChartData = new BarChartData();
        this._rrfCandidatesList.GetCandidatesRatingsforChart(candidateID, rrfID)
            .subscribe(
            (results: any) => {
                barChartData = results;
                if (barChartData.functions && barChartData.ratingsData) {
                    this.IsBarchartDataShow = true;
                    this.barChartLabels = barChartData.functions;
                    /** If function label goes beyond 25 char it update and add '...' @ the end of string.*/
                    this.barChartLabels = barChartData.functions.map(ele => {
                        return ele.length > 25 ? ele.substring(0, 20) + '...' : ele;
                    });
                    this.barChartData = barChartData.ratingsData;
                } else {
                    this.IsBarchartDataShow = false;
                }
            },
            error => this.errorMessage = <any>error);
    }
    onScheduleInterviewClick(Candidate: any) {
        sessionStorage.setItem('RRFID', JSON.stringify(this.RRFID));
        sessionStorage.setItem('Candidate', JSON.stringify(Candidate));
        sessionStorage.setItem('Status', Candidate.InterviewDetails.Status);
        sessionStorage.setItem('returnPath', '/App/RRF/RRFDashboard/Candidates/' + this.RRFID.Value + 'ID' + this.RRFID.Id);
        this._router.navigate(['/App/Recruitment Cycle/Schedule/New']);
    }

    chartClicked(e: any): void {
        //console.log(e);
    }

    chartHovered(e: any): void {
        //console.log(e);
    }
    // Get Updated status
    getUpdateStatus(candidateID: any) {
        this._mastersService.getUpdateStatus(candidateID)
            .subscribe(
            results => {
                this.CandidateUpdatedStatus = <any>results;
            },
            error => this.errorMessage = <any>error);
    }
    //Get All Canidate List Along with Interview Data
    getCanidatesForRRF() {
        this._rrfCandidatesList.getCandidatesForRRF(this.RRFID.Value)
            .subscribe(
            (results: any) => {
                if (results.length !== undefined && results.length > 0) {
                    this.isNull = false;
                    this.CheckInterviewStatus(results);
                } else {
                    //If No data present
                    this.isNull = true;
                }
            },
            error => this.errorMessage = <any>error);
    }
    //Get All Candidate List whose status is offered
    getOfferedCanidatesForRRF() {
        this.CandidateRoundHistory = new Array<Interview>();
        this.IsBarchartDataShow = false;
        this.IsHRConducted = false;
        this.IsOffered = false;
        this.IsOfferGenerate = false;
        this.IsUpdateStatus = false;
        this.isRoundHistoryPresent = false;
        this.setActualTimeForm = false;
        this.showChangeStatus = false;
        this.IsAllowTransfer = false;
        this.selectedCandidate = '';
        this._rrfCandidatesList.getOfferedCandidatesForRRF(this.RRFID.Value)
            .subscribe(
            (results: any) => {
                if (results.length !== undefined && results.length > 0) {
                    this.OfferedCandidateForRRF = results;
                    this.IsOfferedCandidate = false;
                } else {
                    //If No data present
                    this.IsOfferedCandidate = true;
                }
            },
            error => this.errorMessage = <any>error);
    }
    //Get All Other Candidate List
    getOtherCanidatesForRRF() {
        this.CandidateRoundHistory = new Array<Interview>();
        this.IsBarchartDataShow = false;
        this.IsHRConducted = false;
        this.IsOffered = false;
        this.IsOfferGenerate = false;
        this.IsUpdateStatus = false;
        this.isRoundHistoryPresent = false;
        this.setActualTimeForm = false;
        this.showChangeStatus = false;
        this.IsAllowTransfer = false;
        this.selectedCandidate = '';
        this._rrfCandidatesList.getOtherCandidatesForRRF(this.RRFID.Value)
            .subscribe(
            (results: any) => {
                if (results.length !== undefined && results.length > 0) {
                    this.OtherCandidateForRRF = results;
                    this.IsOtherCandidate = false;
                } else {
                    //If No data present
                    this.IsOtherCandidate = true;
                }
            },
            error => this.errorMessage = <any>error);
    }

    onIEFClick(myScheduleInterview: MyScheduleInterview) {
        myScheduleInterview.showIEF = !myScheduleInterview.showIEF;
        this.setIEFButtonText(myScheduleInterview);
    }
     setIEFButtonText(myScheduleInterview: MyScheduleInterview) {
        if (myScheduleInterview.showIEF) {
            myScheduleInterview.IEFButtonText = this.hideIEFText;
        } else {
            myScheduleInterview.IEFButtonText = this.viewIEFText;
        }
    }
     getInProcessCanidatesForRRF() {
        this.CandidateRoundHistory = new Array<Interview>();
        this.IsBarchartDataShow = false;
        this.IsHRConducted = false;
        this.IsOffered = false;
        this.IsOfferGenerate = false;
        this.IsUpdateStatus = false;
        this.isRoundHistoryPresent = false;
        this.setActualTimeForm = false;
        this.showChangeStatus = false;
        this.IsAllowTransfer = false;
        this.selectedCandidate = '';
    }
    getRRFDetails() {
        //this.RRFID
        this._rrfCandidatesList.getRRFByID(this.RRFID.Value)
            .subscribe(
            (results: any) => {
                this.selectedRRF = results;
            },
            error => this.errorMessage = <any>error);
    }

    getCandidatesRoundHistory(CandidateID: MasterData, CandidateName: string, status: string) {
         this.IEFButtonText = this.viewIEFText;
        this.IsOfferGenerate = false;
        this.IsUpdateStatus = false;
        this.showChangeStatus = false;
        this.resetTransferOperation();
        this.TransferInterviewDetails = new TransferInterview();
        this.CandidateRoundHistory = new Array<Interview>();
        this.selectedCandidate = CandidateName;
        this.changeStatusCandidateID = CandidateID;
        this.candidateInterviewId = new MasterData();
        this._rrfCandidatesList.getInterviewRoundHistorybyCandidateId(CandidateID, this.RRFID)
            .subscribe(
            (results: any) => {
                if (results !== null && results.length > 0) {
                    this.CandidateRoundHistory = <any>results;
                    this.getUpdateStatus(this.CandidateRoundHistory[0].CandidateID.Value);
                    if (status.toLowerCase() === 'selected') {
                        if (this.CandidateRoundHistory[this.CandidateRoundHistory.length - 1].Round.Value.includes('HR')
                            && this.CandidateRoundHistory[this.CandidateRoundHistory.length - 1].Status.toLowerCase() === 'selected') {
                            this.IsHRConducted = true;
                            this.IsOffered = false;
                            this.candidateInterviewId = this.CandidateRoundHistory[this.CandidateRoundHistory.length - 1].InterviewID;
                        } else {
                            this.IsOffered = false;
                            this.IsHRConducted = false;
                        }
                    } else if (status.toLowerCase() === 'offered' || status.toLowerCase() === 'offer accepted') {
                        this.IsOffered = true;
                        this.IsHRConducted = false;
                    }else if(status.toLowerCase() === 'joined'){
                        this.IsOffered = false;
                            this.IsHRConducted = false;
                    } else {
                        this.IsOffered = false;
                        this.IsHRConducted = false;
                    }
                    this.isRoundHistoryPresent = false;
                } else {
                    this.isRoundHistoryPresent = true;
                    this.IsHRConducted = false;
                    this.IsOffered = false;
                }
            },
            error => this.errorMessage = <any>error);
        this.BindRatingChart(CandidateID, this.RRFID);
    }

    showPopOver(Comments: string, index: string) {
        let rowId: any = 'round' + index;
        let row: any = $('#' + rowId);
        row.popover({
            placement: 'top',
            toggle: 'popover',
            title: 'Comments',
            html: true,
            trigger: 'hover',
            content: Comments?Comments:'No data found'
        });
    }

    setValueToChart() {
        this.doughnutChartLabels = [];
        this.doughnutChartData = [];
        var chartColor: any[] = [];
        for (var index = 0; index < this.CandidateRoundHistory.length; index++) {
            this.doughnutChartLabels.push(this.CandidateRoundHistory[index].Status);
        }
        this.doughnutChartColors[0].backgroundColor = chartColor;
    }
    getChartColor(statusID: number): string {
        switch (statusID) {
            case 1:
                return '#E9EF0B';
            case 2:
                return '#32c5d2';
            case 3:
                return '#e7505a';
            case 4:
                return '#c2cad8';
            case 5:
                return '#41ce29';
            default:
                return '';
        }
    }

    onReScheduleInterviewClick(Candidate: RRFSpecificCandidateList) {
        sessionStorage.setItem('RRFID', JSON.stringify(this.RRFID));
        sessionStorage.setItem('Candidate', JSON.stringify(Candidate));
        sessionStorage.setItem('returnPath', '/App/RRF/RRFDashboard/Candidates/' + this.RRFID.Value + 'ID' + this.RRFID.Id);
        sessionStorage.setItem('Status', 'Rescheduled');
        this._router.navigate(['/App/Recruitment Cycle/Schedule/' +
            Candidate.InterviewDetails.InterviewID.Value + 'ID' + Candidate.InterviewDetails.InterviewID.Id]);
    }

    //Cancel scheduled Inerview
    onCancelInterviewClick(Candidate: RRFSpecificCandidateList) {
        this._rrfCandidatesList.CancelInterview(Candidate.InterviewDetails.InterviewID, 'Cancelled', '')
            .subscribe(
            (results: any) => {
                if ((<ResponseFromAPI>results).StatusCode === APIResult.Success) {
                    this.toastr.success((<ResponseFromAPI>results).Message);
                    this.getCanidatesForRRF();
                } else {
                    this.toastr.error((<ResponseFromAPI>results).Message);
                }
            },
            error => this.errorMessage = <any>error);
    }

    CheckInterviewStatus(CandidateDetails: Array<RRFSpecificCandidateList>) {
        this.AllCandidatesForRRF = CandidateDetails;
        for (var index = 0; index < CandidateDetails.length; index++) {
            if (CandidateDetails[index].InterviewDetails.Status !== null) {
                switch (CandidateDetails[index].InterviewDetails.Status.toLowerCase()) {
                    case 'selected':
                    case 'on-hold':
                    case 'rejected':
                        this.AllCandidatesForRRF[index].isInterviewScheduled = false;
                        break;
                    case 'scheduled':
                        this.AllCandidatesForRRF[index].isInterviewScheduled = true;
                        break;
                    case 'declined':
                        this.AllCandidatesForRRF[index].isInterviewScheduled = false;
                        break;
                    case 'rescheduled':
                        this.AllCandidatesForRRF[index].isInterviewScheduled = true;
                        break;
                    case 'awaiting approval':
                        this.AllCandidatesForRRF[index].isAwaitingApproval = true;
                        break;
                    default:
                        this.AllCandidatesForRRF[index].isAwaitingApproval = false;
                        break;
                }
            } else {
                CandidateDetails[index].InterviewDetails.Status = 'Not Scheduled';
                if (CandidateDetails[index].InterviewDetails.Round === null) {
                    CandidateDetails[index].InterviewDetails.Round = { Id: 0, Value: '--' };
                } if (CandidateDetails[index].InterviewDetails.Round.Value === null) {
                    CandidateDetails[index].InterviewDetails.Round.Value = '--';
                }
                if (CandidateDetails[index].InterviewDetails.InterviewMode === null) {
                    CandidateDetails[index].InterviewDetails.InterviewMode = { Id: 0, Value: '--' };
                } if (CandidateDetails[index].InterviewDetails.InterviewMode.Value === null) {
                    CandidateDetails[index].InterviewDetails.InterviewMode.Value = '--';
                }
            }
        }

    }

    getDate(interviewDate: string) {
        var d = new Date(interviewDate),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();
        if (month.length < 2) month = '0' + month;
        if (day.length < 2) day = '0' + day;

        return [day, month, year].join('-');
    }
    getTime(time: string) {
        //time:string = interviewTime;
        var intTime: Array<string> = new Array<string>();
        intTime = time.toString().match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];
        if (intTime.length > 1) { // If time format correct
            intTime = intTime.slice(1);  // Remove full string match value
            intTime[5] = +intTime[0] < 12 ? 'AM' : 'PM'; // Set AM/PM
            var adjustHr = +intTime[0] % 12 || 12; // Adjust hours
            intTime[0] = adjustHr.toString();
        }
        return intTime.join('');
    }

    isOfferGenerationVisible(lastInterviewRound: string, status: string) {
        if (lastInterviewRound.toLowerCase().includes('hr') && status.toLowerCase() !== 'awaiting approval') {
            return false;
        } else { return true; }
    }

    canCancelInterview(status: string) {
        if (status.toLowerCase() === 'scheduled' || status.toLowerCase() === 'rescheduled') {
            return false;
        } else { return true; }

    }

    //If Interview Status in 'On Hold' do not allow user to schedule interview
    canScheduleInterview(status: string) {
        if (status.toLowerCase() === 'on hold') {
            return true;
        } else {
            return false;
        }
    }
    proceedForOfferGeneration(InterviewID: MasterData) {
        if (InterviewID.Id !== null && InterviewID.Id !== undefined) {
            this._rrfCandidatesList.proceedForOfferGeneration(InterviewID, this.CandidateID, this.RRFID, new Date())
                .subscribe(
                (results: any) => {
                    if ((<ResponseFromAPI>results).StatusCode === APIResult.Success) {
                        this.toastr.success((<ResponseFromAPI>results).Message);
                    } else {
                        this.toastr.error((<ResponseFromAPI>results).Message);
                    }
                },
                error => this.errorMessage = <any>error);
        }
        var cnfrmbx: any = $('#prcedfrOffrgenration');
        cnfrmbx.modal('hide');
    }
    /**---------BEGING Transfer candidate functionality-------------*/
    /**Transfer candidat from current RRF to other Open RRF */
    transferFromUnfit(interviewDetails: any) {
        if (!this.IsAllowTransfer) {
            this.UniqueRRFCode = interviewDetails.RRFCode;
            this.getAllOpenRRFExceptTaggedRRF(interviewDetails.CandidateID);
            /**Prepare object to transfer Candidate */
            this.TransferInterviewDetails.InterviewID = interviewDetails.InterviewID;
            this.TransferInterviewDetails.CandidateID = interviewDetails.CandidateID;
            this.TransferInterviewDetails.RRFID = interviewDetails.RRFID;
            this.IsAllowTransfer = true;
        } else {
            this.resetTransferOperation();
            this.TransferInterviewDetails = new TransferInterview();
        }
    }
    /**Hide the trnasfer to other RRF section */
    onCancelTransfer() {
        this.resetTransferOperation();
        this.TransferInterviewDetails = new TransferInterview();
    }
    /**Get all open RRF Except Tagged RRFs */
    getAllOpenRRFExceptTaggedRRF(CandidateID: MasterData) {
        //TODO: Need to test After API get publish
        this._rrfDashboardService.getAllOpenRRFExceptTaggedRRF(CandidateID)
            .subscribe(
            (results: any) => {
                this.allOpenRrf = results;
            },
            error => this.errorMessage = <any>error);
    }
    /** Transfer candidat to other open rrf*/
    transferCandidate() {
        /**Preparing object for service posting */
        this.TransferInterviewDetails.TransferRRFID.Id = this.rrfToTrnasfer;
        this.TransferInterviewDetails.ApprovalType = 'Fitment Issue';
        this.TransferInterviewDetails.TransferReason = this.transferReason;
        /**Pass object to service*/
        this.TransferTo(this.TransferInterviewDetails);
    }
    /**service call to perfomr action of trnasfer */
    TransferTo(transferInterview: TransferInterview) {
        this._rrfCandidatesList.TransferToOtherRRF(transferInterview)
            .subscribe(
            (results: any) => {
                if ((<ResponseFromAPI>results).StatusCode === APIResult.Success) {
                    this.toastr.success((<ResponseFromAPI>results).Message);
                    this.getCanidatesForRRF();
                    this.getCandidatesRoundHistory(this.changeStatusCandidateID, this.selectedCandidate, '');
                    this.changeStatusInterviewID = new MasterData();
                    this.resetTransferOperation();
                    this.showChangeStatus = false;
                } else {
                    this.toastr.success((<ResponseFromAPI>results).ErrorMsg);
                }
            },
            error => this.errorMessage = <any>error);
    }
    /**Reset all field and object related to transferCandidate */
    resetTransferOperation() {
        this.IsAllowTransfer = false;
        this.TransferInterviewDetails = new TransferInterview();
        this.rrfToTrnasfer = 0;
        this.transferReason = '';
    }
    /**---------END Transfer candidate functionality-------------*/
    changeStatus(intervieID: MasterData) {
        this.changeStatusInterviewID = intervieID;
        this.showChangeStatus = true;
    }
    setActualTime(CandidateHistory: Interview) {
        this.ActualTimeInterviewID = CandidateHistory.InterviewID;
        this.CandidateHistoryForActualTime = CandidateHistory;
        this.setActualTimeForm = true;
    }
    onChangeStatus() {
        this._rrfCandidatesList.UpdateCandidateIEFStatus(this.changeStatusInterviewID, this.changedStatus, this.changesStatusComment)
            .subscribe(
            (results: any) => {
                if ((<ResponseFromAPI>results).StatusCode === APIResult.Success) {
                    this.toastr.success((<ResponseFromAPI>results).Message);
                    this.getCanidatesForRRF();
                    this.getCandidatesRoundHistory(this.changeStatusCandidateID, this.selectedCandidate, '');
                    this.changeStatusInterviewID = new MasterData();
                    this.showChangeStatus = false;
                } else {
                    this.toastr.success((<ResponseFromAPI>results).ErrorMsg);
                }
            },
            error => this.errorMessage = <any>error);

        this.changedStatus = '';
        this.changesStatusComment = '';
    }
    onSetActualTime() {
        this.InterviewDetails = { 'InterviewID': this.ActualTimeInterviewID, 'InterviewActualTime': this.actualTime };
        this._rrfCandidatesList.setActualTime(this.InterviewDetails)
            .subscribe(
            (results: any) => {
                if ((<ResponseFromAPI>results).StatusCode === APIResult.Success) {
                    this.toastr.success((<ResponseFromAPI>results).Message);
                    this.getCanidatesForRRF();
                    this.getCandidatesRoundHistory(this.changeStatusCandidateID, this.selectedCandidate, '');
                    this.changeStatusInterviewID = new MasterData();
                    this.setActualTimeForm = false;
                } else {
                    this.toastr.error((<ResponseFromAPI>results).ErrorMsg);
                }
            },
            error => this.errorMessage = <any>error);
        this.actualTime = '';
    }
    onCancelChangeStatus() {
        this.showChangeStatus = false;
    }
    onCancelActualTime() {
        this.setActualTimeForm = false;
    }
    nevigateToInitiateRRF() {
        sessionStorage.setItem('navigationPath', '/App/RRF/RRFDashboard/Candidates/' + this.RRFID.Value);
        this._router.navigate(['App/RRF/MyRRF/Add']);
    }
    redirectToView(CandidateID: MasterData) {
        sessionStorage.setItem('onProfilesReturnPath', '/App/RRF/RRFDashboard/Candidates/' + this.RRFID.Value + 'ID' + this.RRFID.Id);
        this._router.navigate(['/App/ProfileBank/MyProfiles/View/' + CandidateID.Value + 'ID' + CandidateID.Id]);
    }
    onGenerateOffer() {
        this.IsUpdateStatus = false;
        this.IsOfferGenerate = true;
        //this.ExpDateOfJoining = 'mm/dd/yyyy';
    }
    onUpdateStatus() {
        this.IsOfferGenerate = false;
        this.IsUpdateStatus = true;
        this.UpdatedStatus = '';
    }
    onCancelStatus() {
        this.IsUpdateStatus = false;
    }
    onCancelOffer() {
        this.IsOfferGenerate = false;
    }
    saveOffer(joiningDate: Date) {
        joiningDate = moment(joiningDate).format('MM-DD-YYYY');
        let OffredDate = moment(new Date()).format('MM-DD-YYYY');
        this._rrfCandidatesList.proceedForOfferGeneration(this.CandidateRoundHistory[this.CandidateRoundHistory.length - 1].InterviewID,
            this.CandidateRoundHistory[0].CandidateID, this.RRFID, joiningDate,OffredDate)
            .subscribe(
            (results: any) => {
                if ((<ResponseFromAPI>results).StatusCode === APIResult.Success) {
                    this.toastr.success((<ResponseFromAPI>results).Message);
                    this.getCanidatesForRRF();
                    this.getOfferedCanidatesForRRF();
                    this.IsOfferGenerate = false;
                } else {
                    this.toastr.error((<ResponseFromAPI>results).Message);
                }
            },
            error => this.errorMessage = <any>error);
    }
    saveUpdateStatus() {
        let abc=this.rejectDate;
        if(this.rejectReason === '' && this.rejectDate === ''){
            this._profileBankService.updateCandidateStatus(this.CandidateRoundHistory[0].CandidateID, this.selectedStatus, this.rejectReason)
            .subscribe(
            results => {
                if ((<ResponseFromAPI>results).StatusCode === APIResult.Success) {
                    this.getOfferedCanidatesForRRF();
                    this.toastr.success((<ResponseFromAPI>results).Message);
                    this.IsUpdateStatus = false;
                    this.IsOffered = false;
                    this.IsRejectReason = false;
                    this.rejectReason = '';
                    this.rejectDate = '';
                } else {
                    this.toastr.error((<ResponseFromAPI>results).ErrorMsg);
                }
            },
            error => this.errorMessage = <any>error);
        }
        if(this.rejectReason !== '' && this.rejectDate !== ''){
             this._profileBankService.updateJoinedStatus(this.CandidateRoundHistory[0].CandidateID, this.selectedStatus, this.rejectReason,this.rejectDate)
            .subscribe(
            results => {
                if ((<ResponseFromAPI>results).StatusCode === APIResult.Success) {
                    this.getOfferedCanidatesForRRF();
                    this.toastr.success((<ResponseFromAPI>results).Message);
                    this.IsUpdateStatus = false;
                    this.IsOffered = false;
                    this.IsRejectReason = false;
                    this.rejectReason = '';
                    this.rejectDate = '';
                } else {
                    this.toastr.error((<ResponseFromAPI>results).ErrorMsg);
                }
            },
            error => this.errorMessage = <any>error);
        }
    }
    Back() {
        this._router.navigate([this.ReturnPath]);
        //this.location.back();
    }
    //Format date in "yyyy-mm-dd" format
    formatDate(date: any) {
        var d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();
        if (month.length < 2) month = '0' + month;
        if (day.length < 2) day = '0' + day;

        return [year, month, day].join('-');
    }
    setMinDateToCalender() {
        var todayDate = new Date();
        this.mindate = (<any>this.formatDate(todayDate));
    }
    onFinalOperation(status:any){
        if(status === '4'){
            this.IsReject = false;
            this.onGenerateOffer();
        }
        if(status === '12'){
            this.IsReject = true;
            this.IsOfferGenerate = false;
        }
    }
    onCancelReject(){
        this.IsReject = false;
    }
    onSelectStatus(status: string) {
        if(status === '7'){
            this.IsRejectReason = true;
            this.selectedStatus.Id = parseInt(status);
            this.selectedStatus.Value = null;
        }
        else{
            this.IsRejectReason = false;
            this.rejectReason = '';
            this.rejectDate='';
            this.selectedStatus.Id = parseInt(status);
            this.selectedStatus.Value = null;
        }
    }
    UpdateFinalStatus(comment:string){
        this.finalStatus.Id= parseInt(this.finalStatus.Id);
        this._profileBankService.updateCandidateStatusAndInterviewStatus(this.CandidateRoundHistory[0].CandidateID, this.finalStatus, comment,this.candidateInterviewId)
            .subscribe(
            results => {
                if ((<ResponseFromAPI>results).StatusCode === APIResult.Success) {
                    this.toastr.success((<ResponseFromAPI>results).Message);
                    this.IsUpdateStatus = false;
                    this.IsOffered = false;
                    this.getCanidatesForRRF();
                    this.IsReject = false;
                    this.IsOfferGenerate = false;
                } else {
                    this.toastr.error((<ResponseFromAPI>results).ErrorMsg);
                }
            },
            error => this.errorMessage = <any>error);
    }
}
