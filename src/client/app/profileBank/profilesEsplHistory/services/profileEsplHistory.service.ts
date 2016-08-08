import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { AuthHttp } from '../../../shared/services/authHttp.service';
import { Config } from '../../../shared/config/config';
import { SpinnerService } from '../../../shared/components/spinner/spinner';
import { MasterData } from  '../../../shared/model/index';


@Injectable()

export class ProfileEsplHistoryService {

    constructor(private http: Http,
        private authHttp: AuthHttp,
        private _spinnerService: SpinnerService) { }

    getProfilesInterviewHistory(CandidateID: MasterData) {
        console.log('Service integration is pending');
        /**TODO:: Integrate service */
        let url = Config.GetURL('/api/ProfileBank/getMyProfiles');
        this._spinnerService.show();
        return this.authHttp.post(url, { CandidateID })
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