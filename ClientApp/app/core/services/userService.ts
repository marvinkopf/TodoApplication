import { Http, Headers, RequestOptions, Response } from "@angular/http";
import { Injectable }     from "@angular/core";
import { Observable }     from "rxjs/Observable";
import { User } from "./../domain/user";
import "rxjs/Rx";

@Injectable()
export class UserService {

    constructor(private http: Http) { }

    public getUserInfo(): Observable<User> {
        return this.http.get("api/user/UserInfo").map(res => res.json());
    }

    public logout() {
        return this.http.post("Account/LogOff", null);
    }
}
