import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { Observable, Observer, Subject, Subscription } from 'rxjs';
import { ObservablesService } from 'src/app/services/observables.service';

@Component({
  selector: 'app-observables',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './observables.component.html',
  // Traemos el servicio de los observables dentro del provider del componente
  providers: [ObservablesService],
})
export class ObservablesComponent implements OnInit {
  // Servicios
  service = inject(ObservablesService);

  ngOnInit(): void {
    // this.observableFromService();
    // this.subscriptionAndUnsubscribe();
    this.subjectObservable();
  }

  public observableFromService(): void {
    // Hacemos uso desde el componente
    // Observer: funciones que se ejecutan cuando el observable emite un valor "subscriber.(next, error, complete)"
    const observer: Observer<string> = {
      next: (value): void => console.log('next: ', value),
      error: (error): void => console.log('error: ', error),
      complete: (): void => console.log('complete'),
    };

    // Subscribe: método que nos permite subscribirnos a un observable, y nos permite recibir los valores que emite el observable, los procesamos por medio del observer
    this.service.getObservable().subscribe(observer);
  }

  public subscriptionAndUnsubscribe(): void {
    // Observer: funciones que se ejecutan cuando el observable emite un valor "subscriber.(next, error, complete)"
    const observer: Observer<number> = {
      next: (value): void => console.log('next: ', value),
      error: (error): void => console.log('error: ', error),
      complete: (): void => console.log('complete'),
    };

    let timer = 0;

    const interval$ = new Observable<number>((subscriber) => {
      const intervalToObservable = setInterval(() => {
        subscriber.next(timer++);
      }, 1000);

      // El return es lanzado cuando se cancela la subscripción
      // si llegamos a lanzar subscriber.complete(), se lanza el return
      return () => {
        clearInterval(intervalToObservable);
      };
    });

    // Subscription: interfaz que retorna el método subscribe, nos permite desuscribirnos de un observable
    const subscription: Subscription = interval$.subscribe(observer);

    // Cancelamos el observable después de 3 segundos
    setTimeout(() => {
      console.log('Cancelamos la subscripción');
      subscription.unsubscribe();
    }, 3000);
  }

  // Obtener siempre el mismo valor, en todas las subscripciones
  public subjectObservable(): void {
    const intervalo$ = new Observable<number>((subscriber) => {
      const intervalId = setInterval(() => {
        subscriber.next(Math.random());
      }, 2000);

      // En este caso debemos desuscribiernos del "intervalo"
      return () => {
        clearInterval(intervalId);
        console.log('Intervalo destruido');
      };
    });

    /**
     * Casteo múltiple, también es un observer, puede emitir valores (next, error y complete);
     * Podemos pasarlo a un observable como nuestro observer y obtener siempre el mismo valor
     */
    const subject$ = new Subject();

    // Subject => observer
    const intervalo = intervalo$.subscribe(subject$);

    // Subject => observable
    subject$.subscribe((next) => console.log('subjectOne: ', next));
    subject$.subscribe((next) => console.log('subjectTwo: ', next));

    // Subject => subscriber
    setTimeout(() => {
      subject$.next(10);

      // Aquí se lanzaría el return del subject más no del intervalo
      subject$.complete();

      // Desuscribimos el observable intervalo$
      intervalo.unsubscribe();
    }, 3500);
  }
}
