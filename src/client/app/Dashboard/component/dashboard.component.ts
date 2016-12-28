import {Component, OnInit} from '@angular/core';
import { ROUTER_DIRECTIVES} from '@angular/router';
import {CAROUSEL_DIRECTIVES, TOOLTIP_DIRECTIVES, BUTTON_DIRECTIVES} from 'ng2-bootstrap/ng2-bootstrap';
import { RecruitersDashboardService } from '../Reqruiter/index';
import { InterviewApprovalComponent} from '../../recruitmentCycle/shared/index';
import { IfAuthorizeDirective } from '../../shared/directives/ifAuthorize.directive';
import {
    GuageChartData,
    PiechartData } from '../index';
import {
    GraphComponent,
    PiechartComponent,
    GaugeChartComponent,
    AnimatedPieComponent,
    StackedColumnComponent,
    StackedBarComponent,
    CandidateDetailComponent} from '../../shared/index';
import { MasterData, ResponseFromAPI} from '../../shared/model/common.model';
import {Interview} from '../../recruitmentCycle/shared/model/interview';
import { CandidateProfile, AllCandidateProfiles, BarChartData } from  '../../profileBank/shared/model/myProfilesInfo';
import {CHART_DIRECTIVES} from 'ng2-charts/ng2-charts';

import {RRFCandidateListService} from '../../RRF/RRFDashboard/services/RRFCandidatesList.service';
import {RRFSpecificCandidateList, TransferInterview} from '../../RRF/RRFDashboard/model/RRFCandidateList';
import { GrdOptions } from '../../shared/model/common.model';
import { DetailProfileComponent } from '../../profileBank/shared/component/detailProfile.component';
import { RRFDetails, AllRRFStatusCount  } from '../../RRF/myRRF/models/rrfDetails';
import { RRFGridRowComponent} from '../../RRF/shared/components/RRFGridRow/RRFGridRow.component';
import { InterviewApproval } from '../../recruitmentCycle/shared/component/InterviewApproval/model/interviewApproval';
import { InterviewApprovalGridRowComponent } from  '../../recruitmentCycle/shared/component/InterviewApprovalGridRow/InterviewApprovalGridRow.component';
@Component({
    moduleId: module.id,
    selector: 'dashboard-component',
    templateUrl: 'dashboard.component.html',
    directives: [ROUTER_DIRECTIVES,
        GraphComponent,
        PiechartComponent,
        GaugeChartComponent,
        AnimatedPieComponent,
        StackedColumnComponent,
        StackedBarComponent,
        InterviewApprovalComponent,
        IfAuthorizeDirective,
        CandidateDetailComponent,
        CHART_DIRECTIVES,
        DetailProfileComponent,
        RRFGridRowComponent,
        InterviewApprovalGridRowComponent
    ],
    providers: [RecruitersDashboardService, RRFCandidateListService]
})

