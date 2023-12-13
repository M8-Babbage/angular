import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'countries',
    pathMatch: 'full',
  },
  {
    path: 'countries',
    loadComponent: () =>
      import(
        '../app/countries/pages/selector-page/selector-page.component'
      ).then((m) => m.SelectorPageComponent),
  },
];
