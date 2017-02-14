import * as ng from "@angular/core";
import { TaskService } from "./../../core/services/taskService";
import { ProjectService } from "./../../core/services/projectService";
import { Task } from "./../../core/domain/task";
import { TaskListItemComponent } from "./../task-list-item/task-list-item.component";
import { Http, Headers, RequestOptions, Response } from "@angular/http";
import { ActivatedRoute } from '@angular/router';
import { Component, Input, Output, EventEmitter } from "@angular/core";
import { Project } from "./../../core/domain/project";

@ng.Component({
  selector: "completed-tasks",
  templateUrl: "./completed-tasks.component.html",
  styleUrls: ["./completed-tasks.component.css"],
  providers: [TaskService, ProjectService]
})
export class CompletedTasksComponent implements ng.OnInit {
  public newTask = "";
  public tasks: Task[] = new Array<Task>();
  public activeTask: Task = null;
  errorMessage: string;
  private projectId: string;

  constructor(private projectService: ProjectService,
    private taskService: TaskService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.projectId = 'all';
    this.getTasks(this.projectId);
  }

  getTasks(projectId: any) {
    this.taskService.getCompletedTasks()
      .subscribe(
      tasks => this.tasks = tasks,
      error => this.errorMessage = <any>error);
  }

  select(task: Task) {
    this.activeTask = task;
  }

  completeTask(task): void {
  }

  removeTask(task: Task): void {
    this.taskService.removeTask(task)
      .subscribe(
      task =>
        this.getTasks(this.projectId),
      error => this.errorMessage = <any>error);
  }

  putTask(task: Task): void {
    this.taskService.putTask(task)
      .subscribe(
      task => {
        this.getTasks(this.projectId);

        if (this.projectId.toLowerCase() != "all" && this.projectId != this.activeTask.projectId)
          this.activeTask = null;
      },
      error => this.errorMessage = <any>error);
  }
}
