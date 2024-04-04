import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TodoComponent } from '../todo/todo.component';
import { TodoFormComponent } from '../todo-form/todo-form.component';
import { FilterActivePipe } from '../../pipes/filter-active.pipe';
import { MessageComponent } from '../message/message.component';
import { Todo } from '../../types/todo';
import { TodosService } from '../../services/todos.service';
import { MessageService } from '../../services/message.service';

@Component({
  selector: 'app-todos-page',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TodoComponent,
    TodoFormComponent,
    FilterActivePipe,
    MessageComponent,
  ],
  templateUrl: './todos-page.component.html',
  styleUrl: './todos-page.component.scss'
})
export class TodosPageComponent implements OnInit{
  _todos: Todo[] = [];
  activeTodos: Todo[] = [];
  errorMessage = '';

  get todos() {
    return this._todos;
  }

  set todos(todos: Todo[]) {
    if (todos === this._todos) {
      return;
    }

    this._todos = todos;
    this.activeTodos = this._todos.filter(todo => !todo.completed);
  }

  constructor(
    private todosService: TodosService,
    private messageService: MessageService,
  ) {}

  ngOnInit(): void {
    this.todosService.todos$
      .subscribe((todos) => this.todos = todos);

    this.todosService.loadTodos().subscribe({
      next() {},
      error: () => {
        this.messageService.showMessage('Unable to load todos');
      },
      complete() {},
    });
  }

  handleTodoToggle(event: Event, todo: Todo) {
    todo.completed = (event.target as HTMLInputElement).checked;
  }

  trackById(i: number, todo: Todo) {
    return todo.id;
  }

  addTodo(newTitle: string) {
    this.todosService.createTodo(newTitle)
      .subscribe({
        error: () => {
          this.messageService.showMessage('Unable to add a todo');
        },
      });
  }

  renameTodo(todo: Todo, title: string) {
    this.todosService.updateTodo({ ...todo, title})
      .subscribe({
        error: () => {
          this.messageService.showMessage('Unable to update a todo');
        },
      });
  }

  togleTodo(todo: Todo) {
    this.todosService.updateTodo({ ...todo, completed: !todo.completed })
    .subscribe({
      error: () => {
        this.messageService.showMessage('Unable to update a todo');
      },
    });
  }

  deleteTodo(todo: Todo) {
    this.todosService.deleteTodo(todo)
    .subscribe({
      error: () => {
        this.messageService.showMessage('Unable to delete a todo');
      },
    });
  }
}
