import { Pipe, PipeTransform } from '@angular/core';
import { ResumeSource } from '../index';

@Pipe({ name: 'ResumeSourceMasterFilterPipe' })
export class ResumeSourceMasterFilterPipe implements PipeTransform {
    transform(value: ResumeSource[], stringToSearh: string): ResumeSource[] {
        return stringToSearh ? value.filter(resumeSource =>
            (
                resumeSource.Value.search(new RegExp(stringToSearh, 'i')) !== -1
            )
        ) : value;
    }
}