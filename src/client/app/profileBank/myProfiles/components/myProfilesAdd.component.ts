import {Component} from '@angular/core';
import { Router, ROUTER_DIRECTIVES, OnActivate, RouteSegment } from '@angular/router';
import { CandidateProfile, ResumeMeta, Qualification, CandidateExperience,
    EmploymentHistory, Skills, SalaryDetails, SocialInformation} from '../../shared/model/myProfilesInfo';
import { MyProfilesService } from '../services/myProfiles.service';
import { MastersService } from '../../../shared/services/masters.service';
import { TOOLTIP_DIRECTIVES } from 'ng2-bootstrap';
import { MasterData, ResponseFromAPI } from  '../../../shared/model/index';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { APIResult } from  '../../../shared/constantValue/index';
import { ProfileBankService} from  '../../shared/services/profileBank.service';
import { DropdownMultiSelectComponent } from '../../../shared/components/dropdownMultiSelect/dropdownMultiSelect.component';
import {Location} from '@angular/common';

@Component({
    moduleId: module.id,
    selector: 'rrf-myprofiles-add',
    templateUrl: '../../shared/views/profileBankAdd.component.html',
    directives: [ROUTER_DIRECTIVES, TOOLTIP_DIRECTIVES,DropdownMultiSelectComponent],
    styleUrls: ['myProfiles.component.css']
})

export class MyProfilesAddComponent implements OnActivate {
    CandidateID: MasterData = new MasterData();
    profile: CandidateProfile;
    qualification: Qualification;
    errorMessage: string;
    params: string;
    countries: Array<MasterData>;
    states: Array<MasterData>;
    haveVisa:boolean = false;
    qualifications: Array<MasterData>;
    grades: Array<MasterData>;
    years: Array<MasterData>;
    selectedQualification: number;
    selectedYear: number;
    selectedGrade: number;
    Marks: number;
    EmploymentDetailsAction: string = 'Add';
    IsHidden: boolean = true;
    IsSuccess: boolean = false;
    CurrentYear: number;
    selectedVisa: MasterData = new MasterData();
    VisaType: Array<MasterData> = new Array<MasterData>();
    TITLE: string = 'Profiles';
    /*Candidate Salary Details */
    CandidateSalaryDetails: SalaryDetails = new SalaryDetails();
    /*Candidate Skills */
    CandidateSkills: Skills = new Skills();
    /**Candidate Experience */
    CandidateExperiences: CandidateExperience = new CandidateExperience();
    /**Employment History*/
    EmployersInformation: EmploymentHistory = new EmploymentHistory();
    /**Social Information */
    CandidateSocialInfo: SocialInformation = new SocialInformation();
    /**Employment History collection */
    EmployersInformationList: Array<EmploymentHistory> = new Array<EmploymentHistory>();
    /**Variables for Upload photo */
    uploadedPhoto: any;
    fileUploaded: boolean = false;
    fileName: string;
    resumeMeta: ResumeMeta;
    profilePhoto: string;
    /** For profile picture */
    profilePic: any;
    readyToRelocateFlag: boolean = false;
    reasonToRelocateFlag: boolean = false;
    OfferInHand: boolean = false;
    VariableCTC: boolean = false;
    AllowanceFlag: boolean = false;
    IncentiveFlag: boolean = false;
    FunctionalExp: boolean = false;
    // For Duplicate Records
    isExist: boolean = false;
    existedProfile: CandidateProfile;
    skills: MasterData[];
    resumeSource: MasterData[];
    constructor(private _myProfilesService: MyProfilesService,
        private _masterService: MastersService,
        private _profileBankService: ProfileBankService,
        private _mastersService: MastersService,
        public toastr: ToastsManager,
        private _router: Router,
        private _location: Location) {
        this.profile = new CandidateProfile();
        this.createQualificationObj();
        this.resumeMeta = new ResumeMeta();
        this.uploadedPhoto = new Array<File>();

    }

