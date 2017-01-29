import * as ng from "@angular/core";
import { Component, Input, Output, EventEmitter } from "@angular/core";
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

  myDatePickerOptions = {
    todayBtnTxt: 'Today',
    dateFormat: 'yyyy-mm-dd',
    firstDayOfWeek: 'mo',
    sunHighlight: true,
    height: '0px',
    width: '0px',
    inline: false,
    disableUntil: { year: 2016, month: 8, day: 10 },
    selectionTxtFontSize: '16px'
  };

  onDateChanged(event): void {
    this.task.title = event.formatted;
  }

  removeTask() {
    this.removeEvent.next(this.task);
  }

  textChanged() {
    this.taskChanged.next(this.task);
  }
}
