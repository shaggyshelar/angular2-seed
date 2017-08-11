import { Component} from '@angular/core';
import { Routes, ROUTER_DIRECTIVES } from '@angular/router';
import { RecruitersInterviewsComponent} from './scheduledInterviews.component';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { DeliveryManagerScheduleInterviewService } from '../services/ScheduleInterviews.service';

@Component({
    selector: 'schedule-interview-delivery-component',
    template: '<router-outlet></router-outlet>',
    directives: [ROUTER_DIRECTIVES],
    providers: [ToastsManager, DeliveryManagerScheduleInterviewService],
})

@Routes([
    { path: '/', component: RecruitersInterviewsComponent }
])
export class RecruitersScheduleInterviewsComponent {
}


