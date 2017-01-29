import { Http, Headers, RequestOptions, Response } from "@angular/http";
import { Injectable }     from "@angular/core";
import { Observable }     from "rxjs/Observable";
import { User } from "./../domain/user";
import { Project } from "./../domain/project";
import "rxjs/Rx";

@Injectable()
export class UserService {

    constructor(private http: Http) { }

    public getUserInfo(): Observable<User> {
        return this.http.get("api/user/UserInfo").map(res => res.json());
    }

    public getProjects(): Observable<Project[]> {
        return this.http.get("api/user/projects").map(res => res.json()).catch(this.handleError);
    }

    private handleError (error: any) {
        let errMsg = (error.message) ? error.message :
        error.status ? `${error.status} - ${error.statusText}` : "Server error";
        console.error(errMsg);
        return Observable.throw(errMsg);
    }

    public logout() {
        return this.http.post("Account/LogOff", null);
    }
}
