import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  Observer,
  asyncScheduler,
  from,
  fromEvent,
  interval,
  of,
  range,
  timer,
} from 'rxjs';

@Component({
  selector: 'app-functions',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './functions.component.html',
  styleUrls: ['./functions.component.scss'],
})
export class FunctionsComponent implements OnInit {
  ngOnInit(): void {
    // this.functionOf();
    this.functionFrom();
    // this.functionFromEvent();
    // this.functionRange();
    // this.functionInterval();
    // this.functionTimer();
    // this.functionAsyncScheduler();
  }

  functionOf(): void {
    const observer: Observer<number> = {
      next: (value: number) => console.log(value),
      error: (error: number) => console.log(error),
      complete: () => console.log('Complete'),
    };

    // Emite los valores secuencialmente de forma síncrona y completa la emisión
    of(1, 2, 3, 4, 5, 6).subscribe(observer);
  }

  functionFrom(): void {
    const observer: Observer<any> = {
      next: (value) => console.log(value),
      error: (error) => console.log(error),
      complete: () => console.log('Complete'),
    };

    // Emite los valores secuencialmente de forma síncrona y completa la emisión, puede recibir un array, un objeto, una promesa, un iterable, un observable
    // const obs$ = from([1, 2, 3, 4, 5, 6]).subscribe(observer);
    // const obsTwo$ = from('Edwin').subscribe(observer);

    // Podemos convertir una promesa en un observable
    // const promise$ = from(fetch('https://api.github.com/users/M8-Babbage')).subscribe(async (response) => {
    //   console.log(response);
    //   const data = await response.json();
    //   console.log(data);
    // });

    // También lo podemos implementar con los iterables o generadores
    const miGenerador = function* () {
      yield 1;
      yield 2;
      yield 3;
      yield 4;
      yield 5;
    };

    const miIterable = miGenerador();

    const obsThree$ = from(miIterable).subscribe(observer);
  }

  functionFromEvent(): void {
    // Podemos ver el tipo de evento en la console del navegador
    const observer: Observer<PointerEvent> = {
      next: ({ clientX, clientY }: PointerEvent) =>
        console.log(clientX + ', ' + clientY),
      error: (error: PointerEvent) => console.log(error),
      complete: () => console.log('Complete'),
    };
    fromEvent<PointerEvent>(document, 'click').subscribe(observer);
  }

  functionRange(): void {
    // Emite una secuencia de números, start es el valor inicial y count es el número de valores a emitir
    const obs$ = range(-2, 5); // => emite desde -2, 5 emisiones
    const obsTwo$ = range(5); // => emite desde 0, 5 emisiones
    obs$.subscribe(console.log);
    obsTwo$.subscribe(console.log);

    // Con el asyncScheduler podemos hacer que la emisión sea asíncrona
    const obsThree$ = range(10, 3, asyncScheduler);
    console.log('Inicio');
    obsThree$.subscribe(console.log);
    console.log('Fin');
  }

  functionInterval(): void {
    const observer: Observer<number> = {
      next: (value: number) => console.log(value),
      error: (error: number) => console.log(error),
      complete: () => console.log('Complete'),
    };

    // Emite un valor cada cierto intervalo de tiempo, asíncronos por defecto
    const obs$ = interval(1000);
    obs$.subscribe(observer);
  }

  functionTimer(): void {
    const observer: Observer<number> = {
      next: (value: number) => console.log(value),
      error: (error: number) => console.log(error),
      complete: () => console.log('Complete'),
    };

    // Asíncrono por defecto, este se ejecuta en un tiempo determinado y se completa
    const obs$ = timer(5000);
    // obs$.subscribe(observer);

    // Tambien podemos simular el interval con el timer, el primer parámetro significa la hora de comienzo, o tiempo en segundos y después el intervalo
    const obsTwo$ = timer(2000, 1000);
    // obsTwo$.subscribe(observer);

    // Trabajándolo con fechas, se lanza después de 5 segundos
    const hoyEn5 = new Date(); // Ahora
    hoyEn5.setSeconds(hoyEn5.getSeconds() + 5); // Le sumamos 5 segundos

    const obsThree$ = timer(hoyEn5);
    obsThree$.subscribe(observer);
  }

  functionAsyncScheduler(): void {
    // Enviamos la definición de la función y el tiempo en el que se ejecutará
    // const saludar = () => console.log('Hola mundo');
    // asyncScheduler.schedule(saludar, 2000);

    // También podemos enviar parámetros, el estado del schedule es el tercer parámetro, no se puede enviar más de 3 parámetros
    // const saludar2 = (state: any) => console.log(`Hola ${state}`);
    // asyncScheduler.schedule(saludar2, 2000, 'Jorge');

    // También podemos pasar una función literal
    const subs = asyncScheduler.schedule(
      function (state) {
        console.log(state);
        // También podemos modificar el contexto de la función, si no, solo se ejecutará una vez
        this.schedule(state! + 1, 1000);
      },
      2000,
      0,
    );

    // El asyncScheduler nos devuelve un Subscription y podemos desuscribirnos cuando queramos
    // setTimeout(() => {
    //   subs.unsubscribe();
    // }, 6000);

    // Usando otro asyncScheduler para cancelar
    asyncScheduler.schedule(() => subs.unsubscribe(), 6000);
  }
}
