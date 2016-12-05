///<reference path="../graph/AmCharts.d.ts" />
import { Component, Input, Output, OnChanges, OnInit, EventEmitter} from '@angular/core';
import { ROUTER_DIRECTIVES, OnActivate} from '@angular/router';
//import {IfAuthorizeDirective} from '../../../../shared/directives/ifAuthorize.directive';
//import { PanelsAvailablityComponent } from '../interviewersAvailablity/panelsAvailablity.component';

@Component({
    moduleId: module.id,
    selector: 'stackedcol-chart',
    templateUrl: 'stackedColumnChart.component.html',
    directives: [ROUTER_DIRECTIVES],
    styleUrls: ['piechart.component.css']
})

export class StackedColumnComponent implements OnChanges {
    @Input() chartData: any;
    @Output() amChartInput: EventEmitter<any> = new EventEmitter<any>();
    data: any;
    chart: any;
    ngOnChanges() {
        this.InitializeStackedChart(this.chartData, this.amChartInput);
    }
    /** - Creates chart as per data 
     *  - If data is null or empty will not create instance (Chart)
     *  - If data is preset create instance and shows chart
     */
    InitializeStackedChart(_chartData: any, amChartInput: any) {
        if (_chartData.length > 0) {
            this.chart = AmCharts.makeChart('chartdivforStackedCol', {
                'type': 'serial',
                'theme': 'light',
                'legend': {
                    //'horizontalGap': 10,
                    'maxColumns': 3,
                    'position': 'right',
                    //'useGraphSettings': false,
                    'markerSize': 6,
                    'autoMargins': true,
                    'totalText': '[[total]]',
                    'equalWidths': true
                },
                'startDuration': 1,
                'dataProvider': _chartData,
                'valueAxes': [{
                    'stackType': 'regular',
                    'axisAlpha': 0.3,
                    'gridAlpha': 0
                }],
                'graphs': [{
                    'balloonText': '<b>[[title]]</b><br><span style="font-size:14px">[[category]]: <b>[[value]]</b></span>',
                    'fillAlphas': 0.8,
                    'labelText': '[[value]]',
                    'lineAlpha': 0.3,
                    'title': 'Joined',
                    'type': 'column',
                    'color': '#000000',
                    'valueField': 'JoinedVal'
                }, {
                        'balloonText': '<b>[[title]]</b><br><span style="font-size:14px">[[category]]: <b>[[value]]</b></span>',
                        'fillAlphas': 0.8,
                        'labelText': '[[value]]',
                        'lineAlpha': 0.3,
                        'title': 'In Process',
                        'type': 'column',
                        'color': '#000000',
                        'valueField': 'inprocessVal'
                    }, {
                        'balloonText': '<b>[[title]]</b><br><span style="font-size:14px">[[category]]: <b>[[value]]</b></span>',
                        'fillAlphas': 0.8,
                        'labelText': '[[value]]',
                        'lineAlpha': 0.3,
                        'title': 'Offer Accepted',
                        'type': 'column',
                        'color': '#000000',
                        'valueField': 'offerAcceptedVal'
                    }, {
                        'balloonText': '<b>[[title]]</b><br><span style="font-size:14px">[[category]]: <b>[[value]]</b></span>',
                        'fillAlphas': 0.8,
                        'labelText': '[[value]]',
                        'lineAlpha': 0.3,
                        'title': 'Offered',
                        'type': 'column',
                        'color': '#000000',
                        'valueField': 'offeredVal'
                    }, {
                        'balloonText': '<b>[[title]]</b><br><span style="font-size:14px">[[category]]: <b>[[value]]</b></span>',
                        'fillAlphas': 0.8,
                        'labelText': '[[value]]',
                        'lineAlpha': 0.3,
                        'title': 'Open',
                        'type': 'column',
                        'color': '#000000',
                        'valueField': 'openVal'
                    }],
                'categoryField': 'status',
                'categoryAxis': {
                    'gridPosition': 'start',
                    'axisAlpha': 0,
                    'gridAlpha': 0,
                    'position': 'left'
                },
                'export': {
                    'enabled': true
                }

            });
            this.chart.addListener("clickGraphItem", handleClick)

            function handleClick(val: any) {
                amChartInput.emit({
                    'inputstring': val.item.category,
                    'message': 'FromStackedColChart'
                });
            }
        }
    }

}
