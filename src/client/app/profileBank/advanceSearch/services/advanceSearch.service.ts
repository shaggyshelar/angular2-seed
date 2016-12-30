import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { AdvancedSearch} from '../../shared/model/advancedSearchInfo';
import { AuthHttp } from '../../../shared/services/authHttp.service';
import { Config } from '../../../shared/config/config';
import { SpinnerService } from '../../../shared/components/spinner/spinner';
import { GrdOptions } from  '../../../shared/model/index';

@Injectable()
export class AdvanceSearchService {

    constructor(private http: Http, private authHttp: AuthHttp, private _spinnerService: SpinnerService) { }
    //This function contains advance search API
    getAdvanceSearch(candidateGeneralSearch: {},grdOptions:GrdOptions) {
        let url = Config.GetURL('/api/Search/CandidateGeneralSearch');
        this._spinnerService.show();
        return this.authHttp.post(url,{candidateGeneralSearch,grdOptions})
            .map(this.extractData)
            .catch(this.handleError)
            .finally(() => this._spinnerService.hide());
    }
    getAdvancedSearchInSidebar(candidateAdvancedSearch: AdvancedSearch,grdOptions: GrdOptions) {
        let url = Config.GetURL('/api/Search/CandidateAdvancedSearch');
        this._spinnerService.show();
        return this.authHttp.post(url, { candidateAdvancedSearch,grdOptions })
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
