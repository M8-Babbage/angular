import { Component, OnInit } from '@angular/core';
import { Color, Heroe } from '../../interfaces/ventas.interface';

@Component({
  selector: 'app-ordenar',
  templateUrl: './ordenar.component.html',
  styles: [],
})
export class OrdenarComponent implements OnInit {
  state: boolean = true;
  ordenarPor: string = 'sin valor';

  heroes: Heroe[] = [
    { nombre: 'Superman', vuela: true, color: Color.azul },
    { nombre: 'Batman', vuela: false, color: Color.rojo },
    { nombre: 'Robin', vuela: false, color: Color.verde },
    { nombre: 'Daredevil', vuela: false, color: Color.negro },
    { nombre: 'Linterna Verde', vuela: true, color: Color.verde },
  ];

  toggleState(): void {
    this.state = !this.state;
  }

  cambiarOrden(valor: string): void {
    this.ordenarPor = valor;
  }

  constructor() {}

  ngOnInit(): void {}
}
