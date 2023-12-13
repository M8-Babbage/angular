import { Routes } from '@angular/router';

export const ROUTES: Routes = [
  { path: '', redirectTo: 'signals', pathMatch: 'full' },
  {
    path: 'signals',
    loadChildren: () => import('./signals/layout/layout.routes').then(m => m.LAYOUT_ROUTES),
  },
  { path: '**', redirectTo: 'signals' }
];