export class DashboardComponent implements OnInit {
    onNotify(InputString: any): void {
        switch (InputString.message) {
            case 'FromPieChart': this.GetRRFStatusCount(InputString.inputstring);
                break;
            case 'FromStackedColChart': this.GetTaggedCandidateStatusCount(InputString.inputstring, InputString.inputstring2);
                break;
            case 'FromCandidateDetails': this.GetCandidatesRoundHistory(InputString.inputstring, InputString.inputstring2);
                break;
            case 'FromAmChart': this.getCanidatesForRRF(InputString.inputstring, InputString.inputstring2, InputString.inputstring3);
                break;
        }

    }
    errorMessage: string;
    /************BEGIN RECRUITER'S DASHBOARD properties */
    OpenRRF: any[];
    guageData: any[];
    OverdueRRF: any[];
    Incomplete: any[];
    CandidateJoining: any[];
    AllCandidatesForRRF: RRFSpecificCandidateList[];
    isNull: boolean = false;
    IsBarchartDataShow: boolean = false;
    IsStackColChart: boolean = false;
    IsAmchart: boolean = false;
    IsPieChart: boolean = false;
    CandidateRoundHistory: Array<Interview>;
    changeStatusCandidateID: MasterData = new MasterData();
    status: string;
    rrf: string;
    round: string;
    public barChartLabels: string[] = new Array<string>();
    public barChartType: string = 'bar';
    public barChartLegend: boolean = true;
    public barChartData: any[] = new Array<string>();
    public barChartOptions: any = {
        scaleShowVerticalLines: false,
        responsive: true
    };
    RRFID: MasterData = new MasterData();
    grdOptionsIncompeteProfiles: GrdOptions = new GrdOptions();
    IncompleteProfileList: AllCandidateProfiles = new AllCandidateProfiles();
    IsProfile: boolean = false;
    IsRRF: boolean = false;
    IsInterview:boolean = false;
    NoDataFound: boolean = false;
    Title: string;
    rrfList: RRFDetails[] = [];
    interviewApproval: InterviewApproval[] = [];
    /************END RECRUITER'S DASHBOARD properties */
    /************BEGIN INITIATOR DASHBOARD properties */
    Open: string = '0';
    Pending: string = '0';
    StatusWiseRrfCount: any = [];
    PendingFeedback: any;
    InterviewAwaiting: any;
    RRFAwaiting: any;
    OpenRRFCount: any;
    /************END INITIATOR DASHBOARD properties */
    /************BEGIN RECRUITER HEAD DASHBOARD properties */
    offeredCandidateCount: any;
    rrfTimeline: any;
    OfferedCandidate: any;
    public chartDataForPie: any = [];
    public chartDataForColumnChart: any[];
    public rrfCode: any;
    public ChartDataForStackedColChart: any = [];
    public chartDataForAnimatedPie: any = {
        '1995': [
            { 'sector': 'Agriculture', 'size': 6.6 },
            { 'sector': 'Mining and Quarrying', 'size': 0.6 },
            { 'sector': 'Manufacturing', 'size': 23.2 },
            { 'sector': 'Electricity and Water', 'size': 2.2 },
            { 'sector': 'Construction', 'size': 4.5 },
            { 'sector': 'Trade (Wholesale, Retail, Motor)', 'size': 14.6 },
            { 'sector': 'Transport and Communication', 'size': 9.3 },
            { 'sector': 'Finance, real estate and business services', 'size': 22.5 }],
        '1996': [
            { 'sector': 'Agriculture', 'size': 6.4 },
            { 'sector': 'Mining and Quarrying', 'size': 0.5 },
            { 'sector': 'Manufacturing', 'size': 22.4 },
            { 'sector': 'Electricity and Water', 'size': 2 },
            { 'sector': 'Construction', 'size': 4.2 },
            { 'sector': 'Trade (Wholesale, Retail, Motor)', 'size': 14.8 },
            { 'sector': 'Transport and Communication', 'size': 9.7 },
            { 'sector': 'Finance, real estate and business services', 'size': 22 }],
        '1997': [
            { 'sector': 'Agriculture', 'size': 6.1 },
            { 'sector': 'Mining and Quarrying', 'size': 0.2 },
            { 'sector': 'Manufacturing', 'size': 20.9 },
            { 'sector': 'Electricity and Water', 'size': 1.8 },
            { 'sector': 'Construction', 'size': 4.2 },
            { 'sector': 'Trade (Wholesale, Retail, Motor)', 'size': 13.7 },
            { 'sector': 'Transport and Communication', 'size': 9.4 },
            { 'sector': 'Finance, real estate and business services', 'size': 22.1 }],
        '1998': [
            { 'sector': 'Agriculture', 'size': 6.2 },
            { 'sector': 'Mining and Quarrying', 'size': 0.3 },
            { 'sector': 'Manufacturing', 'size': 21.4 },
            { 'sector': 'Electricity and Water', 'size': 1.9 },
            { 'sector': 'Construction', 'size': 4.2 },
            { 'sector': 'Trade (Wholesale, Retail, Motor)', 'size': 14.5 },
            { 'sector': 'Transport and Communication', 'size': 10.6 },
            { 'sector': 'Finance, real estate and business services', 'size': 23 }],
        '1999': [
            { 'sector': 'Agriculture', 'size': 5.7 },
            { 'sector': 'Mining and Quarrying', 'size': 0.2 },
            { 'sector': 'Manufacturing', 'size': 20 },
            { 'sector': 'Electricity and Water', 'size': 1.8 },
            { 'sector': 'Construction', 'size': 4.4 },
            { 'sector': 'Trade (Wholesale, Retail, Motor)', 'size': 15.2 },
            { 'sector': 'Transport and Communication', 'size': 10.5 },
            { 'sector': 'Finance, real estate and business services', 'size': 24.7 }],
        '2000': [
            { 'sector': 'Agriculture', 'size': 5.1 },
            { 'sector': 'Mining and Quarrying', 'size': 0.3 },
            { 'sector': 'Manufacturing', 'size': 20.4 },
            { 'sector': 'Electricity and Water', 'size': 1.7 },
            { 'sector': 'Construction', 'size': 4 },
            { 'sector': 'Trade (Wholesale, Retail, Motor)', 'size': 16.3 },
            { 'sector': 'Transport and Communication', 'size': 10.7 },
            { 'sector': 'Finance, real estate and business services', 'size': 24.6 }],
        '2001': [
            { 'sector': 'Agriculture', 'size': 5.5 },
            { 'sector': 'Mining and Quarrying', 'size': 0.2 },
            { 'sector': 'Manufacturing', 'size': 20.3 },
            { 'sector': 'Electricity and Water', 'size': 1.6 },
            { 'sector': 'Construction', 'size': 3.1 },
            { 'sector': 'Trade (Wholesale, Retail, Motor)', 'size': 16.3 },
            { 'sector': 'Transport and Communication', 'size': 10.7 },
            { 'sector': 'Finance, real estate and business services', 'size': 25.8 }],
        '2002': [
            { 'sector': 'Agriculture', 'size': 5.7 },
            { 'sector': 'Mining and Quarrying', 'size': 0.2 },
            { 'sector': 'Manufacturing', 'size': 20.5 },
            { 'sector': 'Electricity and Water', 'size': 1.6 },
            { 'sector': 'Construction', 'size': 3.6 },
            { 'sector': 'Trade (Wholesale, Retail, Motor)', 'size': 16.1 },
            { 'sector': 'Transport and Communication', 'size': 10.7 },
            { 'sector': 'Finance, real estate and business services', 'size': 26 }],
        '2003': [
            { 'sector': 'Agriculture', 'size': 4.9 },
            { 'sector': 'Mining and Quarrying', 'size': 0.2 },
            { 'sector': 'Manufacturing', 'size': 19.4 },
            { 'sector': 'Electricity and Water', 'size': 1.5 },
            { 'sector': 'Construction', 'size': 3.3 },
            { 'sector': 'Trade (Wholesale, Retail, Motor)', 'size': 16.2 },
            { 'sector': 'Transport and Communication', 'size': 11 },
            { 'sector': 'Finance, real estate and business services', 'size': 27.5 }],
        '2004': [
            { 'sector': 'Agriculture', 'size': 4.7 },
            { 'sector': 'Mining and Quarrying', 'size': 0.2 },
            { 'sector': 'Manufacturing', 'size': 18.4 },
            { 'sector': 'Electricity and Water', 'size': 1.4 },
            { 'sector': 'Construction', 'size': 3.3 },
            { 'sector': 'Trade (Wholesale, Retail, Motor)', 'size': 16.9 },
            { 'sector': 'Transport and Communication', 'size': 10.6 },
            { 'sector': 'Finance, real estate and business services', 'size': 28.1 }],
        '2005': [
            { 'sector': 'Agriculture', 'size': 4.3 },
            { 'sector': 'Mining and Quarrying', 'size': 0.2 },
            { 'sector': 'Manufacturing', 'size': 18.1 },
            { 'sector': 'Electricity and Water', 'size': 1.4 },
            { 'sector': 'Construction', 'size': 3.9 },
            { 'sector': 'Trade (Wholesale, Retail, Motor)', 'size': 15.7 },
            { 'sector': 'Transport and Communication', 'size': 10.6 },
            { 'sector': 'Finance, real estate and business services', 'size': 29.1 }],
        '2006': [
            { 'sector': 'Agriculture', 'size': 4 },
            { 'sector': 'Mining and Quarrying', 'size': 0.2 },
            { 'sector': 'Manufacturing', 'size': 16.5 },
            { 'sector': 'Electricity and Water', 'size': 1.3 },
            { 'sector': 'Construction', 'size': 3.7 },
            { 'sector': 'Trade (Wholesale, Retail, Motor)', 'size': 14.2 },
            { 'sector': 'Transport and Communication', 'size': 12.1 },
            { 'sector': 'Finance, real estate and business services', 'size': 29.1 }],
        '2007': [
            { 'sector': 'Agriculture', 'size': 4.7 },
            { 'sector': 'Mining and Quarrying', 'size': 0.2 },
            { 'sector': 'Manufacturing', 'size': 16.2 },
            { 'sector': 'Electricity and Water', 'size': 1.2 },
            { 'sector': 'Construction', 'size': 4.1 },
            { 'sector': 'Trade (Wholesale, Retail, Motor)', 'size': 15.6 },
            { 'sector': 'Transport and Communication', 'size': 11.2 },
            { 'sector': 'Finance, real estate and business services', 'size': 30.4 }],
        '2008': [
            { 'sector': 'Agriculture', 'size': 4.9 },
            { 'sector': 'Mining and Quarrying', 'size': 0.3 },
            { 'sector': 'Manufacturing', 'size': 17.2 },
            { 'sector': 'Electricity and Water', 'size': 1.4 },
            { 'sector': 'Construction', 'size': 5.1 },
            { 'sector': 'Trade (Wholesale, Retail, Motor)', 'size': 15.4 },
            { 'sector': 'Transport and Communication', 'size': 11.1 },
            { 'sector': 'Finance, real estate and business services', 'size': 28.4 }],
        '2009': [
            { 'sector': 'Agriculture', 'size': 4.7 },
            { 'sector': 'Mining and Quarrying', 'size': 0.3 },
            { 'sector': 'Manufacturing', 'size': 16.4 },
            { 'sector': 'Electricity and Water', 'size': 1.9 },
            { 'sector': 'Construction', 'size': 4.9 },
            { 'sector': 'Trade (Wholesale, Retail, Motor)', 'size': 15.5 },
            { 'sector': 'Transport and Communication', 'size': 10.9 },
            { 'sector': 'Finance, real estate and business services', 'size': 27.9 }],
        '2010': [
            { 'sector': 'Agriculture', 'size': 4.2 },
            { 'sector': 'Mining and Quarrying', 'size': 0.3 },
            { 'sector': 'Manufacturing', 'size': 16.2 },
            { 'sector': 'Electricity and Water', 'size': 2.2 },
            { 'sector': 'Construction', 'size': 4.3 },
            { 'sector': 'Trade (Wholesale, Retail, Motor)', 'size': 15.7 },
            { 'sector': 'Transport and Communication', 'size': 10.2 },
            { 'sector': 'Finance, real estate and business services', 'size': 28.8 }],
        '2011': [
            { 'sector': 'Agriculture', 'size': 4.1 },
            { 'sector': 'Mining and Quarrying', 'size': 0.3 },
            { 'sector': 'Manufacturing', 'size': 14.9 },
            { 'sector': 'Electricity and Water', 'size': 2.3 },
            { 'sector': 'Construction', 'size': 5 },
            { 'sector': 'Trade (Wholesale, Retail, Motor)', 'size': 17.3 },
            { 'sector': 'Transport and Communication', 'size': 10.2 },
            { 'sector': 'Finance, real estate and business services', 'size': 27.2 }],
        '2012': [
            { 'sector': 'Agriculture', 'size': 3.8 },
            { 'sector': 'Mining and Quarrying', 'size': 0.3 },
            { 'sector': 'Manufacturing', 'size': 14.9 },
            { 'sector': 'Electricity and Water', 'size': 2.6 },
            { 'sector': 'Construction', 'size': 5.1 },
            { 'sector': 'Trade (Wholesale, Retail, Motor)', 'size': 15.8 },
            { 'sector': 'Transport and Communication', 'size': 10.7 },
            { 'sector': 'Finance, real estate and business services', 'size': 28 }],
        '2013': [
            { 'sector': 'Agriculture', 'size': 3.7 },
            { 'sector': 'Mining and Quarrying', 'size': 0.2 },
            { 'sector': 'Manufacturing', 'size': 14.9 },
            { 'sector': 'Electricity and Water', 'size': 2.7 },
            { 'sector': 'Construction', 'size': 5.7 },
            { 'sector': 'Trade (Wholesale, Retail, Motor)', 'size': 16.5 },
            { 'sector': 'Transport and Communication', 'size': 10.5 },
            { 'sector': 'Finance, real estate and business services', 'size': 26.6 }],
        '2014': [
            { 'sector': 'Agriculture', 'size': 3.9 },
            { 'sector': 'Mining and Quarrying', 'size': 0.2 },
            { 'sector': 'Manufacturing', 'size': 14.5 },
            { 'sector': 'Electricity and Water', 'size': 2.7 },
            { 'sector': 'Construction', 'size': 5.6 },
            { 'sector': 'Trade (Wholesale, Retail, Motor)', 'size': 16.6 },
            { 'sector': 'Transport and Communication', 'size': 10.5 },
            { 'sector': 'Finance, real estate and business services', 'size': 26.5 }]
    };
    /************END RECRUITER HEAD DASHBOARD properties */

