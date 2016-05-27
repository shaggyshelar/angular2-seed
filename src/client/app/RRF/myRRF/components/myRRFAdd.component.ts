import {Component } from '@angular/core';
import { Router, OnActivate, ROUTER_DIRECTIVES, RouteSegment } from '@angular/router';
import {RRFDetails, Panel, MasterData } from '../models/rrfDetails';
import { MyRRFService } from '../services/myRRF.service';
import { MastersService } from '../../../shared/services/masters.service';
import {SELECT_DIRECTIVES} from 'ng2-select/ng2-select';

@Component({
    moduleId: module.id,
    selector: 'rrf-myrrf-add',
    templateUrl: 'myRRFAdd.component.html',
    directives: [ROUTER_DIRECTIVES, SELECT_DIRECTIVES]
})

export class MyRRFAddComponent implements OnActivate {
    newRRF: RRFDetails = new RRFDetails();
    panel: Panel = new Panel();
    errorMessage: string = '';
    designations: MasterData[];
    practices: MasterData[];
    technologies: MasterData[];
    skills: MasterData[];
    interviewRound: MasterData[];
    interviewers: MasterData[];
    isNewRRF: boolean = true; //TODO
    comment: string;
    IntwRound: number = 0;

    updatePanel: boolean = false;
    editPanelData: Panel = new Panel();
    Id: number;

    constructor(private _myRRFService: MyRRFService,
        private _router: Router,
        private _mastersService: MastersService) {
        // this.newRRF.Panel.push(this.panel);
        this.getDesignation();
        this.getPractice();
        this.getTechnologies();
        this.getSkills();
        this.getInterviewRound();
        this.getInterviewers();
    }

    routerOnActivate(segment: RouteSegment): void {
        //TO display Date picker
        // $('#expectedDateOfJoining').datepicker();

        //To display up and down arrow for number selection
        // $('input[name="demo_vertica"]').TouchSpin({
        //     verticalbuttons: true,
        //     stepinterval: 0.5
        // });

        //dropdown with multi selector and search
        $('#cmbInterviewer').select2();
        $('#cmbSkillsReq').select2();


        if (segment.getParam('id') !== undefined) {
            this.Id = +segment.getParam('id');
            this.isNewRRF = false;
            this.getRRFByID(this.Id);
        }

        if (this.isNewRRF) {
            this.newRRF.NoOfOpenings = 1;
            this.newRRF.Priority = 1;
            this.newRRF.MinExp = 0;
            this.newRRF.MaxExp = 0;

            this.newRRF.Practice.Id = 0;
            this.newRRF.Technology.Id = 0;
            this.newRRF.SkillsRequired.Id = 0;
            this.newRRF.Designation.Id = 0;
            $('#cmbInterviewer').val = ['0'];
        }
    }

    addPanel(): void {
        var addPanel: Panel = new Panel();
        this.newRRF.Panel.push(addPanel);
    }

    raiseRRF(): void {
        this.setSkillToObject();
        this._myRRFService.raiseRRF(this.newRRF)
            .subscribe(
            results => {
                this._router.navigate(['/App/RRF/RRFDashboard/']);
            },
            error => this.errorMessage = <any>error);
    }



    onCancelClick(): void {
        this._router.navigate(['/App/RRF/RRFDashboard/']);
    }

    getDesignation(): void {
        this._mastersService.GetDesignations()
            .subscribe(
            results => {
                this.designations = results;
            },
            error => this.errorMessage = <any>error);
    }

    getPractice(): void {
        this._mastersService.getPractices()
            .subscribe(
            results => {
                this.practices = results;
            },
            error => this.errorMessage = <any>error);
    }

    getTechnologies(): void {
        this._mastersService.getTechnologies()
            .subscribe(
            results => {
                this.technologies = results;
            },
            error => this.errorMessage = <any>error);
    }

    getSkills(): void {
        this._mastersService.getSkills()
            .subscribe(
            results => {
                this.skills = results;
            },
            error => this.errorMessage = <any>error);
    }

    getInterviewRound(): void {
        this._mastersService.getRounds()
            .subscribe(
            results => {
                this.interviewRound = results;
            },
            error => this.errorMessage = <any>error);
    }

