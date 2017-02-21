import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { MastersService, DropdownMultiSelectComponent } from '../shared/index';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import {
    RRFGridRowComponent,
    PanelsAvailablityComponent,
    FeedbackDataComponent,
    ViewRRFComponent,
    PanelsAvailabilityService,
    RRFPipe,
    RRFIDPipe
} from './shared/index';
import {
    RRFDashboardComponent
    , RRFDashboardListComponent
    , RRFAssignComponent
    , RRFReScheduleInterviewsComponent
    , RRFCandidateListComponent
    , RRFApprovalListComponent
    , MyRRFAddComponent
    , RRFDashboardService
    , MyRRFService
    , RRFCandidateListService
    , RRFReScheduleInterviewService
    , RRFApprovalService
} from './RRFDashboard/index';
import {
    InterviewApprovalComponent
    , InterviewApprovalGridRowComponent
    , AllScheduleInterviewPipe
    , ScheduleInterviewsForRecruitersComponent
} from '../recruitmentCycle/index';
import { InterviewerAvalabilityComponent
        , FeedbackPendingComponent } from './index';
@NgModule({
    imports: [CommonModule, SharedModule],
    declarations: [
        InterviewApprovalComponent
        , RRFDashboardComponent
        , InterviewApprovalGridRowComponent
        , RRFDashboardListComponent
        , RRFPipe
        , RRFIDPipe
        , RRFGridRowComponent
        , FeedbackDataComponent
        , PanelsAvailablityComponent
        , ViewRRFComponent
        , RRFAssignComponent
        , RRFCandidateListComponent
        , RRFReScheduleInterviewsComponent
        , RRFApprovalListComponent
        , MyRRFAddComponent
        , AllScheduleInterviewPipe
        , DropdownMultiSelectComponent
        , ScheduleInterviewsForRecruitersComponent
        , InterviewerAvalabilityComponent
        , FeedbackPendingComponent
    ],
    exports: [
        RRFGridRowComponent
        , ViewRRFComponent
        , FeedbackDataComponent
        , PanelsAvailablityComponent
        , InterviewApprovalGridRowComponent
        , AllScheduleInterviewPipe
        , ScheduleInterviewsForRecruitersComponent
        , InterviewerAvalabilityComponent
        , FeedbackPendingComponent
    ],
    providers: [
        MastersService
        , RRFDashboardService
        , ToastsManager
        , MyRRFService,
        , PanelsAvailabilityService
        , RRFCandidateListService
        , RRFReScheduleInterviewService
        , RRFApprovalService
    ]
})
export class RRFModule { }