    routerOnActivate(segment: RouteSegment) {
        window.onbeforeunload = function () {
            return 'Data will be lost if you leave the page, are you sure?';
        };
        //get all master data and bind to dropdown
        this.getCountries();
        this.getQualifications();
        this.getGrades();
        this.getVisaType();
        //get current profile by Id
        this.params = segment.getParam('id');
        if (this.params) {
            this.CandidateID.Id = parseInt(this.params.split('ID')[1]);
            this.CandidateID.Value = this.params.split('ID')[0];
            this.getCandidateProfileById(this.CandidateID.Value);
            this.GetEmployersInformationList(this.CandidateID);
            this.GetCandidateExperience(this.CandidateID);
        }
        var date = new Date();
        this.CurrentYear = date.getFullYear();
        this.getProfilePhoto(this.CandidateID);
        this.getSkills();
        this.getResumeSource();
    }
    getSkills(): void {
        this._mastersService.getSkills()
            .subscribe(
            results => {
                this.skills = results;
            },
            error => this.errorMessage = <any>error);
    }
    getResumeSource(): void {
        this._mastersService.getResumeSource()
            .subscribe(
            results => {
                this.resumeSource = results;
            },
            error => this.errorMessage = <any>error);
    }
    createQualificationObj() {
        this.qualification = new Qualification();
        this.qualification.Qualification = new MasterData();
        this.qualification.Grade = new MasterData();
    }

    getCandidateProfileById(profileId: string) {
        this._profileBankService.getCandidateProfile(profileId)
            .subscribe(
            (results: CandidateProfile) => {
                this.profile = results;
                if (this.profile.OutstationedCandidate === true) {
                    this.readyToRelocateFlag = true;
                }
                if (this.profile.ReadyToRelocate === true) {
                    this.reasonToRelocateFlag = true;
                }
                if (this.profile.CandidateOtherDetails.OfferInHand === true) {
                    this.OfferInHand = true;
                }
                if (this.profile.CandidateSalaryDetails.CTCIncludeVariable === true) {
                    this.VariableCTC = true;
                }
                if (this.profile.CandidateSalaryDetails.Allowance === true) {
                    this.AllowanceFlag = true;
                }
                if (this.profile.CandidateSalaryDetails.Incentive === true) {
                    this.IncentiveFlag = true;
                }
                if (this.profile.CandidateSkills.AnyFunctionalExpFlag === true) {
                    this.FunctionalExp = true;
                }
                this.profile.PreviousFollowupComments = this.profile.FollowUpComments;
                if (results.Country.Id !== 0)
                    this.getStates(results.Country.Id);
            },
            error => this.errorMessage = <any>error);
    }


    getCountries(): void {
        this._masterService.getCountries()
            .subscribe(
            results => {
                this.countries = results;

            },
            error => this.errorMessage = <any>error);
    }

    getStates(CountryId: number): void {
        this._masterService.getStates(CountryId)
            .subscribe(
            results => {
                this.states = results;
            },
            error => this.errorMessage = <any>error);
    }

    getQualifications(): void {
        this._masterService.getQualifications()
            .subscribe(
            results => {
                this.qualifications = <Array<MasterData>>results;
            },
            error => this.errorMessage = <any>error);
    }

    getYears(): void {
        this._masterService.getYears()
            .subscribe(
            results => {
                this.years = results;
            },
            error => this.errorMessage = <any>error);
    }

    getGrades(): void {
        this._masterService.getGrades()
            .subscribe(
            results => {
                this.grades = results;
            },
            error => this.errorMessage = <any>error);
    }
    getVisaType(): void {
        this._masterService.GetVisaType()
            .subscribe(
            results => {
                this.VisaType = results;
            },
            error => this.errorMessage = <any>error);
    }
    createQualification() {
        this.qualification = new Qualification();
        this.qualification.Qualification = new MasterData;
        this.qualification.Grade = new MasterData;

    }

    onSelectQualification(candidateQualification: string) {
        this.selectedQualification = parseInt(candidateQualification);
    }
    onSelectVisa(visaId: string) {
        this.profile.CandidateOtherDetails.Visa.Id = parseInt(visaId);
    }

    onSelectGrade(grade: string) {
        this.selectedGrade = parseInt(grade);
    }

