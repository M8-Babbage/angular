import { JsonPipe, NgIf } from '@angular/common'
import { Component, OnInit, inject } from '@angular/core'
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'
import { ValidatorsService } from '@services/validators.service'

@Component({
  templateUrl: './switches-page.component.html',
  standalone: true,
  styles: [],
  imports: [JsonPipe, ReactiveFormsModule, NgIf],
})
export class SwitchesPageComponent implements OnInit {
  // Inyección de dependencias
  private fb = inject(FormBuilder)
  private validatorsService = inject(ValidatorsService)

  public myForm: FormGroup = this.fb.group({
    gender: ['M', [Validators.required]],
    wantNotifications: [true, [Validators.required]],
    termsAndConditions: [true, [Validators.requiredTrue]],
  })

  public person = {
    gender: 'F',
    wantNotifications: false,
  }

  ngOnInit(): void {
    this.myForm.setValue({ ...this.person, termsAndConditions: false })
  }

  // Función para validar los campos del formulario
  isValidFieldName(field: string): boolean | null {
    return this.validatorsService.isValidFieldName(this.myForm, field)
  }

  onSave(): void {
    if (this.myForm.invalid) {
      this.myForm.markAllAsTouched()
      return
    } else {
      const { termsAndConditions, ...newPerson } = this.myForm.value
      this.person = newPerson
      console.log(this.myForm.value)
      console.log(this.person)
    }
  }
}