    getInterviewers(): void {
        this._mastersService.getInterviewers()
            .subscribe(
            results => {
                this.interviewers = results;
            },
            error => this.errorMessage = <any>error);
    }

    onAddPanel(): void {
        for (var i = 0; i < this.newRRF.Panel.length; i++) {
            if (+this.newRRF.Panel[0].RoundNumber.Id === +this.IntwRound) {
                alert('This interview round is all ready exist.');
                return;
            }
        }

        var panel: Panel = new Panel();
        panel.Comments = this.comment;
        panel.RoundNumber = this.getStringValue(this.IntwRound, this.interviewRound);

        if ($('#cmbInterviewer').val() !== null) {
            var selectedInterviewer: number[] = $('#cmbInterviewer').val();
        }
        for (var index = 0; index < selectedInterviewer.length; index++) {
            panel.Interviewers.push(this.getStringValue(selectedInterviewer[index], this.interviewers));
        }
        this.newRRF.Panel.push(panel);
        this.clearIntwPanel();
    }

    clearIntwPanel() {
        this.IntwRound = 0;
        $('#cmbInterviewer').select2('val', '');
    }
    getStringValue(roundID: number, list: MasterData[]): MasterData {
        for (var index = 0; index < list.length; index++) {
            if (+(list[index].Id) === +(roundID)) {
                return list[index];
            }
        }
        return new MasterData;
    }

    onDropDownValueChanged(Value: number, Id: string) {
        switch (Id) {
            case 'cmbIntwRound':
                break;
            default:
        }
    }

    onPanelEdit(panelData: Panel) {
        this.IntwRound = panelData.RoundNumber.Id;
        var panelId: string[] = new Array();
        for (var index = 0; index < panelData.Interviewers.length; index++) {
            panelId.push((panelData.Interviewers[index].Id).toString());
        }
        $('#cmbInterviewer').select2('val', panelId);

        this.IntwRound = panelData.RoundNumber.Id;
        this.updatePanel = true;
        this.editPanelData = panelData;
    }

    onPanelCancel() {
        this.updatePanel = false;
        this.clearIntwPanel();
    }

    onUpdatePanelClick() {
        this.editPanelData.RoundNumber = this.getStringValue(this.IntwRound, this.interviewRound);
        if ($('#cmbInterviewer').val() !== null) {
            var selectedInterviewer: number[] = $('#cmbInterviewer').val();
        }
        this.editPanelData.Interviewers = new Array();
        for (var index = 0; index < selectedInterviewer.length; index++) {
            this.editPanelData.Interviewers.push(this.getStringValue(selectedInterviewer[index], this.interviewers));
        }

        this.updatePanel = false;
        this.clearIntwPanel();
    }

    onPanelDelete(panelData: Panel) {
        for (var i = 0; i < this.newRRF.Panel.length; i++) {
            if (+this.newRRF.Panel[i].RoundNumber.Id === +panelData.RoundNumber.Id) {
                this.newRRF.Panel.splice(i, 1);
            }
        }
        this.updatePanel = false;
        this.clearIntwPanel();

    }

    getRRFByID(rrfId: number) {
        this._myRRFService.getRRFByID(rrfId)
            .subscribe(
            results => {
                this.newRRF = <any>results;
                this.setSkillDropdown();
            },
            error => this.errorMessage = <any>error);
    }

    setSkillDropdown() {
        var panelId: string[] = new Array();
        for (var index = 0; index < this.newRRF.SkillsRequired.length; index++) {
            panelId.push((this.newRRF.SkillsRequired[index].Id).toString());
        }
        $('#cmbSkillsReq').select2('val', panelId);
    }

    setSkillToObject() {

        if ($('#cmbSkillsReq').val() !== null) {
            var selectedSkill: number[] = $('#cmbSkillsReq').val();
        }
        this.newRRF.SkillsRequired = new Array();
        for (var j = 0; j < selectedSkill.length; j++) {
            this.newRRF.SkillsRequired.push(this.getStringValue(selectedSkill[j], this.skills));
        }
    }

    onUpdateClick() {
        this.setSkillToObject();
        this._myRRFService.UpdateRRF(this.newRRF)
            .subscribe(
            results => {
                this._router.navigate(['/App/RRF/RRFDashboard/']);
            },
            error => this.errorMessage = <any>error);
    }

}
