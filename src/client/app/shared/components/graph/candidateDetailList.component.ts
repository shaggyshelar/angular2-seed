///<reference path="../graph/AmCharts.d.ts" />
import { Component, Input, Output, OnChanges, OnInit, EventEmitter} from '@angular/core';
import { ROUTER_DIRECTIVES, OnActivate} from '@angular/router';
//import {IfAuthorizeDirective} from '../../../../shared/directives/ifAuthorize.directive';
//import { PanelsAvailablityComponent } from '../interviewersAvailablity/panelsAvailablity.component';
import { RecruitersDashboardService } from '../../../Dashboard/Reqruiter/services/recruitersDashboard.service';
import { InterviewMode } from  '../../../shared/constantValue/index';
import { MasterData, ResponseFromAPI} from '../../../shared/model/common.model';
@Component({
  moduleId: module.id,
  selector: 'candidate-details',
  templateUrl: 'candidateDetailList.component.html',
  directives: [ROUTER_DIRECTIVES],
  //styleUrls: ['piechart.component.css']
})

export class CandidateDetailComponent implements OnChanges,OnInit {
  @Input() CandidateData: any;
  @Output() BarchartInput:EventEmitter<any> = new EventEmitter<any>();
  data: any;
  chart: any;
  modeConstant: InterviewMode = InterviewMode;
  public ChartDataForStackedColChart: any = [];
  errorMessage: string;
  ngOnChanges() {
    console.log(this.CandidateData);
   
  }
  ngOnInit(){
    if(this.CandidateData !== undefined) {
      this.BarchartInput.emit({
        'inputstring': this.CandidateData[0].CandidateID,
        'message':'FromCandidateDetails'
       })
    }
     
  }
  constructor(private dashboardSerivce: RecruitersDashboardService) {
  }
  getCandidatesRoundHistory(CandidateID: MasterData) {
      this.BarchartInput.emit({
        'inputstring': CandidateID,
        'message':'FromCandidateDetails'
      })
  }
  getDate(interviewDate: string) {
        var d = new Date(interviewDate),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();
        if (month.length < 2) month = '0' + month;
        if (day.length < 2) day = '0' + day;

        return [day, month, year].join('-');
    }
}
