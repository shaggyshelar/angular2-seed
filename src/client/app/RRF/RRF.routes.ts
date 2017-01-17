import { Route } from '@angular/router';

import { MyRRFAddComponent } from './myRRF/index';
import { RRFApprovalListComponent } from './RRFApproval/index';
import {
    RRFDashboardListComponent,
    RRFAssignComponent,
    RRFCandidateListComponent,
    RRFReScheduleInterviewsComponent
} from './RRFDashboard/index';

export const RRFRoutes: Route[] = [
    /**RRF Dashboard */
    { path: 'RRF/RRFDashboard', component: RRFDashboardListComponent },
    { path: 'RRF/Assign/:id', component: RRFAssignComponent },
    { path: 'RRF/Candidates/:id', component: RRFCandidateListComponent },
    { path: 'RRF/Interviews/:id', component: RRFReScheduleInterviewsComponent },
    /**My RRF*/
    { path: 'RRF/Add', component: MyRRFAddComponent },
    { path: 'RRF/Edit/:id', component: MyRRFAddComponent },
    /**RRF Approval */
    { path: 'RRF/PendingRequest', component: RRFApprovalListComponent }

];
