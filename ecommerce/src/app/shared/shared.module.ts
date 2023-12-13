import { NgModule } from '@angular/core';
import { ComponentsModule } from './components/componentes.module';

@NgModule({
  exports: [ComponentsModule],
  imports: [
    ComponentsModule
  ],
})
export class SharedModule { }