    onSameAddressChecked(value: boolean) {
        if (value) {
            this.profile.CurrentAddress = this.profile.PermanentAddress;
        } else {
            this.profile.CurrentAddress = '';
        }
    }
    onSavePrimaryInfo(): void {

        if (!this.isExist) {
            if (this.validatePrimaryInfo()) {
                if (this.profile.PreviousFollowupComments !== this.profile.FollowUpComments.trim().replace(/ +/g, ' ')) {
                    this.profile.CommentsUpdated = true;
                    this.profile.PreviousFollowupComments = this.profile.FollowUpComments.trim();
                } else {
                    this.profile.CommentsUpdated = false;
                }
                this._profileBankService.editCandidateProfile(this.profile)
                    .subscribe(
                    results => {
                        if ((<ResponseFromAPI>results).StatusCode === APIResult.Success) {
                            this.toastr.success((<ResponseFromAPI>results).Message);
                            this.getCandidateProfileById(this.CandidateID.Value);
                        } else {
                            this.toastr.error((<ResponseFromAPI>results).Message);
                        }
                    },
                    error => {
                        this.errorMessage = <any>error;
                        this.toastr.error(<any>error);
                    });
            }
        }
    }
    validatePrimaryInfo(): boolean {
        var submitFlag: boolean = true;
        if (this.profile.FirstName === '') {
            this.toastr.error('Please enter first name');
            submitFlag = false;
        } else {
            if (this.profile.LastName === '') {
                this.toastr.error('Please enter last name');
                submitFlag = false;
            } else {
                if (this.profile.Email === '') {
                    this.toastr.error('Please enter email');
                    submitFlag = false;
                } else {
                    if (this.profile.PrimaryContact === '') {
                        this.toastr.error('Please enter contact no.');
                        submitFlag = false;
                    } else {
                                    if (this.profile.CandidateSalaryDetails.CurrentSalary === '') {
                                        this.toastr.error('Please enter current salary');
                                        submitFlag = false;
                                    } else {
                                        if (this.profile.CandidateSalaryDetails.ExpectedSalary === '') {
                                            this.toastr.error('Please enter expected salary');
                                            submitFlag = false;
                                        }
                                    }
                                }
                    // else {
                    //     if (this.profile.CandidateSkills.PrimarySkills === '' || this.profile.CandidateSkills.PrimarySkills === null) {
                    //         this.toastr.error('Please enter skills');
                    //         submitFlag = false;
                    //     } else {
                    //         if (this.profile.Tag === '' || this.profile.CandidateSkills.PrimarySkills === null) {
                    //             this.toastr.error('Please enter Tag');
                    //             submitFlag = false;
                    //         } else {
                    //             if (this.profile.CandidateOtherDetails.NoticePeriod === '') {
                    //                 this.toastr.error('Please enter notice period');
                    //                 submitFlag = false;
                    //             } 
                                
                    //         }
                    //     }
                    // }
                }
            }
        }

        return submitFlag;
    }

    onSavePersonalDetails(): void {
        if (this.profile.PreviousFollowupComments !== this.profile.FollowUpComments.trim().replace(/ +/g, ' ')) {
            this.profile.CommentsUpdated = true;
            this.profile.PreviousFollowupComments = this.profile.FollowUpComments.trim();
        } else {
            this.profile.CommentsUpdated = false;
        }
        if (!this.isExist) {
            if (this.validatePersonalInfo()) {
                this._profileBankService.editCandidatePersonalDetails(this.profile)
                    .subscribe(
                    results => {
                        if ((<ResponseFromAPI>results).StatusCode === APIResult.Success) {
                            this.toastr.success((<ResponseFromAPI>results).Message);
                            this.getCandidateProfileById(this.CandidateID.Value);
                        } else {
                            this.toastr.error((<ResponseFromAPI>results).Message);
                        }
                    },
                    error => {
                        this.errorMessage = <any>error;
                        this.toastr.error(<any>error);
                    });
            }
        }
    }

    validatePersonalInfo(): boolean {
        var submitFlag: boolean = true;
        if (this.profile.FirstName === '') {
            this.toastr.error('Please enter first name');
            submitFlag = false;
        } else {
            if (this.profile.LastName === '') {
                this.toastr.error('Please enter last name');
                submitFlag = false;
            } else {
                if (this.profile.Email === '') {
                    this.toastr.error('Please enter email');
                    submitFlag = false;
                } else {
                    if (this.profile.PrimaryContact === '') {
                        this.toastr.error('Please enter primary contact');
                        submitFlag = false;
                    }
                }
            }
        }

        return submitFlag;
    }
    onSaveProfessionalDetails(): void {
        //Check For Comments Updated
        if (this.profile.PreviousFollowupComments !== this.profile.FollowUpComments.trim().replace(/ +/g, ' ')) {
            this.profile.CommentsUpdated = this.profile.CandidateOtherDetails.CommentsUpdated = true;
            this.profile.PreviousFollowupComments = this.profile.CandidateOtherDetails.FollowUpComments
                = this.profile.FollowUpComments.trim();
        } else {
            this.profile.CommentsUpdated = this.profile.CandidateOtherDetails.CommentsUpdated = false;
        }
        this.profile.CandidateOtherDetails.CandidateID = this.CandidateID;
        //Save Data
        if (!this.isExist) {
            this._profileBankService.editCandidateProfessionalDetails(this.profile.CandidateOtherDetails)
                .subscribe(
                results => {
                    if ((<ResponseFromAPI>results).StatusCode === APIResult.Success) {
                        this.toastr.success((<ResponseFromAPI>results).Message);
                        this.getCandidateProfileById(this.CandidateID.Value);
                    } else {
                        this.toastr.error((<ResponseFromAPI>results).Message);
                    }
                },
                error => {
                    this.errorMessage = <any>error;
                    this.toastr.error(<any>error);
                });
        }


    }

