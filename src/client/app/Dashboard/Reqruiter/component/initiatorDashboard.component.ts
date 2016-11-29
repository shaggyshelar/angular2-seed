import {Component} from '@angular/core';
import {OnActivate, ROUTER_DIRECTIVES} from '@angular/router';
import { GraphComponent } from '../../../shared/components/graph/graph.component';
import { PiechartComponent } from '../../../shared/components/graph/piechart.component';
import { GaugeChartComponent } from '../../../shared/components/graph/gaugeChart.component';
import { AnimatedPieComponent } from '../../../shared/components/graph/AnimatedPieChart.component';
import { StackedColumnComponent } from '../../../shared/components/graph/StackedColumnChart.component';
import { RecruitersDashboardService } from '../index';
import { InterviewApprovalComponent} from '../../../recruitmentCycle/shared/component/InterviewApproval/InterviewApproval.Component';
@Component({
    moduleId: module.id,
    selector: 'initiatordashboard-component',
    templateUrl: 'initiatorDashboard.component.html',
    directives: [ROUTER_DIRECTIVES, GraphComponent, PiechartComponent,
        GaugeChartComponent, AnimatedPieComponent, StackedColumnComponent, InterviewApprovalComponent],
    providers: [RecruitersDashboardService]
})

export class InitiatorDashboardComponent implements OnActivate {
    errorMessage: string;
    public chartDataForColumnChart: any[];
    public chartDataForPie: any = [];
    public chartDataForAnimatedPie: any = [];
    public ChartDataForStackedColChart: any = [];
    isListVisible: boolean = true;
    StatusWiseRRFList: any = [];
    PendingFeedbackList: any = [];
    InterviewAwaitingList: any = [];
    Pending: any;
    Open: any;
    PendingFeedback: any;
    InterviewAwaiting: any;
    piechartData: Array<PiechartData>;
    guageData: any;

    routerOnActivate() {
        $('.counter').counterUp({
            delay: 10,
            time: 1000
        });

    }
    constructor(private dashboardService: RecruitersDashboardService) {
        this.GetStatusWiseRRFCount();
        this.GetPendingFeedbackCount();
        this.GetInterviewAwaitingCount();
        this.Pending = 0;
        this.Open = 0;

        this.GetRrfStatusForGuage();
    }

    /**Get status wise RRF Count for Initiator*/
    GetRrfStatusForGuage(): void {
        this.dashboardService.getRrfStatusForGuage()
            .subscribe(
            results => {
                this.guageData = <any>results;
            },
            error => this.errorMessage = <any>error);
    }

    /**Get status wise RRF Count for Initiator*/
    GetStatusWiseRRFCount(): void {
        this.dashboardService.getStatusWiseRRFCount()
            .subscribe(
            results => {
                this.StatusWiseRRFList = <any>results;
                if (this.StatusWiseRRFList.length > 0) {
                    this.Pending = this.StatusWiseRRFList[1].value;
                    this.Open = this.StatusWiseRRFList[0].value;
                }
            },
            error => this.errorMessage = <any>error);
    }
    /**Get Pending Feedback for RRF count*/
    GetPendingFeedbackCount(): void {
        this.dashboardService.getPendingFeedbackCount()
            .subscribe(
            results => {
                this.PendingFeedbackList = <any>results;
                this.PendingFeedback = this.PendingFeedbackList.value;
            },
            error => this.errorMessage = <any>error);
    }
    /**Get Interview awaiting approval count*/
    GetInterviewAwaitingCount(): void {
        this.dashboardService.getInterviewAwaitingCount()
            .subscribe(
            results => {
                this.InterviewAwaitingList = <any>results;
                this.InterviewAwaiting = this.InterviewAwaitingList.value;
            },
            error => this.errorMessage = <any>error);
    }
    /**
    * Get all RRF's status wise count 
    * This method used with promises keeping this commented method for future 
    * referece, in case of any requirement.
    * 
   // GetAllRrfStatusCount() {
   //     this.dashboardSerivce.getAllRRFStatusCount()
   //         .then(
   //         results => {
   //             this.piechartData = <any>results;
   //             this.chartDataForPie = this.piechartData;
   //         },
   //         error => this.errorMessage = <any>error);
   // }
   */
}

/**
 * PiechartData
 */
class PiechartData {
    title: string;
    value: string;
}
