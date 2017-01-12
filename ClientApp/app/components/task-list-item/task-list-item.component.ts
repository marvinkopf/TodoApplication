import * as ng from "@angular/core";
import {Component, Input, Output, EventEmitter} from "@angular/core";
import { Task } from "./../../core/domain/task";

@ng.Component({
  selector: "task-list-item",
  templateUrl: "./task-list-item.component.html"
})
export class TaskListItemComponent {
  @Input()
  task: Task;

  @Output()
  removeEvent = new EventEmitter();

  @Output()
  completeEvent = new EventEmitter();


  removeTask() {
    this.removeEvent.next(this.task);
  }

  completeTask() {
    this.completeEvent.next(this.task);
  }
}