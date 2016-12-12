import {Injectable} from '@angular/core';
import { MasterData } from  '../model/index';
@Injectable()
export class CommonService {
    userPermissions: Array<string> = [];
    /** */
    getLoggedInUserPermission() {
        this.userPermissions = JSON.parse(sessionStorage.getItem('UserPermissions'));
        return this.userPermissions;
    }
    /** */
    setLoggedInUserPermission(permissions: Array<string>) {
        //this.userPermissions = permissions;
        sessionStorage.setItem('UserPermissions', JSON.stringify(permissions));
    }
    /** Stores logged-in user object into *<currentUser>* session variable.*/
    setLoggedInUserName(currentUser: Array<string>) {
        sessionStorage.setItem('currentUser', JSON.stringify(currentUser));
    }
    /** Rertives stored logged-in user object from *<currentUser>* session variable.
     *  - return data in MasterData object
    */
    getLoggedInUser(): MasterData {
        var _currentLoggedInUser: MasterData = this.getSessionOf<MasterData>('currentUser', true);
        return _currentLoggedInUser;
    }
    /** Rertives stored logged-in user object from *<currentUser>* session variable.
     *  - return current logged in user name in 'string'
    */
    getLoggedInUserFullName() {
        var _currentLoggedInUser = this.getLoggedInUser();
        return _currentLoggedInUser ? _currentLoggedInUser.Value : '';
    }
    /**Generic function to return data stored in session.
     * - This function retruns data in requested data type
     * - ***Requred to provide variable Name in exact case which is stored in session 
     */
    getSessionOf<T>(variableName: string, isJson: Boolean): T {
        var _requestedIef = sessionStorage.getItem(variableName);
        //var response: any;
        if (_requestedIef !== null) {
            var response = isJson ? JSON.parse(_requestedIef) : _requestedIef;
            //sessionStorage.setItem(variableName, '');
        } else {
            /** If no information found from Session then it will redirected to existing page */
            console.warn('Somthing went wrong while working with session var <' + variableName + '>..!');
        }
        return response;
    }
}
