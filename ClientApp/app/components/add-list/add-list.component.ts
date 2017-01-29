import {Component, Input, Output, EventEmitter} from "@angular/core";
import { ProjectService } from "./../../core/services/projectService";
import { Project } from "./../../core/domain/project";

declare var jQuery:any;

@Component({
    selector: 'add-list',
    templateUrl: './add-list.component.html',
    styleUrls: ['./add-list.component.css'],
    providers: [ProjectService]
})

export class AddListComponent {
    @Output()
    closeEvent = new EventEmitter();

    constructor(private projectService: ProjectService) { }

    public newProject: string;

    addProject(): void {
        if (!this.newProject) { return; }

        let project = new Project();
        project.title = this.newProject;

        this.projectService.addProject(project)
            .subscribe();

        this.newProject = "";
        this.closeEvent.next();
    }

    close() {
        this.newProject = "";
    }
}
