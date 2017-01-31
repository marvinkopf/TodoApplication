import { Http, Headers, RequestOptions, Response } from "@angular/http";
import { Injectable }     from "@angular/core";
import { Observable }     from "rxjs/Observable";
import { Project } from "./../domain/project";
import "rxjs/Rx";

@Injectable()
export class ProjectService {

    constructor(private http: Http) { }

    public addProject(project: Project): Observable<Project> {
        let body = JSON.stringify(project);
        let headers = new Headers({
            "Content-Type": "application/json; charset=utf-8",
            "Accept": "application/json" });
        let options = new RequestOptions({ headers: headers });

        return this.http.post("api/project", body, options)
             .map(res => res.json())
             .catch(this.handleError);
    }

    public getProjects(): Observable<Project[]> {
        return this.http.get("api/user/projects").map(res => res.json()).catch(this.handleError);
    }

    public getProject(id: number): Observable<Project> {
        return this.http.get("api/project/" + id).map(res => res.json()).catch(this.handleError);
    }

    private handleError (error: any) {
        let errMsg = (error.message) ? error.message :
        error.status ? `${error.status} - ${error.statusText}` : "Server error";
        console.error(errMsg);
        return Observable.throw(errMsg);
    }
}
