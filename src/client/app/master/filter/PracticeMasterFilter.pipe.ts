import { Pipe, PipeTransform } from '@angular/core';
import { Practice } from '../index';

@Pipe({ name: 'PracticeMasterFilterPipe' })
export class PracticeMasterFilterPipe implements PipeTransform {
    transform(value: Practice[], stringToSearh: string): Practice[] {
        return stringToSearh ? value.filter(practice =>
            (
                practice.Value.search(new RegExp(stringToSearh, 'i')) !== -1
            )
        ) : value;
    }
}