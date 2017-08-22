import { MasterData, GrdOptions } from  '../../shared/model/index';


export class CandidateCompanyObject {
    public CandidateID: MasterData = new MasterData();
    public Designation: string;
    public Salary: string;
    public Company: string;
    public ID:string;
}

export class SkypeMaster{
    public Value:string;
    public Password:string;
    public Id:string;
}