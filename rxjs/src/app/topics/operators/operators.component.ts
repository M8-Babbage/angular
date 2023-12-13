import { CommonModule } from '@angular/common'
import { Component, OnInit } from '@angular/core'
import {
  Observer,
  auditTime,
  catchError,
  combineLatestWith,
  concat,
  concatMap,
  debounceTime,
  delay,
  distinct,
  distinctUntilChanged,
  distinctUntilKeyChanged,
  endWith,
  exhaustMap,
  filter,
  first,
  forkJoin,
  from,
  fromEvent,
  interval,
  map,
  mapTo,
  merge,
  mergeAll,
  mergeMap,
  of,
  pluck,
  range,
  reduce,
  sample,
  sampleTime,
  scan,
  skip,
  startWith,
  switchMap,
  take,
  takeUntil,
  takeWhile,
  tap,
  throttleTime,
} from 'rxjs'
import { ajax } from 'rxjs/ajax'
import { Item, Personaje } from 'src/app/interfaces/general.interface'

@Component({
  selector: 'app-operators',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './operators.component.html',
  styleUrls: ['./operators.component.scss'],
})
export class OperatorsComponent implements OnInit {
  // Creamos un observable a partir de un evento
  keyUp$ = fromEvent<KeyboardEvent>(document, 'keyup')
  click$ = fromEvent<MouseEvent>(document, 'click')

  ngOnInit(): void {
    // this.mapOperator();
    // this.pluckOperator();
    // this.mapToOperator();
    // this.filterOperator();
    // this.tapOperator();
    // this.reduceOperator();
    // this.scanOperator();
    // this.takeOperator();
    // this.firstOperator();
    // this.takeWhileOperator();
    // this.takeUntilOperator();
    // this.skipOperator();
    // this.distinctOperator();
    // this.distinctUntilChangedOperator();
    // this.distinctUntilKeyChangedOperator();
    // this.debounceTimeOperator();
    // this.throttleTimeOperator();
    // this.sampleTimeOperator();
    // this.sampleOperator();
    // this.auditTimeOperator();
    // this.mergeAllOperator();
    // this.mergeMapOperator();
    // this.switchMapOperator();
    // this.concatMapOperator();
    // this.exhaustMapOperator();
    // this.startWithOperator();
    // this.endWithOperator();
    // this.concatOperator()
    // this.mergeOperator()
    // this.combineLatestWithOperator()
    this.forkJoinOperator()
  }

  /**
   * El operador map nos ayuda a transformar los datos que recibimos de un observable
   */
  mapOperator(): void {
    range(1, 5)
      .pipe(
        // El primer genérico es el tipo de dato que recibe el operador, el segundo es el tipo de dato que devuelve
        map<number, number>((x) => {
          return x * 10
        })
      )
      .subscribe(console.log)

    this.keyUp$.pipe(map<KeyboardEvent, string>((event) => event.code)).subscribe(console.log)
  }

  /**
   * El operador pluck nos ayuda a obtener un valor específico de un objeto, según la propiedad que le indiquemos
   */
  pluckOperator(): void {
    this.keyUp$
      .pipe(
        // Aquí obtenemos la información de la propiedad code del objeto KeyboardEvent, la cantidad de propiedades que podemos obtener es infinita, o sea, si tenemos { a: { b: 'hi' } } podemos obtener el valor de b con pluck('a', 'b')
        pluck<KeyboardEvent>('target', 'baseURI')
      )
      .subscribe(console.log)
  }

  /**
   * Siempre emitirá el valor que le indiquemos
   */
  mapToOperator(): void {
    this.keyUp$.pipe(mapTo<KeyboardEvent, string>('Tecla presionada')).subscribe(console.log)
  }

