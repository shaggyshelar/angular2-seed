import { Component } from '@angular/core';
import { OnActivate, Routes, ROUTER_DIRECTIVES, Router } from '@angular/router';
// import { ScheduleInterviewsForRecruitersComponent} from '../recruitersTab/components/scheduleInterviews.component';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { DeliveryManagerScheduleInterviewService } from '../services/ScheduleInterviews.service';
import { InterviewsList,PracticeInterviewList } from '../../recruitersTab/model/interviewDetails';
import { GrdOptions } from '../../../shared/model/index';
// import { AllScheduleInterviewPipeforDelivery } from  '../filter/scheduledInterviews.pipe';
import { ViewRRFComponent } from '../../../RRF/shared/components/viewRRF/viewRRF.component';
import { TOOLTIP_DIRECTIVES } from 'ng2-bootstrap';
import { AllScheduleInterviewPipe } from '../../recruitersTab/filter/scheduleInterviews.pipe';
import { MasterData,CandidateStatus } from '../../../shared/model/common.model';
import { MastersService } from '../../../shared/index';
import { Interview } from '../../shared/model/interview';
import { MyScheduleInterview } from '../../../recruitmentCycle/interviewersTab/model/myScheduleInterview';
import { iefModel} from '../../shared/model/ief';
import { IEFGridRowComponent } from '../../../recruitmentCycle/shared/component/IEFGridRow/IEFGridRow.component';
@Component({
    moduleId: module.id,
    selector: 'practice-interviews',
    templateUrl: 'practiceInterviews.component.html',
    directives: [ROUTER_DIRECTIVES, TOOLTIP_DIRECTIVES, ViewRRFComponent,IEFGridRowComponent],
    pipes: [AllScheduleInterviewPipe],
    providers: [MastersService]
})

// export class RecruitersScheduleInterviewsComponent {
// }

export class PracticeInterviewsComponent implements OnActivate {
    myScheduleInterview: PracticeInterviewList;
    currentView: string = 'Selected';
    viewIEFText: string = 'View IEF';
    hideIEFText: string = 'Hide IEF';
    showIEF:boolean=false;
    candidateStatus: CandidateStatus[];
    candidateIEFHistory: Array<Interview> = new Array<Interview>();
    NORECORDSFOUND: boolean = false;
    mode: string;
    current:any;
    errorMessage: string;
    isListVisible: boolean = true;
    isChartVisible: boolean = false;
    viewDetailsRRFId: MasterData = new MasterData();
    InterviewDetailsList: PracticeInterviewList = new PracticeInterviewList();
    constructor(private _DeliveryManagerScheduleInterviewService: DeliveryManagerScheduleInterviewService,
        private toastr: ToastsManager,
        private _mastersService: MastersService,
        private _router: Router) {
        //this.currentView = 'Selected';
       // this.candidateStatus = this.getStatusMaster();
    }

    routerOnActivate() {
        this.getStatusMaster();
        this.resetToDefaultGridOptions();
        this.getAllScheduleInterviewsDataByStatus();
    }
    onViewChanged(viewMode: string) {
      this.InterviewDetailsList.GrdOperations.RRFFilters.Status=viewMode;
      this.getAllScheduleInterviewsDataByStatus();
    }


    getAllScheduleInterviewsDataByStatus() {
        //this.resetToDefaultGridOptions();
        this.NORECORDSFOUND = false;
        this._DeliveryManagerScheduleInterviewService.getAllInterviewsByStatus(this.InterviewDetailsList.GrdOperations)
            .subscribe(
            (results: any) => {
                if (results.AllInterviews !== null && results.AllInterviews.length > 0) {
                    this.InterviewDetailsList = results;

                } else {
                    this.InterviewDetailsList.AllInterviews = [];
                    this.InterviewDetailsList.GrdOperations = results.GrdOperations;
                    this.NORECORDSFOUND = true;
                }
            },
            error => {
                this.errorMessage = <any>error;
                this.toastr.error(<any>error);
            });
    }
    // onViewChanged(viewMode: string) {
    //     this.resetToDefaultGridOptions();
    //     this.InterviewDetailsList.GrdOperations.OrderBy = 'Modified';
    //     this.InterviewDetailsList.GrdOperations.Order = 'desc';
    //     this.InterviewDetailsList.GrdOperations.PerPageCount = 5;
    //     //Clear RRF List
    //     this.InterviewDetailsList = new InterviewsList();
    // }
    resetToDefaultGridOptions() {
        this.InterviewDetailsList.GrdOperations = new GrdOptions();
        this.InterviewDetailsList = new PracticeInterviewList();
        this.InterviewDetailsList.GrdOperations.PerPageCount = 5;
        this.InterviewDetailsList.GrdOperations.ButtonClicked = 0;
        this.InterviewDetailsList.GrdOperations.NextPageUrl = [];
        this.InterviewDetailsList.GrdOperations.OrderBy = 'Interview_x0020_Date';
        this.InterviewDetailsList.GrdOperations.Order = 'desc';
        this.InterviewDetailsList.GrdOperations.RRFFilters.Status='Scheduled';

    }