    onSaveSkillsDetails() {

        this.profile.CandidateSkills.CandidateID = this.CandidateID;

        if (this.profile.PreviousFollowupComments !== this.profile.FollowUpComments.trim().replace(/ +/g, ' ')) {
            this.profile.CommentsUpdated = this.profile.CandidateSkills.CommentsUpdated = true;
            this.profile.CandidateSkills.FollowUpComments = this.profile.PreviousFollowupComments
                = this.profile.FollowUpComments.trim();
        } else {
            this.profile.CommentsUpdated = this.profile.CandidateSkills.CommentsUpdated = false;
        }
        if (!this.isExist) {
            this._profileBankService.editCandidateSkillsDetails(this.profile.CandidateSkills)
                .subscribe(
                results => {
                    if ((<ResponseFromAPI>results).StatusCode === APIResult.Success) {
                        this.toastr.success((<ResponseFromAPI>results).Message);
                        this.getCandidateProfileById(this.CandidateID.Value);
                    } else {
                        this.toastr.error((<ResponseFromAPI>results).Message);
                    }
                },
                error => {
                    this.errorMessage = <any>error;
                    this.toastr.error(<any>error);
                });

        }

    }

    onSaveTeamManagementDetails(): void {

        if (this.profile.PreviousFollowupComments !== this.profile.FollowUpComments.trim().replace(/ +/g, ' ')) {
            this.profile.CommentsUpdated = this.profile.CandidateTeamManagement.CommentsUpdated = true;
            this.profile.PreviousFollowupComments = this.profile.CandidateTeamManagement.FollowUpComments =
                this.profile.FollowUpComments.trim();
        } else {
            this.profile.CommentsUpdated = this.profile.CandidateTeamManagement.CommentsUpdated = false;
        }
        this.profile.CandidateTeamManagement.CandidateID = this.CandidateID;
        if (!this.isExist) {
            this._profileBankService.editCandidateTeamManagementDetails(this.profile.CandidateTeamManagement)
                .subscribe(
                results => {
                    if ((<ResponseFromAPI>results).StatusCode === APIResult.Success) {
                        this.toastr.success((<ResponseFromAPI>results).Message);
                        this.getCandidateProfileById(this.CandidateID.Value);
                    } else {
                        this.toastr.error((<ResponseFromAPI>results).Message);
                    }
                },
                error => {
                    this.errorMessage = <any>error;
                    this.toastr.error(<any>error);
                });
        }
    }
    onSaveSocialInfo(): void {
        this.profile.CandidateSocialInformation.CandidateID = this.CandidateID;
        if (!this.isExist) {
            this._profileBankService.editCandidateSocialInfo(this.profile.CandidateSocialInformation)
                .subscribe(
                results => {
                    if ((<ResponseFromAPI>results).StatusCode === APIResult.Success) {
                        this.toastr.success((<ResponseFromAPI>results).Message);
                        this.getCandidateProfileById(this.CandidateID.Value);
                    } else {
                        this.toastr.error((<ResponseFromAPI>results).Message);
                    }
                },
                error => {
                    this.errorMessage = <any>error;
                    this.toastr.error(<any>error);
                });
        }
    }

    /**Function to fetch candidate EXPERIENCE details */
    GetCandidateExperience(candidateID: MasterData) {
        this._profileBankService.getCandidateExperience(candidateID)
            .subscribe(
            results => {
                this.CandidateExperiences = <any>results;
            },
            error => {
                this.errorMessage = <any>error;
                this.toastr.error(<any>error);
            });
    }
    /**Save candidate EXPERIENCE details */
    onSaveCareerProfileDetails(): void {

        if (this.profile.PreviousFollowupComments
            !== this.CandidateExperiences.FollowUpComments
            ? this.CandidateExperiences.FollowUpComments.trim().replace(/ +/g, ' ') : ''
        ) {
            this.profile.CommentsUpdated = this.CandidateExperiences.CommentsUpdated = true;
            this.profile.PreviousFollowupComments = this.CandidateExperiences.FollowUpComments
                = this.CandidateExperiences.FollowUpComments.trim();
        } else {
            this.profile.CommentsUpdated = this.CandidateExperiences.CommentsUpdated = false;
        }
        this.CandidateExperiences.CandidateID = this.CandidateID;
        if (!this.isExist) {
            this._profileBankService.editCandidateCareerDetails(this.CandidateExperiences)
                .subscribe(
                results => {
                    if ((<ResponseFromAPI>results).StatusCode === APIResult.Success) {
                        this.toastr.success((<ResponseFromAPI>results).Message);
                        this.GetCandidateExperience(this.CandidateID);
                    } else {
                        this.toastr.error((<ResponseFromAPI>results).Message);
                    }
                },
                error => {
                    this.errorMessage = <any>error;
                    this.toastr.error(<any>error);
                }
                );
        }


    }

