import { CommonModule, JsonPipe } from '@angular/common'
import { Component, inject } from '@angular/core'
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms'
import { ValidatorsService } from '@services/validators.service'

@Component({
  templateUrl: './basic-page.component.html',
  standalone: true,
  imports: [ReactiveFormsModule, JsonPipe, CommonModule],
})
export class BasicPageComponent {
  // inyección de dependencias
  private fb = inject(FormBuilder)
  private validatorsService = inject(ValidatorsService)

  public myForm = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    price: [0, [Validators.required, Validators.min(0), Validators.max(100)]],
    inStorage: [0, [Validators.required, Validators.min(0), Validators.max(100)]],
  })

  // Función para validar los campos del formulario
  isValidField(field: string): boolean | null {
    return this.validatorsService.isValidFieldName(this.myForm, field)
  }

  // Función para retornar un mensaje de error dependiendo del mensaje
  getFieldError(field: string): string | null {
    return this.validatorsService.getFieldError(this.myForm, field)
  }

  onSave(): void {
    if (this.myForm.invalid) {
      this.myForm.markAllAsTouched()
    } else {
      console.log(this.myForm.value)
    }
  }
}