    getAllScheduleInterviewsData() {
        //this.resetToDefaultGridOptions();
        this.NORECORDSFOUND = false;
        this._DeliveryManagerScheduleInterviewService.getAllInterviews(this.InterviewDetailsList.GrdOperations)
            .subscribe(
            (results: any) => {
                if (results.AllInterviews !== null && results.AllInterviews.length > 0) {
                    this.InterviewDetailsList = results;

                } else {
                    this.InterviewDetailsList.AllInterviews = [];
                    this.InterviewDetailsList.GrdOperations = results.GrdOperations;
                    this.NORECORDSFOUND = true;
                }
            },
            error => {
                this.errorMessage = <any>error;
                this.toastr.error(<any>error);
            });
    }

    getStatusMaster(): any {
    this.candidateStatus = [{
        Id: 'Selected',
        Value: 'Selected'
      }
      , {
        Id: 'Rejected',
        Value: 'Rejected'
      },
       {
        Id: 'Scheduled',
        Value: 'Scheduled/Rescheduled'
      }];
    }

    onChange(no: number) {
        this.InterviewDetailsList.GrdOperations.PerPageCount = no;
        this.InterviewDetailsList.GrdOperations.ButtonClicked = 0;
        this.InterviewDetailsList.GrdOperations.NextPageUrl = new Array<string>();
        this.getAllScheduleInterviewsDataByStatus();
    }
    OnPaginationClick(ButtonClicked: string) {
        /* ButtonClicked
                i. Initial - 0
                ii.Next - 1
                iii.Prev - (-1)
           PerPageCount = No of items shown per page
                */
        this.InterviewDetailsList.GrdOperations.ButtonClicked = parseInt(ButtonClicked);
        this.getAllScheduleInterviewsDataByStatus();
    }
    // checkViewMode() {
    //     if (this.currentView === 'allInterviews') {
    //         this.getAllScheduleInterviewsData();
    //     } else if (this.currentView === 'myInterviews') {
    //         this.getMyScheduleInterviewsData();
    //     }
    // }
    //Format date in "yyyy-mm-dd" format
    formatDate(date: any) {
        var d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();
        if (month.length < 2) month = '0' + month;
        if (day.length < 2) day = '0' + day;

        return [day, month, year].join('-');
    }

    showRRFDetails(rrfId: MasterData) {
        this.viewDetailsRRFId = rrfId;
        this.isListVisible = false;
        this.isChartVisible = false;
    }
    showListOfRRF() {
        this.isListVisible = true;
    }
     onIEFClick(myScheduleInterview: PracticeInterviewList,
        _rrfId: MasterData,
        _candidateId: MasterData,
        _displayCandidateInfo: boolean,
        _interviewType: MasterData,
        _interviewId: MasterData,
        _interviewStatus: string) {
                var _iefParameters: iefModel = new iefModel();
                _iefParameters.RRFID = _rrfId;
                _iefParameters.CandidateID = _candidateId;
                _iefParameters.DisplayCandidateInfo = _displayCandidateInfo;
                _iefParameters.InterviewType = _interviewType;
                _iefParameters.InterviewID = _interviewId;
                this.getIEFHistory(_iefParameters);
                myScheduleInterview.showIEF = !myScheduleInterview.showIEF;
                this.setIEFButtonText(myScheduleInterview);
    }
     setIEFButtonText(myScheduleInterview: PracticeInterviewList) {
        if (myScheduleInterview.showIEF) {
            myScheduleInterview.IsDisable=false;
            myScheduleInterview.IEFButtonText = this.hideIEFText;
        } else {
            this.current=-1;
            myScheduleInterview.IEFButtonText = this.viewIEFText;
        }
    }
    redirect(rrfID: any, rrfCode: any) {
        this._router.navigate(['/App/RRF/RRFDashboard/Candidates/' + rrfID + 'ID' + rrfCode]);
    }
//     getIEF(_rrfId: MasterData,
//         _candidateId: MasterData,
//         _displayCandidateInfo: boolean,
//         _interviewType: MasterData,
//         _interviewId: MasterData,
//         _interviewStatus: string){
// var _iefParameters: iefModel = new iefModel();
//         _iefParameters.RRFID = _rrfId;
//         _iefParameters.CandidateID = _candidateId;
//         _iefParameters.DisplayCandidateInfo = _displayCandidateInfo;
//         _iefParameters.InterviewType = _interviewType;
//         _iefParameters.InterviewID = _interviewId;
//         this.getIEFHistory(_iefParameters);
//     }
    getIEFHistory(objIEFid: iefModel) {
    this._DeliveryManagerScheduleInterviewService.getIEFHistory(objIEFid)
      .subscribe(
      (results: any) => {
        this.candidateIEFHistory = results;
      },
      error => {
        this.errorMessage = <any>error;
        this.toastr.error(<any>error);
      });
  }
   getTime(time: string) {
    //time:string = interviewTime;
    var intTime: Array<string> = new Array<string>();
    intTime = time.toString().match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];
    // If time format correct
    intTime = intTime.slice(1);  // Remove full string match value
    intTime[5] = +intTime[0] < 12 ? 'AM' : 'PM'; // Set AM/PM
    var adjustHr = +intTime[0] % 12 || 12; // Adjust hours
    intTime[0] = adjustHr.toString();

    return intTime.join('');
  }
}



