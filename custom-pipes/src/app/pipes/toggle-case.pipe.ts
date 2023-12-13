import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'toggleCase',
  standalone: true
})
export class ToggleCasePipe implements PipeTransform {

  /**
   * 
   * @param value Es el valor que recibe desde el HTML que será procesado
   * @param args Son los argumentos que se la pasan al pipe, toggleCase:true
   * @returns 
   */

  // Esta función es la implementación del pipe transform, se envían los argumentos que se le pasan al pipe de la siguiente manera, toggleCase:true:false
  transform(value: string, toUpper: boolean = false): string {
    if (toUpper) {
      return value.toUpperCase();
    } else {
      return value.toLowerCase();
    }
  }

}
