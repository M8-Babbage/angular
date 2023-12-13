import { Routes } from '@angular/router'

export const AUTH_ROUTES: Routes = [
  {
    path: '',
    redirectTo: 'sign-up',
    pathMatch: 'full',
  },
  {
    path: 'sign-up',
    loadComponent: () =>
      import('./pages/sign-up/sign-up.component').then((page) => page.SignUpComponent),
  },
  {
    path: '**',
    redirectTo: 'sign-up',
  },
]
