import { Component, OnInit} from '@angular/core';
import { ROUTER_DIRECTIVES, Router } from '@angular/router';
import { QualificationInfo } from '../models/qualificationInfo';
import { QualificationService } from '../services/qualification.service';

@Component({
    selector: 'admin-qualification-list',
    templateUrl: 'app/admin/qualification/components/qualificationList.component.html',
    directives: [ROUTER_DIRECTIVES]
})

export class QualificationListComponent implements OnInit {
    qualificationList: Array<QualificationInfo>;
    errorMessage: string;
    constructor(private _qualificationService: QualificationService,
        private _router: Router) {
    }

    ngOnInit() {
        this.getQualifications();
    }

    getQualifications() {
        this._qualificationService.getQualifications()
            .subscribe(
            results=> {
                this.qualificationList = results;
            },
            error => this.errorMessage = <any>error);
    }

    onDelete(qualification: QualificationInfo) {
        this._qualificationService.deleteQualification(qualification)
            .subscribe(
            results=> {
                this.getQualifications();
            },
            error => this.errorMessage = <any>error);
    }
}