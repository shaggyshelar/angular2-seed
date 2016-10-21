///<reference path="../graph/AmCharts.d.ts" />
import { Component, Input, OnInit} from '@angular/core';
import { ROUTER_DIRECTIVES, OnActivate} from '@angular/router';
//import {IfAuthorizeDirective} from '../../../../shared/directives/ifAuthorize.directive';
//import { PanelsAvailablityComponent } from '../interviewersAvailablity/panelsAvailablity.component';

@Component({
    moduleId: module.id,
    selector: 'am-chart',
    templateUrl: 'graph.component.html',
    directives: [ROUTER_DIRECTIVES]
})

export class GraphComponent implements OnInit {
    @Input() chartData: any;
    data: any;
    ngOnInit() {
        this.data = this.chartData;
        var chart: any;
        //if (AmCharts.isReady) {
            createChart(this.chartData);
        //} else {
            ///AmCharts.ready(function () {
            //    createChart(this.chartData);
           // });
       // }
        function createChart(chartData: any) {
            // SERIAL CHART
            chart = new AmCharts.AmSerialChart();
            chart.dataProvider = chartData;
            chart.categoryField = 'year';
            chart.startDuration = 1;
            chart.plotAreaBorderColor = '#DADADA';
            chart.plotAreaBorderAlpha = 1;
            // this single line makes the chart a bar chart
            chart.rotate = false;

            // add click listener
            chart.addListener('clickGraphItem', handleClick);
            // AXES
            // Category
            var categoryAxis = chart.categoryAxis;
            categoryAxis.gridPosition = 'start';
            categoryAxis.gridAlpha = 0.1;
            categoryAxis.axisAlpha = 0;

            // Value
            var valueAxis = new AmCharts.ValueAxis();
            valueAxis.axisAlpha = 0;
            valueAxis.gridAlpha = 0.1;
            valueAxis.position = 'top';
            chart.addValueAxis(valueAxis);

            // GRAPHS
            // first graph
            var graph1 = new AmCharts.AmGraph();
            graph1.type = 'column';
            graph1.title = 'Income';
            graph1.valueField = 'income';
            graph1.balloonText = 'Income:[[value]]';
            graph1.lineAlpha = 0;
            graph1.fillColors = '#ADD981';
            graph1.fillAlphas = 1;
            chart.addGraph(graph1);

            // second graph
            var graph2 = new AmCharts.AmGraph();
            graph2.type = 'column';
            graph2.title = 'Expenses';
            graph2.valueField = 'expenses';
            graph2.balloonText = 'Expenses:[[value]]';
            graph2.lineAlpha = 0;
            graph2.fillColors = '#81acd9';
            graph2.fillAlphas = 1;
            chart.addGraph(graph2);

            // LEGEND
            var legend = new AmCharts.AmLegend();
            chart.addLegend(legend);

            chart.creditsPosition = 'top-right';

            // WRITE
            chart.write('chartdivforCol');
        }
        function handleClick(event:any) {
            alert(event.item.category + ': ' + event.item.values.value);
        }
    }
}
