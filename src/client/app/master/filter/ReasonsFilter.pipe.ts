import { Pipe, PipeTransform } from '@angular/core';
import { ReasonsMaster } from '../index';

@Pipe({ name: 'ReasonsMasterMasterFilterPipe' })
export class ReasonsMasterMasterFilterPipe implements PipeTransform {
    transform(value: ReasonsMaster[], stringToSearh: string): ReasonsMaster[] {
        return stringToSearh ? value.filter(reasonsMaster =>
            (
                reasonsMaster.Reason.search(new RegExp(stringToSearh, 'i')) !== -1 ||
                reasonsMaster.Category.search(new RegExp(stringToSearh, 'i')) !== -1
            )
        ) : value;
    }
}