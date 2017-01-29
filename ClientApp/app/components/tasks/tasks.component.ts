import * as ng from "@angular/core";
import { TaskService } from "./../../core/services/taskService";
import { Task } from "./../../core/domain/task";
import { TaskListItemComponent } from "./../task-list-item/task-list-item.component";
import { Http, Headers, RequestOptions, Response } from "@angular/http";

@ng.Component({
  selector: "tasks",
  templateUrl: "./tasks.component.html",
  styleUrls: ["./tasks.component.css"],
  providers: [TaskService]
})
export class TasksComponent implements ng.OnInit {
  public newTask = "";
  public tasks: Task[] = new Array<Task>();
  public activeTask: Task;
  errorMessage: string;

  constructor(private taskService: TaskService, private http: Http) { }

  ngOnInit() {
    this.getAllTasks();
  }

  getAllTasks() {
    this.taskService.getAllTasks()
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
        this.taskService.getAllTasks()
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
        this.taskService.getAllTasks()
          .subscribe(
          tasks => this.tasks = tasks,
          error => this.errorMessage = <any>error),
      error => this.errorMessage = <any>error);
  }

  removeTask(task: Task): void {
    this.taskService.removeTask(task)
      .subscribe(
      task =>
        this.taskService.getAllTasks()
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
        this.taskService.getAllTasks()
          .subscribe(
          tasks => this.tasks = tasks,
          error => this.errorMessage = <any>error),
      error => this.errorMessage = <any>error);
  }
}
