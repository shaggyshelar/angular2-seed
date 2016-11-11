import {Component} from '@angular/core';
import { ROUTER_DIRECTIVES, Router, OnActivate, RouteSegment} from '@angular/router';
import { CandidateProfile, ResumeMeta, AddCandidateResponse, AllCandidateProfiles, CareerProfile, MailDetails } from '../../shared/model/myProfilesInfo';
import { AdvanceSearchService } from '../services/advanceSearch.service';
import { MastersService } from '../../../shared/services/masters.service';
import * as  _ from 'lodash';
import { CollapseDirective, TOOLTIP_DIRECTIVES} from 'ng2-bootstrap';
import { MasterData, SortingMasterData, GrdOptions, ResponseFromAPI } from  '../../../shared/model/index';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { APIResult } from  '../../../shared/constantValue/index';
import { ProfileBankService} from  '../../shared/services/profileBank.service';
//import {MyProfilesFilterPipe} from './myProfiles.component.pipe';
import { Headers, Http } from '@angular/http';
import { Candidate } from '../../shared/model/RRF';
import { ProfileBankPipe }from '../../shared/filter/profileBank.pipe';
import {IfAuthorizeDirective} from '../../../shared/directives/ifAuthorize.directive';
import { DetailProfileComponent } from '../../shared/component/detailProfile.component';

@Component({
    moduleId: module.id,
    selector: 'rrf-myprofiles-list',
    templateUrl: 'advanceSearchInSidebar.component.html',
    directives: [DetailProfileComponent, ROUTER_DIRECTIVES, CollapseDirective, TOOLTIP_DIRECTIVES, IfAuthorizeDirective],
    styleUrls: ['../../myProfiles/components/myProfiles.component.css'],
    pipes: [ProfileBankPipe],
    providers:[AdvanceSearchService,ProfileBankService,MastersService,ToastsManager]
})

export class AdvanceSearchInSidebarComponent implements OnActivate {
   

    constructor(private _advanceSearchService: AdvanceSearchService,
        private http: Http,
        private _router: Router,
        private _profileBankService: ProfileBankService,
        public toastr: ToastsManager,
        private _masterService: MastersService) {
        
    }

    routerOnActivate(segment: RouteSegment) {
        console.log("hi");
    }
   
}


