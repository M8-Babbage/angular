import { Component } from '@angular/core';

@Component({
  // Nombre de la etiqueta
  selector: 'app-root',
  // Ruta del archivo html
  templateUrl: './app.component.html',
  // Plantilla html dentro del mismo componente
  // template: `
  //   <h1>Hola mundo</h1>
  //   <main class="main-container">
  //     <div class="left">
  //       <span>Left</span
  //     </div>
  //     <div class="right">
  //       <span>Right</span>
  //     </div>
  //   </main>
  // `,
  // Ruta del archivo css
  styleUrls: ['./app.component.css'],
  // Plantilla css dentro del mismo componente
  // styles: ['h1 { color: red; }', '.main-container { display: flex; }'],
})
export class AppComponent {}
