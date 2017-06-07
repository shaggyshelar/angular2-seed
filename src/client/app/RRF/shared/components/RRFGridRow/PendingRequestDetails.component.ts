import { Component, Input} from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';
import { RRFDetails} from '../../../myRRF/models/rrfDetails';
import { RRFAssignStatus} from  '../../../../shared/constantValue/index';
import {IfAuthorizeDirective} from '../../../../shared/directives/ifAuthorize.directive';
import { InterviewApproval } from '../../../PendingRequest/model/interviewApproval';
//import { PanelsAvailablityComponent } from '../interviewersAvailablity/panelsAvailablity.component';

@Component({
    moduleId: module.id,
    selector: 'PendingRequestDetails',
    templateUrl: 'PendingRequestDetails.component.html',
    directives: [ROUTER_DIRECTIVES, IfAuthorizeDirective],
    styleUrls: ['../../css/RRFNewUI.component.css']
})

export class PendingRequestDetailsComponent {
    @Input() selectedInterview: InterviewApproval = new InterviewApproval();
    @Input() displayApproval: boolean = false;
    @Input() displayAssignedTo: boolean = false;
    @Input() displayJobDescDetails: boolean = false;
    @Input() displayFeedBackStatus: boolean = false;
    tech3Flag: boolean = false;
    tech2Flag: boolean = false;
    tech1Flag: boolean = false;
    showHideButtonText: string = 'SHOW MORE'
    AssignStatus: RRFAssignStatus = RRFAssignStatus;

    getPriorityClass(priority: string): string {
        return 'priority' + priority;
    }

    getStatusClass(statusID: number): string {
        return 'status' + statusID;
    }
    onTech1Click() {
        this.tech1Flag = true; 
        this.tech2Flag = false;
        this.tech3Flag = false;
    }
    onTech2Click() {
        this.tech1Flag = false;
        this.tech2Flag = true;
        this.tech3Flag = false;
    }
    onTech3Click() {
        this.tech1Flag = false;
        this.tech2Flag = false;
        this.tech3Flag = true;
    }
}
