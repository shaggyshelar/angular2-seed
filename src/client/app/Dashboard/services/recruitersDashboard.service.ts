import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { AuthHttp } from '../../shared/services/authHttp.service';
import { Config } from '../../shared/config/config';
import { SpinnerService } from '../../shared/components/spinner/spinner';
import { GrdOptions } from  '../../shared/model/index';
import { MasterData } from '../../shared/model/common.model';
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
    //Get open rrf for recruiter
    getMyOpenCountForRecruiter() {
        let url = Config.GetURL('/api/Dashboards/GetOpenRRFCountByRole');
        this._spinnerService.show();
        return this.authHttp.get(url)
            .map(this.extractData)
            .catch(this.handleError)
            .finally(() => this._spinnerService.hide());
    }
    /**Get all RRF with candidate count for specific RRF status */
    getRRFStatusCount(status: string) {
        let url = Config.GetURL('/api/Dashboards/GetCandidatesForRRFsByRRFStatus?RRFStatus=' + status);
        this._spinnerService.show();
        return this.authHttp.get(url)
            .map(this.extractData)
            .catch(this.handleError)
            .finally(() => this._spinnerService.hide());
    }
    /**Get all RRF with its status time remains to complete OR Overdue days */
    getRrfTimeline() {
        let url = Config.GetURL('/api/Dashboards/GetRRFTimelinesByRole');
        this._spinnerService.show();
        return this.authHttp.get(url)
            .map(this.extractData)
            .catch(this.handleError)
            .finally(() => this._spinnerService.hide());
    }
    /**Get all Open RRF Assggned to current user  */
    getAssginedOpenRRFCount() {
        let url = Config.GetURL('/api/Dashboards/GetOpenRRFCountByRole');
        this._spinnerService.show();
        return this.authHttp.get(url)
            .map(this.extractData)
            .catch(this.handleError)
            .finally(() => this._spinnerService.hide());
    }
    /**Get all interview round wise candidate count for specific RRF */
    getTaggedCandidateStatusCount(RrfCode: string) {
        let url = Config.GetURL('/api/Dashboards/GetCandidatesInPipelineForSelectedRRF?RRFID=' + RrfCode);
        this._spinnerService.show();
        return this.authHttp.get(url)
            .map(this.extractData)
            .catch(this.handleError)
            .finally(() => this._spinnerService.hide());
    }
    /**Get status wise RRF Count for Initiator */
    getStatusWiseRRFCount() {
        let url = Config.GetURL('/api/Dashboards/GetAllRRFStatuswiseCountForInitiator');
        this._spinnerService.show();
        return this.authHttp.get(url)
            .map(this.extractData)
            .catch(this.handleError)
            .finally(() => this._spinnerService.hide());
    }
    /**Get Pending Feedback for RRF count */
    getPendingFeedbackCount() {
        let url = Config.GetURL('/api/Dashboards/GetAllRRFFeedbackPendingCountForInitiator');
        this._spinnerService.show();
        return this.authHttp.get(url)
            .map(this.extractData)
            .catch(this.handleError)
            .finally(() => this._spinnerService.hide());
    }
    /**Get Interview awaiting approval count*/
    getInterviewAwaitingCount() {
        let url = Config.GetURL('/api/Dashboards/GetAllInterviewAwaitingApprovalCountForInitiator');
        this._spinnerService.show();
        return this.authHttp.get(url)
            .map(this.extractData)
            .catch(this.handleError)
            .finally(() => this._spinnerService.hide());
    }
    // GET RRF Awaiting Count
    getRRFAwaitingCount() {
        let url = Config.GetURL('/api/Dashboards/GetPendingApprovalCountForApprover');
        this._spinnerService.show();
        return this.authHttp.get(url)
            .map(this.extractData)
            .catch(this.handleError)
            .finally(() => this._spinnerService.hide());
    }
    /**Get all Overdue RRF's count*/
    getAllOverdueRRFCount() {
        let url = Config.GetURL('/api/Dashboards/GetOverdueRRFCountByRole');
        this._spinnerService.show();
        return this.authHttp.get(url)
            .map(this.extractData)
            .catch(this.handleError)
            .finally(() => this._spinnerService.hide());
    }
    /**Get all Incomplete Profile Count*/
    getIncompleteProfileCount() {
        let url = Config.GetURL('/api/Dashboards/GetIncompleteProfilesByRole');
        this._spinnerService.show();
        return this.authHttp.get(url)
            .map(this.extractData)
            .catch(this.handleError)
            .finally(() => this._spinnerService.hide());
    }
    /**Get all Incomplete Profile*/
    getIncompleteProfile(grdOptions: GrdOptions) {
        let url = Config.GetURL('/api/ProfileBank/GetInCompleteProfilesByRoles');
        this._spinnerService.show();
        return this.authHttp.post(url, { grdOptions })
            .map(this.extractData)
            .catch(this.handleError)
            .finally(() => this._spinnerService.hide());
    }
    /**Get all Offered Candidate list*/
    getOfferedCandidatesList(status: string) {
        let url = Config.GetURL('/api/ProfileBank/GetAllCandidatesByCurrentStatus?status='+status);
        this._spinnerService.show();
        return this.authHttp.get(url)
            .map(this.extractData)
            .catch(this.handleError)
            .finally(() => this._spinnerService.hide());
    }
    /**Get Candidate joining Profile*/
    getCandidatesjoining(grdOptions: GrdOptions) {
        let url = Config.GetURL('/api/Dashboards/GetDetailsOfCandidatesJoiningThisMonth');
        this._spinnerService.show();
        return this.authHttp.post(url, { grdOptions })
            .map(this.extractData)
            .catch(this.handleError)
            .finally(() => this._spinnerService.hide());
    }
    /**Get Overdue RRF by role*/
    getOverdueRRF(grdOptions: GrdOptions) {
        let url = Config.GetURL('/api/Dashboards/GetOverdueRRFsByRole');
        this._spinnerService.show();
        return this.authHttp.post(url, { grdOptions })
            .map(this.extractData)
            .catch(this.handleError)
            .finally(() => this._spinnerService.hide());
    }
     /**Get Assigned Open RRF by role*/
    getAssignedOpenRRF(grdOptions: GrdOptions) {
        let url = Config.GetURL('/api/Dashboards/GetOpenAndAssignedRRFsByRole');
        this._spinnerService.show();
        return this.authHttp.post(url, { grdOptions })
            .map(this.extractData)
            .catch(this.handleError)
            .finally(() => this._spinnerService.hide());
    }
     /**Get Get Pending RRF Approval by role*/
    getPendingRRFApproval(grdOptions: GrdOptions,status:string) {
        let url = Config.GetURL('/api/RRF/GetMyRaisedRRFWithCurrentStatus');
        this._spinnerService.show();
        return this.authHttp.post(url, {GrdOptions: {grdOptions} ,status })
            .map(this.extractData)
            .catch(this.handleError)
            .finally(() => this._spinnerService.hide());
    }
    //Get All open RRF 
    // getAllRRF() {
    //     let url = Config.GetURL('/api/RRF/GetAllOpenRRF');
    //     this._spinnerService.show();
    //     return this.authHttp.get(url)
    //         .map(this.extractData)
    //         .catch(this.handleError)
    //         .finally(() => this._spinnerService.hide());
    // }
    getAllRRF(grdOptions: GrdOptions) {
        let url = Config.GetURL('/api/RRF/GetOpenRRF');
        this._spinnerService.show();
        return this.authHttp.post(url,{grdOptions})
            .map(this.extractData)
            .catch(this.handleError)
            .finally(() => this._spinnerService.hide());
    }
     
    /**Get All RRF wise candidate status for Initiator*/
    getRrfStatusForGuage() {
        let url = Config.GetURL('/api/Dashboards/GetRRFwiseCandidateStatusForInitiator');
        this._spinnerService.show();
        return this.authHttp.get(url)
            .map(this.extractData)
            .catch(this.handleError)
            .finally(() => this._spinnerService.hide());
    }
    /**Get all Candidate Joining this month Count*/
    getCandidateJoining() {
        let url = Config.GetURL('/api/Dashboards/GetCandidatesJoiningThisMonth');
        this._spinnerService.show();
        return this.authHttp.get(url)
            .map(this.extractData)
            .catch(this.handleError)
            .finally(() => this._spinnerService.hide());
    }
    /**Get all offered candidate count */
    getAllOfferedCandidateCount() {
        let url = Config.GetURL('/api/Dashboards/GetAllCandidateStatus');
        this._spinnerService.show();
        return this.authHttp.get(url)
            .map(this.extractData)
            .catch(this.handleError)
            .finally(() => this._spinnerService.hide());
    }

       GetAllUnAssignedRRF(grdOptions: GrdOptions) {
        let url = Config.GetURL('/api/RRF/GetRRFUnAssignedToRecruiter');
        this._spinnerService.show();
        return this.authHttp.post(url, { grdOptions })
            .map(this.extractData)
            .catch(this.handleError)
            .finally(() => this._spinnerService.hide());
    }
    //Get List of RRF waiting for Freeze or feedback
    getFeedbackPendingRRF(grdOptions: GrdOptions) {
        let url = Config.GetURL('/api/RRF/GetFeedbackRRFs');
        this._spinnerService.show();
        return this.authHttp.post(url, { grdOptions })
            .map(this.extractData)
            .catch(this.handleError)
            .finally(() => this._spinnerService.hide());
    }
    //get RRF approval list
     getRRFApprovalList(grdOptions: GrdOptions) {
        let url = Config.GetURL('/api/RRF/GetAllRaisedRRF');
        this._spinnerService.show();
         return this.authHttp.post(url ,{grdOptions})
            .map(this.extractData)
            .catch(this.handleError)
            .finally(() => this._spinnerService.hide());
    }
    //Get list of Interview waiting approval
    getListOfInterviewReqApproval(grdOptions: GrdOptions) {
        let url = Config.GetURL('/api/RecruitmentCycle/GetSkippedInterviewsAwaitingApproval');
        this._spinnerService.show();
        return this.authHttp.post(url, { grdOptions })
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
