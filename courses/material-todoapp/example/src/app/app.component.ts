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

  todoTitle = "";

  onSubmit() {
    const todo: Todo = { title: this.todoTitle, completed: false };
    this.todoList.unshift(todo);
    this.todoTitle = "";
  }
}
