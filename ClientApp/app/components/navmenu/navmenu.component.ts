import { Component, OnInit } from '@angular/core';
import { UserService } from "./../../core/services/userService";
import { User } from "./../../core/domain/user";

@Component({
    selector: 'nav-menu',
    templateUrl: './navmenu.component.html',
    styleUrls: ['./navmenu.component.css'],
    providers: [UserService]
})
export class NavMenuComponent implements OnInit {
    errorMessage: String;
    public userName: String;

    constructor(private userService: UserService) { }

    ngOnInit() {
        this.getUserInfo();
    }

    logout() {
        this.userService.logout().subscribe();
    }

    getUserInfo() {
        this.userService.getUserInfo().subscribe(
        user => this.userName = user.userName,
        error => this.errorMessage = <any>error);
    }
}
