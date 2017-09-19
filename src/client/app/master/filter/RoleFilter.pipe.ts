import { Pipe, PipeTransform } from '@angular/core';
import { RolesMaster } from '../index';

@Pipe({ name: 'RoleMasterMasterFilterPipe' })
export class RoleMasterMasterFilterPipe implements PipeTransform {
    transform(value: RolesMaster[], stringToSearh: string): RolesMaster[] {
        return stringToSearh ? value.filter(roleMaster =>
            (
                roleMaster.Role.search(new RegExp(stringToSearh, 'i')) !== -1 ||
                roleMaster.SequenceNo.search(new RegExp(stringToSearh, 'i')) !== -1
            )
        ) : value;
    }
}