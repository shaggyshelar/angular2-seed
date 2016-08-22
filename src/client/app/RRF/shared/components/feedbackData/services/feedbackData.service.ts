import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { AuthHttp } from '../../../../../shared/services/authHttp.service';
import { Config } from '../../../../../shared/config/config';
import { SpinnerService } from '../../../../../shared/components/spinner/spinner';

@Injectable()

export class FeedbackDataService {

    constructor(private authHttp: AuthHttp,
        private _spinnerService: SpinnerService) { }

    //Get List of all Feedback of RRF
    getAllFeedback(RRFIDValue: string) {
        let url = Config.GetURL('/api/RRF/GetRRFFeedbacks?RRFID=' + RRFIDValue);
        this._spinnerService.show();
        return this.authHttp.get(url)
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