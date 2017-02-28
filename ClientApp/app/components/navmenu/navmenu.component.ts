import { Component, OnInit } from '@angular/core';
import { UserService } from "./../../core/services/userService";
import { User } from "./../../core/domain/user";
import { Project } from "./../../core/domain/project";
import { Subject } from 'rxjs/Rx';
import { ProjectService } from "./../../core/services/projectService";

@Component({
    selector: 'nav-menu',
    templateUrl: './navmenu.component.html',
    styleUrls: ['./navmenu.component.css'],
    providers: [UserService]
})
export class NavMenuComponent implements OnInit {
    errorMessage: String;
    public userName: String;
    public projects: Project[];
    projectLinks = [
        { title: 'Delete', subject: new Subject() }
    ];

    constructor(private userService: UserService, private projectService: ProjectService) { }

    ngOnInit() {
        this.getUserInfo();
        this.projectLinks[0].subject.subscribe(val => {
            this.projectService.removeProject((<{ link, project }>val).project).subscribe(proj =>
                this.userService.getProjects().subscribe(
                    projects => this.projects = projects,
                    error => this.errorMessage = <any>error));
        });
    }

    logout() {
        this.userService.logout().subscribe(() => window.location.replace('/'));
    }

    getUserInfo() {
        this.userService.getUserInfo().subscribe(
            user => this.userName = user.userName,
            error => this.errorMessage = <any>error);

        this.userService.getProjects().subscribe(
            projects => this.projects = projects,
            error => this.errorMessage = <any>error);
    }

    refresh(): void {
        this.getUserInfo();
    }
}
