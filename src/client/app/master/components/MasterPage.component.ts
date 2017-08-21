import { Component} from '@angular/core';
import { Routes, ROUTER_DIRECTIVES } from '@angular/router';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { SkypeMasterComponent} from './skypeMaster.component';
import { MyMasterDataService } from '../services/masterData.service';
@Component({
    selector: 'schedule-interview-delivery-component',
    template: '<router-outlet></router-outlet>',
    directives: [ROUTER_DIRECTIVES],
    providers: [ToastsManager, MyMasterDataService],
})

@Routes([
    { path: '/', component: SkypeMasterComponent }
])
export class MasterPageComponent {
}