    onSaveSalaryDetails(): void {
        if (this.profile.PreviousFollowupComments !== this.profile.FollowUpComments.trim().replace(/ +/g, ' ')) {
            this.profile.CommentsUpdated = this.profile.CandidateSalaryDetails.CommentsUpdated = true;
            this.profile.PreviousFollowupComments = this.profile.CandidateSalaryDetails.FollowUpComments =
                this.profile.FollowUpComments.trim();
        } else {
            this.profile.CommentsUpdated = false;
        }
        this.profile.CandidateSalaryDetails.CandidateID = this.CandidateID;
        if (!this.isExist) {
            this._profileBankService.editCandidateSalaryDetails(this.profile.CandidateSalaryDetails)
                .subscribe(
                results => {
                    if ((<ResponseFromAPI>results).StatusCode === APIResult.Success) {
                        this.toastr.success((<ResponseFromAPI>results).Message);
                        this.getCandidateProfileById(this.CandidateID.Value);
                    } else {
                        this.toastr.error((<ResponseFromAPI>results).Message);
                    }
                },
                error => {
                    this.errorMessage = <any>error;
                    this.toastr.error(<any>error);
                });
        }


    }
    /**START Candidate Employement History functionality (Candidate Employers Information) */
    AddEditEmployerHistory() {
        if (this.EmploymentDetailsAction === 'Add') {
            this.AddEmployersInformation();
        } else if (this.EmploymentDetailsAction === 'Update') {
            this.UpdateEmployersInformation();
        }
    }
    /**Save new employer related information*/
    AddEmployersInformation() {
        var _candidateID = this.CandidateID;
        this.EmployersInformation.CandidateID = _candidateID;
        this._profileBankService.addCandidateEmploymentDetails(this.EmployersInformation)
            .subscribe(
            results => {
                if ((<ResponseFromAPI>results).StatusCode === APIResult.Success) {
                    this.toastr.success((<ResponseFromAPI>results).Message);
                    /**Bind new data to list */
                    this.GetEmployersInformationList(_candidateID);
                    this.EmployersInformation = new EmploymentHistory();
                } else {
                    this.toastr.error((<ResponseFromAPI>results).Message);
                }
            },
            error => {
                this.errorMessage = <any>error;
                this.toastr.error(<any>error);
            });
    }
    /**Get selected candidate EmployerInformation for edit*/
    EditEmployerInformation(careerProfileID: string) {
        this.GetEmployersInformation(careerProfileID);
        this.EmploymentDetailsAction = 'Update';
    }
    /**Save new employer related information*/
    UpdateEmployersInformation() {
        this.EmployersInformation.CandidateID = this.CandidateID;
        this._profileBankService.editCandidateEmploymentDetails(this.EmployersInformation)
            .subscribe(
            results => {
                if ((<ResponseFromAPI>results).StatusCode === APIResult.Success) {
                    this.toastr.success((<ResponseFromAPI>results).Message);
                    /**Bind new data to list */
                    this.GetEmployersInformationList(this.CandidateID);
                    this.EmployersInformation = new EmploymentHistory();
                } else {
                    this.toastr.error((<ResponseFromAPI>results).Message);
                }
            },
            error => {
                this.errorMessage = <any>error;
                this.toastr.error(<any>error);
            });
    }
    /**Bind candidate's all employment related information */
    GetEmployersInformationList(_candidateID: MasterData) {
        this._profileBankService.getCandidateEmploymentHistory(_candidateID)
            .subscribe(
            results => {
                this.EmployersInformationList = <any>results;
                this.EmploymentDetailsAction = 'Add';
            },
            error => {
                this.errorMessage = <any>error;
                this.toastr.error(<any>error);
            });

    }
    /**Fetch and bing candidate's selected employment information For Update*/
    GetEmployersInformation(careerProfileID: string) {
        this._profileBankService.getCandidateSelectedEmploymentDetails(careerProfileID)
            .subscribe(
            results => {
                this.EmployersInformation = <any>results;
                this.EmployersInformation.FromDate = this.formatDate(this.EmployersInformation.FromDate);
                if (this.EmployersInformation.IsCurrentCompany === true) {
                    this.EmployersInformation.ToDate = this.formatDate(new Date());
                } else {
                    this.EmployersInformation.ToDate = this.formatDate(this.EmployersInformation.ToDate);
                }
            },
            error => {
                this.errorMessage = <any>error;
                this.toastr.error(<any>error);
            });
    }
    /**END Candidate Employement History functionality (Candidate Employers Information) */

