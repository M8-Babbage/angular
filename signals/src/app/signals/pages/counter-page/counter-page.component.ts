import { CommonModule } from '@angular/common';
import { Component, computed, signal } from '@angular/core';

@Component({
  selector: 'app-counter-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './counter-page.component.html',
  styleUrls: ['./counter-page.component.sass']
})
export class CounterPageComponent {
  // Definición y declaración de un signal
  public counter = signal(10);

  // Si un signal que está dentro de computed cambia, el valor de computed también cambia.
  public squareCounter = computed(() => this.counter() * this.counter());

  increaseBy(value: number): void {
    // Existen 3 métodos para definir el nuevo valor de un signal
    // this.counter.set(this.counter() + value);
    this.counter.update((currentValue) => currentValue + value);
  }
}
