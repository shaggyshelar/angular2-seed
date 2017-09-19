import { Pipe, PipeTransform } from '@angular/core';
import { CountryMaster } from '../index';

@Pipe({ name: 'CountryMasterFilterPipe' })
export class CountryMasterFilterPipe implements PipeTransform {
    transform(value: CountryMaster[], stringToSearh: string): CountryMaster[] {
        return stringToSearh ? value.filter(countryMaster =>
            (
                countryMaster.Value.search(new RegExp(stringToSearh, 'i')) !== -1
            )
        ) : value;
    }
}