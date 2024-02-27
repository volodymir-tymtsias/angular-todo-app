import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

const todos = [
  {id: 1, title: 'HTML+CSS', completed: true},
  {id: 2, title: 'JS', completed: false},
  {id: 3, title: 'React', completed: false},
  {id: 4, title: 'Vue.js', completed: false},
];

interface Todo {
  id: number;
  title: string;
  completed: boolean;
};

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    CommonModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'angular-todo-app';
  editing = false;
  todos = todos;

  handleTodoToggle(event: Event, todo: Todo) {
    todo.completed = (event.target as HTMLInputElement).checked;
  }
}