  /**
   * Nos permite seguir el flujo del observable
   */
  filterOperator(): void {
    this.keyUp$
      .pipe(
        // Validamos si el códigoi del evento es enter y lo pasamos por pluck para obtener una propiedad específica, si la condición no se cumple, no se emite el valor
        filter<KeyboardEvent>((value, index) => {
          console.log(index)
          return value.code === 'Enter'
        }),
        pluck<KeyboardEvent>('target', 'baseURI')
      )
      .subscribe(console.log)

    /**
     * Filtramos los personajes generados a partir de un observable "from", mostrando solo los héroes
     */
    const personajes: Array<Personaje> = [
      { tipo: 'heroe', nombre: 'batman' },
      { tipo: 'heroe', nombre: 'robin' },
      { tipo: 'villano', nombre: 'joker' },
    ]
    from(personajes)
      .pipe(
        filter<Personaje>((value) => {
          return value.tipo === 'heroe'
        })
      )
      .subscribe(console.log)
  }

  /**
   * Permite ejecutar acciones secundarias
   */
  tapOperator(): void {
    const numeros$ = range(1, 5).pipe(
      // En el tap podemos recibir un PartialObserver, este operador no retorna nada, por ende, el operador map recibe la emisión del range tal cual fue emitida desde un inicio, el tap solo ejecuta acciones secundarias
      tap((next) => console.log('antes', next)),
      map((val) => val * 10)
    )

    numeros$.subscribe(console.log)
  }

  /**
   * No se obtendrá la emisión hasta completar el observable
   */
  reduceOperator(): void {
    // Observador para tener control en el observable
    const observer: Observer<number> = {
      next: (value) => console.log(value),
      error: (value) => console.error(value),
      complete: () => console.log('Complete'),
    }

    // Función para enviar a la función reduce
    const totalReducer = (acumulador: number, actual: number) => acumulador + actual

    interval(1000)
      .pipe(
        // Después de 3 emisiones completamos el observable, para poder retornar el acumulado del reduce, ya que no se emite el valor acumulado hasta que no se completa
        take(3),
        reduce(totalReducer, 0)
      )
      .subscribe(observer)
  }

  /**
   * A diferencia del reduce, este emite el valor acumulado en cada emisión
   */
  scanOperator(): void {
    // Observador para tener control en el observable
    const observer: Observer<number> = {
      next: (value) => console.log(value),
      error: (value) => console.error(value),
      complete: () => console.log('Complete'),
    }

    // Función para enviar a la función reduce
    const totalReducer = (acumulador: number, actual: number) => acumulador + actual

    interval(1000)
      .pipe(
        // Después de 4 emisiones, completamos el observable
        take(4),
        scan(totalReducer, 0)
      )
      .subscribe(observer)
  }

  /**
   * Permite limitar la cantidad de emisiones de un observable
   */
  takeOperator(): void {
    const observer: Observer<number> = {
      next: (value) => console.log(value),
      error: (value) => console.error(value),
      complete: () => console.log('Complete'),
    }

    // Solo emitirá 3 valores
    of(1, 2, 3, 4, 5).pipe(take(3)).subscribe(observer)
  }

  /**
   * Emite el primer valor de un observable y luego se completa
   * También puede recibir un predicado para validar si se emite o no el valor
   */
  firstOperator(): void {
    type firstTypes = MouseEvent | number
    const observer: Observer<firstTypes> = {
      next: (value) => console.log(value),
      error: (value) => console.error(value),
      complete: () => console.log('Complete'),
    }

    // En este caso se completa el observable después de hacer click en cualquier parte del documento
    fromEvent<MouseEvent>(document, 'click').pipe(
      tap(() => console.log('tap')),
      first()
    )
    // .subscribe(observer);

    // En este caso podemos ver como se ejecuta el tap cada vez que damos click siempre y cuando el first no se cumpla, si se cumpl se muestra y se completa
    fromEvent<MouseEvent>(document, 'click').pipe(
      map<MouseEvent, number>(({ clientY }) => clientY),
      first((clientY) => clientY >= 150)
    )
    // .subscribe(observer);
  }

