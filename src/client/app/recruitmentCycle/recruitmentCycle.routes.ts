import { Route } from '@angular/router';
import { ScheduleInterviewsForRecruitersComponent } from './recruitersTab/index';
import { ScheduleCandidateInterviewComponent } from './scheduleInterview/index';
import { RecruitmentIEFComponent } from './shared/index';
import {
    RecruitmentInterviewAvailabilityComponent,
    RecruitmentInterviewScheduleComponent,
    RecruitmentInterviewerCalenderComponent
} from './interviewersTab/index';


export const RecruitmentCycleRoutes: Route[] = [
    /**Interviewers Tab */
    { path: 'RecruitmentCycle/', component: RecruitmentInterviewAvailabilityComponent },
    { path: 'RecruitmentCycle/availability', component: RecruitmentInterviewAvailabilityComponent },
    { path: 'RecruitmentCycle/Schedule', component: RecruitmentInterviewScheduleComponent },
    //{ path: 'RecruitmentCycle/ief', component: RecruitmentIEFComponent },
    { path: 'RecruitmentCycle/mycalendar', component: RecruitmentInterviewerCalenderComponent },

    /**Recruiters Tab */
    //{ path: '/', component: ScheduleInterviewsForRecruitersComponent },

    /** Schedule Interviews Tab*/
    //{ path: '/:id', component: ScheduleCandidateInterviewComponent },
];
