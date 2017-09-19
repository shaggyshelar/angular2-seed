import { Pipe, PipeTransform } from '@angular/core';
import { FeatureMaster } from '../index';

@Pipe({ name: 'FeatureMasterFilterPipe' })
export class FeatureMasterFilterPipe implements PipeTransform {
    transform(value: FeatureMaster[], stringToSearh: string): FeatureMaster[] {
        return stringToSearh ? value.filter(featureMaster =>
            (
                featureMaster.Value.search(new RegExp(stringToSearh, 'i')) !== -1
            )
        ) : value;
    }
}