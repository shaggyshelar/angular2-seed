import { Pipe, PipeTransform } from '@angular/core';
import { InterviewMode } from '../index';

@Pipe({ name: 'InterviewModeMasterFilterPipe' })
export class InterviewModeMasterFilterPipe implements PipeTransform {
    transform(value: InterviewMode[], stringToSearh: string): InterviewMode[] {
        return stringToSearh ? value.filter(interviewMode =>
            (
                interviewMode.Value.search(new RegExp(stringToSearh, 'i')) !== -1
            )
        ) : value;
    }
}