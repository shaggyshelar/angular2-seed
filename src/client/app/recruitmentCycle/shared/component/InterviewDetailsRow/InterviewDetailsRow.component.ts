import { Component, Input} from '@angular/core';
import { Interview} from '../../model/interview';

@Component({
  moduleId: module.id,
  selector: 'intwDetailsRow',
  templateUrl: 'InterviewDetailsRow.component.html',
  //directives: [ROUTER_DIRECTIVES],
  styleUrls: ['InterviewDetails.component.css'],
})

export class InterviewDetailsRowComponent  {
  @Input() InterviewRecord: Interview = new Interview();

  getTime(time: string[]) {
    //time:string = interviewTime;
    time = time.toString().match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];
    if (time.length > 1) { // If time format correct
      time = time.slice(1);  // Remove full string match value
      time[5] = +time[0] < 12 ? 'AM' : 'PM'; // Set AM/PM
      time[0] = +time[0] % 12 || 12; // Adjust hours
    }
    return time.join('');
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
