import { Component } from '@angular/core';
import { OnActivate, Routes, ROUTER_DIRECTIVES, Router } from '@angular/router';
// import { ScheduleInterviewsForRecruitersComponent} from '../recruitersTab/components/scheduleInterviews.component';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { DeliveryManagerScheduleInterviewService } from '../services/ScheduleInterviews.service';
import { InterviewsList } from '../../recruitersTab/model/interviewDetails';
import { GrdOptions } from '../../../shared/model/index';
// import { AllScheduleInterviewPipeforDelivery } from  '../filter/scheduledInterviews.pipe';
import { ViewRRFComponent } from '../../../RRF/shared/components/viewRRF/viewRRF.component';
import { TOOLTIP_DIRECTIVES } from 'ng2-bootstrap';
import { AllScheduleInterviewPipe } from '../../recruitersTab/filter/scheduleInterviews.pipe';
import { MasterData } from '../../../shared/model/common.model';
import { MastersService } from '../../../shared/index';
@Component({
    moduleId: module.id,
    selector: 'practice-interviews',
    templateUrl: 'practiceInterviews.component.html',
    directives: [ROUTER_DIRECTIVES, TOOLTIP_DIRECTIVES, ViewRRFComponent],
    pipes: [AllScheduleInterviewPipe],
    providers: [MastersService]
})

// export class RecruitersScheduleInterviewsComponent {
// }

export class PracticeInterviewsComponent implements OnActivate {
    currentView: string = 'Selected';
    candidateStatus: MasterData[];
    NORECORDSFOUND: boolean = false;
    mode: string;
    errorMessage: string;
    isListVisible: boolean = true;
    isChartVisible: boolean = false;
    viewDetailsRRFId: MasterData = new MasterData();
    InterviewDetailsList: InterviewsList = new InterviewsList();
    constructor(private _DeliveryManagerScheduleInterviewService: DeliveryManagerScheduleInterviewService,
        private toastr: ToastsManager,
        private _mastersService: MastersService,
        private _router: Router) {
        //this.currentView = 'Selected';
        this.candidateStatus = this.getStatusMaster();
        console.log(this.candidateStatus);
    }

    routerOnActivate() {
        this.resetToDefaultGridOptions();
        this.getAllScheduleInterviewsData();
    }
    onViewChanged(viewMode: string) {
        if (viewMode === 'Selected') {
            //TODO :: change text to ID if required
            this.getInterviewedCandidate(viewMode);
        } else {
            //TODO :: change text to ID if required
            this.getInterviewedCandidate(viewMode);
        }
    }
    getInterviewedCandidate(Status: string) {
        console.log('You have choosed ' + Status + ' Candidates data');
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
        this.InterviewDetailsList = new InterviewsList();
        this.InterviewDetailsList.GrdOperations.ButtonClicked = 0;
        this.InterviewDetailsList.GrdOperations.NextPageUrl = [];
        this.InterviewDetailsList.GrdOperations.OrderBy = 'Interview_x0020_Date';
        this.InterviewDetailsList.GrdOperations.Order = 'desc';

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
        this._mastersService.getCandidateStatuses()
            .subscribe(
            (results: any) => {
                var _candidateStatus = results;

                return _candidateStatus;
            },
            error => {
                this.errorMessage = <any>error;
                this.toastr.error(<any>error);
            });
    }

    onChange(no: number) {
        this.InterviewDetailsList.GrdOperations.PerPageCount = no;
        this.InterviewDetailsList.GrdOperations.ButtonClicked = 0;
        this.InterviewDetailsList.GrdOperations.NextPageUrl = new Array<string>();
        this.getAllScheduleInterviewsData();
    }
    OnPaginationClick(ButtonClicked: string) {
        /* ButtonClicked
                i. Initial - 0
                ii.Next - 1
                iii.Prev - (-1)
           PerPageCount = No of items shown per page
                */
        this.InterviewDetailsList.GrdOperations.ButtonClicked = parseInt(ButtonClicked);
        this.getAllScheduleInterviewsData();
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
    redirect(rrfID: any, rrfCode: any) {
        this._router.navigate(['/App/RRF/RRFDashboard/Candidates/' + rrfID + 'ID' + rrfCode]);
    }
}



