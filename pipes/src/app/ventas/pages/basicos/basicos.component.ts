import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-basicos',
  templateUrl: './basicos.component.html',
  styles: [],
})
export class BasicosComponent implements OnInit {
  nombreLower: string = 'edwin';
  nombreUpper: string = 'EDWIN';
  nombreCompleto: string = 'eDwIn PaEz';

  fecha: Date = new Date(); // El día de hoy

  constructor() {}

  ngOnInit(): void {}
}
