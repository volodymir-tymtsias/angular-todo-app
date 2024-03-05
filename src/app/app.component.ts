import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { TodoComponent } from './components/todo/todo.component';
import { Todo } from './types/todo';

const todos = [
  {id: 1, title: 'HTML+CSS', completed: true},
  {id: 2, title: 'JS', completed: false},
  {id: 3, title: 'React', completed: false},
  {id: 4, title: 'Vue.js', completed: false},
];

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TodoComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  todos = todos;

  todoForm = new FormGroup({
    title: new FormControl('', {
      nonNullable: true,
      validators: [
        Validators.required,
        Validators.minLength(2),
      ],
    }),
  });

  get title() {
    return this.todoForm.get('title') as FormControl;
  };


  handleTodoToggle(event: Event, todo: Todo) {
    todo.completed = (event.target as HTMLInputElement).checked;
  }

  get activeTodos() {
    return this.todos.filter(todo => !todo.completed);
  }

  trackById(i: number, todo: Todo) {
    return todo.id;
  }

  handleFormSubmit() {
    if(this.title.invalid) {
      return;
    }

    this.addTodo(this.title.value);

    this.title.reset();
  }

  addTodo(newTitle: string) {
    const newTodo: Todo = {
      id: Date.now(),
      title: newTitle,
      completed: false,
    }

    this.todos = [...this.todos, newTodo];
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
