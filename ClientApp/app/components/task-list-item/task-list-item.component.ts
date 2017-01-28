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
  removeEvent = new EventEmitter();

  @Output()
  completeEvent = new EventEmitter();

  @Output()
  taskTitleChangedEvent = new EventEmitter();

  cachedTaskTitle: string;

  startEditTaskTitle() {
    this.cachedTaskTitle = this.task.title;
  }

  taskTitleUpdatedEnter(taskDom) {
    taskDom.blur();
    this.taskTitleUpdated();
  }

  taskTitleUpdated() {
    if (this.task.title === "") {
      this.task.title = this.cachedTaskTitle;
      return;
    }

    if (this.task.title === this.cachedTaskTitle) 
      return;

    this.taskTitleChangedEvent.next(this.task);
  }

  removeTask() {
    this.removeEvent.next(this.task);
  }

  completeTask() {
    this.completeEvent.next(this.task);
  }
}