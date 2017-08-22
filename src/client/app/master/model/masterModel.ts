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
    public Id: string;
    public Value: string;
}
export class IEFFunctions{
    public FunctionName: string;
    public DisplayRatings: string;
    public Id:string;
    public InterviewType:InterviewType=new InterviewType();
}
export class InterviewType {
    public Id: string;
    public Value: string;
    public Sequence: string;
}

export class ReasonsMaster {
    public Id: string;
    public Reason: string;
    public Categary: string;
}
