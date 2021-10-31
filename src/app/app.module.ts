import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './components/app/app.component';
import { ToDoItemsComponent } from './components/pages/to-do-items/to-do-items.component';
import {FormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {RouterModule, Routes} from "@angular/router";
import { HomeComponent } from './components/pages/home/home.component';
import { AboutComponent } from './components/pages/about/about.component';
import { NotFoundComponent } from './components/pages/not-found/not-found.component';
import { TaskEditorComponent } from './components/parts/to-do-items/task-editor/task-editor.component';

const routes: Routes = [
  { path: '', component: HomeComponent, },
  { path: 'tasks', component: ToDoItemsComponent, },
  { path: 'about', component: AboutComponent },
  { path: '**', component: NotFoundComponent }
]

@NgModule({
  declarations: [
    AppComponent,
    ToDoItemsComponent,
    HomeComponent,
    AboutComponent,
    NotFoundComponent,
    TaskEditorComponent
  ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpClientModule,
        RouterModule.forRoot(routes)
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
