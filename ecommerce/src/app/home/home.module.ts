import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsComponent } from './products/products.component';
import { SharedModule } from '../shared/shared.module';
import { PrimeNgModule } from '../prime-ng/prime-ng.module';
import { DetailsComponent } from './details/details.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [ProductsComponent, DetailsComponent],
  imports: [
    CommonModule, SharedModule, PrimeNgModule, RouterModule
  ],
})
export class HomeModule { }
