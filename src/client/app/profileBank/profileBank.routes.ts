import { Route } from '@angular/router';

import { ProfileEsplHistoryListComponent } from './profilesEsplHistory/index';
import { ProfileBankAssignRRFComponent } from './shared/index';
import { AllProfilesViewComponent, AllProfilesListComponent, TransferOwnershipComponent } from './AllProfiles/index';
import {
    MyProfilesListComponent,
    MyProfilesAddComponent,
    MyProfilesViewComponent
} from './myProfiles/index';
import {
    BlackListedProfilesListComponent,
    BlackListedProfilesAddComponent,
    BlackListedProfilesViewComponent
} from './blackListedProfiles/index';
import {
    CompanyProfilesListComponent,
    CompanyProfilesAddComponent,
    CompanyProfilesViewComponent
} from './companyProfiles/index';
import {
    RecentProfilesListComponent,
    RecentProfilesAddComponent,
    RecentProfilesViewComponent
} from './recentProfiles/index';
import {
    //ProfileBankAssignRRFComponent,
    DetailProfileComponent
} from './shared/index';
import { IncompleteProfilesListComponent } from './incompleteProfiles/index';
import { AdvanceSearchInSidebarComponent } from './advanceSearch/index';

export const ProfileBankRoutes: Route[] = [
    { path: 'ProfileBank', component: MyProfilesListComponent },
    /**My Profiles */
    { path: 'ProfileBank/MyProfiles', component: MyProfilesListComponent },
    { path: 'MyProfiles/Edit/:id', component: MyProfilesAddComponent },
    { path: 'MyProfiles/View/:id', component: MyProfilesViewComponent },
    { path: 'MyProfiles/Assign', component: ProfileBankAssignRRFComponent },
    { path: 'MyProfiles/History', component: ProfileEsplHistoryListComponent },

    // /**All Profiles */
    //{ path: 'AllProfiles', component: AllProfilesListComponent },
    // { path: 'ProfileBank/Edit/:id', component: MyProfilesAddComponent },
    // { path: 'ProfileBank/View/:id', component: AllProfilesViewComponent },
    // { path: 'ProfileBank/Transfer', component: TransferOwnershipComponent },
    // { path: 'ProfileBank/History', component: ProfileEsplHistoryListComponent },

    // /**Blacklisted Profiles */
    { path: 'ProfileBank/BlackListedProfiles', component: BlackListedProfilesListComponent },
    { path: 'BlackListedProfiles/Edit/:id', component: MyProfilesAddComponent },
    { path: 'BlackListedProfiles/View/:id', component: MyProfilesViewComponent },
    { path: 'BlackListedProfiles/History', component: ProfileEsplHistoryListComponent },

    // /**Company Profiles */
    { path: 'ProfileBank/CompanyProfiles', component: CompanyProfilesListComponent },
    { path: 'CompanyProfiles/Edit/:id', component: CompanyProfilesAddComponent },
    { path: 'CompanyProfiles/View/:id', component: CompanyProfilesViewComponent },
    //{ path: 'CompanyProfiles/Transfer', component: TransferOwnershipComponent },
    { path: 'CompanyProfiles/Assign', component: ProfileBankAssignRRFComponent },
    { path: 'CompanyProfiles/History', component: ProfileEsplHistoryListComponent },

    // /**Incomplete Profiles */
    { path: 'ProfileBank/IncompleteProfiles', component: IncompleteProfilesListComponent },
    { path: 'IncompleteProfiles/Edit/:id', component: MyProfilesAddComponent },

    // /**Profiles Espl Histoy */
    // /**NA */

    // /**Recent Profiles */
    // { path: '/', component: RecentProfilesListComponent },
    // { path: '/Edit/:id', component: RecentProfilesAddComponent },
    // { path: '/View/:id', component: RecentProfilesViewComponent },
    // { path: '/History', component: ProfileEsplHistoryListComponent },

    /**Adavance search */
    { path: 'ProfileBank/AdvanceSearch', component: AdvanceSearchInSidebarComponent }
];