  /**
   * Permite recibir valores mientras la condición se cumpla
   */
  takeWhileOperator(): void {
    /**
     * El takeWhile recibe, además de la condición, un booleano que indica si se emite o no el valor que cumple la condición
     */
    fromEvent<MouseEvent>(document, 'click')
      .pipe(
        map(({ x, y }) => ({ x, y })),
        // Termina el observable cuando la condición no se cumple
        takeWhile(({ y }) => y >= 150, false)
      )
      .subscribe({
        next: (val) => console.log(val),
        complete: () => console.log('Complete'),
      })
  }

  /**
   * Permite completar un observable cuando otro observable emite un valor
   */
  takeUntilOperator(): void {
    const counter$ = interval(1000)

    const button = document.getElementById('button')
    const clickBtn$ = fromEvent(button!, 'click').pipe(
      // podemos emitir el primer click
      skip(1)
    )

    counter$
      .pipe(
        // El takeUntil recibe un observable, cuando este emite un valor, se completa el observable
        takeUntil(clickBtn$)
      )
      .subscribe({
        next: (value) => console.log(value),
        complete: () => console.log('Complete'),
      })
  }

  /**
   * Omite la cantidad n de emisiones iniciales
   */
  skipOperator(): void {
    const counter$ = interval(1000)
      .pipe(
        // El skip recibe la cantidad de emisiones que se omitirán
        skip(3)
      )
      .subscribe(console.log)
  }

  /**
   * Emite valores que no se han emitido anteriormente
   */
  distinctOperator(): void {
    from([1, 2, 3, 1, 2, 3, 4, 1])
      .pipe(
        // En este caso los valores 1,2,3 ya se han emitido, por lo que no se emiten nuevamente
        distinct() // en este caso evalua con ===
      )
      .subscribe(console.log)

    const personajes: Array<Personaje> = [
      { tipo: 'heroe', nombre: 'batman' },
      { tipo: 'heroe', nombre: 'robin' },
      { tipo: 'villano', nombre: 'joker' },
      { tipo: 'heroe', nombre: 'batman' },
      { tipo: 'heroe', nombre: 'robin' },
      { tipo: 'villano', nombre: 'joker' },
    ]

    from(personajes)
      .pipe(
        // En este caso estamos evaluando la propiedad nombre, por lo que solo se emiten los valores que no se han emitido anteriormente
        distinct((p) => p.nombre)
      )
      .subscribe(console.log)
  }

  /**
   * Emite valores siempre y cuando el valor anterior sea diferente al actual
   */
  distinctUntilChangedOperator(): void {
    of(1, 1, 1, 2, 2, 3, 3, 4, 4, 5, 1)
      .pipe(
        // Este operador evalúa el elemento actual, con el AuthenticatorAssertionResponse, si son iguales, lo omite, si no, lo emite
        distinctUntilChanged()
      )
      .subscribe(console.log)

    const personajes: Array<Personaje> = [
      { tipo: 'heroe', nombre: 'batman' },
      { tipo: 'heroe', nombre: 'batman' },
      { tipo: 'villano', nombre: 'joker' },
      { tipo: 'heroe', nombre: 'batman' },
      { tipo: 'heroe', nombre: 'robin' },
      { tipo: 'villano', nombre: 'robin' },
    ]

    from(personajes)
      .pipe(
        // En este caso evaluamos la posición anterior con la actual, si son iguales, no se emite el valor, si son diferentes, sí
        distinctUntilChanged((anterior, actual) => anterior.nombre === actual.nombre)
      )
      .subscribe(console.log)
  }

