import { Component, Output, EventEmitter } from '@angular/core';
import { Todo } from '../shared/todo';

@Component({
  selector: 'app-todo-form',
  templateUrl: './todo-form.component.html',
  styleUrls: ['./todo-form.component.css']
})
export class TodoFormComponent {

  todoTitle = "";

  @Output() 
  create = new EventEmitter<Todo>();

  onSubmit() {
    const todo: Todo = { title: this.todoTitle, completed: false };
    this.create.emit(todo);
    this.todoTitle = "";
  }
}
