import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { fromEvent, map, tap } from 'rxjs';

@Component({
  selector: 'app-progress-bar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.scss'],
})
export class ProgressBarComponent {
  // Variables
  width = 0;

  // Streams
  // Estamos generando un observable a través del evento scroll del DOM, usamos el pipe para usar el operador map y ahí llamar la función de calculateScroll, nos devuelve el porcentaje del scroll y lo asignamos a la variable width
  scroll$ = fromEvent(document, 'scroll')
    .pipe(
      // map(event => this.calculateScroll(event)),
      map(this.calculateScroll),
      tap(console.log),
    )
    .subscribe((next) => {
      this.width = next;
    });

  /**
   * @param event: ScrollEvent
   * @returns width porcertual en base al scroll
   */
  calculateScroll(event: any): number {
    const { scrollTop, scrollHeight, clientHeight } =
      event?.target?.documentElement;
    return (scrollTop / (scrollHeight - clientHeight)) * 100;
  }
}