  // Evalúa una propiedad de un objeto, si el valor de esa propiedad es diferente al anterior, se emite, si no, no se emite, es igual al distinctUntilChanged pero solo evalúa una propiedad
  distinctUntilKeyChangedOperator(): void {
    const personajes: Array<Personaje> = [
      { tipo: 'heroe', nombre: 'batman' },
      { tipo: 'heroe', nombre: 'batman' },
      { tipo: 'villano', nombre: 'joker' },
      { tipo: 'heroe', nombre: 'batman' },
      { tipo: 'heroe', nombre: 'robin' },
      { tipo: 'villano', nombre: 'robin' },
    ]

    from(personajes)
      .pipe(
        // En este caso evaluamos la propiedad nombre, si el valor de esa propiedad es diferente al anterior, se emite, si no, no se emite
        distinctUntilKeyChanged('nombre')
      )
      .subscribe(console.log)
  }

  /**
   * Permite emitir un valor después de un tiempo determinado, si se generan varias emisiones en ese tiempo, solo se emite la última
   */
  debounceTimeOperator(): void {
    // this.click$.pipe(
    //   debounceTime(1000)
    // ).subscribe(console.log);

    // Ejemplo con un input
    const input = document.getElementById('debounce')
    fromEvent<InputEvent>(input!, 'keyup')
      .pipe(debounceTime(1000), pluck('target', 'value'), distinctUntilChanged())
      .subscribe(console.log)
  }

  /**
   * Lo opuesto a debounceTime, emite un valor, y despúes ignora todas emisiones en el rango de tiempo, cuando el tiempo se acaba, escucha la emisión
   */
  throttleTimeOperator(): void {
    const input = document.getElementById('throttle')
    fromEvent<InputEvent>(input!, 'keyup')
      .pipe(throttleTime(3000), pluck('target', 'value'), distinctUntilChanged())
      .subscribe(console.log)
  }

  /**
   * Permite obtener el último valor emitido en un intervalo de tiempo, si no se emite ningún valor, no se emite nada, a diferencia del audithTime, este está emitiendo valores constantemente según el rango de tiempo, o sea, cada 4 sgs, emite el último y así en bulce 4 => s, 8 => s, 12 => s, etc, mientras que el audithTime, se ejecuta el rango de tiempo cuando se genera una emisión
   */
  sampleTimeOperator(): void {
    this.click$
      .pipe(
        // El sampleTime recibe el tiempo en milisegundos, y emite el último valor emitido en ese intervalo de tiempo
        sampleTime(4000),
        map<MouseEvent, any>(({ screenX, screenY }) => ({ screenX, screenY }))
      )
      .subscribe(console.log)
  }

  /**
   * Recibe un observable como parámetro, cuando el parámetro emita un valor, se emite el último valor emitido por el obsevable padre, si no se emite ningún valor, no se emite nada
   */
  sampleOperator(): void {
    const click$ = fromEvent<MouseEvent>(document, 'click').pipe()

    // Generamos un intervalo, que emite valores cada segundo desde 0, después, cada vez que se haga click, se emite el último valor emitido por el intervalo
    interval(1000).pipe(sample(click$)).subscribe(console.log)
  }

  /**
   * Se inicia cuando el observable tiene una emisión, después de que se lanza la emisión, se genera un intervalo de tiempo, cuando se acaba el tiempo, se emite el último valor emitido por el observable, si se completa antes del tiempo, no emite nada
   */
  auditTimeOperator(): void {
    this.click$
      .pipe(
        // El auditTime recibe el tiempo en milisegundos, y emite el último valor emitido por el observable, después de ese tiempo
        auditTime(4000),
        map<MouseEvent, any>(({ screenX, screenY }) => ({ screenX, screenY }))
      )
      .subscribe(console.log)
  }

  /** --------- OPERADORES DE TRANSFORMACIÓN --------- */
  // Se usan para evitar el anidamiento de observables, similar al callback hell

