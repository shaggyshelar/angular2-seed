import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { AuthHttp } from '../../../shared/services/authHttp.service';
import { Config } from '../../../shared/config/config';
import { SpinnerService } from '../../../shared/components/spinner/spinner';
import { GrdOptions } from  '../../../shared/model/index';
import { iefModel} from '../../shared/model/ief';
@Injectable()

export class DeliveryManagerScheduleInterviewService {
    constructor(private http: Http,
        private authHttp: AuthHttp,
        private _spinnerService: SpinnerService) { }

    //Get all interviews schedule by current logged in user (recruiter).
    getMyInterviews(grdOptions: GrdOptions) {
        let url = Config.GetURL('/api/RecruitmentCycle/GetMyScheduledInterviews');
        this._spinnerService.show();
        return this.authHttp.post(url, { grdOptions })
            .map(this.extractData)
            .catch(this.handleError)
            .finally(() => this._spinnerService.hide());
    }
    //Get all interviews schedule.
    getAllInterviews(grdOptions: GrdOptions) {
        let url = Config.GetURL('/api/RecruitmentCycle/RecruiterGetScheduledInterviewsByPractice');
        this._spinnerService.show();
        return this.authHttp.post(url, { grdOptions })
            .map(this.extractData)
            .catch(this.handleError)
            .finally(() => this._spinnerService.hide());
    }
     getAllInterviewsByStatus(grdOptions: GrdOptions) {
        let url = Config.GetURL('/api/RecruitmentCycle/RecruiterGetScheduledInterviewsByPracticeAndStatus');
        this._spinnerService.show();
        return this.authHttp.post(url, { grdOptions })
            .map(this.extractData)
            .catch(this.handleError)
            .finally(() => this._spinnerService.hide());
    }
  getCandidateProfile(id: string) {
        let url = Config.GetURL('/api/ProfileBank/ViewCandidateInformation?CandidateID=' + id);
        this._spinnerService.show();
        return this.authHttp.get(url)
            .map(this.extractData)
            .catch(this.handleError)
            .finally(() => this._spinnerService.hide());
    }
  getIEFHistory(_interviewID: iefModel) {
        let url = Config.GetURL('/api/RecruitmentCycle/ViewCandidateAllInterviewDetails');
        this._spinnerService.show();
        return this.authHttp.post(url, _interviewID)
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
