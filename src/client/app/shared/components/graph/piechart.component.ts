///<reference path="../graph/AmCharts.d.ts" />
import { Component, Input, OnInit} from '@angular/core';
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

export class PiechartComponent implements OnInit {
  @Input() chartData: any;
  data: any;
  ngOnInit() {
    this.data = this.chartData;
    var chart = AmCharts.makeChart('chartdivforPie', {
      'type': 'pie',
      'startDuration': 0,
      'theme': 'light',
      'addClassNames': true,
      'innerRadius': '30%',
      'defs': {
        'filter': [{
          'id': 'shadow',
          'width': '200%',
          'height': '200%',
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
      'dataProvider': this.chartData,
      'valueField': 'litres',
      'titleField': 'country',
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
  }
}
