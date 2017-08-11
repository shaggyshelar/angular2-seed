import { Component} from '@angular/core';
import { ROUTER_DIRECTIVES, Router, OnActivate } from '@angular/router';
import { Interview} from '../../shared/model/interview';
import { InterviewersScheduleService} from '../services/interviewers.schedule.service';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { MasterData } from  '../../../shared/model/index';
import { FullCalendarComponent} from  '../../../shared/components/calendar/fullCalendar';
import { CalendarDetails} from '../../scheduleInterview/model/calendarDetails';
import { InterviewMode } from  '../../../shared/constantValue/index';
import { iefModel} from '../../shared/model/ief';
import { InterviewDetailsRowComponent } from '../../shared/component/InterviewDetailsRow/InterviewDetailsRow.component';
import { GrdOptions } from '../../../shared/model/common.model';
import { RRFFilters } from '../../../shared/model/common.model';
import { IEFGridRowComponent } from '../../shared/component/IEFGridRow/IEFGridRow.component';
import { MyScheduleInterview } from '../model/myScheduleInterview';
import { ProfileBankService } from '../../../profileBank/index';
import {RRFGridRowComponent} from '../../../RRF/shared/components/RRFGridRow/RRFGridRow.component';
import { RRFDetails} from '../../../RRF/myRRF/models/rrfDetails';
import { MyRRFService } from '../../../RRF/myRRF/services/myRRF.service';
import { InterviewersSchedule }from '../../shared/filter/interviewersSchedule.pipe';

@Component({
    moduleId: module.id,
    selector: 'interviewers-shedule',
    templateUrl: 'interviewers.scheduleHistory.component.html',
    directives: [ROUTER_DIRECTIVES, FullCalendarComponent, InterviewDetailsRowComponent, IEFGridRowComponent, RRFGridRowComponent],
    providers: [Interview, ToastsManager, ProfileBankService, InterviewersScheduleService, MyRRFService],
    pipes: [InterviewersSchedule]
})

export class RecruitmentInterviewScheduleHistoryComponent implements OnActivate {
    returnPath: string;
    Title: string;
    errorMessage: string;
    InterviewInformation: Array<Interview> = new Array<Interview>();
    InterviewInformationForCalendar: Array<Interview> = new Array<Interview>();
    interviewdd: Interview = new Interview();
    InterviewerCalendarDetails: CalendarDetails = new CalendarDetails();
    NORECORDSFOUND: boolean = false;
    HISTORYRECORDSNOTFOUND: boolean = false;
    currentDate: string;
    modeConstant: InterviewMode = InterviewMode;
    header: any = {
        left: 'prev,next today',
        center: 'title',
        right: 'month,agendaWeek,agendaDay'
    };
RRFFilters:RRFFilters=new RRFFilters();
    RRFData: RRFDetails = new RRFDetails();
    isHover: boolean = false;
    RRFID: Array<Interview> = new Array<Interview>();
    InterviewHistory: MyScheduleInterview[] = [];
    grdOptionsIntwHistory: GrdOptions = new GrdOptions();
    viewIEFText: string = 'View IEF';
    hideIEFText: string = 'Hide IEF';
    IEFButtonText: string = '';
    searchString: string;
Status:string='';
    constructor(private _router: Router,
        private toastr: ToastsManager,
        private _interviewService: InterviewersScheduleService,
        private _profileBankService: ProfileBankService,
        private _myRRFService: MyRRFService) {
        this.InterviewInformation = new Array<Interview>();
        this.InterviewInformationForCalendar = new Array<Interview>();
        /**Commenting as this functionality is deprecated */
        var date = new Date();
        this.currentDate = this.formatDate(date);
        /**For pagination */
        this.grdOptionsIntwHistory.CamlString = '';
        this.grdOptionsIntwHistory.NextPageID = 0;
        this.grdOptionsIntwHistory.PreviousPageID = 0;
        this.grdOptionsIntwHistory.PagingEvent = '';
        this.grdOptionsIntwHistory.NextButton = false;
        this.grdOptionsIntwHistory.PreviousButton = false;
        this.grdOptionsIntwHistory.RRFFilters.Status = 'Selected';
        this.grdOptionsIntwHistory.Order='desc';
        this.grdOptionsIntwHistory.PerPageCount= 5;
        this.statuss='Selected';
    }
    /**Router method overrid from OnActivate class */
    routerOnActivate() {
//this.getMyInterviews();
        this.InterviewerCalendarDetails.Resources = <any>this._interviewService.getResources();
       // this.getMyAllInterviewsDetailsOfCalendar();
        this.GetMyAllConductedInerviewsHistory();
        this.IEFButtonText = this.viewIEFText;
    }
    Back() {
        if (this.returnPath !== undefined)
            this._router.navigate([this.returnPath]);
    }