    constructor(private dashboardService: RecruitersDashboardService,
        private _rrfCandidatesList: RRFCandidateListService
    ) { }

    ngOnInit() {

        $('.counter').counterUp({
            delay: 10,
            time: 1000
        });
        //Recruiters
        this.GetAssignedOpenRRFCount();
        this.GetAllOpenRRFCount();
        this.GetAllOverdueRRFCount();
        this.GetIncompleteProfileCount();
        this.GetCandidateJoining();
        this.GetRrfStatusForGuage();
        this.GetRrfTimeline();
        //this.getCanidatesForRRF();
        //Initiator
        this.GetStatusWiseRRFCount();
        this.GetPendingFeedbackCount();
        this.GetInterviewAwaitingCount();
        this.GetRRFAwaitingCount();
        //Head
        this.GetAllRrfStatusCount();
        //this.GetRRFStatusCount('Open');
        //this.GetTaggedCandidateStatusCount('RRF6499265970');
        this.GetAllOfferedCandidateCount();
        //this.GetAllOverdueRRFCount();
        //this.GetIncompleteProfileCount();
        //this.GetCandidateJoining();

    }

    /************BEGIN RECRUITER'S DATA************/
    getCanidatesForRRF(round: any, rrfid: any, status: any) {
        this._rrfCandidatesList.getCandidatesForSelectedRRF(round, rrfid, status)
            .subscribe(
            (results: any) => {
                if (results.length > 0) {
                    // this.AllCandidatesForRRF = results;
                    this.isNull = true;
                    //this.IsBarchartDataShow = true;
                    this.CheckInterviewStatus(results);
                } else {
                    //If No data present
                    this.isNull = false;
                    this.IsBarchartDataShow = false;
                    this.round = round;
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
                        //case 're-scheduled':
                        // case 'Cancelled':
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
    chartClicked(e: any): void {
        //console.log(e);
    }

    chartHovered(e: any): void {
        //console.log(e);
    }
    /**Get all Open RRF's count */
    GetAllOpenRRFCount(): void {
        this.dashboardService.getMyOpenCountForRecruiter()
            .subscribe(
            results => {
                this.OpenRRF = <any>results;
                if (this.OpenRRF.length > 0) {
                    for (var index = 0; index < this.OpenRRF.length; index++) {
                        if (this.OpenRRF[index].title.toLowerCase() === 'open') {
                            //this.OpenRRFCount = this.OpenRRF[index].value;
                        }
                    }
                }
            },
            error => this.errorMessage = <any>error);
    }
    /**Get all Open RRF's count */
    GetAssignedOpenRRFCount(): void {
        this.dashboardService.getAssginedOpenRRFCount()
            .subscribe(
            results => {
                this.OpenRRFCount = <any>results;
            },
            error => this.errorMessage = <any>error);
    }
    /**Get all Overdue RRF's count */
    GetAllOverdueRRFCount(): void {
        this.dashboardService.getAllOverdueRRFCount()
            .subscribe(
            results => {
                this.OverdueRRF = <any>results;
            },
            error => this.errorMessage = <any>error);
    }
    /**Get all Incomplete Profile Count*/
    GetIncompleteProfileCount(): void {
        this.dashboardService.getIncompleteProfileCount()
            .subscribe(
            results => {
                this.Incomplete = <any>results;
            },
            error => this.errorMessage = <any>error);
    }
    /**Get all Candidate Joining this month Count*/
    GetCandidateJoining(): void {
        //TODO: need to update API in Service
        this.dashboardService.getCandidateJoining()
            .subscribe(
            results => {
                this.CandidateJoining = <any>results;
            },
            error => this.errorMessage = <any>error);
    }
    /**Get status wise RRF Count for Initiator*/
    GetRrfStatusForGuage(): void {
        this.dashboardService.getRrfStatusForGuage()
            .subscribe(
            results => {
                this.guageData = <any>results;
            },
            error => this.errorMessage = <any>error);
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
                    this.barChartLabels = barChartData.functions.map(ele => {
                        return ele.length > 25 ? ele.substring(0, 20) + '...' : ele;
                    });;
                    this.barChartData = barChartData.ratingsData;
                } else {
                    this.IsBarchartDataShow = false;
                }
            },
            error => this.errorMessage = <any>error);
    }
    // get Interview history of candidate
    GetCandidatesRoundHistory(CandidateID: MasterData, RRFID: MasterData) {
        this.CandidateRoundHistory = new Array<Interview>();
        this.changeStatusCandidateID = CandidateID;
        this._rrfCandidatesList.getInterviewRoundHistorybyCandidateId(CandidateID, RRFID)
            .subscribe(
            (results: any) => {
                if (results !== null && results.length > 0) {
                    this.CandidateRoundHistory = <any>results;
                    this.BindRatingChart(CandidateID, this.CandidateRoundHistory[0].RRFID);
                }
            },
            error => this.errorMessage = <any>error);

    }
    /************END RECRUITER'S DATA */

    /************BEGIN INITIATOR DATA*************/
    /**Get status wise RRF Count for Initiator*/
    GetStatusWiseRRFCount(): void {
        this.dashboardService.getStatusWiseRRFCount()
            .subscribe(
            results => {
                this.StatusWiseRrfCount = <any>results;
                if (this.StatusWiseRrfCount.length > 0) {
                    for (var index = 0; index < this.StatusWiseRrfCount.length; index++) {
                        if (this.StatusWiseRrfCount[index].title.toLowerCase() === 'pending approval') {
                            this.Pending = this.StatusWiseRrfCount[index].value;
                        }
                        if (this.StatusWiseRrfCount[index].title.toLowerCase() === 'open') {
                            this.Open = this.StatusWiseRrfCount[index].value;
                        }
                    }


                }
            },
            error => this.errorMessage = <any>error);
    }
    /**Get Pending Feedback for RRF count*/
    GetPendingFeedbackCount(): void {
        this.dashboardService.getPendingFeedbackCount()
            .subscribe(
            results => {
                this.PendingFeedback = <any>results;
            },
            error => this.errorMessage = <any>error);
    }
    /**Get Interview awaiting approval count*/
    GetInterviewAwaitingCount(): void {
        this.dashboardService.getInterviewAwaitingCount()
            .subscribe(
            results => {
                this.InterviewAwaiting = <any>results;
            },
            error => this.errorMessage = <any>error);
    }
    /**Get RRF awaiting approval count*/
    GetRRFAwaitingCount(): void {
        this.dashboardService.getRRFAwaitingCount()
            .subscribe(
            results => {
                this.RRFAwaiting = <any>results;
            },
            error => this.errorMessage = <any>error);
    }
    /************END INITIATOR DATA */

    /************BEGIN HEAD DATA************/
    /**Get all RRF's status wise count */
    GetAllRrfStatusCount(): void {
        this.dashboardService.getAllStatusCount()
            .subscribe(
            (results: any) => {
                if (results.length > 0) {
                    this.chartDataForPie = results;
                    this.IsPieChart = true;
                    var _status = this.chartDataForPie[0].title !== null ? this.chartDataForPie[0].title : '';
                    this.GetRRFStatusCount(_status);
                } else {
                    this.IsPieChart = false;
                    this.IsStackColChart = false;
                    this.IsAmchart = false;
                    this.isNull = false;
                    this.IsBarchartDataShow = false;
                }

            },
            error => this.errorMessage = <any>error);
    }
    /**Get all RRF's status wise count */
    GetRRFStatusCount(_status: string): void {
        this.dashboardService.getRRFStatusCount(_status)
            .subscribe(
            (results: any) => {
                //this.chartDataForColumnChart = <any>results;
                if (results.length > 0) {
                    this.status = _status;
                    this.ChartDataForStackedColChart = <any>results;
                    this.IsStackColChart = true;

                    var _rrfid = this.ChartDataForStackedColChart[0].RRFID.Value !== null ?
                        this.ChartDataForStackedColChart[0].RRFID.Value : 0;
                    this.GetTaggedCandidateStatusCount(_rrfid, this.ChartDataForStackedColChart[0].status);
                } else {
                    this.IsStackColChart = false;
                    this.IsAmchart = false;
                    this.isNull = false;
                    this.IsBarchartDataShow = false;
                    this.rrf = '';
                    this.status = _status;
                }

            },
            error => this.errorMessage = <any>error);
    }
    /**Get all RRF with its status time remains to complete OR Overdue days */
    GetRrfTimeline(): void {
        this.dashboardService.getRrfTimeline()
            .subscribe(
            results => {
                this.rrfTimeline = <any>results;
            },
            error => this.errorMessage = <any>error);
    }
    /**Get all interview round wise candidate count for specific RRF*/
    GetTaggedCandidateStatusCount(_rrfCode: string, _rrfLabel: string): void {
        this.dashboardService.getTaggedCandidateStatusCount(_rrfCode)
            .subscribe(
            (results: any) => {
                this.rrfCode = _rrfCode;
                this.rrf = _rrfLabel;
                if (results.length > 0) {
                    this.chartDataForColumnChart = <any>results;
                    this.IsAmchart = true;
                    for (var index = 0; index < this.chartDataForColumnChart.length; index++) {
                        if (this.chartDataForColumnChart[index].fitmentIssueVal > 0) {
                            var round = this.chartDataForColumnChart[index].status !== null ?
                                this.chartDataForColumnChart[index].status : '';
                            var status = 'Fitment Issue';
                            break;
                        }
                        if (this.chartDataForColumnChart[index].onholdVal > 0) {
                            var round = this.chartDataForColumnChart[index].status !== null ?
                                this.chartDataForColumnChart[index].status : '';
                            var status = 'On Hold';
                            break;
                        }
                        if (this.chartDataForColumnChart[index].rejectedVal > 0) {
                            var round = this.chartDataForColumnChart[index].status !== null ?
                                this.chartDataForColumnChart[index].status : '';
                            var status = 'Rejected';
                            break;
                        }
                        if (this.chartDataForColumnChart[index].scheduledVal > 0) {
                            var round = this.chartDataForColumnChart[index].status !== null ?
                                this.chartDataForColumnChart[index].status : '';
                            var status = 'Scheduled';
                            break;
                        }
                        if (this.chartDataForColumnChart[index].selectedVal > 0) {
                            var round = this.chartDataForColumnChart[index].status !== null ?
                                this.chartDataForColumnChart[index].status : '';
                            var status = 'Selected';
                            break;
                        }
                        if (this.chartDataForColumnChart[index].taggedVal > 0) {
                            var round = this.chartDataForColumnChart[index].status !== null ?
                                this.chartDataForColumnChart[index].status : '';
                            var status = 'Not Scheduled';
                            break;
                        }
                    }

                    this.getCanidatesForRRF(round, this.rrfCode, status);
                } else {
                    this.IsAmchart = false;
                    this.isNull = false;
                    this.IsBarchartDataShow = false;
                    this.rrf = _rrfLabel;
                }

            },
            error => this.errorMessage = <any>error);
    }
    /**Get all offered candidate count */
    GetAllOfferedCandidateCount(): void {
        this.dashboardService.getAllOfferedCandidateCount()
            .subscribe(
            results => {
                this.OfferedCandidate = <any>results;
                if (this.OfferedCandidate.length > 0) {
                    for (var index = 0; index < this.OfferedCandidate.length; index++) {
                        if (this.OfferedCandidate[index].title.toLowerCase() === 'offered') {
                            this.offeredCandidateCount = this.OfferedCandidate[index].value;
                        }
                    }
                }
            },
            error => this.errorMessage = <any>error);
    }
    // get imcomplete profiles for count
    GetIncompletesProfiles() {
        this.IncompleteProfileList = new AllCandidateProfiles();
        this.dashboardService.getIncompleteProfile(this.grdOptionsIncompeteProfiles)
            .subscribe(
            (results: any) => {
                if (results.Profiles !== undefined && results.Profiles.length > 0) {
                    this.IsProfile = true;
                    this.IsRRF = false;
                    this.IsInterview = false;
                    this.NoDataFound = false;
                    this.IncompleteProfileList = <any>results;
                } else {
                    this.IsRRF = false;
                    this.IsInterview = false;
                    this.NoDataFound = true;
                }
                this.Title = 'Incomplete Profile';
                let modl: any = $('#CountDetails');
                modl.modal({ 'backdrop': 'static' });
            },
            error => this.errorMessage = <any>error);

    }
    onCancelClick() {
        let modl: any = $('#CountDetails');
        modl.modal('toggle');
    }
    GetOverdueRRF() {
        this.rrfList =[];
        this.dashboardService.getOverdueRRF(this.grdOptionsIncompeteProfiles)
            .subscribe(
            (results: any) => {
                if (results.RRFs !== undefined && results.RRFs.length > 0) {
                    this.IsProfile = false;
                    this.IsInterview = false;
                    this.IsRRF = true;
                    this.NoDataFound = false;
                    this.rrfList = (<any>(results)).RRFs;
                } else {
                    this.IsProfile = false;
                    this.IsInterview = false;
                    this.NoDataFound = true;
                }
                this.Title = 'Overdue RRF';
                let modl: any = $('#CountDetails');
                modl.modal({ 'backdrop': 'static' });
            },
            error => this.errorMessage = <any>error);
    }
    GetOfferedCandidate() {
         this.IncompleteProfileList = new AllCandidateProfiles();
        this.dashboardService.getOfferedCandidatesList('Offered')
            .subscribe(
            (results: any) => {
                if (results !== undefined && results.length > 0) {
                    this.IsProfile = true;
                    this.IsRRF = false;
                    this.IsInterview = false;
                    this.NoDataFound = false;
                    this.IncompleteProfileList.Profiles = <any>results;
                } else {
                    this.IsRRF = false;
                    this.IsInterview = false;
                    this.NoDataFound = true;
                }
                this.Title = 'Offered Candidates';
                let modl: any = $('#CountDetails');
                modl.modal({ 'backdrop': 'static' });
            },
            error => this.errorMessage = <any>error);
    }
    GetJoiningCandidate() {
        this.IncompleteProfileList = new AllCandidateProfiles();
        this.dashboardService.getCandidatesjoining(this.grdOptionsIncompeteProfiles)
            .subscribe(
            (results: any) => {
                if (results.Profiles !== undefined && results.Profiles.length > 0) {
                    this.IsProfile = true;
                    this.IsRRF = false;
                    this.IsInterview = false;
                    this.NoDataFound = false;
                    this.IncompleteProfileList = <any>results;
                } else {
                    this.IsRRF = false;
                    this.IsInterview = false;
                    this.NoDataFound = true;
                }
                //this.Title = 'Candidate Joining This Month';
                let modl: any = $('#CountDetails');
                modl.modal({ 'backdrop': 'static' });
            },
            error => this.errorMessage = <any>error);
    }
    GetPendingRRF() {
        this.rrfList =[];
        this.dashboardService.getPendingRRFApproval(this.grdOptionsIncompeteProfiles,'Pending Approval')
            .subscribe(
            (results: any) => {
                if (results.RRFs !== undefined && results.RRFs.length > 0) {
                    this.IsProfile = false;
                    this.IsInterview = false;
                    this.IsRRF = true;
                    this.NoDataFound = false;
                    this.rrfList = (<any>(results)).RRFs;
                } else {
                    this.IsProfile = false;
                    this.IsInterview = false;
                    this.NoDataFound = true;
                }
                this.Title = 'Pending RRF';
                let modl: any = $('#CountDetails');
                modl.modal({ 'backdrop': 'static' });
            },
            error => this.errorMessage = <any>error);
    }
    GetOpenRRF() {
        this.rrfList =[];
        this.dashboardService.getAllRRF()
            .subscribe(
            (results: any) => {
                if (results.RRFs !== undefined && results.RRFs.length > 0) {
                    this.IsProfile = false;
                    this.IsInterview = false;
                    this.IsRRF = true;
                    this.NoDataFound = false;
                    this.rrfList = (<any>(results)).RRFs;
                } else {
                    this.IsProfile = false;
                    this.IsInterview = false;
                    this.NoDataFound = true;
                }
                this.Title = 'Open RRF';
                let modl: any = $('#CountDetails');
                modl.modal({ 'backdrop': 'static' });
            },
            error => this.errorMessage = <any>error);
    }
    GetFeedbackPending() {
        this.rrfList =[];
        this.dashboardService.getFeedbackPendingRRF(this.grdOptionsIncompeteProfiles)
            .subscribe(
            (results: any) => {
                if (results.RRFs !== undefined && results.RRFs.length > 0) {
                    this.IsProfile = false;
                    this.IsInterview = false;
                    this.IsRRF = true;
                    this.NoDataFound = false;
                    this.rrfList = (<any>(results)).RRFs;
                } else {
                    this.IsProfile = false;
                    this.IsInterview = false;
                    this.NoDataFound = true;
                }
                this.Title = 'Feedback Pending';
                let modl: any = $('#CountDetails');
                modl.modal({ 'backdrop': 'static' });
            },
            error => this.errorMessage = <any>error);
    }
    GetRRFAwaiting() {
         this.rrfList =[];
        this.dashboardService.getPendingRRFApproval(this.grdOptionsIncompeteProfiles)
            .subscribe(
            (results: any) => {
                if (results.RRFs !== undefined && results.RRFs.length > 0) {
                    this.IsProfile = false;
                    this.IsInterview = false;
                    this.IsRRF = true;
                    this.NoDataFound = false;
                    this.rrfList = (<any>(results)).RRFs;
                } else {
                    this.IsProfile = false;
                    this.IsInterview = false;
                    this.NoDataFound = true;
                }
                this.Title = 'RRF Approvals';
                let modl: any = $('#CountDetails');
                modl.modal({ 'backdrop': 'static' });
            },
            error => this.errorMessage = <any>error);
    }
    GetInterviewAwaiting() {
        this.dashboardService.getListOfInterviewReqApproval(this.grdOptionsIncompeteProfiles)
            .subscribe(
            (results: any) => {
                if (results.AllInterviews !== undefined && results.AllInterviews.length > 0) {
                    this.IsProfile = false;
                    this.IsInterview = true;
                    this.IsRRF = false;
                    this.NoDataFound = false;
                    this.interviewApproval = (<any>(results)).AllInterviews;
                } else {
                    this.IsProfile = false;
                    this.IsRRF = false;
                    this.NoDataFound = true;
                }
                this.Title = 'Interview Approvals';
                let modl: any = $('#CountDetails');
                modl.modal({ 'backdrop': 'static' });
            },
            error => this.errorMessage = <any>error);
    }
    GetAssigenedOpenRRF() {
        this.rrfList =[];
        this.dashboardService.getAssignedOpenRRF(this.grdOptionsIncompeteProfiles)
            .subscribe(
            (results: any) => {
                if (results.RRFs !== undefined && results.RRFs.length > 0) {
                    this.IsProfile = false;
                    this.IsInterview = false;
                    this.IsRRF = true;
                    this.NoDataFound = false;
                    this.rrfList = (<any>(results)).RRFs;
                } else {
                    this.IsProfile = false;
                    this.IsInterview = false;
                    this.NoDataFound = true;
                }
                this.Title = 'Assigned Open RRF';
                let modl: any = $('#CountDetails');
                modl.modal({ 'backdrop': 'static' });
            },
            error => this.errorMessage = <any>error);
    }
    /**Get all Overdue RRF's count */
    // GetAllOverdueRRFCount(): void {
    //     this.dashboardService.getAllOverdueRRFCount()
    //         .subscribe(
    //         results => {
    //             //this.chartDataForColumnChart = <any>results;
    //             this.OverdueRRFList = <any>results;
    //             this.Overdue = this.OverdueRRFList.value;
    //         },
    //         error => this.errorMessage = <any>error);
    // }

    /**Get all Incomplete Profile Count*/
    // GetIncompleteProfileCount(): void {
    //     this.dashboardService.getIncompleteProfileCount()
    //         .subscribe(
    //         results => {
    //             this.IncompleteProfileList = <any>results;
    //             this.IncompleteProfile = this.IncompleteProfileList.value;
    //         },
    //         error => this.errorMessage = <any>error);
    // }

    /**Get all Candidate Joining this month Count*/
    // GetCandidateJoining(): void {
    //     //TO DO: need to update API in Service
    //     this.dashboardService.getCandidateJoining()
    //         .subscribe(
    //         results => {
    //             this.CandidateJoiningList = <any>results;
    //             this.CandidateJoining = this.CandidateJoiningList.value;
    //         },
    //         error => this.errorMessage = <any>error);
    // }
    /************END HEAD DATA */
}
