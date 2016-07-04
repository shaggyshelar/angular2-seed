import {Component} from '@angular/core';
import { Routes, ROUTER_DIRECTIVES } from '@angular/router';
import {RecruitmentInterviewAvailabilityComponent} from './interviewers.availability.component';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

@Component({
    selector: 'recruitment-interviewer',
    template: '<router-outlet></router-outlet>',
    directives: [ROUTER_DIRECTIVES],
    providers: [ToastsManager]
})

@Routes([
    { path: '/', component: RecruitmentInterviewAvailabilityComponent },
    { path: '/availability', component: RecruitmentInterviewAvailabilityComponent }
])
export class InterviewrsComponent {
}
