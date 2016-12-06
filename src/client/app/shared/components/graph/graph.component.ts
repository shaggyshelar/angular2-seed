///<reference path="../graph/AmCharts.d.ts" />
import { Component, Input, OnChanges, OnInit, EventEmitter, Output} from '@angular/core';
import { ROUTER_DIRECTIVES, OnActivate} from '@angular/router';
//import {IfAuthorizeDirective} from '../../../../shared/directives/ifAuthorize.directive';
//import { PanelsAvailablityComponent } from '../interviewersAvailablity/panelsAvailablity.component';

@Component({
    moduleId: module.id,
    selector: 'am-chart',
    templateUrl: 'graph.component.html',
    directives: [ROUTER_DIRECTIVES]
})

export class GraphComponent implements OnChanges {
    @Input() chartData: any;
    @Input() rrfId: any;
    @Output() CandidateDetailInput: EventEmitter<any> = new EventEmitter<any>();
    chart: any;
    data: any;
    ngOnChanges() {
        /** */
        this.createChart(this.chartData, this.CandidateDetailInput, this.rrfId);
    }
    createChart(chartData: any, CandidateDetailInput: any, rrfId: any) {
        //var chart: any;
        // SERIAL CHART
        this.chart = new AmCharts.AmSerialChart();
        this.chart.dataProvider = chartData;
        this.chart.categoryField = 'status';
        this.chart.startDuration = 1;
        this.chart.startEffect = 'bounce';
        this.chart.plotAreaBorderColor = '#DADADA';
        this.chart.plotAreaBorderAlpha = 0.5;

        // this single line makes the chart a bar chart
        this.chart.rotate = false;

        // add click listener
        this.chart.addListener('clickGraphItem', function (event: any) {
            CandidateDetailInput.emit({
                'inputstring': event.item.category,
                'message': 'FromAmChart',
                'inputstring2' : rrfId
            });
        });
        // AXES
        // Category
        var categoryAxis = this.chart.categoryAxis;
        categoryAxis.gridPosition = 'start';
        categoryAxis.gridAlpha = 0.1;
        categoryAxis.axisAlpha = 0;

        // Value
        var valueAxis = new AmCharts.ValueAxis();
        valueAxis.axisAlpha = 0;
        valueAxis.gridAlpha = 0.1;
        valueAxis.position = 'top';
        this.chart.addValueAxis(valueAxis);

        // GRAPHS
        // first graph
        var graph1 = new AmCharts.AmGraph();
        graph1.type = 'column';
        graph1.title = 'Selected';
        graph1.valueField = 'selectedVal';
        graph1.balloonText = 'Selected : [[value]]';
        graph1.lineAlpha = 0;
        graph1.fillColors = '#2cb344';
        graph1.fillAlphas = 1;
        this.chart.addGraph(graph1);

        // second graph
        var graph2 = new AmCharts.AmGraph();
        graph2.type = 'column';
        graph2.title = 'Rejected';
        graph2.valueField = 'rejectedVal';
        graph2.balloonText = 'Rejected :[[value]]';
        graph2.lineAlpha = 0;
        graph2.fillColors = '#81acd9';
        graph2.fillAlphas = 1;
        this.chart.addGraph(graph2);

        // third graph
        var graph3 = new AmCharts.AmGraph();
        graph3.type = 'column';
        graph3.title = 'OnHold';
        graph3.valueField = 'onHoldVal';
        graph3.balloonText = 'On Hold :[[value]]';
        graph3.lineAlpha = 0;
        graph3.fillColors = '#ADD981';
        graph3.fillAlphas = 1;
        this.chart.addGraph(graph3);

        // four graph
        var graph4 = new AmCharts.AmGraph();
        graph4.type = 'column';
        graph4.title = 'FitmentIssue';
        graph4.valueField = 'fitmentIssueVal';
        graph4.balloonText = 'In Fitment :[[value]]';
        graph4.lineAlpha = 0;
        graph4.fillColors = '#01dcd9';
        graph4.fillAlphas = 1;
        this.chart.addGraph(graph4);

        // five graph
        var graph5 = new AmCharts.AmGraph();
        graph5.type = 'column';
        graph5.title = 'Scheduled';
        graph5.valueField = 'scheduledVal';
        graph5.balloonText = 'Scheduled :[[value]]';
        graph5.lineAlpha = 0;
        graph5.fillColors = '#a22b2b';
        graph5.fillAlphas = 1;
        this.chart.addGraph(graph5);

        // LEGEND
        var legend = new AmCharts.AmLegend();
        legend.maxColumns = 4;
        legend.position = 'absolute';
        legend.autoMargins = true;
        legend.equalWidths = true;
        this.chart.addLegend(legend);
        this.chart.creditsPosition = 'bottom-right';

        // WRITE
        this.chart.write('chartdivforCol');
    }
    // handleClick(event: any) {
    //     alert(event.item.category + ': ' + event.item.values.value);
    //     CandidateDetailInput.emit({
    //         'inputstring': event.item.category,
    //         'message': 'FromAmChart'
    //     });
    // };

}
