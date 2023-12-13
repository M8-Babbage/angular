import { Injectable } from '@angular/core'
import {
  AbstractControl,
  AsyncValidatorFn,
  FormArray,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
} from '@angular/forms'
import { Observable, delay } from 'rxjs'

@Injectable({
  providedIn: 'root',
})
export class ValidatorsService {
  public firstNameAndLastnamePattern: string = '([a-zA-Z]+) ([a-zA-Z]+)'
  public emailPattern: string = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'

  public cantBeStrider = (control: FormControl): ValidationErrors | null => {
    const username = (control.value as string).trim().toLowerCase()

    if (username === 'strider') {
      return { noStrider: true }
    } else {
      return null
    }
  }

  // Función para validar los campos del formulario
  isValidFieldName(form: FormGroup, field: string): boolean | null {
    const control = form.get(field)
    if (!control) return null
    const errors = control?.errors
    if (!errors) return null
    return errors ? control.touched : false
  }

  // Función para validar los campos del formulario en un arreglo
  isValidFieldArray(formArray: FormArray, index: number): boolean | null {
    const control = formArray.controls[index]
    if (!control) return null
    const errors = control?.errors
    if (!errors) return null
    return errors ? control.touched : false
  }

  // // Función para retornar un mensaje de error dependiendo del mensaje
  getFieldError(form: FormGroup, field: string): string | null {
    const control = form.get(field)
    if (!control) return null
    const errors = control.errors
    if (!errors) return null
    for (const key of Object.keys(errors)) {
      switch (key) {
        case 'required':
          return 'This field is required'
        case 'minlength':
          const requiredLength = errors[key]?.requiredLength
          return `This field must be longer than ${requiredLength} characters`
      }
    }
    return null
  }

  public emailValidator(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      const email = control.value
      return new Observable<ValidationErrors | null>((subscriber) => {
        if (email === 'edwinjpr11@gmail.com') {
          subscriber.next({ emailExists: true })
          subscriber.complete()
        } else {
          subscriber.next(null)
          subscriber.complete()
        }
      }).pipe(
        delay(3500) // Simular una petición HTTP
      )
    }
  }

  public isFieldOneEqualToFieldTwo(field1: string, field2: string): ValidatorFn {
    return (formGroup: AbstractControl): ValidationErrors | null => {
      const fieldValue1 = formGroup.get(field1)?.value
      const fieldValue2 = formGroup.get(field2)?.value
      if (fieldValue1 !== fieldValue2) {
        formGroup.get(field2)?.setErrors({ notEqual: true })
        return { notEqual: true }
      }
      formGroup.get(field2)?.setErrors(null)
      return null
    }
  }
}
