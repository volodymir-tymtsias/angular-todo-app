import { Routes } from '@angular/router';
import { TodosPageComponent } from './components/todos-page/todos-page.component';
import { AboutPageComponent } from './components/about-page/about-page.component';

export const routes: Routes = [
  {
    path: 'todos',
    component: TodosPageComponent,
  },
  {
    path: 'about',
    loadComponent: () => import('./components/about-page/about-page.component')
      .then((c) => c.AboutPageComponent),
  },
  {
    path: '**',
    redirectTo: '/todos',
    pathMatch: 'full',
  },
];
