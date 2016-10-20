import { Directive, ElementRef, HostListener, Input, Renderer, OnInit } from '@angular/core';
import { CommonService } from '../../shared/services/common.service';

@Directive({ selector: '[ifAuthorize]' })

export class IfAuthorizeDirective implements OnInit {
    @Input() ifAuthorize: string[];
    @Input('ifAuthorize') authorizationPermission: string;
    private defaultDisplayStyle: string = 'none';
    private displayStyleBlock: string = 'block';
    private displayPropery: string = 'display';

    constructor(private _element: ElementRef, private commonService: CommonService, private renderer: Renderer) {
        this.setElementStyle(this.displayPropery, this.defaultDisplayStyle);
    }

    setElementStyle(styleProperty: string, value: string) {
        this.renderer.setElementStyle(this._element.nativeElement, styleProperty, value);
    }

    ngOnInit() {
        let userHasPermissions = false;
        let loggedInUserPermission = this.commonService.getLoggedInUserPermission();
        if (loggedInUserPermission.length > 0) {
            for (var i = 0; i < this.authorizationPermission.length; i++) {
                if (loggedInUserPermission.indexOf(this.authorizationPermission[i]) === -1) {
                    userHasPermissions = false;
                } else {
                    userHasPermissions = true;
                }
            }
            if (userHasPermissions) {
                this.setElementStyle(this.displayPropery, this.displayStyleBlock);
            }
        } else {
            this.setElementStyle(this.displayPropery, this.defaultDisplayStyle);
        }
    }
}
