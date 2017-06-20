import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { AuthHttp } from './authHttp.service';
import { Config } from '../config/config';
import { SpinnerService } from '../components/spinner/spinner';

@Injectable()

export class MastersService {

    constructor(private authHttp: AuthHttp,
        private _spinnerService: SpinnerService) { }

    GetDesignations() {
        let authenticateUrl = Config.GetURL('/api/Masters/GetDesignations');
        return this.authHttp.get(authenticateUrl)
            .map(this.extractData)
            .catch(this.handleError);
    }

    getPractices() {
        let url = Config.GetURL('/api/Masters/GetPractices');
        return this.authHttp.get(url)
            .map(this.extractData)
            .catch(this.handleError);
    }

    getQualifications() {
        let authenticateUrl = Config.GetURL('/api/Masters/GetQualifications');
        return this.authHttp.get(authenticateUrl)
            .map(this.extractData)
            .catch(this.handleError);
    }

    getRoles() {
        let url = Config.GetURL('/api/Role/GetRoles');
        return this.authHttp.get(url)
            .map(this.extractData)
            .catch(this.handleError);
    }

    getSkills() {
        let authenticateUrl = Config.GetURL('/api/Masters/GetSkills');
        return this.authHttp.get(authenticateUrl)
            .map(this.extractData)
            .catch(this.handleError);
    }
     getSoftSkills() {
        let authenticateUrl = Config.GetURL('/api/Masters/GetSoftSkills');
        return this.authHttp.get(authenticateUrl)
            .map(this.extractData)
            .catch(this.handleError);
    }
     getLanguages() {
        let authenticateUrl = Config.GetURL('/api/Masters/GetLanguageSkills');
        return this.authHttp.get(authenticateUrl)
            .map(this.extractData)
            .catch(this.handleError);
    }
    getResumeSource() {
        let authenticateUrl = Config.GetURL('/api/Masters/GetAllResumeSources');
        return this.authHttp.get(authenticateUrl)
            .map(this.extractData)
            .catch(this.handleError);
    }
    getReferenceEmployee() {
        let authenticateUrl = Config.GetURL('/api/Masters/GetAllEmployeeLinkup');
        return this.authHttp.get(authenticateUrl)
            .map(this.extractData)
            .catch(this.handleError);
    }
    getCloseReason(category:string) {
        let authenticateUrl = Config.GetURL('/api/Masters/GetAllReasons?Category='+category);
        return this.authHttp.get(authenticateUrl)
            .map(this.extractData)
            .catch(this.handleError);
    }
    getCities() {
        let authenticateUrl = Config.GetURL('/api/Masters/GetAllCities');
        return this.authHttp.get(authenticateUrl)
            .map(this.extractData)
            .catch(this.handleError);
    }
    getDescription(Designation:string) {
        let authenticateUrl = Config.GetURL('/api/Masters/GetJobDescriptionsByDesignation?Designation='+Designation);
        return this.authHttp.get(authenticateUrl)
            .map(this.extractData)
            .catch(this.handleError);
    }
    getComponies() {
        let authenticateUrl = Config.GetURL('/api/Masters/GetAllCompanies');
        return this.authHttp.get(authenticateUrl)
            .map(this.extractData)
            .catch(this.handleError);
    }
    getTechnologies() {
        let url = Config.GetURL('/api/Masters/GetTechnologies');
        return this.authHttp.get(url)
            .map(this.extractData)
            .catch(this.handleError);
    }


    getCountries() {
        let url = Config.GetURL('/api/Masters/GetCountries');
        return this.authHttp.get(url)
            .map(this.extractData)
            .catch(this.handleError);
    }

    getStates(CountryID: number) {
        let url = Config.GetURL('/api/Masters/GetStatesByCountry?CountryID=' + CountryID);
        return this.authHttp.get(url)
            .map(this.extractData)
            .catch(this.handleError);
    }

    getDistricts() {
        let url = Config.GetURL('/api/Masters/GetDistricts');
        return this.authHttp.get(url)
            .map(this.extractData)
            .catch(this.handleError);
    }
    getYears() {
        let url = Config.GetURL('/api/Masters/GetYears');
        return this.authHttp.get(url)
            .map(this.extractData)
            .catch(this.handleError);
    }
    getGrades() {
        let url = Config.GetURL('/api/Masters/GetGrades');
        return this.authHttp.get(url)
            .map(this.extractData)
            .catch(this.handleError);
    }

