import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'products',
    loadChildren: () => import('./products/products.routing').then(m => m.PRODUCTS_ROUTES)
  },
  {
    path: '**',
    redirectTo: 'products'
  }
];