    onAddQualification(): void {
        this.qualification.CandidateID = this.profile.CandidateID;
        this.qualification.Qualification.Value = this.qualification.Grade.Value = null;
        if (this.selectedQualification !== undefined) {
            this.qualification.Qualification = new MasterData();
            this.qualification.Qualification.Id = this.selectedQualification;
        } else {
            this.qualification.Qualification.Id = this.qualification.Qualification.Id;
        }

        if (this.selectedGrade !== undefined) {
            this.qualification.Grade = new MasterData();
            this.qualification.Grade.Id = this.selectedGrade;
        } else {
            this.qualification.Grade.Id = this.qualification.Grade.Id;
        }

        if (this.params) {
            this._profileBankService.addCandidateQualification(this.qualification)
                .subscribe(
                results => {

                    if ((<ResponseFromAPI>results).StatusCode === APIResult.Success) {
                        this.toastr.success((<ResponseFromAPI>results).Message);
                        this.createQualification();
                        this.IsHidden = true;
                        this.getCandidateQualification();
                    } else {
                        this.toastr.error((<ResponseFromAPI>results).Message);
                    }
                },
                error => {
                    this.errorMessage = <any>error;
                    this.toastr.error(<any>error);
                });
        }
    }

    getCandidateQualification() {
        this._profileBankService.getCandidateQualifications(this.CandidateID.Value)
            .subscribe(
            results => {
                this.profile.CandidateQualification = new Array<Qualification>();
                this.profile.CandidateQualification = <any>results;
            },
            error => {
                this.errorMessage = <any>error;
                this.toastr.error(<any>error);
            });
    }

    editQualidficationData(QID: string) {
        if (this.params) {
            this._profileBankService.getQualificationById(this.CandidateID.Value, QID.toString())
                .subscribe(
                (results: Qualification) => {
                    this.qualification = results;

                    //Show Update button
                    this.IsHidden = false;
                    this.selectedQualification = undefined;
                    this.selectedGrade = undefined;
                },
                error => {
                    this.errorMessage = <any>error;
                    this.toastr.error(<any>error);
                });
        }
    }
    /** START Upload profile photo functionality*/
    /** Function to upload photo */
    uploadPhoto(selectedFile: any) {
        /**selected files string assing to the collection : uploadedPhoto */
        try {
            let FileList: FileList = selectedFile.target.files;
            if (selectedFile.target.files[0].size < 2000000) {
                if (selectedFile.target.files[0].type === 'image/jpeg' || selectedFile.target.files[0].type === 'image/png'
                    || selectedFile.target.files[0].type === 'image/jpg') {
                    if (this.uploadedPhoto)
                        this.uploadedPhoto.length = 0;
                    for (let i = 0, length = FileList.length; i < length; i++) {
                        this.uploadedPhoto.push(FileList.item(i));
                        this.fileUploaded = true;
                        this.fileName = FileList.item(i).name;
                    }
                    this.postPhoto(this.CandidateID, this.uploadedPhoto[0]);
                } else {
                    this.toastr.error('Please upload image of type .jpg, .png, .jpeg');
                }
            } else {
                this.toastr.error('Please upload image of size less than 2 MB');
            }
        } catch (error) {
            document.write(error);
        }
    }
    /**Remove Candidate photo from data base */
    removePhoto(CandidateID: MasterData) {
        this._profileBankService.removeProfilePhoto(CandidateID)
            .subscribe(
            results => {
                if ((<ResponseFromAPI>results).StatusCode === APIResult.Success) {
                    this.toastr.success((<ResponseFromAPI>results).Message);
                    this.getCandidateProfileById(this.CandidateID.Value);
                } else {
                    this.toastr.error((<ResponseFromAPI>results).Message);
                }
            },
            error => {
                this.errorMessage = <any>error;
                this.toastr.error(<any>error);
            });
    }

