import { Component, OnInit } from '@angular/core';
import { UserService } from "./../../core/services/userService";
import { User } from "./../../core/domain/user";
import { Project } from "./../../core/domain/project";

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

    constructor(private userService: UserService) { }

    ngOnInit() {
        this.getUserInfo();
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