  /**
   * Sirve para trabajar con observables que emiten observables
   * La diferencia entre el mergeAll y mergeMap, es que el mergeAll se subscribe a un observable que se genera en el flujo, mientras que el mergeMap, recibe un callback que retorna un observable, y se subscribe a ese observable
   */
  mergeAllOperator(): void {
    const input = document.getElementById('mergeAll')
    const input$ = fromEvent<KeyboardEvent>(input!, 'keyup')

    // Lo importante del tipado es saber que entra y que sale, para evitar así tener que re tipar si el flujo cambia
    input$
      .pipe(
        debounceTime(500),
        // El map se usa ahora como el pluck, el pluck está deprecado
        map((event) => (event.target as HTMLInputElement).value),
        map((texto) =>
          ajax({
            url: `https://api.github.com/search/users?q=${texto}`,
            method: 'GET',
          })
        ),
        // En este punto se estaría generando un nuevo observable y deberiamos subscribirnos a él, pero con el mergeAll, nos subscribimos al observable que se genera en el map
        mergeAll(),
        map<any, Array<Item>>((res) => res.response.items)
      )
      .subscribe(console.log)
  }

  /**
   * El merge map nos permite obtener generar un observable y subscribirnos a él en el mismo flujo, a diferencia del mergeAll, este recibe un callback que retorna un observable, y se subscribirá a ese observable, en este caso, se está retornando un observable que emite un valor cada segundo
   */
  mergeMapOperator(): void {
    of('a', 'b', 'c').pipe(
      // El mergeMap recibe un callback que retorna un observable, y se subscribirá a ese observable, en este caso, se está retornando un observable que emite un valor cada segundo
      mergeMap((letra) =>
        interval(1000).pipe(
          // Mostramos la letra que recibimos del observable padre y el valor del intervalo
          map((i) => letra + i),
          take(3)
        )
      )
    )
    // .subscribe({
    //   next: (value) => console.log(value),
    //   complete: () => console.log('Complete'),
    // });

    // Ejemplo de cuánto tiempo duró presionado el mouse
    const mouseDown$ = fromEvent<MouseEvent>(document, 'mousedown')
    const mouseUp$ = fromEvent<MouseEvent>(document, 'mouseup')
    const interval$ = interval()

    mouseDown$.pipe(mergeMap((value) => interval$.pipe(takeUntil(mouseUp$))))
    // .subscribe({
    //   next: (value) => console.log(value),
    //   complete: () => console.log('Complete'),
    // });

    // --- CUIDADO, POR CADA EMISIÓN ES UNA PETICIÓN SI NO SE CONTROLA CON EL DEBOUNCE TIME! -------
    const input = document.getElementById('mergeMap')
    const input$ = fromEvent<KeyboardEvent>(input!, 'keyup')
    input$
      .pipe(
        map((event) => (event.target as HTMLInputElement).value),
        mergeMap((texto) =>
          ajax({
            url: `https://api.github.com/search/users?q=${texto}`,
            method: 'GET',
          })
        ),
        map<any, Array<Item>>((res) => res.response.items)
      )
      .subscribe(console.log)
  }

  /**
   * Funciona igual que el mergeMap, pero, la gran diferencia es que solo mantiene una subscripción activa, por lo que si se genera una nueva emisión, completa la subscripción anterior y se subscribe a la nueva, además, si usamos ajax, las peticiones anteriores se cancelan si hay nuevas emisiones
   */
  switchMapOperator(): void {
    const input = document.getElementById('switchMap')
    const input$ = fromEvent<KeyboardEvent>(input!, 'keyup')
    input$
      .pipe(
        map((event) => (event.target as HTMLInputElement).value),
        switchMap((texto) => ajax({ url: `https://httpbin.org/delay/1?arg=${texto}` }))
      )
      .subscribe({
        next: (value) => console.log(value),
        complete: () => console.log('complete'),
      })
  }

  /**
   * EL concat recibe un callback que retorna observables y se subscribe a ellos, la diferencia es que si se genera más de un observable, este añade las emisiones a una cola, y hasta que se complete el observable anterior, no omite el siguiente, y así sucesivamente n observables
   */
  concatMapOperator(): void {
    const interval$ = interval(500).pipe(take(3))
    const click$ = fromEvent<MouseEvent>(document, 'click')

    click$.pipe(concatMap(() => interval$)).subscribe(console.log)
  }

