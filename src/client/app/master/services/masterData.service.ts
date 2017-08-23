import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { AuthHttp } from '../../shared/services/authHttp.service';
import { Config } from '../../shared/config/config';
import { SpinnerService } from '../../shared/components/spinner/spinner';
import { GrdOptions } from '../../shared/model/index';
import { VisaMaster, SkypeMaster, RolesMaster, FeatureMaster, ReasonsMaster, InterviewMode, Practice, InterviewType } from '../index';


@Injectable()
export class MyMasterDataService {

  constructor(private http: Http, private authHttp: AuthHttp, private _spinnerService: SpinnerService) { }


  /** GET REASONS DETAILS FOR 'IEF REJECT' AND 'RRF CLOSE' FROM BACKEND*/
  getResonsData() {
    let url = Config.GetURL('/api/Masters/GetAllReasonsMaster?Category=');
    this._spinnerService.show();
    return this.authHttp.get(url)
      .map(this.extractData)
      .catch(this.handleError)
      .finally(() => this._spinnerService.hide());
  }
  /** ADD NEW Reson  IN THE SYSTEM */
  addReasons(Reason: ReasonsMaster) {
    let url = Config.GetURL('/api/Masters/AddReason');
    this._spinnerService.show();
    return this.authHttp.post(url, { Reason })
      .map(this.extractData)
      .catch(this.handleError)
      .finally(() => this._spinnerService.hide());
  }

