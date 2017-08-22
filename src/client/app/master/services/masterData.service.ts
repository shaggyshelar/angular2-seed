import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { AuthHttp } from '../../shared/services/authHttp.service';
import { Config } from '../../shared/config/config';
import { SpinnerService } from '../../shared/components/spinner/spinner';
import { GrdOptions } from '../../shared/model/index';
import { VisaMaster} from '../index';

@Injectable()
export class MyMasterDataService {

  constructor(private http: Http, private authHttp: AuthHttp, private _spinnerService: SpinnerService) { }


  getSkypeData() {
    let url = Config.GetURL('/api/Masters/GetSkypeIDsMaster');
    this._spinnerService.show();
    return this.authHttp.get(url)
      .map(this.extractData)
      .catch(this.handleError)
      .finally(() => this._spinnerService.hide());
  }
  /** GET REASONS DETAILS FOR 'IEF REJECT' AND 'RRF CLOSE' FROM BACKEND*/
  getResonsData() {
    let url = Config.GetURL('/api/Masters/GetAllReasonsMaster?Category=');
    this._spinnerService.show();
    return this.authHttp.get(url)
      .map(this.extractData)
      .catch(this.handleError)
      .finally(() => this._spinnerService.hide());
  }
  /** */
  /** ADD NEW VISA TYPE IN THE SYSTEM */
  addVisaType(VisaType: VisaMaster) {
    let url = Config.GetURL('/api/Masters/AddVisaType');
    this._spinnerService.show();
    return this.authHttp.post(url, { VisaType })
      .map(this.extractData)
      .catch(this.handleError)
      .finally(() => this._spinnerService.hide());
  }
  /** GET VISA DETAILS FOR THE CANDIDATE PROFILES FROM BACKEND*/
  getVisaDetails() {
    let url = Config.GetURL('/api/Masters/GetVisaTypes');
    this._spinnerService.show();
    return this.authHttp.get(url)
      .map(this.extractData)
      .catch(this.handleError)
      .finally(() => this._spinnerService.hide());
  }
  /** Update visa type */
  updateVisaType(VisaType: VisaMaster) {
    let url = Config.GetURL('/api/Masters/UpdateVisaType');
    this._spinnerService.show();
    return this.authHttp.post(url, { VisaType })
      .map(this.extractData)
      .catch(this.handleError)
      .finally(() => this._spinnerService.hide());
  }
  /**Delete the visa type */
  deleteVisaType(VisaType: VisaMaster) {
    let url = Config.GetURL('/api/Masters/DeleteVisaType');
    this._spinnerService.show();
    return this.authHttp.post(url, { VisaType })
      .map(this.extractData)
      .catch(this.handleError)
      .finally(() => this._spinnerService.hide());
  }
  // addCandidateProfile(profile: CandidateProfile) {
  //     let url = Config.GetURL('/api/ProfileBank/addCandidateProfile');
  //     this._spinnerService.show();
  //     return this.authHttp.post(url, { profile })
  //         .map(this.extractData)
  //         .catch(this.handleError)
  //         .finally(() => this._spinnerService.hide());
  // }

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
