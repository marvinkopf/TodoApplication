import * as ng from "@angular/core";
import { TaskService } from "./../../core/services/taskService";
import { ProjectService } from "./../../core/services/projectService";
import { Task } from "./../../core/domain/task";
import { TaskListItemComponent } from "./../task-list-item/task-list-item.component";
import { Http, Headers, RequestOptions, Response } from "@angular/http";
import { ActivatedRoute } from '@angular/router';

@ng.Component({
  selector: "tasks",
  templateUrl: "./tasks.component.html",
  styleUrls: ["./tasks.component.css"],
  providers: [TaskService, ProjectService]
})
export class TasksComponent implements ng.OnInit, ng.OnDestroy {
  public newTask = "";
  public tasks: Task[] = new Array<Task>();
  public activeTask: Task;
  errorMessage: string;
  private sub: any;
  private projectId: string;
  public title: string;

  constructor(private projectService: ProjectService,
    private taskService: TaskService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.activeTask = null;
      this.projectId = params['project'];
      if (this.projectId === 'All')
        this.title = 'All';
      else
        this.projectService.getProject(+this.projectId).subscribe(
          project => this.title = project.title,
          error => this.title = "error"
        );
      this.getTasks(this.projectId);
    }, error => 1+1);
  }

  getTasks(projectId: any) {
    this.taskService.getTasks(projectId)
      .subscribe(
      tasks => this.tasks = tasks,
      error => this.errorMessage = <any>error);
  }

  select(task: Task) {
    this.activeTask = task;
  }

  addTask(event): void {
    event.preventDefault();

    if (!this.newTask) { return; }

    let task = new Task();
    task.title = this.newTask;
    task.projectId = "0";

    this.taskService.addTask(task)
      .subscribe(
      task =>
        this.taskService.getTasks(this.projectId)
          .subscribe(
          tasks => {
            this.tasks = tasks;
            this.activeTask = task;
          },
          error => this.errorMessage = <any>error),
      error => this.errorMessage = <any>error);

    this.newTask = "";
  }

  completeTask(task): void {
    this.taskService.completeTask(task)
      .subscribe(
      task =>
        this.taskService.getTasks(this.projectId)
          .subscribe(
          tasks => this.tasks = tasks,
          error => this.errorMessage = <any>error),
      error => this.errorMessage = <any>error);
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
          error => this.errorMessage = <any>error),
      error => this.errorMessage = <any>error);
  }

  putTask(task: Task): void {
    this.taskService.putTask(task)
      .subscribe(
      task =>
        this.taskService.getTasks(this.projectId)
          .subscribe(
          tasks => this.tasks = tasks,
          error => this.errorMessage = <any>error),
      error => this.errorMessage = <any>error);
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
