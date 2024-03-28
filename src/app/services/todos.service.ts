import { Injectable } from '@angular/core';
import { Todo } from '../types/todo';
import { HttpClient } from '@angular/common/http';

const USER_ID = 346;
const API_URL = 'https://mate.academy/students-api';

const todosFromServer: Todo[] = [
  {id: 1, title: 'HTML+CSS', completed: true},
  {id: 2, title: 'JS', completed: false},
  {id: 3, title: 'React', completed: false},
  {id: 4, title: 'Vue.js', completed: false},
];

@Injectable({
  providedIn: 'root'
})
export class TodosService {

  constructor(
    private http: HttpClient,
  ) {};

  getTodos() {
    return this.http.get<Todo[]>(`${API_URL}/todos?userId=${USER_ID}`);
  }

  createTodo(title: string) {
    return this.http.post<Todo>(`${API_URL}/todos`, {
      title,
      userId: USER_ID,
      completed: false,
    });
  }
}
