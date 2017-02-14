import * as ng from "@angular/core";
import {Component, Input, Output, EventEmitter} from "@angular/core";
import { Task } from "./../../core/domain/task";

@ng.Component({
  selector: "task-list-item",
  styleUrls: ["./task-list-item.component.css"],
  templateUrl: "./task-list-item.component.html"
})

export class TaskListItemComponent {
  @Input()
  task: Task;

  @Output()
  completeEvent = new EventEmitter();

  @Output()
  taskChangedEvent = new EventEmitter();

  cachedTaskTitle: string;
  editable = false;

  startEditTaskTitle(taskDom) {
    this.cachedTaskTitle = this.task.title;
    this.editable = true;
    taskDom.select();
  }

  taskTitleUpdated() {
    this.editable = false;
    if (this.task.title === "") {
      this.task.title = this.cachedTaskTitle;
      return;
    }

    if (this.task.title === this.cachedTaskTitle)
      return;

    this.taskChangedEvent.next(this.task);
  }
  
  completeTask() {
    this.task.isCompleted = !this.task.isCompleted;
    this.taskChangedEvent.next(this.task);
  }
}