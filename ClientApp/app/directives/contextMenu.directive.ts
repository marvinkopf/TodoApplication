import * as ng from '@angular/core';
import { ContextMenuService } from '../core/services/contextMenuService';

@ng.Directive({
  selector: '[context-menu]',
  host: { '(contextmenu)': 'rightClicked($event)' }
})
export class ContextMenuDirective {
  @ng.Input('context-menu') links;

  @ng.Input('project') project;

  constructor(private _contextMenuService: ContextMenuService) {
  }

  rightClicked(event: MouseEvent) {
    this._contextMenuService.show.next({ event: event, obj: this.links, project: this.project });
    event.preventDefault(); // to prevent the browser contextmenu
  }
}