import { Component } from '@angular/core';
import { todoList } from './todo-list';
import { Todo } from './todo';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Hello Angular!';
  todoList = todoList;

  addTodo(todo: Todo) {
    this.todoList.unshift(todo);
  }
}