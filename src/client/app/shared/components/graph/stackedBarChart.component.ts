import { Component, Input, OnChanges, OnInit} from '@angular/core';
import { ROUTER_DIRECTIVES, OnActivate} from '@angular/router';

@Component({
    moduleId: module.id,
    selector: 'stacked-bar-chart',
    templateUrl: 'stackedBarChart.component.html',
    directives: [ROUTER_DIRECTIVES],
    styleUrls: ['piechart.component.css']
})

export class StackedBarComponent implements OnChanges {
    @Input() chartData: any;
    data: any;
    ngOnChanges() {
        this.InitializeBarChart(this.chartData);
    }
    /** - Creates chart as per data 
     *  - If data is null or empty will not create instance (Chart)
     *  - If data is preset create instance and shows chart
     */
    InitializeBarChart(_charData: any) {
        var chart = AmCharts.makeChart('barChartDiv', {
            'type': 'serial',
            'theme': 'light',
            'creditsPosition': 'top-right',
            'legend': {
                'horizontalGap': 10,
                'maxColumns': 3,
                'position': 'top',
                'useGraphSettings': true,
                'markerSize': 15
            },
            'dataProvider': _charData,
            'valueAxes': [{
                'stackType': 'regular',
                'axisAlpha': 0.5,
                'gridAlpha': 0
            }],
            'startDuration': 1,
            'graphs': [{
                'balloonText': '<b>[[title]]</b><br><span style="font-size:14px">[[category]]: <b>[[value]]</b></span>',
                'fillAlphas': 0.8,
                'labelText': '[[value]]',
                'lineAlpha': 0.3,
                'title': 'Completed',
                'type': 'column',
                'color': '#000000',
                'valueField': 'completedVal'
            }, {
                    'balloonText': '<b>[[title]]</b><br><span style="font-size:14px">[[category]]: <b>[[value]]</b></span>',
                    'fillAlphas': 0.8,
                    'labelText': '[[value]]',
                    'lineAlpha': 0.3,
                    'title': 'Remaining',
                    'type': 'column',
                    'color': '#000000',
                    'valueField': 'remainingVal'
                }, {
                    'balloonText': '<b>[[title]]</b><br><span style="font-size:14px">[[category]]: <b>[[value]]</b></span>',
                    'fillAlphas': 0.8,
                    'labelText': '[[value]]',
                    'lineAlpha': 0.3,
                    'title': 'Overdue',
                    'type': 'column',
                    'color': '#000000',
                    'valueField': 'overdueVal'
                }
                // , {
                //     'balloonText': '<b>[[title]]</b><br><span style="font-size:14px">[[category]]: <b>[[value]]</b></span>',
                //     'fillAlphas': 0.8,
                //     'labelText': '[[value]]',
                //     'lineAlpha': 0.3,
                //     'title': 'Offered',
                //     'type': 'column',
                //     'color': '#000000',
                //     'valueField': 'offeredVal'
                // }, {
                //     'balloonText': '<b>[[title]]</b><br><span style="font-size:14px">[[category]]: <b>[[value]]</b></span>',
                //     'fillAlphas': 0.8,
                //     'labelText': '[[value]]',
                //     'lineAlpha': 0.3,
                //     'title': 'Open',
                //     'type': 'column',
                //     'color': '#000000',
                //     'valueField': 'openVal'
                // }
            ],
            'rotate': true,
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
    }
}
