import { Component, Input, OnChanges} from '@angular/core';
import { ROUTER_DIRECTIVES, OnActivate} from '@angular/router';
//import {IfAuthorizeDirective} from '../../../../shared/directives/ifAuthorize.directive';
//import { PanelsAvailablityComponent } from '../interviewersAvailablity/panelsAvailablity.component';

@Component({
    moduleId: module.id,
    selector: 'gauge-chart',
    templateUrl: 'gaugeChart.component.html',
    directives: [ROUTER_DIRECTIVES],
    styleUrls: ['piechart.component.css']
})

export class GaugeChartComponent implements OnChanges {
    @Input() chartData: any;
    counter: number[] = [1, 2, 3, 4, 5];
    guageChartData: Array<GuageChartData>;
    gaugeChart: any;
    _bandData: any;
    constructor() {
        this._bandData = [{
            'color': '#eee',
            'startValue': 0,
            'endValue': 100,
            'radius': '100%',
            'innerRadius': '85%'
        }, {
                'color': '#84b761',
                'startValue': 0,
                'endValue': 20,
                'radius': '100%',
                'innerRadius': '85%',
                'balloonText': '90%'
            }, {
                'color': '#eee',
                'startValue': 0,
                'endValue': 100,
                'radius': '80%',
                'innerRadius': '65%'
            }, {
                'color': '#fdd400',
                'startValue': 0,
                'endValue': 85,
                'radius': '80%',
                'innerRadius': '65%',
                'balloonText': '35%'
            }, {
                'color': '#eee',
                'startValue': 0,
                'endValue': 100,
                'radius': '60%',
                'innerRadius': '45%'
            }, {
                'color': '#cc4748',
                'startValue': 0,
                'endValue': 92,
                'radius': '60%',
                'innerRadius': '45%',
                'balloonText': '92%'
            }, {
                'color': '#eee',
                'startValue': 0,
                'endValue': 100,
                'radius': '40%',
                'innerRadius': '25%'
            }, {
                'color': '#67b7dc',
                'startValue': 0,
                'endValue': 30,
                'radius': '40%',
                'innerRadius': '25%',
                'balloonText': '68%'
            }];
    }

    ngOnChanges() {
        this.guageChartData = this.chartData;
        if (this.guageChartData)
            if (this.guageChartData.length > 0) {
                //TODO:: Remove Counter once you got data from api
                var count: number = 0;
                this.guageChartData.forEach(data => {
                    var tempData = data.bands;
                    this.InitializeChart(tempData, count, data.rrfCode);
                    count++;
                });
            } else {
                console.info('No data for Guage!');
            }
    }
    InitializeChart(_bandData: Array<any>, _count: number, _chartTitle: string) {
        this.gaugeChart = AmCharts.makeChart('chartdivforGauge' + _count, {
            'type': 'gauge',
            'theme': 'light',
            'startDuration': 2,
            'startEffect': 'bounce',
            'creditsPosition': 'bottom-right',
            // 'titles': [{
            //     'text': _chartTitle
            // }],
            'axes': [{
                'axisAlpha': 0,
                'tickAlpha': 0,
                'labelsEnabled': false,
                'startValue': 0,
                'endValue': 100,
                'startAngle': 0,
                'endAngle': 270,
                'bands': _bandData
            }],
            'allLabels': [{
                'text': 'Positions',
                'x': '49%',
                'y': '5%',
                'size': 12,
                //'bold': true,
                'color': '#84b761',
                'align': 'right'
            }, {
                    'text': 'Offered',
                    'x': '49%',
                    'y': '15%',
                    'size': 12,
                    //'bold': true,
                    'color': '#fdd400',
                    'align': 'right'
                }, {
                    'text': 'Offer Accepted',
                    'x': '49%',
                    'y': '24%',
                    'size': 12,
                    //'bold': true,
                    'color': '#cc4748',
                    'align': 'right'
                }, {
                    'text': 'Joined',
                    'x': '49%',
                    'y': '33%',
                    'size': 12,
                    //'bold': true,
                    'color': '#67b7dc',
                    'align': 'right'
                }],
            'export': {
                'enabled': true
            }
        });
    }
}
/**
 * GuageChartData
 */
class GuageChartData {
    rrfCode: string;
    bands: Array<any>;
}
