import { Pipe, PipeTransform } from '@angular/core';
import { RRFApprover } from '../index';

@Pipe({ name: 'RRFApproverMasterFilterPipe' })
export class RRFApproverMasterFilterPipe implements PipeTransform {
    transform(value: RRFApprover[], stringToSearh: string): RRFApprover[] {
        return stringToSearh ? value.filter(rrfApprover =>
            (
                rrfApprover.Approver.Value.search(new RegExp(stringToSearh, 'i')) !== -1 ||
                rrfApprover.Department.Value.search(new RegExp(stringToSearh, 'i')) !== -1 ||
                rrfApprover.DepartmentText.search(new RegExp(stringToSearh, 'i')) !== -1
            )
        ) : value;
    }
}