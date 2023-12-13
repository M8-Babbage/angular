import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetailsComponent } from './home/details/details.component';
import { ProductsComponent } from './home/products/products.component';
import { ErrorPageComponent } from './shared/components/error-page/error-page.component';


const routes: Routes = [
  {
    path: '',
    component: ProductsComponent,
    pathMatch: 'full',
  },
  {
    path: 'product/:id',
    component: DetailsComponent,
  },
  {
    path: '**',
    component: ErrorPageComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
