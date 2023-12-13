import { Routes } from '@angular/router';

export const LAYOUT_ROUTES: Routes = [{
  path: '',
  loadComponent: () => import('./signals-layout/signals-layout.component').then(m => m.SignalsLayoutComponent),
  children: [
    {
      path: 'counter',
      loadComponent: () => import('../pages/counter-page/counter-page.component').then(m => m.CounterPageComponent)
    },
    {
      path: 'user-info',
      loadComponent: () => import('../pages/user-info-page/user-info-page.component').then(m => m.UserInfoPageComponent)
    },
    {
      path: 'properties',
      loadComponent: () => import('../pages/properties-page/properties-page.component').then(m => m.PropertiesPageComponent)
    },
    {
      path: '**',
      redirectTo: 'counter',
    }
  ]
}];
