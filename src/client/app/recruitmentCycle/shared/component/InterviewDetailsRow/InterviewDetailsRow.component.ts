import { Component, Input} from '@angular/core';
import { ROUTER_DIRECTIVES, OnActivate } from '@angular/router';
import { Interview} from '../../model/interview';

@Component({
  moduleId: module.id,
  selector: 'intwDetailsRow',
  templateUrl: 'InterviewDetailsRow.component.html',
  directives: [ROUTER_DIRECTIVES],
  styleUrls: ['InterviewDetails.component.css'],
})

export class InterviewDetailsRowComponent implements OnActivate {
  @Input() InterviewRecord: Interview = new Interview();

  routerOnActivate() {

  }
     getTime(time: string) {
        //time:string = interviewTime;
        var intTime :Array<string> =new Array<string>();
        intTime = time.toString().match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];
        if (intTime.length > 1) { // If time format correct
            intTime = intTime.slice(1);  // Remove full string match value
            intTime[5] = +intTime[0] < 12 ? 'AM' : 'PM'; // Set AM/PM
            var adjustHr = +intTime[0] % 12 || 12; // Adjust hours
            intTime[0] = adjustHr.toString();
        }
        return intTime.join('');
    }
  
 //Format date in "yyyy-mm-dd" format
    formatDate(date: any) {
        var d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();
        if (month.length < 2) month = '0' + month;
        if (day.length < 2) day = '0' + day;

        return [day, month, year].join('-');
    }
}
