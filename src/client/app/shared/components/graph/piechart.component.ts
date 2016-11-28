///<reference path="../graph/AmCharts.d.ts" />
import { Component, Input, OnChanges, OnInit} from '@angular/core';
import { ROUTER_DIRECTIVES, OnActivate} from '@angular/router';
//import {IfAuthorizeDirective} from '../../../../shared/directives/ifAuthorize.directive';
//import { PanelsAvailablityComponent } from '../interviewersAvailablity/panelsAvailablity.component';

@Component({
  moduleId: module.id,
  selector: 'pie-chart',
  templateUrl: 'piechart.component.html',
  directives: [ROUTER_DIRECTIVES],
  styleUrls: ['piechart.component.css']
})

export class PiechartComponent implements OnChanges {
  @Input() chartData: any;
  data: any;
  ngOnChanges() {
    this.InitializePieChart(this.chartData);
  }
  /** - Creates chart as per data 
   *  - If data is null or empty will not create instance (Chart)
   *  - If data is preset create instance and shows chart
   */
  InitializePieChart(_chartData: any) {
    if (_chartData.length > 0) {
      var chart = AmCharts.makeChart('chartdivforPie', {
        'type': 'pie',
        'labelRadius': -5,
        'startDuration': 0.5,
        'theme': 'light',
        'addClassNames': true,
        'innerRadius': '0%',
        'defs': {
          'filter': [{
            'id': 'shadow',
            'width': '10%',
            'height': '10%',
            'feOffset': {
              'result': 'offOut',
              'in': 'SourceAlpha',
              'dx': 0,
              'dy': 0
            },
            'feGaussianBlur': {
              'result': 'blurOut',
              'in': 'offOut',
              'stdDeviation': 5
            },
            'feBlend': {
              'in': 'SourceGraphic',
              'in2': 'blurOut',
              'mode': 'normal'
            }
          }]
        },
        'dataProvider': _chartData,
        'valueField': 'value',
        'titleField': 'title',
        'export': {
          'enabled': true
        }
      });

      chart.addListener('init', handleInit);

      chart.addListener('rollOverSlice', function (e: any) {
        handleRollOver(e);
      });

      function handleInit() {
        chart.legend.addListener('rollOverItem', handleRollOver);
      }

      function handleRollOver(e: any) {
        var wedge = e.dataItem.wedge.node;
        wedge.parentNode.appendChild(wedge);
      }
    } else {
      console.log('WARN :: No data to intiate pie chart!');
    }
  }

}