    postPhoto(CandidateID: MasterData, selectedFile: any) {
        if (this.fileName !== '' || this.fileName !== undefined) {

            this.resumeMeta.CandidateID = CandidateID;
            this.resumeMeta.Overwrite = false;
            this.resumeMeta.Profile = selectedFile;
            this._profileBankService.uploadProfilePhoto(this.resumeMeta).then(
                results => {
                    if ((<ResponseFromAPI>results).StatusCode === APIResult.Success) {
                        this.toastr.success((<ResponseFromAPI>results).Message);
                        this.fileUploaded = false;
                        this.fileName = '';
                        this.getProfilePhoto(CandidateID);
                    } else {
                        this.toastr.error((<ResponseFromAPI>results).Message);
                    }
                },
                (error: any) => this.errorMessage = <any>error);
        } else {
            this.toastr.error('No photo found..!');
        }
    }
    /**Get profile photo */
    getProfilePhoto(CandidateID: MasterData) {
        this._profileBankService.getCandidateProfilePhoto(CandidateID)
            .subscribe(
            (results: CandidateProfile) => {
                this.profilePic = results;
            },
            error => {
                this.errorMessage = <any>error;
                this.toastr.error(<any>error);
            });
    }
    /** END Upload profile photo functionality*/

    Back() {
        let res: any;
        res = confirm(
            'Data will be lost if you leave the page, are you sure?'
        );
        if (res === true)
            this._location.back();
    }
    onOutstationedClick(isChecked: any) {
        if (isChecked === false) {
            this.readyToRelocateFlag = true;
            if (this.profile.ReadyToRelocate === true) {
                this.reasonToRelocateFlag = true;
            }
        } else {
            this.readyToRelocateFlag = false;
            this.reasonToRelocateFlag = false;
        }
    }
    onReadyToRelocate(isChecked: any) {
        if (isChecked === false) {
            this.reasonToRelocateFlag = true;
        } else {
            this.reasonToRelocateFlag = false;
            this.profile.ReasonToRelocate = '';
        }
    }
    onOfferInHand(isChecked: any) {
        if (isChecked === false) {
            this.OfferInHand = true;
        } else {
            this.OfferInHand = false;
            this.profile.CandidateOtherDetails.OfferDetails = '';
        }
    }
    onAppliedEarlier(isChecked: any) {
        if (isChecked === false) {
            this.profile.CandidateOtherDetails.AppliedEarlier = true;
        } else {
            this.profile.CandidateOtherDetails.AppliedEarlier = false;
        }
        this.onSaveProfessionalDetails();
    }
    onVariableCTC(isChecked: any) {
        if (isChecked === false) {
            this.VariableCTC = true;
        } else {
            this.VariableCTC = false;
            this.profile.CandidateSalaryDetails.HowMuchVariable = 0;
        }
    }
    onTeamManagement(isChecked: any) {
        if (isChecked === false) {
            this.profile.CandidateTeamManagement.TeamMgmt = true;
        } else {
            this.profile.CandidateTeamManagement.TeamMgmt = false;
        }
        this.onSaveTeamManagementDetails();
    }
    onAllowance(isChecked: any) {
        if (isChecked === false) {
            this.AllowanceFlag = true;
        } else {
            this.AllowanceFlag = false;
            this.profile.CandidateSalaryDetails.AllowanceInHand = 0;
        }
    }
    onIncentive(isChecked: any) {
        if (isChecked === false) {
            this.IncentiveFlag = true;
        } else {
            this.IncentiveFlag = false;
            this.profile.CandidateSalaryDetails.IncentiveInHand = 0;
        }
    }
    onCurrent(isChecked: any) {
        if (isChecked === false) {
            this.EmployersInformation.ToDate = this.formatDate(new Date());
        } else {
            this.EmployersInformation.ToDate = ' ';
        }
    }
    //Format date in "yyyy-mm-dd" format
    formatDate(date: any) {
        var d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();
        if (month.length < 2) month = '0' + month;
        if (day.length < 2) day = '0' + day;

        return [year, month, day].join('-');
    }
    onFunctionalExp(isChecked: any) {
        if (isChecked === false) {
            this.FunctionalExp = true;
        } else {
            this.FunctionalExp = false;
            this.profile.CandidateSkills.AnyFunctionalExp = '';
        }
    }
    nextTabKeyPressed(e: any) {
        if (e.keyCode === 13) {
            this.nextTab();
        }
    }
    prevTabKeyPressed(e: any) {
        if (e.keyCode === 13) {
            this.previousTab();
        }
    }
    setFocus() {
        if ($('.nav-tabs > .active').andSelf('li').find('a')[0].id === 'btnQuick') {
            $('#txtFollowUpForQuick').focus();
        }
        if ($('.nav-tabs > .active').andSelf('li').find('a')[0].id === 'BtnPersonal') {
            $('#txtFirstName').focus();
        }
        if ($('.nav-tabs > .active').andSelf('li').find('a')[0].id === 'btnSkills') {
            $('#txtFolloUpForSkill').focus();
        }
        if ($('.nav-tabs > .active').andSelf('li').find('a')[0].id === 'btnProfessional') {
            $('#txtFolloupForProf').focus();
        }
        if ($('.nav-tabs > .active').andSelf('li').find('a')[0].id === 'btnSalary') {
            $('#txtFolloUpForSal').focus();
        }
    }
    nextTab() {
        $('.nav-tabs > .active').next('li').find('a').trigger('click');
        this.setFocus();
    }

