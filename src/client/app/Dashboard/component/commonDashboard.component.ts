import { Component, OnInit} from '@angular/core';
import { ROUTER_DIRECTIVES, Router} from '@angular/router';
import { RecruitersDashboardService, DetailsRRF, DashboardFilters, CanidateInformation, InterviewInformation } from '../index';
import { IfAuthorizeDirective } from '../../shared/directives/ifAuthorize.directive';
// import { InterviewApprovalComponent} from '../../recruitmentCycle/shared/index';
// import {
//   GraphComponent,
//   PiechartComponent,
//   GaugeChartComponent,
//   AnimatedPieComponent,
//   StackedColumnComponent,
//   StackedBarComponent,
//   CandidateDetailComponent} from '../../shared/index';
// import { MasterData } from '../../shared/model/common.model';
// import { Interview } from '../../recruitmentCycle/shared/model/interview';
// import { AllCandidateProfiles, BarChartData } from  '../../profileBank/shared/model/myProfilesInfo';
// import { CHART_DIRECTIVES } from 'ng2-charts/ng2-charts';
// import { RRFCandidateListService } from '../../RRF/RRFDashboard/services/RRFCandidatesList.service';
// import { RRFSpecificCandidateList } from '../../RRF/RRFDashboard/model/RRFCandidateList';
// import { GrdOptions } from '../../shared/model/common.model';
// import { DetailProfileComponent } from '../../profileBank/shared/component/detailProfile.component';
// import { RRFDetails } from '../../RRF/myRRF/models/rrfDetails';
// import { RRFGridRowComponent} from '../../RRF/shared/components/RRFGridRow/RRFGridRow.component';
// import { InterviewApproval } from '../../recruitmentCycle/shared/component/InterviewApproval/model/interviewApproval';
// import { CommonService } from '../../shared/index';

@Component({
  moduleId: module.id,
  selector: 'common-dashboard-component',
  templateUrl: 'commonDashboard.component.html',
  directives: [ROUTER_DIRECTIVES,
    IfAuthorizeDirective
  ],
  styleUrls: ['./commonDashboard.component.css'],
  providers: [RecruitersDashboardService]
})

export class CommonDashboardComponent implements OnInit {
  errorMessage: string;
  _dashboardFilters: DashboardFilters = new DashboardFilters();
  _detailsRRF: Array<DetailsRRF> = new Array<DetailsRRF>();;
  offeredCandidate: Array<CanidateInformation> = new Array<CanidateInformation>();
  joiningCandidate: Array<CanidateInformation> = new Array<CanidateInformation>();
  _interviewInformation: Array<InterviewInformation> = new Array<InterviewInformation>();
  constructor(private dashboardService: RecruitersDashboardService,
    private _router: Router
  ) {
    console.log('this._interviewInformation');
  }

  ngOnInit() {

    this.GetAllOpenRRF(this._dashboardFilters);
    this.GetScheduledInterviews(this._dashboardFilters);
    this.GetOfferedCandidate(this._dashboardFilters);
    this.GetAllJoinings(this._dashboardFilters);
  }
  GetAllOpenRRF(dashboardFilters: DashboardFilters): void {
    this.dashboardService.GetOpenAndAssignedRRFsByFilters(dashboardFilters)
      .subscribe(
      results => {
        if (results !== null) {
          this._detailsRRF = <any>results.RRFs;
          console.log('Open RRF');
          console.log(this._detailsRRF);
        }
      },
      error => this.errorMessage = <any>error);
  }
  GetAllJoinings(dashboardFilters: DashboardFilters): void {
    this.dashboardService.GetDetailsOfCandidatesJoiningByFilter(dashboardFilters)
      .subscribe(
      results => {
        if (results !== null) {
          this.joiningCandidate = <any>results.Profiles;
          console.log('Joinings');
          console.log(this.joiningCandidate);
        }
      },
      error => this.errorMessage = <any>error);
  }
  GetScheduledInterviews(dashboardFilters: DashboardFilters): void {
    this.dashboardService.GetUserInterviewDetailsWithFilter(dashboardFilters)
      .subscribe(
      results => {
        // this._interviewInformation = <any>results;
        console.log('interviews');
        // console.log(this._interviewInformation);
        var _interview: InterviewInformation = new InterviewInformation()
        _interview.Candidate = 'Chandrashekar Subhramanyam'; _interview.InterviewDate = '09 Sep 2017 02:30 AM'; _interview.Approver = 'Chandrashekahar Chindhade';
        this._interviewInformation.push(_interview);
        console.log(this._interviewInformation);
      },
      error => this.errorMessage = <any>error);
  }
  GetOfferedCandidate(dashboardFilters: DashboardFilters): void {
    this.dashboardService.GetInterviewCompletedCandidatesByFilters(dashboardFilters)
      .subscribe(
      results => {
        if (results !== null) {
          this.offeredCandidate = <any>results;
          console.log('Offered candidate');
          console.log(this.offeredCandidate);
        }
      },
      error => this.errorMessage = <any>error);
  }

}
