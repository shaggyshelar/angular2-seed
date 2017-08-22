import { Injectable } from '@angular/core';
import { MasterData  } from '../../../shared/model/common.model';
import { Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { AuthHttp } from '../../../shared/services/authHttp.service';
import { Config } from '../../../shared/config/config';
import { SpinnerService } from '../../../shared/components/spinner/spinner';
import { CalendarDetails} from '../model/calendarDetails';
import { Interviewers} from '../model/scheduleInterview';

@Injectable()
export class CalendarDataService {
    checkedItemIds: Array<string> = [];
    Events: any[];
    InterviewCalendarDetails: CalendarDetails = new CalendarDetails();
    constructor(private authHttp: AuthHttp,
        private _spinnerService: SpinnerService) {
        this.InterviewCalendarDetails.Resources = [{ id: 1, title: 'Available', eventColor: 'green' },
            { id: 2, title: 'Booked', eventColor: 'red' }];
    }

    SaveEvent(index: number, Event: any) {
        this.Events[index] = Event;
    }
    generateHexColors() {
        return '#' + (Math.random() * 0xFFFFFF << 0).toString(16);
    }
    //Get InterViewer's All Events Available And Booked Slots by InterViewerID
    GetInterviewerCalendarByID(InterViewerID: MasterData) {
        let url = Config.GetURL('/api/RecruitmentCycle/GetInterviewerByIdCalendar');
        this._spinnerService.show();
        return this.authHttp.post(url, { InterviewerId: InterViewerID })
            .map(this.extractData)
            .catch(this.handleError)
            .finally(() => this._spinnerService.hide());
    }
    //Get All InterViewer's All Events Available And Booked Slots
    GetInterviewerCalendarDetail(Interviewers: Array<Interviewers>) {
        let url = Config.GetURL('/api/RecruitmentCycle/CalendarViewGetInterviewCalendarByMultipleInterviewers');
        this._spinnerService.show();
        return this.authHttp.post(url, { Interviewers })
            .map(this.extractData)
            .catch(this.handleError)
            .finally(() => this._spinnerService.hide());
    }

    GetResources() {
        let url = Config.GetURL('/api/RecruitmentCycle/CalendarViewGetResources');
        //this._spinnerService.show();
        // return this.authHttp.get(url)
        //     .map(this.extractData)
        //     .catch(this.handleError)
        //     .finally(() => this._spinnerService.hide());
        //return new Promise((resolve, reject) => { this.authHttp.get(url); });
        // return this.authHttp.get(url)
        //     .toPromise()
        //     .then(this.extractData)
        //     .catch(this.handleError);
        return this.InterviewCalendarDetails.Resources;
    }

    private extractData(res: Response) {
        if (res.status < 200 || res.status >= 300) {
            throw new Error('Bad response status: ' + res.status);
        }
        let body = res.json();
        return body || {};
    }

    private handleError(error: Response) {
        console.log(error);
        return Observable.throw(error.json().error || 'Server error');
    }
}
