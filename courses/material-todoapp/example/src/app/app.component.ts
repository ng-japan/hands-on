import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

import { Todo } from './shared/todo';
import { todoList } from './shared/todo-list';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Todo List';

  todoList = todoList;

  onCreate(todo: Todo) {
    this.todoList.unshift(todo);
  }
}
