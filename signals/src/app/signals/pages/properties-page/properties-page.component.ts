import { CommonModule } from '@angular/common';
import { Component, computed, effect, signal } from '@angular/core';
import { User } from '../../interfaces/user-request.interface';

@Component({
  selector: 'app-properties-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './properties-page.component.html',
  styleUrls: ['./properties-page.component.sass']
})
export class PropertiesPageComponent {

  // Declaración de propiedades 
  public counter = signal<number>(10);
  public user = signal<User>({
    id: 2,
    email: "janet.weaver@reqres.in",
    first_name: "Janet",
    last_name: "Weaver",
    avatar: "https://reqres.in/img/faces/2-image.jpg"
  });

  // Ejemplo de computadas
  public fullName = computed(() => {
    return `${this.user()?.first_name} ${this.user()?.last_name}`;
  });

  // Ejemplo de efecto, se ejecuta cada vez que se cambia el valor de la señal/es y al montar el componente, no hay que destruirlos, se destruyen automáticamente
  public userChangedEffect = effect(() => {
    console.log(`${this.user()?.first_name} - ${this.counter()}`);

  });

  onFieldUpdated(field: keyof User, value: string): void {
    // Forma con el método set: lo que pase como parámetro es el nuevo valor de la señal, ingorando el valor anterior
    // this.user.set({
    //   ...this.user(),
    //   [field]: value
    // });

    // Forma con el método update: lo que se retorne es el nuevo valor de la señal, similar al set, pero aquí obtenemos el valor actual de la señal
    // this.user.update(current => {
    //   return {
    //     ...current,
    //     [field]: value
    //   }
    // });

    // Forma con el método mutate: cada vez que se cambie un valor dentro del objeto current se va a disparar el evento de actualización de la señal
    this.user.mutate(current => {
      switch (field) {
        case 'id':
          current.id = Number(value);
          break;
        case 'email':
          current.email = value;
          break;
        case 'first_name':
          current.first_name = value;
          break;
        case 'last_name':
          current.last_name = value;
          break;
        case 'avatar':
          current.avatar = value;
          break;
      }
    })
  }

  increaseBy(value: number) {
    this.counter.update(current => current + value);
  }
}