  /**
   * Funciona similar a los otros mappers, pero la diferencia es que si existe un observable generado con el exhaustMap, que aún no se ha completado, se ignoran las nuevas subscripciones, solo recibe otro observable hasta que se haya completado el anterior
   */
  exhaustMapOperator(): void {
    const interval$ = interval(500).pipe(take(3))
    const click$ = fromEvent<MouseEvent>(document, 'click')

    click$.pipe(exhaustMap(() => interval$.pipe(take(3)))).subscribe({
      next: (value) => console.log(value),
      complete: () => console.log('complete'),
    })
  }

  /**
   * Permite iniciar un observable con un valor inicial
   */
  startWithOperator(): void {
    const numeros$ = of(1, 2, 3).pipe(startWith('a', 'b', 'c'))
    numeros$.subscribe(console.log)
  }

  /**
   * Permite completar un observable con un valor final
   */
  endWithOperator(): void {
    const numeros$ = of(1, 2, 3).pipe(endWith('a', 'b', 'c'))

    numeros$.subscribe(console.log)
  }

  /**
   * Recibe observables como argumento o iteradores, funciona parecido al concat, solo que siempre iniciará el primer observable emitiendo valores, si no se completa, no se emitirá ningún valor de los siguientes observables, si se completa el primero, pasa al segundo, si el segundo se completa, pasa al tercero, y así sucesivamente, cuando se completan todos se lanza el complete
   */
  concatOperator(): void {
    const interval$ = interval(1000)

    concat(interval$.pipe(take(3)), interval$.pipe(take(2)), [6, 7, 8], of(11, 20, 30)).subscribe(
      console.log
    )
  }

  /**
   * Recibe observables como argumento o iteradores, estará escuchando cualquier emisión de los observables que están como argumento y los emitirá, solo se completa cuandos todos los argumentos se completen
   */
  mergeOperator(): void {
    const keyup$ = fromEvent(document, 'keyup').pipe(map((e) => e.type))
    const click$ = fromEvent(document, 'click').pipe(map((e) => e.type))

    merge(keyup$, click$).subscribe(console.log)
  }

  /**
   * Recibe un observable, cuando todos los observables, padre e hijos tengan una emisión, se emite un arreglo con los valores de cada observable de la última emisión
   */
  combineLatestWithOperator(): void {
    const keyup$ = fromEvent(document, 'keyup').pipe(map((e) => e.type))
    const click$ = fromEvent(document, 'click').pipe(map((e) => e.type))

    keyup$.pipe(combineLatestWith(click$)).subscribe(console.log)
  }

  /**
   * Los observables deben ser finitos, cuando se completen todos los observables del forkJoin, se emitirá un arreglo con la última emisión de cada observable, parecido a combineLatestWith, pero este solo emite cuando todos los observables se completan
   */
  forkJoinOperator(): void {
    const of$ = of(1, 2, 3)
    const interval$ = interval(1000).pipe(take(3))
    const letras$ = of('a', 'b', 'c').pipe(delay(3500))

    // forkJoin({ of$, interval$, letras$ }).subscribe(console.log)

    const GITHUB_API_URL = 'https://api.github.com/users'
    const GITHUB_USER = 'M8-Babbage'

    forkJoin({
      usuario: ajax({ url: `${GITHUB_API_URL}/${GITHUB_USER}`, method: 'GET' }).pipe(
        map((res) => res.response)
      ),
      repos: ajax({ url: `${GITHUB_API_URL}/${GITHUB_USER}/repos`, method: 'GET' }).pipe(
        map((res) => res.response)
      ),
      gists: ajax({ url: `${GITHUB_API_URL}/${GITHUB_USER}/wrongURL`, method: 'GET' }).pipe(
        map((res) => res.response),
        catchError((err) => of(err))
      ),
    })
      // .pipe(catchError((err) => of(err)))
      .subscribe(console.log)
  }
}
