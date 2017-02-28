import { Component } from '@angular/core';
import { ContextMenuService } from '../../core/services/contextMenuService';
import { ProjectService } from "./../../core/services/projectService";

@Component({
    selector: 'app',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    providers: [ContextMenuService, ProjectService]
})
export class AppComponent {
}
