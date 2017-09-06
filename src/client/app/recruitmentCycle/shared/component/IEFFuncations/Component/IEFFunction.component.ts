import { Component, Input, Output, EventEmitter} from '@angular/core';
import { OnActivate } from '@angular/router';
import { IEFFunction} from '../../../../shared/model/ief';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';


@Component({
  moduleId: module.id,
  selector: 'ief-function',
  templateUrl: 'IEFFunction.component.html',
  providers: [ToastsManager]
})
export class IEFFunctionComponent implements OnActivate {
  @Input() recordCount: number;
  @Input() functionsCollection: IEFFunction[];
  @Output() functionUpdate: EventEmitter<Array<IEFFunction>> = new EventEmitter<Array<IEFFunction>>();
  @Input() isDisabled: boolean = false;
  ratings: Array<number> = new Array<number>();
  constructor(public toastr: ToastsManager) {
    for (var index = 1; index <= 5; index++) {
      this.ratings.push(index);
    }
  }
  routerOnActivate() {
    /** */
  }
  onUpdate() {
    this.functionUpdate.emit(this.functionsCollection);
  }

  validate(value: string): boolean {
    var result = false;
    if (value.indexOf('\'') >= 0 || value.indexOf('"') >= 0|| value.indexOf('\\') >= 0) {
      this.toastr.error('Backslash, single quotes and double quotes are not allowed');
      value = '';
      result = false;
    } else {
      result = true;
    }
    return result;
  }
}
