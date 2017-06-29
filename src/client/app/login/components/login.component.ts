import { Component } from '@angular/core';
import {AuthInfo} from '../models/AuthInfo';
import { LoginService } from '../../shared/services/login.service';
import { Router } from '@angular/router';

@Component({
    moduleId: module.id,
    selector: 'login-component',
    templateUrl: 'loginNewUITemplate.component.html',
    styleUrls: ['login.component.css']
})
export class LoginComponent {
    public errorMessage: string;
    public IsValidLoggedIn: boolean = false;
    public visible: boolean = false;
    private model: AuthInfo;
    private LoginFailed: boolean = false;
    constructor(private _loginService: LoginService, private _router: Router) {
        this.model = new AuthInfo('password', '', '');
    }
    doLogin(): void {
        this.IsValidLoggedIn = true;
        this.visible = true;
        this._loginService.authenticate(this.model)
            .subscribe(
            results => {
                this.getLoggedInUserPermission();
                this.getLoggedInUser();
                
            },
            error => {
                this.IsValidLoggedIn = false;
                this.visible = false;
                this.errorMessage = <any>error;
                this.LoginFailed = true;
            });
    }
    getLoggedInUserPermission(): void {
        this._loginService.getLoggedInUserPermission()
            .subscribe(
            results => {
                this.IsValidLoggedIn = false;
                this.visible = false;
                this._router.navigate(['/App']);
            },
            error => {
                this.IsValidLoggedIn = false;
                this.visible = false;
                this.errorMessage = <any>error;
            });
    }
    getLoggedInUser(): void {
        this._loginService.getCurrentLoggedInUser()
            .subscribe(
            error => {
                this.IsValidLoggedIn = false;
                this.visible = false;
                this.errorMessage = <any>error;
            });
    }
    closeAlert() {
        this.LoginFailed = false;
    }
}
