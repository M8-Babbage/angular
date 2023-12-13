import { Component, Input } from '@angular/core';
import { PersonajeDBZ } from '../interfaces/dbz.interface';
import { DbzService } from '../services/dbz.service';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styleUrls: ['./agregar.component.scss'],
})
export class AgregarComponent {
  constructor(private dbzService: DbzService) {}

  public newCharacter: PersonajeDBZ = {
    name: '',
    power: 0,
  };

  // Función que valia el nuevo usuario y lo envía al padre por medio del emmit
  addForm() {
    if (this.newCharacter.name.trim().length === 0) return;
    this.dbzService.addPersonajesDBZ(this.newCharacter);
    this.newCharacter = { name: '', power: 0 };
  }
}
