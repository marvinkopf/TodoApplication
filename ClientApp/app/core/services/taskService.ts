import { Http, Headers, RequestOptions, Response } from "@angular/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { Task } from "./../domain/task";
import "rxjs/Rx";

@Injectable()
export class TaskService {

    constructor(private http: Http) { }

    public addTask(task: Task): Observable<Task> {
        let body = JSON.stringify(task);
        let headers = new Headers({
            "Content-Type": "application/json; charset=utf-8",
            "Accept": "application/json"
        });
        let options = new RequestOptions({ headers: headers });

        return this.http.post("api/task", body, options)
            .map(res => res.json())
            .catch(this.handleError);
    }

    public getTasks(): Observable<Task[]>;
    public getTasks(projectId: string): Observable<Task[]>;
    public getTasks(projectId: string, date: string): Observable<Task[]>;
    public getTasks(projectId: string, date: string, completed: boolean): Observable<Task[]>;
    public getTasks(projectId: string, date: string, completed: boolean, deleted: boolean): Observable<Task[]>;

    public getTasks(projectId?: string, date?: string, completed?: boolean, deleted?: boolean): Observable<Task[]> {
        let path: string = "api";

        if (projectId != undefined)
            path += "/project/" + projectId;

        path += "/tasks";

        if (date != undefined || completed != undefined || deleted != undefined)
            path += "?";

        if (date != undefined)
            path += "date=" + date;

        if (completed != undefined) {
            if (!path.endsWith("?"))
                path += "&";
            path += "completed=" + completed;
        }

        if (deleted != undefined) {
            if (!path.endsWith("?"))
                path += "&";
            path += "deleted=" + deleted;
        }

        return this.http.get(path)
            .map(res => res.json())
            .catch(this.handleError);
    }

    public removeTask(task: Task) {
        task.isDeleted = true;
        let body = JSON.stringify(task);
        let headers = new Headers({
            "Content-Type": "application/json; charset=utf-8",
            "Accept": "application/json"
        });
        let options = new RequestOptions({ headers: headers });
        return this.http.put("api/task/" + task.taskItemId, body, options)
            .map(res => res.json())
            .catch(this.handleError);
    }

    public putTask(task: Task) {
        let body = JSON.stringify(task);
        let headers = new Headers({
            "Content-Type": "application/json; charset=utf-8",
            "Accept": "application/json"
        });
        let options = new RequestOptions({ headers: headers });
        return this.http.put("api/task/" + task.taskItemId, body, options)
            .map(res => res.json())
            .catch(this.handleError);
    }

    private handleError(error: any) {
        let errMsg = (error.message) ? error.message :
            error.status ? `${error.status} - ${error.statusText}` : "Server error";
        console.error(errMsg);
        return Observable.throw(errMsg);
    }
}
