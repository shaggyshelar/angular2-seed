import {Component} from '@angular/core';
import {OnActivate, ROUTER_DIRECTIVES} from '@angular/router';
//import { StackedColumnComponent } from '../../../shared/components/graph/StackedColumnChart.component';
import { GuageChartData, PiechartData } from '../../index';
import {
    GraphComponent,
    PiechartComponent,
    GaugeChartComponent,
    AnimatedPieComponent,
    StackedColumnComponent,
    StackedBarComponent
} from '../../../shared/index';


import { RecruitersDashboardService } from '../index';

@Component({
    moduleId: module.id,
    selector: 'recruiterdashboard-component',
    templateUrl: 'recruiterDashboard.component.html',
    directives: [ROUTER_DIRECTIVES,
        GraphComponent,
        PiechartComponent,
        GaugeChartComponent,
        AnimatedPieComponent,
        StackedColumnComponent,
        StackedBarComponent
    ],
    providers: [RecruitersDashboardService]
})

export class RecruiterDashboardComponent implements OnActivate {
    errorMessage: string;
    public chartDataForColumnChart: any[];
    public chartDataForPie: any = [];
    public chartDataForAnimatedPie: any = [];
    public ChartDataForStackedColChart: any = [];
    public ChartDataForStackedColChartTest: any[];
    OpenRRFList: any[];
    OverdueRRFList: any[];
    IncompleteProfileList: any[];
    CandidateJoiningList: any[];
    rrfTimeline: any;
    OpenRRF: any;
    OverdueRRF: any;
    Incomplete: any;
    Joining: any;
    piechartData: Array<PiechartData>;
    guageData: GuageChartData;