    /**Get all interviews assigned and accepted by current logged in user from service. */
    getMyInterviews() {
        this._interviewService.getMyInterviews()
            .subscribe(
            (results: any) => {
                if (results.length !== undefined && results.length > 0) {
                    this.InterviewInformation = results;
                } else { this.NORECORDSFOUND = true; }
            },
            error => {
                this.errorMessage = <any>error;
                this.toastr.error(<any>error);
            });
    }
    DisableIEF(interviewDate: Date, interviewTime: any) {
        var intDate = moment(interviewDate).format('YYYY-MM-DD');
        if (moment(intDate) > moment()) {
            return true;
        } else {
            if (moment(intDate).format('YYYY-MM-DD') >= moment(new Date()).format('YYYY-MM-DD')
                && interviewTime.split(':')[0] > new Date().getHours().toString()) {
                return true;
            } else {
                if (moment(intDate).format('YYYY-MM-DD') >= moment(new Date()).format('YYYY-MM-DD')
                    && interviewTime.split(':')[0] >= new Date().getHours().toString()
                    && interviewTime.split(':')[1] > new Date().getMinutes().toString()) {
                    return true;
                } else {
                    return false;
                }
            }
        }
    }
    /**used for calender view */
    getMyAllInterviewsDetailsOfCalendar() {
        this._interviewService.getMyAllInterviewsDetailsOfCalendar()
            .subscribe(
            (results: any) => {
                this.InterviewerCalendarDetails = results;
            },
            error => {
                this.errorMessage = <any>error;
                this.toastr.error(<any>error);
            });
    }
    showIEF(
        _rrfId: MasterData,
        _candidateId: MasterData,
        _displayCandidateInfo: boolean,
        _interviewType: MasterData,
        _interviewId: MasterData,
        _interviewStatus: string
    ) {
        var _iefParameters: iefModel = new iefModel();
        _iefParameters.RRFID = _rrfId;
        _iefParameters.CandidateID = _candidateId;
        _iefParameters.DisplayCandidateInfo = _displayCandidateInfo;
        _iefParameters.InterviewType = _interviewType;
        _iefParameters.InterviewID = _interviewId;
        sessionStorage.setItem('SubmitIef', JSON.stringify(_iefParameters));
        sessionStorage.setItem('onReturnPath', '/App/Recruitment Cycle/Interviewers/schedule');
        sessionStorage.setItem('InterviewStatus', _interviewStatus);
        this._router.navigate(['/App/Recruitment Cycle/Interviewers/ief']);
    }

    //Shows Tooltip on calendar
    showDetails(e: any) {
        var StartTime = e.event.start.format('hh:mm A');
        if(e.event.end != null){
            var EndTime = e.event.end.format('hh:mm A');
        }
        let element: any = $(e.element);
        if (e.event.title !== '') {
            element.tooltip({
                title: e.event.title + 'From :' + StartTime + ' To ' + EndTime
            });
        }
        if (e.event.title === '') {
            let fromTimeLabel: string = e.event.title + ' From :' + StartTime + ' To ' + EndTime;
            element.tooltip({
                title: fromTimeLabel
            });
        }

    }

    GetMyAllConductedInerviewsHistory() {
        this._interviewService.GetMyAllConductedInerviews(this.grdOptionsIntwHistory)
            .subscribe(
            (results: any) => {
                this.grdOptionsIntwHistory = results.GrdOperations != null?results.GrdOperations:new GrdOptions();
                
                if (results.AllInterviews) {
                    if (results.AllInterviews.length > 0) {
                        this.InterviewHistory = results.AllInterviews;
                        for (var index = 0; index < this.InterviewHistory.length; index++) {
                            this.InterviewHistory[index].showIEF = false;
                            this.InterviewHistory[index].IEFButtonText = this.viewIEFText;
                        }
                        this.HISTORYRECORDSNOTFOUND = false;
                    } else {
                        this.HISTORYRECORDSNOTFOUND = true;
                        this.InterviewHistory = [];
                    }
                } else {
                    this.HISTORYRECORDSNOTFOUND = true;
                    this.InterviewHistory = [];
                }
            },
            error => {
                this.errorMessage = <any>error;
                this.toastr.error(<any>error);
            });
    }

