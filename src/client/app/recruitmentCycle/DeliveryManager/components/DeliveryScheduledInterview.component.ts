import { Component } from '@angular/core';
import { Routes, ROUTER_DIRECTIVES } from '@angular/router';
import { RecruitersInterviewsComponent, PracticeInterviewsComponent } from '../index';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { DeliveryManagerScheduleInterviewService } from '../services/ScheduleInterviews.service';

@Component({
    selector: 'schedule-interview-delivery-component',
    template: '<router-outlet></router-outlet>',
    directives: [ROUTER_DIRECTIVES],
    providers: [ToastsManager, DeliveryManagerScheduleInterviewService],
})

@Routes([
    { path: '/', component: RecruitersInterviewsComponent },
    { path: '/history', component: PracticeInterviewsComponent }
])
export class RecruitersScheduleInterviewsComponent {
}


