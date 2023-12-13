import { JsonPipe, NgIf } from '@angular/common'
import { Component, inject } from '@angular/core'
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms'
import { ValidatorsService } from '@services/validators.service'

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [ReactiveFormsModule, JsonPipe, NgIf],
  templateUrl: './sign-up.component.html',
  styles: [],
})
export class SignUpComponent {
  private validators = inject(ValidatorsService)
  private fb = inject(FormBuilder)

  // public myForm: FormGroup = this.fb.group(
  //   {
  //     name: [
  //       '',
  //       [Validators.required, Validators.pattern(this.validators.firstNameAndLastnamePattern)],
  //     ],
  //     email: [
  //       '',
  //       [Validators.required, Validators.pattern(this.validators.emailPattern)],
  //       [this.validators.emailValidator()],
  //     ],
  //     username: ['', [Validators.required, this.validators.cantBeStrider]],
  //     password: ['', [Validators.required, Validators.minLength(6)]],
  //     password2: ['', [Validators.required, Validators.minLength(6)]],
  //   },
  //   {
  //     validators: [this.validators.isFieldOneEqualToFieldTwo('password', 'password2')],
  //   }
  // )

  public myForm: FormGroup = new FormGroup(
    {
      name: new FormControl('', [
        Validators.required,
        Validators.pattern(this.validators.firstNameAndLastnamePattern),
      ]),
      email: new FormControl(
        '',
        [Validators.required, Validators.pattern(this.validators.emailPattern)],
        [this.validators.emailValidator()]
      ),
      username: new FormControl('', [Validators.required, this.validators.cantBeStrider]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
      password2: new FormControl('', [Validators.required, Validators.minLength(6)]),
    },
    {
      validators: this.validators.isFieldOneEqualToFieldTwo('password', 'password2'),
    }
  )

  isValidFieldName(field: string): boolean | null {
    return this.validators.isValidFieldName(this.myForm, field)
  }

  onSave(): void {
    this.myForm.markAllAsTouched()
  }
}
