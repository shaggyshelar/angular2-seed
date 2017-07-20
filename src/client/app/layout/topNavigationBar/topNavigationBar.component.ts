import {Component, OnInit, OnDestroy, EventEmitter} from '@angular/core';
import { Router, ROUTER_DIRECTIVES } from '@angular/router';
import { LoginService } from '../../shared/services/login.service';
//import { ProfileBankService } from '../../profilebank/shared/services/profileBank.service';
import { ProfileBankService } from '../../profileBank/shared/services/profileBank.service';
import { MasterData,festival } from  '../../shared/model/index';
import { CommonService } from  '../../shared/index';

@Component({
    moduleId: module.id,
    selector: 'top-navigation-bar',
    templateUrl: 'topNavigationBar.component.html',
    directives: [ROUTER_DIRECTIVES],
    providers: [ProfileBankService]
})

export class TopNavigationBarComponent implements OnInit, OnDestroy {
    
    festival:Array<festival> = new Array<festival>();
    isAuthenticated: boolean;
    currentUser = new MasterData();
    errorMessage: string;
    candidateID:string;
    HolidayList:any[] = [];
    subscription: EventEmitter<boolean> = new EventEmitter<boolean>();;
    constructor(private loginService: LoginService,
        private _router: Router,
        private _commonService: CommonService,
        private _profileBankService: ProfileBankService) {
        this.isAuthenticated = false;
    }

    ngOnInit() {
        this.isAuthenticated = this.loginService.isAuthenticated();
        this.subscription = this.loginService.getAuthEmitter()
            .subscribe((value: boolean) => { this.isAuthenticated = value; });
        this.getLoggedInUser();
        this.getHolidayData();
        if (!this.currentUser) {
            this.logout();
        }

    }
      
    getHolidayData(){
         this._profileBankService.getHolidayData()
            .subscribe(
            results => {
                this.festival = <any>results;
                     if(this.festival.length > 0){
            // this.festival.forEach(data, index=>{
            //    this.festival.Date
            // })
            // var test[] = [];
            this.festival.forEach((data, idx) => {
                data.Date = moment(data.Date).format('D-MMM-YYYY');
                this.festival[idx].Date = moment(data.Date).format('D-MMM-YYYY');
            });
        }
        
            },
            error => this.errorMessage = <any>error);
        // this.festival = [
        //     {
        //         title: 'Lakshmi Puja(Diwali) /Muharram',
        //         date: '10/01/2017'
        //     }
        //     , {
        //         title: 'Holi',
        //         date: '10/01/2017'
        //     }
        //     , {
        //         title: 'Dussehra(Vijaya Dashmi)',
        //         date: '10/01/2017'
        //     }
        //     , {
        //         title: 'Christmas',
        //         date: '10/01/2017'
        //     }
        //     , {
        //         title: 'Indian Independence day',
        //         date: '10/01/2017'
        //     }
        //      , {
        //         title: 'MakarSankranti',
        //         date: '10/01/2017'
        //     }
        //      , {
        //         title: 'New Year',
        //         date: '10/01/2017'
        //     }
        //      , {
        //         title: 'Gandhi jayanti',
        //         date: '10/01/2017'
        //     }
        //      , {
        //         title: 'Ganesh Visarjan',
        //         date: '10/01/2017'
        //     }
        // ];
    }
    getLoggedInUser() {
        this.currentUser = this._commonService.getLoggedInUser();
    }
    // This function search profiles acoording to search string
    advancedSearch(searchString: string) {
        this._router.navigate(['/App/ProfileBank/AdvanceSearch/' + searchString + 'searchString' + searchString]);
    }

    logout() {
        this.loginService.logout();
        window.location.replace('');
        //window.history.forward();
        this._router.navigate(['/Login']);
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

    pushNotificationSettings() {
        this._router.navigate(['/App/NotificationSetting']);
    }
}
