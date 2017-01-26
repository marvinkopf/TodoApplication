import * as ng from "@angular/core";
import {Component, Input, Output, EventEmitter} from "@angular/core";
import { Task } from "./../../core/domain/task";

@ng.Component({
  selector: "task-content",
  templateUrl: "./task-content.component.html"
})

export class TaskContentComponent {
  @Input()
  task: Task;
}
