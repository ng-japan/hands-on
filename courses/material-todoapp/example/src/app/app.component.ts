import { Component } from '@angular/core';

import { Todo } from './todo'; 
import { todoList } from './todo-list'; 

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Todo App';

  todoList = todoList;

  addTodo(todo: Todo) {
    this.todoList.unshift(todo);
  }
}
