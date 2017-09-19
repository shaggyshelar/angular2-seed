import { Pipe, PipeTransform } from '@angular/core';
import { CityMaster } from '../index';

@Pipe({ name: 'CityMasterFilterPipe' })
export class CityMasterFilterPipe implements PipeTransform {
    transform(value: CityMaster[], stringToSearh: string): CityMaster[] {
        return stringToSearh ? value.filter(cityMaster =>
            (
                cityMaster.City.Value.search(new RegExp(stringToSearh, 'i')) !== -1
            )
        ) : value;
    }
}