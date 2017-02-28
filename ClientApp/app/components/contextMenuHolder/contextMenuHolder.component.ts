import * as ng from "@angular/core";
import { ContextMenuService } from '../../core/services/contextMenuService';

@ng.Component({
  selector: 'context-menu-holder',
  host: {
    '(document:click)': 'clickedOutside()'
  },
  templateUrl: './contextMenuHolder.component.html',
  styleUrls: ['./contextMenuHolder.component.css']
})
export class ContextMenuHolderComponent {
  links = [];
  project;
  isShown = false;
  private mouseLocation: { left: number, top: number } = { left: 0, top: 0 };
  constructor(private _contextMenuService: ContextMenuService) {
    _contextMenuService.show.subscribe(e => this.showMenu(e.event, e.obj, e.project));
  }
  // the css for the container div
  get locationCss() {
    return {
      'position': 'fixed',
      'display': this.isShown ? 'block' : 'none',
      left: this.mouseLocation.left + 'px',
      top: this.mouseLocation.top + 'px',
    };
  }
  clickedOutside() {
    this.isShown = false; // hide the menu
  }

  // show the menu and set the location of the mouse
  showMenu(event, links, project) {
    this.isShown = true;
    this.links = links;
    this.project = project;
    this.mouseLocation = {
      left: event.clientX,
      top: event.clientY
    }
  }
}