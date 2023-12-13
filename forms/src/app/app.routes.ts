import { Routes } from '@angular/router'

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'reactive',
    pathMatch: 'full',
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.routes').then((auth) => auth.AUTH_ROUTES),
  },
  {
    path: 'reactive',
    loadChildren: () =>
      import('./reactive/reactive.routes').then((reactive) => reactive.REACTIVE_ROUTES),
  },
  {
    path: '**',
    redirectTo: 'reactive',
  },
]