    previousTab() {
        $('.nav-tabs > .active').prev('li').find('a').trigger('click');
        this.setFocus();
    }
    onPersonalInfoTabClick() {

        $('#txtFirstName').focus();

    }
    onSkillTabClick() {
        $('#txtFolloUpForSkill').focus();
    }
    onProfessionalInfoTabClick() {
        $('#txtFolloupForProf').focus();
    }
    onSalaryTabClick() {
        $('#txtFolloUpForSal').focus();
    }
    validate(type: string, number: string) {
        switch (type) {
            case 'Aadhar': if (number.match('^[0-9\-\+]{9,15}$') && number.length === 12) {
                this.IsExist();
            } else {
                this.profile.AadharCardNo = '';
                this.toastr.error('Enter valid Aadhaar Card number For Eg. 123456789012');
            }
                break;
            case 'Pan': if (number.match('[A-Za-z]{5}[0-9]{4}[A-Za-z]{1}')) {
                this.IsExist();
            } else {
                this.profile.PANNumber = '';
                this.toastr.error('Enter valid PAN number. For Eg. ABCDE1234F');
            }
                break;
            case 'Passport': if (number.match('[A-Za-z]{1}[0-9]{7}')) {
                this.IsExist();
            } else {
                this.profile.PassportNumber = '';
                this.toastr.error('Enter valid passport number. For Eg. A1234567');
            }
                break;
            case 'Email': if (number.match('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')) {
                this.IsExist();
            } else {
                this.profile.Email = '';
                this.toastr.error('Enter valid Email ID For Eg. abc@gmail.com');
            }
                break;
        }
    }
    /** Check is current information is already exist in database.*/
    IsExist() {
        this._myProfilesService.isExist(this.profile)
            .subscribe(
            (results: any) => {
                if (results.profileBankObjects.CandidateID.Value !== this.profile.CandidateID.Value) {
                    if (results.isExist) {
                        if (results.profileBankObjects !== null && results.profileBankObjects !== undefined) {
                            this.existedProfile = <any>results.profileBankObjects;
                            this.isExist = <any>results.isExist;
                            this.toastr.error('Profile already exist');
                        }
                    }
                } else {
                    this.isExist = false;
                    this.onSavePersonalDetails();
                }

            },
            error => this.toastr.error(<any>error));
    }
    /**Redirecting to candidate's all interview history page */
    getCandidateHistory(_candidateID: MasterData) {
        sessionStorage.setItem('CandidateIdForReturnPath', this.CandidateID.Value);
        sessionStorage.setItem('HistoryOfCandidate', JSON.stringify(_candidateID));
        sessionStorage.setItem('onReturnPath', '/App/ProfileBank/MyProfiles/Edit/');
        this._router.navigate(['/App/ProfileBank/MyProfiles/History']);
    }
    /** Delete Prfile will be available only to the Recruitment Head*/
    deleteCandidate(CandidateID: MasterData) {
        this._profileBankService.deleteProfile(CandidateID)
            .subscribe(
            (results: any) => {
                this.profile.Comments = results.Comments;
                this.profile.Status = results.Status;
                this._location.back();
            },
            error => this.toastr.error(<any>error));
    }
    /** Enable visa field  */
    onHaveVisa(isChecked: any) {
        if (isChecked === false) {
            this.haveVisa = true;
        } else {
            this.haveVisa = false;
            this.profile.CandidateOtherDetails.Visa = '';
        }
    }
    
}
