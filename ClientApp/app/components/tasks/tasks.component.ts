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
  selector: "tasks",
  templateUrl: "./tasks.component.html",
  styleUrls: ["./tasks.component.css"],
  providers: [TaskService, ProjectService]
})
export class TasksComponent implements ng.OnInit, ng.OnDestroy {
  newTaskTitle: string = "";
  tasks: Task[] = new Array<Task>();
  activeTask: Task;
  title: string;

  // Null for 'all' tasks
  projectId: string;

  // How tasks are retrieved, different implementations for different "subtypes" of this component
  getTasksPointer: (projectId: any) => void;

  // Cache the params observable to unsubscribe on destroy
  sub: any;

  constructor(private projectService: ProjectService,
    private taskService: TaskService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.activeTask = null;
      this.projectId = params['project'];

      // Determine if this is a specific list, or just plain project
      if (this.projectId.toLowerCase() === 'all') {
        this.title = 'All';
        this.projectId = null;
        this.getTasksPointer = (projectId) => this.taskService.getTasks(projectId)
          .subscribe(tasks => this.tasks = tasks, error => console.log(error));
      }
      else if (this.projectId.toLowerCase() === 'today') {
        this.title = 'Today';
        this.projectId = null;

        this.getTasksPointer = (projectId) => this.taskService.getTasks(this.projectId, new Date().toISOString())
          .subscribe(tasks => this.tasks = tasks, error => console.log(error));
      }
      else if (this.projectId.toLowerCase() === 'week') {
        this.title = 'Week';
        this.projectId = null;

        this.getTasksPointer = (projectId) => {
          for (let i = 0; i < 7; i++) {
            let today = new Date();
            today.setDate(today.getDate() + i);

            this.tasks = [];

            this.taskService.getTasks(this.projectId, today.toISOString())
              .subscribe(tasks => this.tasks = this.tasks.concat(tasks), error => console.log(error));
          }
        }
      }
      else { // Plain project
        this.projectService.getProject(+this.projectId).subscribe(
          project => this.title = project.title,
          error => console.log(error)
        );

        this.getTasksPointer = (projectId) => this.taskService.getTasks(projectId)
          .subscribe(tasks => this.tasks = tasks, error => console.log(error));
      }

      this.getTasks(this.projectId);
    },
      error => console.log(error));
  }

  getTasks(projectId: any) {
    this.getTasksPointer(this.projectId);
  }

  select(task: Task) {
    this.activeTask = task;
  }

  addTask(event): void {
    event.preventDefault();

    if (!this.newTaskTitle) { return; }

    let task = new Task();
    task.title = this.newTaskTitle;

    if (this.projectId == null)
      task.projectId = "0";
    else
      task.projectId = this.projectId;

    this.taskService.addTask(task)
      .subscribe(
      task => {
        this.getTasks(this.projectId);
        this.activeTask = task;
      },
      error => console.log(error));

    this.newTaskTitle = "";
  }

  removeTask(task: Task): void {
    this.taskService.removeTask(task)
      .subscribe(
      task =>
        this.taskService.getTasks(this.projectId)
          .subscribe(
          tasks => {
            this.tasks = tasks;
            this.activeTask = null;
          },
          error => console.log(error)),
      error => console.log(error));
  }

  putTask(task: Task): void {
    this.taskService.putTask(task)
      .subscribe(
      task =>
        this.taskService.getTasks(this.projectId)
          .subscribe(
          tasks => {
            this.tasks = tasks;

            if ((this.projectId != null && this.projectId != this.activeTask.projectId))
              this.activeTask = null;
          },
          error => console.log(error)),
      error => console.log(error));
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
