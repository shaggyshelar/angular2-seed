import { Component, OnInit} from '@angular/core';
import { ROUTER_DIRECTIVES, Router} from '@angular/router';
import { RecruitersDashboardService, DetailsRRF, DashboardFilters, CanidateInformation, InterviewInformation } from '../index';
import { IfAuthorizeDirective } from '../../shared/directives/ifAuthorize.directive';
import { MasterData } from '../../shared/model/common.model';
import { RRFGridRowComponent} from '../../RRF/shared/components/RRFGridRow/RRFGridRow.component';
import { AllCandidateProfiles } from  '../../profileBank/shared/model/myProfilesInfo';
import { DetailProfileComponent } from '../../profileBank/shared/component/detailProfile.component';
import { CommonService } from '../../shared/index';
import { InterviewApproval } from '../../recruitmentCycle/shared/component/InterviewApproval/model/interviewApproval';
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
    IfAuthorizeDirective,
    RRFGridRowComponent,
    DetailProfileComponent
  ],
  styleUrls: ['./commonDashboard.component.css'],
  providers: [RecruitersDashboardService]
})

export class CommonDashboardComponent implements OnInit {
  errorMessage: string;
  //grdOptions: GrdOptions = new GrdOptions();
  _dashboardFilters: DashboardFilters = new DashboardFilters();
  _dashboardFiltersForAllData: DashboardFilters = new DashboardFilters();
  _detailsRRF: Array<DetailsRRF> = new Array<DetailsRRF>();
  rrfList: Array<DetailsRRF> = new Array<DetailsRRF>();
  interviewApproval: InterviewApproval[] = [];
  NoDataFound: boolean = false;
  Title: string;
  IsRRF: boolean = false;
  IsProfile: boolean = false;
  loginflag: boolean = false;
  IsInterview: boolean = false;
  CurrentUser: MasterData = new MasterData();
  public FinalStatus : any = [{'Value':'All'},{'Value':'My'}];
   public Period : any = [{'Value':'Today'},{'Value':'Week'},{'Value':'Month'},{'Value':'Year'}];
  IncompleteProfileList: AllCandidateProfiles = new AllCandidateProfiles();
  offeredCandidate: Array<CanidateInformation> = new Array<CanidateInformation>();
  joiningCandidate: Array<CanidateInformation> = new Array<CanidateInformation>();
  _interviewInformation: Array<InterviewInformation> = new Array<InterviewInformation>();
  constructor(private dashboardService: RecruitersDashboardService,
    private _router: Router,private _commonService: CommonService
  ) {
    this.loginflag = this.getLoggedInUser();
  }

  ngOnInit() {

    this.GetAllOpenRRF(this._dashboardFilters);
    this.GetScheduledInterviews(this._dashboardFilters);
    this.GetOfferedCandidate(this._dashboardFilters);
    this.GetAllJoinings(this._dashboardFilters);
  }
   onSelectStatus(status:any) {
      this._dashboardFilters.AllorMy=status;
      this.getData();
    }
    onSelectPeriod(timePeriod:any) {
      this._dashboardFilters.TimeDuration=timePeriod;
      this.getData();
    }
getData(){
  this.GetAllOpenRRF(this._dashboardFilters);
    this.GetScheduledInterviews(this._dashboardFilters);
    this.GetOfferedCandidate(this._dashboardFilters);
    this.GetAllJoinings(this._dashboardFilters);
}
    getLoggedInUser(): boolean {
        this.CurrentUser = this._commonService.getLoggedInUser();
        return this.CurrentUser ? true : false;
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
        var _interview: InterviewInformation = new InterviewInformation();
        _interview.Candidate = 'Chandrashekar Subhramanyam'; _interview.InterviewDate = '09 Sep 2017 02:30 AM'; _interview.Approver = 'Chandrashekahar Chindhade';
        this._interviewInformation.push(_interview);
        console.log(this._interviewInformation);
      },
      error => this.errorMessage = <any>error);
  }
   onCancelClick() {
        let modl: any = $('#CountDetails');
        modl.modal('toggle');
    }
    GetAllOfferedCandidate() {
        this.IncompleteProfileList = new AllCandidateProfiles();
         this._dashboardFiltersForAllData.CountOfList=null;
       this.dashboardService.GetInterviewCompletedCandidatesByFilters(this._dashboardFiltersForAllData)
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
    GetInterviewAwaiting() {
      this._dashboardFiltersForAllData.CountOfList=null;
        this.dashboardService.GetUserInterviewDetailsWithFilter(this._dashboardFiltersForAllData)
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
        this.rrfList = [];
        this._dashboardFiltersForAllData.CountOfList=null;
        this.dashboardService.GetOpenAndAssignedRRFsByFilters(this._dashboardFiltersForAllData)
            .subscribe(
            (results: any) => {
                if (results.RRFs !== undefined && results.RRFs.length > 0) {
                  this.IsRRF = true;
                   this.IsProfile = false;
                     this.IsInterview = false;
                    this.NoDataFound = false;
                    this.rrfList = (<any>(results)).RRFs;
                } else {
                    this.NoDataFound = true;
                      this.IsInterview = false;
                      this.IsProfile = false;
                }
                this.Title = 'Open RRF';
                let modl: any = $('#CountDetails');
                modl.modal({ 'backdrop': 'static' });
            },
            error => this.errorMessage = <any>error);
    }
      GetJoiningCandidate() {
        this.IncompleteProfileList = new AllCandidateProfiles();
        this._dashboardFiltersForAllData.CountOfList=null;
        this.dashboardService.GetDetailsOfCandidatesJoiningByFilter(this._dashboardFiltersForAllData)
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
                this.Title = 'Candidate Joining This Month';
                let modl: any = $('#CountDetails');
                modl.modal({ 'backdrop': 'static' });
            },
            error => this.errorMessage = <any>error);
    }
  GetOfferedCandidate(dashboardFilters: DashboardFilters): void {
    this.dashboardService.GetInterviewCompletedCandidatesByFilters(dashboardFilters)
      .subscribe(
      results => {
        if (results !== null) {
          this.offeredCandidate = <any>results;
        }
      },
      error => this.errorMessage = <any>error);
  }
    onViewCandidateClick(rrfID: MasterData, status:string) {
        this.onCancelClick();
        sessionStorage.setItem('backToRRFDashboardList',sessionStorage.getItem('backToProfile'));
        sessionStorage.setItem('StatusValue', status);
        this._router.navigate(['/App/RRF/RRFDashboard/Candidates/' + rrfID.Value + 'ID' + rrfID.Id]);
    }
     viewProfiles(CandidateID: MasterData) {
        this.onCancelClick();
        sessionStorage.setItem('onProfilesReturnPath', '/App');
        this._router.navigate(['/App/ProfileBank/MyProfiles/View/' + CandidateID.Value + 'ID' + CandidateID.Id]);
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
       formatDate(date: any) {
        var d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();
        if (month.length < 2) month = '0' + month;
        if (day.length < 2) day = '0' + day;

        return [day, month, year].join('-');
    }

}
