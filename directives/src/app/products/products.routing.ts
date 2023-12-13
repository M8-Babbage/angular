import { Routes } from "@angular/router";

export const PRODUCTS_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/product-page/product-page.component').then(m => m.ProductPageComponent)
  },
  {
    path: '**',
    redirectTo: 'products'
  }
]

