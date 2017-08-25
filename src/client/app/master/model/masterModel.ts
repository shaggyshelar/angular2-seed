import { MasterData, GrdOptions } from '../../shared/model/index';


export class CandidateCompanyObject {
  public CandidateID: MasterData = new MasterData();
  public Designation: string;
  public Salary: string;
  public Company: string;
  public ID: string;
}

export class VisaMaster {
  public Id: number;
  public Value: string;
}

export class SkypeMaster {
  public Value: string;
  public Password: string;
  public Id: string;
}

export class InterviewMode {
  public Id: string;
  public Value: string;
}

export class Practice {
  public Isenable:boolean;
  public Id: string;
  public Value: string;
}
export class IEFFunctions {
  public FunctionName: string;
  public DisplayRatings: string;
  public Id: string;
  public InterviewType: InterviewType = new InterviewType();
}
export class InterviewType {
  public Id: string;
  public Value: string;
  public Sequence: string;
}
export class RRFApprover {
  public Id: string;
  public Approver: Approver = new Approver();
  public Year: string;
  public DepartmentText: string;
  public Department: Practice = new Practice();
}
export class Approver {
  public Id: string;
  public Value: string;
}
export class ReasonsMaster {
  public ID: number;
  public Reason: string;
  public Category: string;
}

export class FeatureMaster {
  public Id: number;
  public Value: string;
}

export class RolesMaster {
  public Id: number;
  public SequenceNo: string;
  public RoleId: string;
  public Role: string;
}

export class RolesLookup extends MasterData { }
export class FeatureLookup extends MasterData { }

export class Permission {
  public Id: number;
  public Feature: FeatureLookup;
  public Role: RolesLookup;
  public Delete: Boolean;
  public Manage: Boolean;
  public Add: Boolean;
  public Read: Boolean;
  public Update: Boolean;
}
