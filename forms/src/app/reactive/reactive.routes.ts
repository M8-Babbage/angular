import { Routes } from '@angular/router'

export const REACTIVE_ROUTES: Routes = [
  {
    path: '',
    redirectTo: 'basic',
    pathMatch: 'full',
  },
  {
    path: 'basic',
    loadComponent: () =>
      import('./pages/basic-page/basic-page.component').then(
        (component) => component.BasicPageComponent,
      ),
  },

  {
    path: 'dynamic',
    loadComponent: () =>
      import('./pages/dynamic-page/dynamic-page.component').then(
        (component) => component.DynamicPageComponent,
      ),
  },
  {
    path: 'switches',
    loadComponent: () =>
      import('./pages/switches-page/switches-page.component').then(
        (component) => component.SwitchesPageComponent,
      ),
  },
  {
    path: '**',
    redirectTo: 'basic',
  },
]