    getRounds() {
        let url = Config.GetURL('/api/Masters/GetRounds');
        return this.authHttp.get(url)
            .map(this.extractData)
            .catch(this.handleError);
    }

    getInterviewers() {
        let url = Config.GetURL('/api/Masters/GetInterviewers');
        return this.authHttp.get(url)
            .map(this.extractData)
            .catch(this.handleError);
    }
    GetInterviewRounds(candidateID: string, rrfId: string) {
        let url = Config.GetURL('/api/RecruitmentCycle/GetIterviewRoundsForScheduling?CandidateID=' + candidateID
            + '&RRFID=' + rrfId);
        return this.authHttp.get(url)
            .map(this.extractData)
            .catch(this.handleError);
    }
    GetInterviewRoundsIsRescheduled(candidateID: string, rrfId: string, interviewID: string) {
        let url = Config.GetURL('/api/RecruitmentCycle/GetIterviewRoundsForRescheduling?CandidateID=' + candidateID
            + '&RRFID=' + rrfId + '&InterviewID=' + interviewID);
        return this.authHttp.get(url)
            .map(this.extractData)
            .catch(this.handleError);
    }
    getCandidateStatuses() {
        let url = Config.GetURL('/api/Masters/GetCandidateStatus');
        return this.authHttp.get(url)
            .map(this.extractData)
            .catch(this.handleError);
    }
    getUpdateStatus(candidateID: string) {
        let url = Config.GetURL('/api/RecruitmentCycle/GetCandidateStatusSequentially?CandidateID=' + candidateID);
        return this.authHttp.get(url)
            .map(this.extractData)
            .catch(this.handleError);
    }
    GetRecruiter() {
        let url = Config.GetURL('/api/Masters/GetRecruiters');
        return this.authHttp.get(url)
            .map(this.extractData)
            .catch(this.handleError);
    }

    GetOwnerType() {
        let url = Config.GetURL('/api/Masters/GetOwnerTypes');
        return this.authHttp.get(url)
            .map(this.extractData)
            .catch(this.handleError);
    }

    GetPriority() {
        let url = Config.GetURL('/api/Masters/GetPriority');
        return this.authHttp.get(url)
            .map(this.extractData)
            .catch(this.handleError);
    }
    GetVisaType() {
        let url = Config.GetURL('/api/Masters/GetVisaTypes');
        return this.authHttp.get(url)
            .map(this.extractData)
            .catch(this.handleError);
    }
    GetInterviewTypes() {
        let url = Config.GetURL('/api/Masters/GetInterviewTypes');
        return this.authHttp.get(url)
            .map(this.extractData)
            .catch(this.handleError);
    }
    GetSkypeID() {
        let url = Config.GetURL('/api/Masters/GetSkypeIDs');
        return this.authHttp.get(url)
            .map(this.extractData)
            .catch(this.handleError);
    }
    GetRoundsByInterviewType(TypeID: number) {
        let url = Config.GetURL('/api/Masters/GetRoundsByInterviewType?TypeID=' + TypeID);
        return this.authHttp.get(url)
            .map(this.extractData)
            .catch(this.handleError);
    }
    GetInterviewModes() {
        let url = Config.GetURL('/api/Masters/GetInterviewMode');
        return this.authHttp.get(url)
            .map(this.extractData)
            .catch(this.handleError);
    }
    getRejectionReasons() {
        let url = Config.GetURL('/api/Masters/GetAllReasons?Category=IEF');
        return this.authHttp.get(url)
            .map(this.extractData)
            .catch(this.handleError);
    }

    addSkillToMaster(skill: string) {
        let url = Config.GetURL('/api/Masters/AddSkills');
        this._spinnerService.show();
        return this.authHttp.post(url, { 'Skill': skill })
            .map(this.extractData)
            .catch(this.handleError)
            .finally(() => this._spinnerService.hide());
    }


    /* Sorting */
    getColumsForSorting(featureName: string) {
        let url = Config.GetURL('/api/Masters/GetSortableColumns?Feature=' + featureName);
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
