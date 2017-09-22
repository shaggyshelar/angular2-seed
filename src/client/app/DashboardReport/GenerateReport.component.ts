import { Component, Input, Output, EventEmitter} from '@angular/core';
import { OnActivate,Router } from '@angular/router';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { DashboardReport } from '../Dashboard/Model/dashboard';
import { Practice, MyMasterDataService } from '../master/index';
import { TOOLTIP_DIRECTIVES } from 'ng2-bootstrap';
// import { Ng2TableModule } from 'ng2-table/ng2-table';
declare let jsPDF:any;
@Component({
  moduleId: module.id,
  selector: 'report-component',
  templateUrl: 'report.component.html',
  directives: [TOOLTIP_DIRECTIVES],
  styleUrls: ['../Dashboard/component/commonDashboard.component.css'],
  providers: [ToastsManager,MyMasterDataService]
})

export class DashboardReportComponent implements OnActivate {
  @Input() recordNo: number;
  @Input() DataCollection: DashboardReport[];
  practiceData:Array<Practice> = new Array<Practice>();
  specialElementHandlers:any;
  //public columns : any = [];
  public Year : any = [{'Value':'2015'},{'Value':'2016'},{'Value':'2017'},{'Value':'2018'}];
  constructor(public toastr: ToastsManager,
  private _MyMasterDataService: MyMasterDataService,
  private _router:Router) {
this.getPracticeData();
    }
//   @Output() functionUpdate: EventEmitter<Array<DashboardReport>> = new EventEmitter<Array<DashboardReport>>();
//   @Input() isDisabled: boolean = false;
 routerOnActivate() {
    /** */
    this.getPracticeData();
  }
 convertToPDF() {
    var doc = new jsPDF('p', 'pt');
    var col =  [{title: 'RRF Code', dataKey: 'RRFCode'},
    {title: 'Department', dataKey: 'Dept'},
    {title: 'Interviewer', dataKey: 'Interviewer'},
    {title: 'Recruiter', dataKey: 'Recruiter'},
    {title: 'Year', dataKey: 'year'}];
    var rows = this.DataCollection;
    doc.autoTable(col, rows);
    doc.save('Report.pdf');
  }

fnExcelReport() {
    var tab_text = '<html xmlns:x="urn:schemas-microsoft-com:office:excel">';
    tab_text = tab_text + '<head><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet>';
    tab_text = tab_text + '<x:Name>Report Sheet</x:Name>';
    tab_text = tab_text + '<x:WorksheetOptions><x:Panes></x:Panes></x:WorksheetOptions></x:ExcelWorksheet>';
    tab_text = tab_text + '</x:ExcelWorksheets></x:ExcelWorkbook></xml></head><body>';
    tab_text = tab_text + "<table border='1px'>";
    tab_text = tab_text + $('#myTable').html();
    tab_text = tab_text + '</table></body></html>';
    var data_type = 'data:application/vnd.ms-excel';
    var ua = window.navigator.userAgent;
    var msie = ua.indexOf("MSIE ");
    if (msie > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./)) {
        if (window.navigator.msSaveBlob) {
            var blob = new Blob([tab_text], {
                type: "application/csv;charset=utf-8;"
            });
            navigator.msSaveBlob(blob, 'Report.xls');
        }
    } else {
        $('#test').attr('href', data_type + ', ' + encodeURIComponent(tab_text));
        $('#test').attr('download', 'Report.xls');
    }
}
    getPracticeData() {
    this._MyMasterDataService.getPracticeData()
      .subscribe(
      (results: any) => {
        if (results !== null && results.length > 0) {
          this.practiceData = results;
        }
      },
      error => {
        this.toastr.error(<any>error);
      });
  }
  onSelectPractice(practice:any) {
    console.log(practice);
  }
  onSelectYear(year:any) {
    console.log(year);
  }
}
