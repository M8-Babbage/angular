import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { catchError, of } from 'rxjs';
import { AjaxError, ajax } from 'rxjs/ajax';

@Component({
  selector: 'app-ajax',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ajax.component.html',
  styleUrls: ['./ajax.component.scss'],
})
export class AjaxComponent implements OnInit {
  private readonly URL = 'https://api.github.com/userss?per_page=5';

  ngOnInit(): void {
    this.ajaxRxjs();
  }

  ajaxRxjs(): void {
    /**
     * El catchError sirve para atrapar cualquier error que se genere en el observable, y así poder manejarlo
     */
    const obs$ = ajax({
      url: this.URL,
      method: 'POST', // Aquí podría ser cualquier método, POST, PUT, DELETE, etc.
      headers: {},
      body: {},
    });

    obs$
      .pipe(
        // Aquí atrapa el error, se procesa y se retorna un observable, por ende se recibe la emisión en el next y se completa el observable
        catchError(this.atrapaError),
      )
      .subscribe({
        next: (val) => console.log('next:', val),
        error: (err) => console.warn('error en:', err),
        complete: () => console.log('complete'),
      });
  }

  /**
   * Con el parámetro de tipo AjaxError obtenemos toda la información de la petición, como el status, el mensaje, etc.
   */
  atrapaError = (err: AjaxError) => {
    console.warn('error en:', err);
    /***
     * Debemos retornar un observable si no queremos que se detenga el flujo, debemos retornar un observable vacío por ejemplo of([]);
     */
    return of([]);
  };
}
