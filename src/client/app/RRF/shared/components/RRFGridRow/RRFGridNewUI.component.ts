import { Component, Input} from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';
import { RRFDetails} from '../../../myRRF/models/rrfDetails';
import { RRFAssignStatus} from  '../../../../shared/constantValue/index';
import {IfAuthorizeDirective} from '../../../../shared/directives/ifAuthorize.directive';
//import { PanelsAvailablityComponent } from '../interviewersAvailablity/panelsAvailablity.component';

@Component({
    moduleId: module.id,
    selector: 'RRFGridNewUI',
    templateUrl: 'RRFGridNewUI.component.html',
    directives: [ROUTER_DIRECTIVES, IfAuthorizeDirective],
    styleUrls: ['../../css/RRFNewUI.component.css']
})

export class RRFGridRowNewUIComponent {
    @Input() RRFData: RRFDetails = new RRFDetails();
    @Input() displayApproval: boolean = false;
    @Input() displayAssignedTo: boolean = false;
    @Input() displayJobDescDetails: boolean = false;
    @Input() displayFeedBackStatus: boolean = false;
    flag: boolean = false;
    hiddenFieldFlag: boolean = false;
    showHideButtonText:string = 'SHOW MORE'
    AssignStatus: RRFAssignStatus = RRFAssignStatus;

    getPriorityClass(priority: string): string {
        return 'priority' + priority;
    }

    getStatusClass(statusID: number): string {
        return 'status' + statusID;
    }
    showHide() {
        if (this.flag == false) {
            this.hiddenFieldFlag = true;
            this.showHideButtonText = 'HIDE'
            this.flag = true;
        } else {
            this.hiddenFieldFlag = false;
            this.showHideButtonText = 'SHOW MORE'
            this.flag = false;
        }
    }

}
