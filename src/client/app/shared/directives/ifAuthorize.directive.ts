import { Directive, ElementRef, HostListener, Input, Renderer, OnInit } from '@angular/core';
import { CommonService } from '../../shared/services/common.service';

@Directive({ selector: '[ifAuthorize]' })

export class IfAuthorizeDirective implements OnInit {
    @Input() ifAuthorize: string[];
    //@Input('ifAuthorize') authorizationPermission: string;
    private defaultDisplayStyle: string = 'none';
    private _element: HTMLElement;

    constructor(_element: ElementRef,
        private commonService: CommonService,
        private renderer: Renderer
    ) {
        console.log('I am @ authorization');
        this._element = _element.nativeElement;
        renderer.setElementStyle(_element.nativeElement, 'backgroundColor', 'yellow');
    }


    ngOnInit() {
        console.log('I am @ authorization INit');
        let userHasPermissions = false;
        let loggedInUserPermission = this.commonService.getLoggedInUserPermission();
        if (loggedInUserPermission.length > 0) {
            for (var i = 0; i < this.ifAuthorize.length; i++) {
                if (loggedInUserPermission.indexOf(this.ifAuthorize[i]) === -1) {
                    userHasPermissions = false;
                } else {
                    userHasPermissions = true;
                }
            }
            if (!userHasPermissions) {
                this._element.style.display = this.defaultDisplayStyle;
            }
        } else {
            this._element.style.display = this.defaultDisplayStyle;
        }
    }
}
