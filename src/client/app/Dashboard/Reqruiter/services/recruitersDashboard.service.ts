import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
//import { MasterData, GrdOptions } from  '../../../shared/model/index';
import { AuthHttp } from '../../../shared/services/authHttp.service';
import { Config } from '../../../shared/config/config';
import { SpinnerService } from '../../../shared/components/spinner/spinner';

@Injectable()

export class RecruitersDashboardService {

    constructor(
        private http: Http,
        private authHttp: AuthHttp,
        private _spinnerService: SpinnerService) { }
    /**Get rrf data for status chart on dashboard */
    getAllStatusCount() {
        let url = Config.GetURL('/api/Dashboards/GetAllRRFStatuswiseCount');
        this._spinnerService.show();
        return this.authHttp.get(url)
            .map(this.extractData)
            .catch(this.handleError)
            .finally(() => this._spinnerService.hide());
    }
    /**Get all RRF with candidate count for specific RRF status */
    getTaggedCandidateStatusCount(status: string) {
        let url = Config.GetURL(' /api/Dashboards/GetCandidatesForRRFsByRRFStatus?RRFStatus=' + status);
        this._spinnerService.show();
        return this.authHttp.get(url)
            .map(this.extractData)
            .catch(this.handleError)
            .finally(() => this._spinnerService.hide());
    }
    /**
     * This method used with promises keeping this commented method for future 
     * referece, in case of any requirement.
     * 
    getAllRRFStatusCount() {
        let url = Config.GetURL('/api/Dashboards/GetAllRRFStatuswiseCount');
        //this._spinnerService.show();
        return this.authHttp.get(url)
            .toPromise()
            .then(this.extractData)
            .catch(this.handleError);
    }*/

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
