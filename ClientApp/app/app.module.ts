import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UniversalModule } from 'angular2-universal';
import { AppComponent } from './components/app/app.component'
import { NavMenuComponent } from './components/navmenu/navmenu.component';
import { TasksComponent } from './components/tasks/tasks.component';
import { TaskListItemComponent } from './components/task-list-item/task-list-item.component';
import { FormsModule }   from '@angular/forms';

@NgModule({
    bootstrap: [ AppComponent ],
    declarations: [
        AppComponent,
        NavMenuComponent,
        TasksComponent,
        TaskListItemComponent
    ],
    imports: [
        UniversalModule, // Must be first import. This automatically imports BrowserModule, HttpModule, and JsonpModule too.
        FormsModule,
        RouterModule.forRoot([
            { path: '', redirectTo: 'tasks', pathMatch: 'full' },
            { path: 'tasks', component: TasksComponent},
            { path: '**', redirectTo: 'tasks' }
        ])
    ]
})
export class AppModule {
}
