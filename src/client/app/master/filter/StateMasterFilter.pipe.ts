import { Pipe, PipeTransform } from '@angular/core';
import { State} from '../index';

@Pipe({ name: 'StateMasterFilterPipe' })
export class StateMasterFilterPipe implements PipeTransform {
    transform(value: State[], stringToSearh: string): State[] {
        return stringToSearh ? value.filter(state =>
            (
                state.Value.search(new RegExp(stringToSearh, 'i')) !== -1
            )
        ) : value;
    }
}