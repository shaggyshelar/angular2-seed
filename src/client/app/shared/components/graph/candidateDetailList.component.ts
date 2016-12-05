///<reference path="../graph/AmCharts.d.ts" />
import { Component, Input, Output, OnChanges, OnInit, EventEmitter} from '@angular/core';
import { ROUTER_DIRECTIVES, OnActivate} from '@angular/router';
//import {IfAuthorizeDirective} from '../../../../shared/directives/ifAuthorize.directive';
//import { PanelsAvailablityComponent } from '../interviewersAvailablity/panelsAvailablity.component';
import { RecruitersDashboardService } from '../../../Dashboard/Reqruiter/services/recruitersDashboard.service';
@Component({
  moduleId: module.id,
  selector: 'candidate-details',
  templateUrl: 'candidateDetailList.component.html',
  directives: [ROUTER_DIRECTIVES],
  //styleUrls: ['piechart.component.css']
})

export class CandidateDetailComponent implements OnInit {
  @Input() chartData: any;
  @Output() stackColChartInput:EventEmitter<any> = new EventEmitter<any>();
  data: any;
  chart: any;
  public ChartDataForStackedColChart: any = [];
  errorMessage: string;
  ngOnInit() {
  }
  constructor(private dashboardSerivce: RecruitersDashboardService) {
  }
  
  
}