    onIEFClick(myScheduleInterview: MyScheduleInterview) {
        myScheduleInterview.showIEF = !myScheduleInterview.showIEF;
        this.setIEFButtonText(myScheduleInterview);
    }

    setIEFButtonText(myScheduleInterview: MyScheduleInterview) {
        if (myScheduleInterview.showIEF) {
            myScheduleInterview.IEFButtonText = this.hideIEFText;
        } else {
            myScheduleInterview.IEFButtonText = this.viewIEFText;
        }
    }

    OnPaginationClick(pageClicked: number) {
        this.grdOptionsIntwHistory.ButtonClicked = pageClicked;
        if (pageClicked === 1) {
            this.grdOptionsIntwHistory.PagingEvent = 'Next';
        }
        if (pageClicked === -1) {
            this.grdOptionsIntwHistory.PagingEvent = 'Previous';
        }
        this.GetMyAllConductedInerviewsHistory();
    }

    bindGridData() {
        this.grdOptionsIntwHistory.NextPageUrl = [];
        this.grdOptionsIntwHistory.ButtonClicked = 0;
        this.grdOptionsIntwHistory.CamlString = '';
        this.grdOptionsIntwHistory.RRFFilters.Status=this.statuss;
        this.GetMyAllConductedInerviewsHistory();
    }
statusFilter(event:any){
this.grdOptionsIntwHistory.RRFFilters.Status =event;
this.statuss=this.grdOptionsIntwHistory.RRFFilters.Status;
this.bindGridData();
}

    //Format date in "yyyy-mm-dd" format
    formatDate(date: any) {
        var d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();
        if (month.length < 2) month = '0' + month;
        if (day.length < 2) day = '0' + day;

        return [year, month, day].join('-');
    }

    showSubmitIEF(status: string) {
        if (status.toLowerCase() === 'on hold') {
            return false;
        } else {
            return true;
        }
    }
    /**Get resume by candidate code */
    getResume(candidateID: MasterData) {
        this._profileBankService.getResume(candidateID)
            .subscribe(
            results => {
                var Resume = <any>results;
                if (Resume) {
                    this.Download(Resume.BinaryResume, Resume.ResumeName);
                } else { alert('Resume not available!'); }
            },
            error => this.errorMessage = <any>error);
    }
    /** Download crate file form binary and download in given fyle type */
    Download(binaryResume: string, ResumeName: string) {
        var link = document.createElement('a');
        link.download = ResumeName;
        link.href = 'data:application/octet-stream;charset=utf-8;base64,' + binaryResume;
        link.click();
    }

    getTime(time: string) {
        //time:string = interviewTime;
        var intTime: Array<string> = new Array<string>();
        intTime = time.toString().match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];
        if (intTime.length > 1) { // If time format correct
            intTime = intTime.slice(1);  // Remove full string match value
            intTime[5] = +intTime[0] < 12 ? 'AM' : 'PM'; // Set AM/PM
            var adjustHr = +intTime[0] % 12 || 12; // Adjust hours
            intTime[0] = adjustHr.toString();
        }
        return intTime.join('');
    }
    showPopOver(RRFCode: any, index: string) {
        let skillDetails: string = '';
        let rowId: any = 'candidate' + index;
        let row: any = $('#' + rowId);
        //service to get RRFDetails
        this._myRRFService.getRRFByID(RRFCode.Value)
            .subscribe(
            (results: RRFDetails) => {
                this.RRFData = results;
                for (var index = 0; index < this.RRFData.SkillsRequired.length; index++) {
                    skillDetails = skillDetails + '"' + this.RRFData.SkillsRequired[index].Value + '"';
                }
                if (row.hasClass('pop')) {
                    row.popover('hide');
                    row.removeClass('pop');
                } else {
                    row.popover({
                        placement: 'bottom',
                        toggle: 'popover',
                        title: 'RRF Details',
                        html: true,
                        content: 'RRF Code :' + this.RRFData.RRFCODE + '<br/>' + '\nRaised By :' + this.RRFData.RaisedBy.Value + '<br/>'
                        + '\nSkills :' + skillDetails + '<br/>' + '\nJob Description :' + this.RRFData.Description
                    });
                    row.popover('show');
                    row.addClass('pop');
                }

            },
            error => this.errorMessage = <any>error);
    }
    //Format date in "yyyy-mm-dd" format
    formatInputDate(date: any) {
        var d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();
        if (month.length < 2) month = '0' + month;
        if (day.length < 2) day = '0' + day;

        return [day, month, year].join('-');
    }
}
