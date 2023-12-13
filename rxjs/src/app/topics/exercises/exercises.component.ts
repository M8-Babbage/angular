import { CommonModule } from '@angular/common'
import { Component, OnInit } from '@angular/core'
import {
  Subject,
  catchError,
  combineLatestWith,
  filter,
  from,
  interval,
  map,
  of,
  reduce,
  switchMap,
  take,
  timer,
  zip,
} from 'rxjs'
import { ajax } from 'rxjs/ajax'

@Component({
  selector: 'app-exercises',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './exercises.component.html',
  styleUrls: ['./exercises.component.scss'],
})
export class ExercisesComponent implements OnInit {
  ngOnInit(): void {
    // this.capitalizar()
    // this.reduce()
    // this.randoms()
    // this.cuentaRegresiva()
    // this.combinar()
    this.lukeSkywalker()
  }

  capitalizar(): void {
    /**
     * Ejercicio:
     * El objetivo de es realizar la misma impresión, pero usando observables
     * Nota: NO hay que usar el ciclo "FOR OF", usar un observable y llamar la función capitalizar
     */

    /**
     * Salida esperada:
     * Batman
     * Joker
     * Doble Cara
     * Pingüino
     * Hiedra Venenosa
     */
    const nombres = ['batman', 'joker', 'doble cara', 'pingüino', 'hiedra venenosa']

    const capitalizar = (nombre: string) =>
      nombre.replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase())

    // Cambiar este FOR OF, por un observable y capitalizar las emisiones
    from(nombres)
      .pipe(map(this.capitalizar))
      .subscribe((nombre) => console.log(nombre))
  }

  reduce(): void {
    /**
     * Ejercicio:
     * Sume todos los números del arreglo usando un reduce.
     * Debe de filtrar para que sólo números sean procesados
     * La salida debe de ser 32
     *
     * Tip:
     * isNan() es una función de JavaScript para determinar si es número
     * Usar filter<any>(...) para no tener problemas de tipado.
     */

    const datos = [1, 2, 'foo', 3, 5, 6, 'bar', 7, 8]
    const reducer = (acumulador: number, acumulado: number) => acumulador + acumulado

    from(datos)
      .pipe(
        filter<any>((value) => !isNaN(value)),
        reduce(reducer, 0)
      )
      .subscribe(console.log) // La salida debe de ser 32
  }

  randoms(): void {
    /**
     * Ejercicio: Realizar que los dos observables finales,
     * emitan exactamente el mismo valor
     *
     * Tip: Hot Observable? subjects?
     */

    // == NO TOCAR este bloque ====================
    const reloj$ = interval(1000).pipe(
      take(5),
      map((val) => Math.round(Math.random() * 100))
    )
    // No tocar la creación del observable
    // ============================================

    const subject$ = new Subject()
    reloj$.subscribe(subject$)

    // Estos dos observables deben de emitir exactamente los mismos valores
    subject$.subscribe((val) => console.log('obs1', val))
    subject$.subscribe((val) => console.log('obs2', val))
  }

  cuentaRegresiva(): void {
    /**
     * Ejercicio: Realizar una cuenta regresiva
     * empezando de 7
     */

    // Salida esperada ===
    // 7
    // 6
    // 5
    // 4
    // 3
    // 2
    // 1
    // 0

    const inicio = 7
    const countdown$ = interval(100).pipe(
      map((value) => inicio - value),
      // takeWhile((value) => value !== 0, true)
      take(inicio + 1)
    )

    // No tocar esta línea ==================
    countdown$.subscribe(console.log) // =
    // ======================================
  }

  combinar(): void {
    /**
     * Ejercicio: Combinar ambos observables (letras$, numeros$)
     * para que las emisiones sean la concatenación de los últimos
     * valores emitidos
     */

    //  Ejemplo de la tada esperada:
    // a1
    // a2
    // b2
    // b3
    // c3
    // c4
    // d4
    // d5
    // e5

    const letras = ['a', 'b', 'c', 'd', 'e']
    const numeros = [1, 2, 3, 4, 5]

    // Emite letras cada segundo
    const letras$ = interval(1000).pipe(
      map((i) => letras[i]),
      take(letras.length)
    )

    // Emite numeros del 1 al 5 cada segundo, pero tiene un delay inicial
    // de 500 milésimas
    const numeros$ = timer(500, 1000).pipe(
      map((i) => numeros[i]),
      take(numeros.length)
    )

    // ========================================
    letras$.pipe(combineLatestWith(numeros$)).subscribe(console.log)
    // ========================================
  }

  lukeSkywalker(): void {
    /**
     * Ejercicio:
     *  Realizar 2 peticiones HTTP (ajax) una después de otra.
     *
     *  La primera debe de obtener el personaje de Star Wars:
     *   Luke Skywalker, llamando el endpoint:   /people/1/
     *
     *  La segunda petición, debe de ser utilizando el objeto
     *  de la petición anterior, y tomar la especie (species),
     *  que es un arreglo de URLs (array), dentro de ese arreglo,
     *  tomar la primera posición y realizar la llamada a ese URL,
     *  el cual debería de traer información sobre su especie (Human)
     */

    // Respuesta esperada:
    // Información sobre los humanos en el universo de Star Wars
    // Ejemplo de la data esperada
    /*
 { name: "Human", classification: "mammal", designation: "sentient", average_height: "180", skin_colors: "caucasian, black, asian, hispanic", …}
*/

    // Respuesta esperada con Mayor dificultad
    // Retornar el siguiente objeto con la información de ambas peticiones
    // Recordando que se disparan una después de la otra,
    // con el URL que viene dentro del arreglo de 'species'

    // Tip: investigar sobre la función zip:
    //      Que permite combinar observables en un arreglo de valores
    // https://rxjs-dev.firebaseapp.com/api/index/function/zip

    // Ejemplo de la data esperada:
    /*
    especie: {name: "Human", classification: "mammal", designation: "sentient", average_height: "180", skin_colors: "caucasian, black, asian, hispanic", …}
    personaje: {name: "Luke Skywalker", height: "172", mass: "77", hair_color: "blond", skin_color: "fair", …}
*/

    // No tocar ========================================================
    const SW_API = 'https://swapi.dev/api'
    const getRequest = (url: string) => ajax.getJSON<any>(url)
    // ==================================================================

    // Primer reto
    getRequest(`${SW_API}/people/1`).pipe(
      switchMap((response) => ajax.getJSON(response.starships[0])),
      catchError((err) => of([]))
    )
    // .subscribe(console.log) // ==

    // Segundo reto (mayor dificultad)
    getRequest(`${SW_API}/people/1`)
      .pipe(
        switchMap((response) => zip(of(response), getRequest(response.starships[0]))),
        map(([personaje, especie]) => ({ personaje, especie })),
        catchError((err) => of([]))
      )
      .subscribe(console.log)
  }
}
