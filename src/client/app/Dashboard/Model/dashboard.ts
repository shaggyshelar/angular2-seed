import { MasterData } from  '../../shared/model/index';
import { RRFDetails } from '../../RRF/myRRF/models/rrfDetails';
import { Interview } from '../../recruitmentCycle/shared/model/interview';
import { AllCandidateProfiles } from  '../../profileBank/shared/model/myProfilesInfo';
import { Practice } from '../../master/model/masterModel';
export class DetailsRRF extends RRFDetails {
  public RRFDetail: MasterData = new MasterData();
}

export class CanidateInformation extends AllCandidateProfiles {
  /** Add new property here if required*/
}

export class InterviewInformation extends Interview {
  /** Add new property here if required*/
}

/* Dashboard filter */
export class DashboardFilters {
  AllorMy: string = 'All';
  TimeDuration: string = 'Year';
  CountOfList: number = 5;
}

export class DashboardReport {
  RRFCode:string;
  Dept:string;
  Interviewer:string;
  Recruiter:string;
  year:string;
}
/**
 * PiechartData
 */
export class PiechartData {
  title: string;
  value: string;
}
/**
 * GuageChartData
 */
export class GuageChartData {
  rrfCode: string;
  bands: Array<any>;
}
