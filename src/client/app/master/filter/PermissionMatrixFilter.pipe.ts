import { Pipe, PipeTransform } from '@angular/core';
import { Permission } from '../index';

@Pipe({ name: 'PermissionMasterFilterPipe' })
export class PermissionMasterFilterPipe implements PipeTransform {
    transform(value: Permission[], stringToSearh: string): Permission[] {
        return stringToSearh ? value.filter(permission =>
            (
                permission.Feature.Value.search(new RegExp(stringToSearh, 'i')) !== -1
            )
        ) : value;
    }
}