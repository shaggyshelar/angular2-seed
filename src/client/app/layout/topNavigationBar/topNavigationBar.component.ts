import {Component, OnInit, OnDestroy, EventEmitter} from '@angular/core';
import { Router, ROUTER_DIRECTIVES } from '@angular/router';
import { LoginService } from '../../shared/services/login.service';
import { CollapseDirective, TOOLTIP_DIRECTIVES } from 'ng2-bootstrap';
//import { ProfileBankService } from '../../profilebank/shared/services/profileBank.service';
import { ProfileBankService } from '../../profileBank/shared/services/profileBank.service';
import { MasterData,festival } from  '../../shared/model/index';
import { CommonService } from  '../../shared/index';
import {IfAuthorizeDirective} from '../../shared/directives/ifAuthorize.directive';
import { InterviewsList} from '../../recruitmentCycle/recruitersTab/model/interviewDetails';
import { GrdOptions } from  '../../shared/model/index';
import { RecruiterScheduleInterviewService } from '../../recruitmentCycle/recruitersTab/services/displayScheduleInterviews.service';
import { InterviewersScheduleService} from '../../recruitmentCycle/interviewersTab/services/interviewers.schedule.service';
import { Interview} from '../../recruitmentCycle/shared/model/interview';
@Component({
    moduleId: module.id,
    selector: 'top-navigation-bar',
    templateUrl: 'topNavigationBar.component.html',
    directives: [ROUTER_DIRECTIVES, IfAuthorizeDirective, TOOLTIP_DIRECTIVES],
    providers: [ProfileBankService,RecruiterScheduleInterviewService,InterviewersScheduleService]
})

export class TopNavigationBarComponent implements OnInit, OnDestroy {
    InterviewInformation: Array<Interview> = new Array<Interview>();
    festival:Array<festival> = new Array<festival>();
    isAuthenticated: boolean;
    currentUser = new MasterData();
    errorMessage: string;
    candidateID:string;
    NOInterviewsFOUND:boolean;
    NOInterviewersInterviewFOUND:boolean;
    HolidayList:any[] = [];
    MyInterviewDetailsList: InterviewsList = new InterviewsList();
    InterviewDetailsList: InterviewsList = new InterviewsList();
    subscription: EventEmitter<boolean> = new EventEmitter<boolean>();;
    constructor(private loginService: LoginService, private _recruitersInterviewService: RecruiterScheduleInterviewService,
        private _interviewService: InterviewersScheduleService,
        private _router: Router,
        private _commonService: CommonService,
        private _profileBankService: ProfileBankService) {
        this.isAuthenticated = false;
        this.NOInterviewsFOUND=false;
        this.NOInterviewersInterviewFOUND=false;
        this.InterviewInformation = new Array<Interview>();
    }

    ngOnInit() {
        this.isAuthenticated = this.loginService.isAuthenticated();
        this.subscription = this.loginService.getAuthEmitter()
            .subscribe((value: boolean) => { this.isAuthenticated = value; });
        this.getLoggedInUser();
        if (!this.currentUser) {
            this.logout();
        }
        // this.onMyInterviews();
        // this.onAllInterviews();
    }
      
    getHolidayData(){
         this._profileBankService.getHolidayData()
            .subscribe(
            results => {
                this.festival = <any>results;
                if(this.festival.length > 0){
                    this.festival.forEach((data, idx) => {
                    data.Date = moment(data.Date).format('D-MMM-YYYY');
                    this.festival[idx].Date = moment(data.Date).format('D-MMM-YYYY');
                });
            }
        },
        error => this.errorMessage = <any>error); 
    }
    getLoggedInUser() {
        this.currentUser = this._commonService.getLoggedInUser();
    }
    // This function search profiles acoording to search string
    advancedSearch(searchString: string) {
        this._router.navigate(['/App/ProfileBank/AdvanceSearch/' + searchString + 'searchString' + searchString]);
    }

    logout() {
        this.loginService.logout();
        window.location.replace('');
        //window.history.forward();
        this._router.navigate(['/Login']);
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

    pushNotificationSettings() {
        this._router.navigate(['/App/NotificationSetting']);
    }
    formatDate(date: any) {
        var d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();
        if (month.length < 2) month = '0' + month;
        if (day.length < 2) day = '0' + day;

        return [day, month, year].join('-');
    }
onRecruiterInterviews() {
        this.resetToDefaultGridOptions();
        this.MyInterviewDetailsList.GrdOperations.OrderBy = 'Modified';
        this.MyInterviewDetailsList.GrdOperations.Order = 'desc';
        this.MyInterviewDetailsList.GrdOperations.PerPageCount = 5;
        this.MyInterviewDetailsList = new InterviewsList();
        this.getMyScheduleInterviewsData();
    }
  resetToDefaultGridOptions() {
        this.MyInterviewDetailsList.GrdOperations = new GrdOptions();
        this.MyInterviewDetailsList.GrdOperations.ButtonClicked = 0;
        this.MyInterviewDetailsList.GrdOperations.NextPageUrl = [];
    }
    getMyScheduleInterviewsData() {

       
        this._recruitersInterviewService.getMyInterviews(this.MyInterviewDetailsList.GrdOperations)
            .subscribe(
            (results: any) => {
                if (results.AllInterviews !== null && results.AllInterviews.length > 0) {
                    this.MyInterviewDetailsList = results;
                     this.NOInterviewsFOUND = false;
                } else {
                    this.MyInterviewDetailsList.AllInterviews = [];
                    this.MyInterviewDetailsList.GrdOperations = results.GrdOperations;
                   this.NOInterviewsFOUND = true;
                }
            },
            error => {
                this.errorMessage = <any>error;
              
            });
    }

     getMyInterviews() {
        this._interviewService.getMyInterviews()
            .subscribe(
            (results: any) => {
                if (results.length !== undefined && results.length > 0) {
                    this.InterviewInformation = results;
                     this.NOInterviewersInterviewFOUND=false;
                } else { 
                     this.NOInterviewersInterviewFOUND=true;
                }
            },
            error => {
                this.errorMessage = <any>error;
                
            });
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

}
