import {Component } from '@angular/core';
import { Router, OnActivate, RouteSegment, ROUTER_DIRECTIVES } from '@angular/router';
import { QualificationInfo } from '../models/qualificationInfo';
import { QualificationService } from '../services/qualification.service';

@Component({
    selector: 'admin-qualification-add',
    templateUrl: 'app/admin/qualification/components/qualificationAdd.component.html',
    directives: [ROUTER_DIRECTIVES]
})

export class QualificationAddComponent implements OnActivate {
    qualification: QualificationInfo;
    errorMessage: string;
    params: string;
    constructor(private _qualificationService: QualificationService,
        private _router: Router) {
        this.qualification = new QualificationInfo(0, '');
    }

    routerOnActivate(segment: RouteSegment) {
        this.params = segment.getParam('id');
        if (this.params) {
            this._qualificationService.getQualificationById(this.params)
                .subscribe(
                results=> {
                    this.qualification = results;
                },
                error => this.errorMessage = <any>error);
        }
    }

    onSave(): void {
        if (this.params) {
            this._qualificationService.editQualification(this.qualification)
                .subscribe(
                results=> {
                    this._router.navigate(['/Admin/Qualification']);
                },
                error => this.errorMessage = <any>error);
        } else {
            this._qualificationService.addQualification(this.qualification)
                .subscribe(
                results=> {
                    this._router.navigate(['/Admin/Qualification']);
                },
                error => this.errorMessage = <any>error);
        }
    }
}