import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { TodoComponent } from './components/todo/todo.component';
import { Todo } from './types/todo';
import { TodoFormComponent } from './components/todo-form/todo-form.component';
import { FilterActivePipe } from './pipes/filter-active.pipe';
import { TodosService } from './services/todos.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TodoComponent,
    TodoFormComponent,
    FilterActivePipe,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  // changeDetection: ChangeDetectionStrategy.OnPush,
})

export class AppComponent implements OnInit{
  _todos: Todo[] = [];
  activeTodos: Todo[] = [];

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
  ) {}

  ngOnInit(): void {
    this.todosService.getTodos()
      .subscribe((todos) => this.todos = todos);
  }

  handleTodoToggle(event: Event, todo: Todo) {
    todo.completed = (event.target as HTMLInputElement).checked;
  }

  trackById(i: number, todo: Todo) {
    return todo.id;
  }

  addTodo(newTitle: string) {
    this.todosService.createTodo(newTitle)
      .subscribe((newTodo) => {
        this.todosService.getTodos()
          .subscribe((todos) => this.todos = todos);
      });
  }

  renameTodo(todoId: number, newTitle: string) {
    this.todos = this.todos.map(todo => {
      if (todoId !== todo.id) {
        return todo;
      }

      return { ...todo, title: newTitle };
    });
  }

  togleTodo(todoId: number) {
    this.todos = this.todos.map(todo => {
      if (todoId !== todo.id) {
        return todo;
      }

      return { ...todo, completed: !todo.completed };
    });
  }

  deleteTodo(todoId: number) {
    this.todos = this.todos.filter(todo => todo.id !== todoId);
  }
}
