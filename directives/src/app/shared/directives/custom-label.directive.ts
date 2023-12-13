import { Directive, ElementRef, Input, inject } from '@angular/core';
import { ValidationErrors } from '@angular/forms';

@Directive({
  selector: '[customLabel]',
  standalone: true,
})
export class CustomLabelDirective {
  private _color: string = '';
  private _errors: ValidationErrors | null | undefined = null;

  @Input() set color(value: string) {
    this._color = value;
    this.setStyle();
  }

  @Input() set errors(value: ValidationErrors | null | undefined) {
    this._errors = value;
    this.setError();
  }

  private elementRef: ElementRef<HTMLElement> = inject(ElementRef);

  private htmlElement: HTMLElement = this.elementRef.nativeElement;

  public setStyle(): void {
    if (this.htmlElement && this._color) {
      this.htmlElement.style.color = this._color;
    }
  }

  public setError(): void {
    if (!this.htmlElement) return;
    if (!this._errors) {
      this.htmlElement.innerText = 'No hay errores';
      return;
    }

    const errors = Object.keys(this._errors);
    console.log(errors);
    if (errors.includes('required')) {
      this.htmlElement.innerText = 'Este campo es requerido.';
      return;
    }
    if (errors.includes('minlength')) {
      const min = this._errors['minlength'].requiredLength;
      const current = this._errors['minlength'].actualLength;
      this.htmlElement.innerText = `Mínimo ${current}/${min} caracteres.`;
      return;
    }
    if (errors.includes('email')) {
      this.htmlElement.innerText = 'No tiene el formato de correo.';
      return;
    }
  }
}
