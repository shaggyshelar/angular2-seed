import { Pipe, PipeTransform } from '@angular/core';
import { IEFFunctions } from '../index';

@Pipe({ name: 'IEFFunctionsMasterFilterPipe' })
export class IEFFunctionsMasterFilterPipe implements PipeTransform {
    transform(value: IEFFunctions[], stringToSearh: string): IEFFunctions[] {
        return stringToSearh ? value.filter(iefFunctions =>
            (
                iefFunctions.FunctionName.search(new RegExp(stringToSearh, 'i')) !== -1 ||
                iefFunctions.InterviewType.Value.search(new RegExp(stringToSearh, 'i')) !== -1 ||
                iefFunctions.DisplayRatings.toString().search(new RegExp(stringToSearh, 'i')) !== -1
            )
        ) : value;
    }
}