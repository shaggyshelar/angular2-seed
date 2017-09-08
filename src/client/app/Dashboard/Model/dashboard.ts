import { MasterData } from  '../../shared/model/index';
import { RRFDetails } from '../../RRF/myRRF/models/rrfDetails';

export class DetailsRRF extends RRFDetails {
    public RRFDetail: MasterData = new MasterData();
}

/* Dashboard filter */
export class DashboardFilters {
    AllorMy:string;
    TimeDuration:string;
    CountOfList:number;
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
