import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UniversalModule } from 'angular2-universal';
import { AppComponent } from './components/app/app.component'
import { NavMenuComponent } from './components/navmenu/navmenu.component';
import { TasksComponent } from './components/tasks/tasks.component';
import { TaskListItemComponent } from './components/task-list-item/task-list-item.component';
import { TaskContentComponent } from './components/task-content/task-content.component';
import { FormsModule }   from '@angular/forms';
import { MyDatePickerModule } from './../my-date-picker/my-date-picker.module';
import { AddListComponent} from './components/add-list/add-list.component';

@NgModule({
    bootstrap: [ AppComponent ],
    declarations: [
        AppComponent,
        NavMenuComponent,
        TasksComponent,
        TaskListItemComponent,
        TaskContentComponent,
        AddListComponent
    ],
    imports: [
        UniversalModule, // Must be first import. This automatically imports BrowserModule, HttpModule, and JsonpModule too.
        FormsModule,
        MyDatePickerModule,
        RouterModule.forRoot([
            { path: '', redirectTo: 'tasks/All', pathMatch: 'full' },
            { path: 'tasks', redirectTo: 'tasks/All'},
            { path: 'tasks/:project', component: TasksComponent},
            { path: '**', redirectTo: 'tasks/All' }
        ])
    ]
})
export class AppModule {
}
