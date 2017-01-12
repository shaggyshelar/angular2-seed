import { Component} from '@angular/core';
import { Routes, ROUTER_DIRECTIVES } from '@angular/router';
import { BlackListedProfilesListComponent } from './blackListedProfilesList.component';
import {MyProfilesAddComponent} from '../../myProfiles/components/myProfilesAdd.component';
import { BlackListedProfilesService } from '../services/blacklistedProfiles.service';
import { BlackListedProfilesViewComponent} from './blackListedProfilesView.component';
import { MastersService } from '../../../shared/services/masters.service';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { ProfileBankService } from '../../shared/services/profileBank.service';
import { ProfileEsplHistoryListComponent } from '../../profilesEsplHistory/components/profileEsplHistoryList.component';
import { MyProfilesService } from '../../myProfiles/services/myProfiles.service';
@Component({
    selector: 'rrf-black-listed-profiles',
    template: ' <router-outlet></router-outlet>',
    directives: [ROUTER_DIRECTIVES],
    providers: [BlackListedProfilesService, MastersService, ToastsManager, ProfileBankService,MyProfilesService]
})

@Routes([
    { path: '/', component: BlackListedProfilesListComponent },
    { path: '/Edit/:id', component: MyProfilesAddComponent },
    { path: '/View/:id', component: BlackListedProfilesViewComponent },
    { path: '/History', component: ProfileEsplHistoryListComponent }
])
export class BlackListedProfilesComponent {
}
