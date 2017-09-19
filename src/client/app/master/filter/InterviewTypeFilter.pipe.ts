import { Pipe, PipeTransform } from '@angular/core';
import { InterviewType } from '../index';

@Pipe({ name: 'InterviewTypeMasterFilterPipe' })
export class InterviewTypeMasterFilterPipe implements PipeTransform {
    transform(value: InterviewType[], stringToSearh: string): InterviewType[] {
        return stringToSearh ? value.filter(interviewType =>
            (
                interviewType.Value.search(new RegExp(stringToSearh, 'i')) !== -1 ||
                interviewType.Sequence.search(new RegExp(stringToSearh, 'i')) !== -1
            )
        ) : value;
    }
}