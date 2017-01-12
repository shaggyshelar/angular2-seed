import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { AuthHttp } from '../../../shared/services/authHttp.service';
import { Config } from '../../../shared/config/config';
import { SpinnerService } from '../../../shared/components/spinner/spinner';
import { GrdOptions } from '../../../shared/model/common.model';

@Injectable()

export class InterviewersScheduleService {
    constructor(private http: Http,
        private authHttp: AuthHttp,
        private _spinnerService: SpinnerService) { }
    getMyInterviews() {
        let url = Config.GetURL('/api/RecruitmentCycle/GetUserInterviewDetails');
        this._spinnerService.show();
        return this.authHttp.get(url)
            .map(this.extractData)
            .catch(this.handleError)
            .finally(() => this._spinnerService.hide());
    }

    getMyAllInterviewsDetailsOfCalendar() {
        let url = Config.GetURL('/api/RecruitmentCycle/CalendarViewGetMyBookedCalendar');
        this._spinnerService.show();
        return this.authHttp.get(url)
            .map(this.extractData)
            .catch(this.handleError)
            .finally(() => this._spinnerService.hide());
    }

    getResources() {
        return [{ id: 1, title: 'Available', eventColor: '#32c5d2' },
            { id: 2, title: 'Booked', eventColor: '#e7505a' }];
    }
    getEvent() {
        return [{
            'id': 1,
            'resourceId': 3,
            'title': 'All Day EventAll Day EventAll Day EventAll Day EventAll Day EventAll Day EventAll Day Event',
            'start': '2016-01-01'
        }];
    }

    generateHexColors() {
        return '#' + (Math.random() * 0xFFFFFF << 0).toString(16);
    }

    GetMyAllConductedInerviews(grdOptions: GrdOptions) {
        let url = Config.GetURL('/api/RecruitmentCycle/GetMyAllConductedInerviews');
        this._spinnerService.show();
        return this.authHttp.post(url, { grdOptions })
            .map(this.extractData)
            .catch(this.handleError)
            .finally(() => this._spinnerService.hide());
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
