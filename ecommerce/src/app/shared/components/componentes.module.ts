import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrimeNgModule } from 'src/app/prime-ng/prime-ng.module';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { ErrorPageComponent } from './error-page/error-page.component';

@NgModule({
  declarations: [HeaderComponent, FooterComponent, ErrorPageComponent],
  exports: [HeaderComponent, FooterComponent, ErrorPageComponent],
  imports: [
    CommonModule,
    PrimeNgModule
  ],
})
export class ComponentsModule { }
