import { JsonPipe, NgFor, NgIf } from '@angular/common'
import { Component, inject } from '@angular/core'
import {
  FormArray,
  FormBuilder,
  FormControl,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms'
import { ValidatorsService } from '@services/validators.service'

@Component({
  templateUrl: './dynamic-page.component.html',
  standalone: true,
  imports: [JsonPipe, ReactiveFormsModule, NgFor, NgIf],
})
export class DynamicPageComponent {
  // Inyección de dependencias
  private fb = inject(FormBuilder)
  private validatorsService = inject(ValidatorsService)

  public myForm = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    favoriteGames: this.fb.array([
      ['Metal Gear', Validators.required],
      ['Death Standing', Validators.required],
    ]),
  })

  get favoriteGames(): FormArray {
    return this.myForm.get('favoriteGames') as FormArray
  }

  public newFavorite: FormControl = this.fb.control('', Validators.required)

  // Función para validar los campos del formulario
  isValidFieldName(field: string): boolean | null {
    return this.validatorsService.isValidFieldName(this.myForm, field)
  }

  isValidFieldArray(formArray: FormArray, index: number): boolean | null {
    return this.validatorsService.isValidFieldArray(formArray, index)
  }

  // Función para retornar un mensaje de error dependiendo del mensaje
  getFieldError(field: string): string | null {
    return this.validatorsService.getFieldError(this.myForm, field)
  }

  onDeleteFavorite(index: number): void {
    this.favoriteGames.removeAt(index)
  }

  onAddToFavorites(): void {
    if (this.newFavorite.invalid) {
      this.newFavorite.markAsTouched()
      return
    } else {
      this.favoriteGames.push(this.fb.control(this.newFavorite.value, Validators.required))
      this.newFavorite.reset()
    }
  }

  onSubmit(): void {
    if (this.myForm.invalid) {
      this.myForm.markAllAsTouched()
      return
    }
    this.myForm.reset()
    // Eliminar la cantidad de elementos que se encuentran en el array
    this.favoriteGames.clear()
  }
}
