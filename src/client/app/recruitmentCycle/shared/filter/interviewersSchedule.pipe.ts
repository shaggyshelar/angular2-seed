import { Pipe, PipeTransform } from '@angular/core';
import { MyScheduleInterview } from '../../interviewersTab/model/myScheduleInterview';

@Pipe({ name: 'InterviewersSchedule' })
export class InterviewersSchedule implements PipeTransform {
    transform(value: MyScheduleInterview[], stringToSearh: string): MyScheduleInterview[] {
        return stringToSearh ? value.filter(interview =>
            (
                interview.CandidateDetails.FullName.search(new RegExp(stringToSearh, 'i')) !== -1 ||
                interview.Status.search(new RegExp(stringToSearh, 'i')) !== -1 ||
                interview.InterviewType.Value.search(new RegExp(stringToSearh, 'i')) !== -1 ||
                interview.InterviewMode.Value.search(new RegExp(stringToSearh, 'i')) !== -1 ||
                interview.InterviewDate.search(new RegExp(stringToSearh, 'i')) !== -1 ||
                interview.InterviewFromTime.search(new RegExp(stringToSearh, 'i')) !== -1
            )
        ) : value;
    }
}

