import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { AuthHttp } from '../../shared/services/authHttp.service';
import { Config } from '../../shared/config/config';
import { SpinnerService } from '../../shared/components/spinner/spinner';
import { GrdOptions } from '../../shared/model/index';
import { SkypeMaster,InterviewMode } from '../model/masterModel';

@Injectable()
export class MyMasterDataService {

    constructor(private http: Http, private authHttp: AuthHttp, private _spinnerService: SpinnerService) { }

    /** GET SKYPE DETAILS FOR THE CANDIDATE PROFILES FROM BACKEND*/
    getSkypeData() {
        let url = Config.GetURL('/api/Masters/GetSkypeIDsMaster');
        this._spinnerService.show();
        return this.authHttp.get(url)
            .map(this.extractData)
            .catch(this.handleError)
            .finally(() => this._spinnerService.hide());
    }
    addSkypeData(SkypeCredential : SkypeMaster) {
        let url = Config.GetURL('/api/Masters/AddSkypeCredentials');
        this._spinnerService.show();
        return this.authHttp.post(url, { SkypeCredential })
            .map(this.extractData)
            .catch(this.handleError)
            .finally(() => this._spinnerService.hide());
    }
    editSkypeData(SkypeCredential : SkypeMaster) {
        let url = Config.GetURL('/api/Masters/UpdateSkypeCredentials');
        this._spinnerService.show();
        return this.authHttp.post(url, { SkypeCredential })
            .map(this.extractData)
            .catch(this.handleError)
            .finally(() => this._spinnerService.hide());
    }
     deleteSkypeData(SkypeCredential : SkypeMaster) {
        let url = Config.GetURL('/api/Masters/DeleteSkypeCredentials');
        this._spinnerService.show();
        return this.authHttp.post(url, { SkypeCredential })
            .map(this.extractData)
            .catch(this.handleError)
            .finally(() => this._spinnerService.hide());
    }
/** GET Interview Mode DETAILS FOR THE CANDIDATE PROFILES FROM BACKEND*/
    getInterviewModeData() {
        let url = Config.GetURL('/api/Masters/GetInterviewMode');
        this._spinnerService.show();
        return this.authHttp.get(url)
            .map(this.extractData)
            .catch(this.handleError)
            .finally(() => this._spinnerService.hide());
    }
    addInterviewModeData(Mode : InterviewMode) {
        let url = Config.GetURL('/api/Masters/AddInterviewMode');
        this._spinnerService.show();
        return this.authHttp.post(url, { Mode })
            .map(this.extractData)
            .catch(this.handleError)
            .finally(() => this._spinnerService.hide());
    }
    editInterviewModeData(Mode : InterviewMode) {
        let url = Config.GetURL('/api/Masters/UpdateInterviewMode');
        this._spinnerService.show();
        return this.authHttp.post(url, { Mode })
            .map(this.extractData)
            .catch(this.handleError)
            .finally(() => this._spinnerService.hide());
    }
     deleteInterviewModeData(Mode : InterviewMode) {
        let url = Config.GetURL('/api/Masters/DeleteInterviewMode');
        this._spinnerService.show();
        return this.authHttp.post(url, { Mode })
            .map(this.extractData)
            .catch(this.handleError)
            .finally(() => this._spinnerService.hide());
    }
    /** GET VISA DETAILS FOR THE CANDIDATE PROFILES FROM BACKEND*/
    getVisaDetails() {
        let url = Config.GetURL('/api/Masters/GetSkypeIDsMaster');
        this._spinnerService.show();
        return this.authHttp.get(url)
            .map(this.extractData)
            .catch(this.handleError)
            .finally(() => this._spinnerService.hide());
    }
    /** GET REASONS DETAILS FOR 'IEF REJECT' AND 'RRF CLOSE' FROM BACKEND*/
    getResonsData() {
        let url = Config.GetURL('/api/Masters/GetSkypeIDsMaster');
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