  /** Update REASON */
  updateReasons(Reason: ReasonsMaster) {
    let url = Config.GetURL('/api/Masters/UpdateReason');
    this._spinnerService.show();
    return this.authHttp.post(url, { Reason })
      .map(this.extractData)
      .catch(this.handleError)
      .finally(() => this._spinnerService.hide());
  }
  /**Delete the reason type */
  deleteReasons(Reason: ReasonsMaster) {
    let url = Config.GetURL('/api/Masters/DeleteReason');
    this._spinnerService.show();
    return this.authHttp.post(url, { Reason })
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


  /** GET SKYPE DETAILS FOR THE CANDIDATE PROFILES FROM BACKEND*/
  getSkypeData() {
    let url = Config.GetURL('/api/Masters/GetSkypeIDsMaster');
    this._spinnerService.show();
    return this.authHttp.get(url)
      .map(this.extractData)
      .catch(this.handleError)
      .finally(() => this._spinnerService.hide());
  }
  addSkypeData(SkypeCredential: SkypeMaster) {
    let url = Config.GetURL('/api/Masters/AddSkypeCredentials');
    this._spinnerService.show();
    return this.authHttp.post(url, { SkypeCredential })
      .map(this.extractData)
      .catch(this.handleError)
      .finally(() => this._spinnerService.hide());
  }
  editSkypeData(SkypeCredential: SkypeMaster) {
    let url = Config.GetURL('/api/Masters/UpdateSkypeCredentials');
    this._spinnerService.show();
    return this.authHttp.post(url, { SkypeCredential })
      .map(this.extractData)
      .catch(this.handleError)
      .finally(() => this._spinnerService.hide());
  }
  deleteSkypeData(SkypeCredential: SkypeMaster) {
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
  addInterviewModeData(Mode: InterviewMode) {
    let url = Config.GetURL('/api/Masters/AddInterviewMode');
    this._spinnerService.show();
    return this.authHttp.post(url, { Mode })
      .map(this.extractData)
      .catch(this.handleError)
      .finally(() => this._spinnerService.hide());
  }
  editInterviewModeData(Mode: InterviewMode) {
    let url = Config.GetURL('/api/Masters/UpdateInterviewMode');
    this._spinnerService.show();
    return this.authHttp.post(url, { Mode })
      .map(this.extractData)
      .catch(this.handleError)
      .finally(() => this._spinnerService.hide());
  }
  deleteInterviewModeData(Mode: InterviewMode) {
    let url = Config.GetURL('/api/Masters/DeleteInterviewMode');
    this._spinnerService.show();
    return this.authHttp.post(url, { Mode })
      .map(this.extractData)
      .catch(this.handleError)
      .finally(() => this._spinnerService.hide());
  }

  /** GET Interview Type DETAILS FOR THE CANDIDATE PROFILES FROM BACKEND*/
  getInterviewTypeData() {
    let url = Config.GetURL('/api/Masters/GetInterviewTypesMaster');
    this._spinnerService.show();
    return this.authHttp.get(url)
      .map(this.extractData)
      .catch(this.handleError)
      .finally(() => this._spinnerService.hide());
  }
  addInterviewTypeData(Type: InterviewType) {
    let url = Config.GetURL('/api/Masters/AddInterviewType');
    this._spinnerService.show();
    return this.authHttp.post(url, { Type })
      .map(this.extractData)
      .catch(this.handleError)
      .finally(() => this._spinnerService.hide());
  }
  editInterviewTypeData(Type: InterviewType) {
    let url = Config.GetURL('/api/Masters/UpdateInterviewType');
    this._spinnerService.show();
    return this.authHttp.post(url, { Type })
      .map(this.extractData)
      .catch(this.handleError)
      .finally(() => this._spinnerService.hide());
  }
  deleteInterviewTypeData(Type: InterviewType) {
    let url = Config.GetURL('/api/Masters/DeleteInterviewType');
    this._spinnerService.show();
    return this.authHttp.post(url, { Type })
      .map(this.extractData)
      .catch(this.handleError)
      .finally(() => this._spinnerService.hide());
  }
  /** GET Practice DETAILS  FROM BACKEND*/
  getPracticeData() {
    let url = Config.GetURL('/api/Masters/GetPractices');
    this._spinnerService.show();
    return this.authHttp.get(url)
      .map(this.extractData)
      .catch(this.handleError)
      .finally(() => this._spinnerService.hide());
  }
  addPracticeData(Practice: Practice) {
    let url = Config.GetURL('/api/Masters/AddPractices');
    this._spinnerService.show();
    return this.authHttp.post(url, { Practice })
      .map(this.extractData)
      .catch(this.handleError)
      .finally(() => this._spinnerService.hide());
  }
  editPracticeData(Practice: Practice) {
    let url = Config.GetURL('/api/Masters/UpdatePractices');
    this._spinnerService.show();
    return this.authHttp.post(url, { Practice })
      .map(this.extractData)
      .catch(this.handleError)
      .finally(() => this._spinnerService.hide());
  }
  deletePracticeData(Practice: Practice) {
    let url = Config.GetURL('/api/Masters/DeletePractices');
    this._spinnerService.show();
    return this.authHttp.post(url, { Practice })
      .map(this.extractData)
      .catch(this.handleError)
      .finally(() => this._spinnerService.hide());
  }
  /** GET Practice DETAILS  FROM BACKEND*/
  getIEFData() {
    let url = Config.GetURL('/api/Masters/GetAllIEFFunctionsMaster');
    this._spinnerService.show();
    return this.authHttp.get(url)
      .map(this.extractData)
      .catch(this.handleError)
      .finally(() => this._spinnerService.hide());
  }

  /***** START FEATURE MASTER API */
  /** GET FEATURE DETAILS FROM BACKEND*/
  getFeatureData() {
    let url = Config.GetURL('/api/Masters/GetFeatures');
    this._spinnerService.show();
    return this.authHttp.get(url)
      .map(this.extractData)
      .catch(this.handleError)
      .finally(() => this._spinnerService.hide());
  }
  /** ADD NEW FEATURE IN THE SYSTEM */
  addFeature(Feature: FeatureMaster) {
    let url = Config.GetURL('/api/Masters/AddFeature');
    this._spinnerService.show();
    return this.authHttp.post(url, { Feature })
      .map(this.extractData)
      .catch(this.handleError)
      .finally(() => this._spinnerService.hide());
  }

  /** Update Feature */
  updateFeature(Feature: FeatureMaster) {
    let url = Config.GetURL('/api/Masters/UpdateFeature');
    this._spinnerService.show();
    return this.authHttp.post(url, { Feature })
      .map(this.extractData)
      .catch(this.handleError)
      .finally(() => this._spinnerService.hide());
  }
  /**Delete the feature */
  deleteFeature(Feature: FeatureMaster) {
    let url = Config.GetURL('/api/Masters/DeleteFeature');
    this._spinnerService.show();
    return this.authHttp.post(url, { Feature })
      .map(this.extractData)
      .catch(this.handleError)
      .finally(() => this._spinnerService.hide());
  }
  /***** END FEATURE MASTER API */

  /***** START ROLE MASTER API */
  /** GET ROLE DETAILS FROM BACKEND*/
  getRoleData() {
    let url = Config.GetURL('/api/Masters/GetRoles');
    this._spinnerService.show();
    return this.authHttp.get(url)
      .map(this.extractData)
      .catch(this.handleError)
      .finally(() => this._spinnerService.hide());
  }
  /** ADD NEW ROLE IN THE SYSTEM */
  addRole(Role: RolesMaster) {
    let url = Config.GetURL('/api/Masters/AddRole');
    this._spinnerService.show();
    return this.authHttp.post(url, { Role })
      .map(this.extractData)
      .catch(this.handleError)
      .finally(() => this._spinnerService.hide());
  }

  /** Update Role */
  updateRole(Role: RolesMaster) {
    let url = Config.GetURL('/api/Masters/UpdateRole');
    this._spinnerService.show();
    return this.authHttp.post(url, { Role })
      .map(this.extractData)
      .catch(this.handleError)
      .finally(() => this._spinnerService.hide());
  }
  /**Delete the Role */
  deleteRole(Role: RolesMaster) {
    let url = Config.GetURL('/api/Masters/DeleteRole');
    this._spinnerService.show();
    return this.authHttp.post(url, { Role })
      .map(this.extractData)
      .catch(this.handleError)
      .finally(() => this._spinnerService.hide());
  }
  /***** END ROLE MASTER API */


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
