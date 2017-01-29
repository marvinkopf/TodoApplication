import * as ng from "@angular/core";
import {Component, Input, Output, EventEmitter} from "@angular/core";
import { Task } from "./../../core/domain/task";

@ng.Component({
  selector: "task-content",
  styleUrls: ["./task-content.component.css"],
  templateUrl: "./task-content.component.html"
})

export class TaskContentComponent {
  @Input()
  task: Task;

  @Output()
  removeEvent = new EventEmitter();

  @Output()
  taskChanged = new EventEmitter();

  removeTask() {
    this.removeEvent.next(this.task);
  }

  textChanged() {
    this.taskChanged.next(this.task);
  }
}
