import {Injectable} from '@angular/core';
import {Subject} from 'rxjs/Rx';

@Injectable()
export class ContextMenuService{

    public show:Subject<{event:MouseEvent,obj:any[],project:any}> = new Subject<{event:MouseEvent,obj:any[],project:any}>();
}