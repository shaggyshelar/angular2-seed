import { Component, Input, OnInit} from '@angular/core';
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

export class GaugeChartComponent implements OnInit {
    @Input() chartData: any;
    data: any;
    ngOnInit() {
        this.data = this.chartData;
        var gaugeChart = AmCharts.makeChart('chartdivforGauge', {
            'type': 'gauge',
            'theme': 'light',
            'axes': [{
                'axisAlpha': 0,
                'tickAlpha': 0,
                'labelsEnabled': false,
                'startValue': 0,
                'endValue': 100,
                'startAngle': 0,
                'endAngle': 270,
                'bands': [{
                    'color': '#eee',
                    'startValue': 0,
                    'endValue': 100,
                    'radius': '100%',
                    'innerRadius': '85%'
                }, {
                        'color': '#84b761',
                        'startValue': 0,
                        'endValue': 80,
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
                        'endValue': 35,
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
                        'endValue': 68,
                        'radius': '40%',
                        'innerRadius': '25%',
                        'balloonText': '68%'
                    }]
            }],
            'allLabels': [{
                'text': 'First option',
                'x': '49%',
                'y': '5%',
                'size': 15,
                'bold': true,
                'color': '#84b761',
                'align': 'right'
            }, {
                    'text': 'Second option',
                    'x': '49%',
                    'y': '15%',
                    'size': 15,
                    'bold': true,
                    'color': '#fdd400',
                    'align': 'right'
                }, {
                    'text': 'Third option',
                    'x': '49%',
                    'y': '24%',
                    'size': 15,
                    'bold': true,
                    'color': '#cc4748',
                    'align': 'right'
                }, {
                    'text': 'Fourth option',
                    'x': '49%',
                    'y': '33%',
                    'size': 15,
                    'bold': true,
                    'color': '#67b7dc',
                    'align': 'right'
                }],
            'export': {
                'enabled': true
            }
        });
        var gaugeChart1 = AmCharts.makeChart('chartdivforGauge1', {
            'type': 'gauge',
            'theme': 'light',
            'axes': [{
                'axisAlpha': 0,
                'tickAlpha': 0,
                'labelsEnabled': false,
                'startValue': 0,
                'endValue': 100,
                'startAngle': 0,
                'endAngle': 270,
                'bands': [{
                    'color': '#eee',
                    'startValue': 0,
                    'endValue': 100,
                    'radius': '100%',
                    'innerRadius': '85%'
                }, {
                        'color': '#84b761',
                        'startValue': 0,
                        'endValue': 80,
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
                        'endValue': 35,
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
                        'endValue': 68,
                        'radius': '40%',
                        'innerRadius': '25%',
                        'balloonText': '68%'
                    }]
            }],
            'allLabels': [{
                'text': 'Position',
                'x': '49%',
                'y': '5%',
                //'size': 15,
                //'bold': true,
                'color': '#84b761',
                'align': 'right'
            }, {
                    'text': 'Offered',
                    'x': '49%',
                    'y': '15%',
                    //'size': 15,
                    //  'bold': true,
                    'color': '#fdd400',
                    'align': 'right'
                }, {
                    'text': 'OfferedAccepted',
                    'x': '49%',
                    'y': '24%',
                    //'size': 15,
                    //'bold': true,
                    'color': '#cc4748',
                    'align': 'right'
                }, {
                    'text': 'Joined',
                    'x': '49%',
                    'y': '33%',
                    //'size': 15,
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
