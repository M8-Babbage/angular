import {
  AfterContentChecked,
  AfterContentInit,
  AfterViewChecked,
  AfterViewInit,
  Component,
  DoCheck,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
} from '@angular/core';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent
  implements
    OnChanges,
    OnInit,
    DoCheck,
    AfterContentInit,
    AfterContentChecked,
    AfterViewInit,
    AfterViewChecked,
    OnDestroy
{
  public isProductVisible = false;

  // Se lanza de primero en el ciclo de vida
  constructor() {
    console.log('Constructor');
  }

  // Se lanza si hay cambios en las propiedades del componente, antes del ngOnInit
  ngOnChanges(changes: SimpleChanges): void {
    console.log('OnChanges');
  }

  // Se lanza despues del constructor y si hay ngOnChanges, después de él
  ngOnInit(): void {
    console.log('OnInit');
  }

  // Se lanza después del ngOnInit y después de cada ciclo de detección de cambios
  ngDoCheck(): void {
    if (this.isProductVisible) {
      console.log('DoCheck se ha lanzado con la variable');
    }
    console.log('DoCheck');
  }

  // Se lanza después de ngDoCheck, cuando se ha inicializado el contenido proyectado, solo una vez cuando se está construyendo el componente
  ngAfterContentInit(): void {
    console.log('AfterContentInit');
  }

  // Le lanza después de ngAfterContentInit y después de cada ciclo de detección de cambios después de ngDoCheck
  ngAfterContentChecked(): void {
    console.log('AfterContentChecked');
  }

  // Se lanza después de ngAfterContentChecked solo una vez cuando se está construyendo el componente
  ngAfterViewInit(): void {
    console.log('AfterViewInit');
  }

  // Se lanza después del ngAfterViewInit y después de cada ciclo de detección de cambios después de ngAfterContentChecked
  ngAfterViewChecked(): void {
    console.log('AfterViewChecked');
  }

  // Se lanza cuando se destruye el componente
  ngOnDestroy(): void {
    console.log('OnDestroy');
  }

  // Ciclos cuando se inicia un componente por primera vez
  /**
   * Constructor
   * OnChanges
   * OnInit
   * DoCheck
   * AfterContentInit
   * AfterContentChecked
   * AfterViewInit
   * AfterViewChecked
   */

  // Ciclos cuando ya se ha cargado el componente y hay detección de cambios
  /**
   * OnChanges
   * DoCheck
   * AfterContentChecked
   * AfterViewChecked
   */
}
