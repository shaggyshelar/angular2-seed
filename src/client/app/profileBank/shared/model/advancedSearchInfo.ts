import { MasterData, GrdOptions } from  '../../../shared/model/index';

export class AllCandidateProfiles {
  public GrdOperations = new GrdOptions();
}
export class AllCandidateAdvancedSearch {
  public candidateAdvancedSearch:Array<AdvancedSearch> = new Array<AdvancedSearch>();
  public GrdOperations = new GrdOptions();
}
export class AdvancedSearch {
  public CandidateMasterDetails = new CandidateMaster();
  public CandidateSkillsDetails = new Skills();
  public CandidateOtherDetails = new OtherDetails();
  public CandidateSalaryDetails = new SalaryDetails();
  public CandidateQualification = new Qualification();
  public CandidateCareerDetails = new CareerProfile();
}

export class Qualification {
  public Degree: string;
}

export class TeamManagement {
  //properties of Candidate Team Management
  public TeamMgmt: any;
  public CandidateID: MasterData = new MasterData();
  public TeamHandlingExperience: string;
  public NoofTeamMembers: number;
  public TeamMembersDesignations: string;
  public TeamHandlingChallenges: string;
  public CommentsUpdated: boolean;
  public FollowUpComments: string;
}
export class MailDetails {
  //properties of candidate Mail Details
  public CC: string;
  public Subject: string;
  public Body: string;
  public Status: string;
  public To: string;
}
export class CareerProfile {
  //properties of Candidate Career Profile
  public Company: string;
  public IsCurrent: string;
  public Designation: string;

}

export class Skills {
  public Skills: string;
}

export class SalaryDetails {
  public MinExpectedSalary: string;
  public MaxExpectedSalary: string;
}

export class OtherDetails {
  public Visa: string;
  public MinNoticePeriod: string;
  public MaxNoticePeriod: string;

}

export class CandidateMaster {
  public MinTotalExperience : string;
  public MaxTotalExperience: string;
  public MinRelevantExperience: string;
  public MaxRelevantExperience: string;
  public CurrentLocation: string;
}
