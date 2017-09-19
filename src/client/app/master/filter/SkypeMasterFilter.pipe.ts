import { Pipe, PipeTransform } from '@angular/core';
import { SkypeMaster} from '../index';

@Pipe({ name: 'SkypeMasterFilterPipe' })
export class SkypeMasterFilterPipe implements PipeTransform {
    transform(value: SkypeMaster[], stringToSearh: string): SkypeMaster[] {
        return stringToSearh ? value.filter(skype =>
            (
                skype.Password.search(new RegExp(stringToSearh, 'i')) !== -1 ||
                skype.Value.search(new RegExp(stringToSearh, 'i')) !== -1
            )
        ) : value;
    }
}