    routerOnActivate() {
        $('.counter').counterUp({
            delay: 10,
            time: 1000
        });
        this.GetAllOpenRRFCount();
        this.GetAllOverdueRRFCount();
        this.GetIncompleteProfileCount();
        this.GetCandidateJoining();
        this.GetRrfStatusForGuage();
        /**TODO::Delete after Ingeration || Data send for Column chart
         * Data send for Column chart
       this.chartDataForColumnChart = [
           {
               'completedVal': 0,
               'remainingVal': 2,
               'overdueVal': 2,
               'offeredVal': 0,
               'openVal': 18,
               'status': 'R00001'
           },
           {
               'status': 'Technical2',
               'selectedVal': 26.2,
               'rejectedVal': 29.5,
               'scheduledVal': 3,
               'fitmentIssueVal': 2.5,
               'onHoldVal': 22.8
           },
           {
               'status': 'Technical3',
               'selectedVal': 30.1,
               'rejectedVal': 25,
               'onHoldVal': 23.9,
               'scheduledVal': 6,
               'fitmentIssueVal': 25.1
           },
           {
               'status': 'HR1',
               'selectedVal': 29.5,
               'rejectedVal': 29.5,
               'onHoldVal': 2.5,
               'scheduledVal': 30,
               'fitmentIssueVal': 25.1
           },
           {
               'status': 'HR2',
               'selectedVal': 24.6,
               'rejectedVal': 25,
               'onHoldVal': 25,
               'scheduledVal': 10,
               'fitmentIssueVal': 25
           }
       ];
       */
        /**TODO::Delete after Ingeration || Data send for Pie chart
                this.chartDataForPie = [
                    {
                        'title': 'Open',
                        'value': 51
                    }, {
                        'title': 'Closed',
                        'value': 31
                    }, {
                        'title': 'InProcess',
                        'value': 21
                    }, {
                        'title': 'Overdue',
                        'value': 16
                    }, {
                        'title': 'Pending',
                        'value': 39
                    }, {
                        'title': 'Pending',
                        'value': 12
                    }];
        */

        // Data for Stacked Column chart
        this.ChartDataForStackedColChartTest = [{
            'status': 'R00008',
            'completedVal': 0,
            'remainingVal': 2,
            'overdueVal': 2
        }, {
                'status': 'R00012',
                'completedVal': 4,
                'remainingVal': 5,
                'overdueVal': 6
            }, {
                'status': 'R00033',
                'completedVal': 7,
                'remainingVal': 4,
                'overdueVal': 2
            }];
        // Data for Animated Pie chart
        this.chartDataForAnimatedPie = {
            '1995': [
                { 'sector': 'Agriculture', 'size': 6.6 },
                { 'sector': 'Mining and Quarrying', 'size': 0.6 },
                { 'sector': 'Manufacturing', 'size': 23.2 },
                { 'sector': 'Electricity and Water', 'size': 2.2 },
                { 'sector': 'Construction', 'size': 4.5 },
                { 'sector': 'Trade (Wholesale, Retail, Motor)', 'size': 14.6 },
                { 'sector': 'Transport and Communication', 'size': 9.3 },
                { 'sector': 'Finance, real estate and business services', 'size': 22.5 }],
            '1996': [
                { 'sector': 'Agriculture', 'size': 6.4 },
                { 'sector': 'Mining and Quarrying', 'size': 0.5 },
                { 'sector': 'Manufacturing', 'size': 22.4 },
                { 'sector': 'Electricity and Water', 'size': 2 },
                { 'sector': 'Construction', 'size': 4.2 },
                { 'sector': 'Trade (Wholesale, Retail, Motor)', 'size': 14.8 },
                { 'sector': 'Transport and Communication', 'size': 9.7 },
                { 'sector': 'Finance, real estate and business services', 'size': 22 }],
            '1997': [
                { 'sector': 'Agriculture', 'size': 6.1 },
                { 'sector': 'Mining and Quarrying', 'size': 0.2 },
                { 'sector': 'Manufacturing', 'size': 20.9 },
                { 'sector': 'Electricity and Water', 'size': 1.8 },
                { 'sector': 'Construction', 'size': 4.2 },
                { 'sector': 'Trade (Wholesale, Retail, Motor)', 'size': 13.7 },
                { 'sector': 'Transport and Communication', 'size': 9.4 },
                { 'sector': 'Finance, real estate and business services', 'size': 22.1 }],
            '1998': [
                { 'sector': 'Agriculture', 'size': 6.2 },
                { 'sector': 'Mining and Quarrying', 'size': 0.3 },
                { 'sector': 'Manufacturing', 'size': 21.4 },
                { 'sector': 'Electricity and Water', 'size': 1.9 },
                { 'sector': 'Construction', 'size': 4.2 },
                { 'sector': 'Trade (Wholesale, Retail, Motor)', 'size': 14.5 },
                { 'sector': 'Transport and Communication', 'size': 10.6 },
                { 'sector': 'Finance, real estate and business services', 'size': 23 }],
            '1999': [
                { 'sector': 'Agriculture', 'size': 5.7 },
                { 'sector': 'Mining and Quarrying', 'size': 0.2 },
                { 'sector': 'Manufacturing', 'size': 20 },
                { 'sector': 'Electricity and Water', 'size': 1.8 },
                { 'sector': 'Construction', 'size': 4.4 },
                { 'sector': 'Trade (Wholesale, Retail, Motor)', 'size': 15.2 },
                { 'sector': 'Transport and Communication', 'size': 10.5 },
                { 'sector': 'Finance, real estate and business services', 'size': 24.7 }],
            '2000': [
                { 'sector': 'Agriculture', 'size': 5.1 },
                { 'sector': 'Mining and Quarrying', 'size': 0.3 },
                { 'sector': 'Manufacturing', 'size': 20.4 },
                { 'sector': 'Electricity and Water', 'size': 1.7 },
                { 'sector': 'Construction', 'size': 4 },
                { 'sector': 'Trade (Wholesale, Retail, Motor)', 'size': 16.3 },
                { 'sector': 'Transport and Communication', 'size': 10.7 },
                { 'sector': 'Finance, real estate and business services', 'size': 24.6 }],
            '2001': [
                { 'sector': 'Agriculture', 'size': 5.5 },
                { 'sector': 'Mining and Quarrying', 'size': 0.2 },
                { 'sector': 'Manufacturing', 'size': 20.3 },
                { 'sector': 'Electricity and Water', 'size': 1.6 },
                { 'sector': 'Construction', 'size': 3.1 },
                { 'sector': 'Trade (Wholesale, Retail, Motor)', 'size': 16.3 },
                { 'sector': 'Transport and Communication', 'size': 10.7 },
                { 'sector': 'Finance, real estate and business services', 'size': 25.8 }],
            '2002': [
                { 'sector': 'Agriculture', 'size': 5.7 },
                { 'sector': 'Mining and Quarrying', 'size': 0.2 },
                { 'sector': 'Manufacturing', 'size': 20.5 },
                { 'sector': 'Electricity and Water', 'size': 1.6 },
                { 'sector': 'Construction', 'size': 3.6 },
                { 'sector': 'Trade (Wholesale, Retail, Motor)', 'size': 16.1 },
                { 'sector': 'Transport and Communication', 'size': 10.7 },
                { 'sector': 'Finance, real estate and business services', 'size': 26 }],
            '2003': [
                { 'sector': 'Agriculture', 'size': 4.9 },
                { 'sector': 'Mining and Quarrying', 'size': 0.2 },
                { 'sector': 'Manufacturing', 'size': 19.4 },
                { 'sector': 'Electricity and Water', 'size': 1.5 },
                { 'sector': 'Construction', 'size': 3.3 },
                { 'sector': 'Trade (Wholesale, Retail, Motor)', 'size': 16.2 },
                { 'sector': 'Transport and Communication', 'size': 11 },
                { 'sector': 'Finance, real estate and business services', 'size': 27.5 }],
            '2004': [
                { 'sector': 'Agriculture', 'size': 4.7 },
                { 'sector': 'Mining and Quarrying', 'size': 0.2 },
                { 'sector': 'Manufacturing', 'size': 18.4 },
                { 'sector': 'Electricity and Water', 'size': 1.4 },
                { 'sector': 'Construction', 'size': 3.3 },
                { 'sector': 'Trade (Wholesale, Retail, Motor)', 'size': 16.9 },
                { 'sector': 'Transport and Communication', 'size': 10.6 },
                { 'sector': 'Finance, real estate and business services', 'size': 28.1 }],
            '2005': [
                { 'sector': 'Agriculture', 'size': 4.3 },
                { 'sector': 'Mining and Quarrying', 'size': 0.2 },
                { 'sector': 'Manufacturing', 'size': 18.1 },
                { 'sector': 'Electricity and Water', 'size': 1.4 },
                { 'sector': 'Construction', 'size': 3.9 },
                { 'sector': 'Trade (Wholesale, Retail, Motor)', 'size': 15.7 },
                { 'sector': 'Transport and Communication', 'size': 10.6 },
                { 'sector': 'Finance, real estate and business services', 'size': 29.1 }],
            '2006': [
                { 'sector': 'Agriculture', 'size': 4 },
                { 'sector': 'Mining and Quarrying', 'size': 0.2 },
                { 'sector': 'Manufacturing', 'size': 16.5 },
                { 'sector': 'Electricity and Water', 'size': 1.3 },
                { 'sector': 'Construction', 'size': 3.7 },
                { 'sector': 'Trade (Wholesale, Retail, Motor)', 'size': 14.2 },
                { 'sector': 'Transport and Communication', 'size': 12.1 },
                { 'sector': 'Finance, real estate and business services', 'size': 29.1 }],
            '2007': [
                { 'sector': 'Agriculture', 'size': 4.7 },
                { 'sector': 'Mining and Quarrying', 'size': 0.2 },
                { 'sector': 'Manufacturing', 'size': 16.2 },
                { 'sector': 'Electricity and Water', 'size': 1.2 },
                { 'sector': 'Construction', 'size': 4.1 },
                { 'sector': 'Trade (Wholesale, Retail, Motor)', 'size': 15.6 },
                { 'sector': 'Transport and Communication', 'size': 11.2 },
                { 'sector': 'Finance, real estate and business services', 'size': 30.4 }],
            '2008': [
                { 'sector': 'Agriculture', 'size': 4.9 },
                { 'sector': 'Mining and Quarrying', 'size': 0.3 },
                { 'sector': 'Manufacturing', 'size': 17.2 },
                { 'sector': 'Electricity and Water', 'size': 1.4 },
                { 'sector': 'Construction', 'size': 5.1 },
                { 'sector': 'Trade (Wholesale, Retail, Motor)', 'size': 15.4 },
                { 'sector': 'Transport and Communication', 'size': 11.1 },
                { 'sector': 'Finance, real estate and business services', 'size': 28.4 }],
            '2009': [
                { 'sector': 'Agriculture', 'size': 4.7 },
                { 'sector': 'Mining and Quarrying', 'size': 0.3 },
                { 'sector': 'Manufacturing', 'size': 16.4 },
                { 'sector': 'Electricity and Water', 'size': 1.9 },
                { 'sector': 'Construction', 'size': 4.9 },
                { 'sector': 'Trade (Wholesale, Retail, Motor)', 'size': 15.5 },
                { 'sector': 'Transport and Communication', 'size': 10.9 },
                { 'sector': 'Finance, real estate and business services', 'size': 27.9 }],
            '2010': [
                { 'sector': 'Agriculture', 'size': 4.2 },
                { 'sector': 'Mining and Quarrying', 'size': 0.3 },
                { 'sector': 'Manufacturing', 'size': 16.2 },
                { 'sector': 'Electricity and Water', 'size': 2.2 },
                { 'sector': 'Construction', 'size': 4.3 },
                { 'sector': 'Trade (Wholesale, Retail, Motor)', 'size': 15.7 },
                { 'sector': 'Transport and Communication', 'size': 10.2 },
                { 'sector': 'Finance, real estate and business services', 'size': 28.8 }],
            '2011': [
                { 'sector': 'Agriculture', 'size': 4.1 },
                { 'sector': 'Mining and Quarrying', 'size': 0.3 },
                { 'sector': 'Manufacturing', 'size': 14.9 },
                { 'sector': 'Electricity and Water', 'size': 2.3 },
                { 'sector': 'Construction', 'size': 5 },
                { 'sector': 'Trade (Wholesale, Retail, Motor)', 'size': 17.3 },
                { 'sector': 'Transport and Communication', 'size': 10.2 },
                { 'sector': 'Finance, real estate and business services', 'size': 27.2 }],
            '2012': [
                { 'sector': 'Agriculture', 'size': 3.8 },
                { 'sector': 'Mining and Quarrying', 'size': 0.3 },
                { 'sector': 'Manufacturing', 'size': 14.9 },
                { 'sector': 'Electricity and Water', 'size': 2.6 },
                { 'sector': 'Construction', 'size': 5.1 },
                { 'sector': 'Trade (Wholesale, Retail, Motor)', 'size': 15.8 },
                { 'sector': 'Transport and Communication', 'size': 10.7 },
                { 'sector': 'Finance, real estate and business services', 'size': 28 }],
            '2013': [
                { 'sector': 'Agriculture', 'size': 3.7 },
                { 'sector': 'Mining and Quarrying', 'size': 0.2 },
                { 'sector': 'Manufacturing', 'size': 14.9 },
                { 'sector': 'Electricity and Water', 'size': 2.7 },
                { 'sector': 'Construction', 'size': 5.7 },
                { 'sector': 'Trade (Wholesale, Retail, Motor)', 'size': 16.5 },
                { 'sector': 'Transport and Communication', 'size': 10.5 },
                { 'sector': 'Finance, real estate and business services', 'size': 26.6 }],
            '2014': [
                { 'sector': 'Agriculture', 'size': 3.9 },
                { 'sector': 'Mining and Quarrying', 'size': 0.2 },
                { 'sector': 'Manufacturing', 'size': 14.5 },
                { 'sector': 'Electricity and Water', 'size': 2.7 },
                { 'sector': 'Construction', 'size': 5.6 },
                { 'sector': 'Trade (Wholesale, Retail, Motor)', 'size': 16.6 },
                { 'sector': 'Transport and Communication', 'size': 10.5 },
                { 'sector': 'Finance, real estate and business services', 'size': 26.5 }]
        };
    }
    constructor(private dashboardService: RecruitersDashboardService) { }
    /**Get all Open RRF's count */
    GetAllOpenRRFCount(): void {
        this.dashboardService.getAllStatusCount()
            .subscribe(
            results => {
                this.OpenRRFList = <any>results;
                if (this.OpenRRFList.length > 0) {
                    this.OpenRRF = this.OpenRRFList[0].value;
                }
            },
            error => this.errorMessage = <any>error);
    }
    /**Get all Overdue RRF's count */
    GetAllOverdueRRFCount(): void {
        this.dashboardService.getAllOverdueRRFCount()
            .subscribe(
            results => {
                //this.chartDataForColumnChart = <any>results;
                this.OverdueRRFList = <any>results;
                this.OverdueRRF = this.OverdueRRFList.value;
            },
            error => this.errorMessage = <any>error);
    }
    /**Get all Incomplete Profile Count*/
    GetIncompleteProfileCount(): void {
        this.dashboardService.getIncompleteProfileCount()
            .subscribe(
            results => {
                this.IncompleteProfileList = <any>results;
                this.Incomplete = this.IncompleteProfileList.value;
            },
            error => this.errorMessage = <any>error);
    }
    /**Get all Candidate Joining this month Count*/
    GetCandidateJoining(): void {
        //TO DO: need to update API in Service
        this.dashboardService.getCandidateJoining()
            .subscribe(
            results => {
                this.CandidateJoiningList = <any>results;
                this.Joining = this.CandidateJoiningList.value;
            },
            error => this.errorMessage = <any>error);
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
    /**Get all RRF with its status time remains to complete OR Overdue days */
    GetRrfTimeline(): void {
        this.dashboardService.getRrfTimeline()
            .subscribe(
            results => {
                //this.chartDataForColumnChart = <any>results;
                this.rrfTimeline = <any>results;
            },
            error => this.errorMessage = <any>error);
    }
}
