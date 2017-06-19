export class ResponseFromAPI {
    // StatusCode Success = 1
    // StatusCode Error = 2  
    public StatusCode: number;
    //Message shows "Sucess Message"
    public Message: '';
    //ReasonCode is different for different errors
    public ReasonCode: string;
    //ErrorMsg comes along with ReasonCode else it is empty
    public ErrorMsg: string;
}

export class MasterData {
    public Id: number;
    public Value: string;
}

export class GrdOptions {
    //public IDs: string="";
    public ButtonClicked: number = 0;
    /* ButtonClicked 
                 i. Initial - 0
                 ii.Next - 1
                 iii.Prev - (-1)
             PerPageCount = No of items shown per page
                 */
    public NextButton: boolean;
    public PreviousButton: boolean;
    public PerPageCount: number = 50;
    public OrderBy: string = 'Modified';
    public Order: string = 'desc';
    public NextPageUrl: string[] = [];
    public CamlString:string ;
    public NextPageID:number ;
    public PreviousPageID:number ;
    public PagingEvent:string ;
    public RRFFilters:RRFFilters=new RRFFilters();
}
export class RRFFilters {
        public RaisedBy : string ;
        public Practice  : string;
        public Priority  : string;
        public Status  : string;
        public Designation  : string;
}
export class SortingMasterData {
    public Id: string;
    public Value: string;
}
export class Resume {
    public ResumeName: string;
    public BinaryResume: string;
}
export class InHandOffer {
    public Company: string;
    public Designation: string;
    public Salary: string;
}
