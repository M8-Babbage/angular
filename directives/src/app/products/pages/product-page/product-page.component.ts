import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CustomLabelDirective } from 'src/app/shared/directives/custom-label.directive';

@Component({
  selector: 'app-product-page',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, CustomLabelDirective],
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.scss'],
})
export class ProductPageComponent {
  private fb: FormBuilder = inject(FormBuilder);
  public color: string = 'green';

  public myForm = this.fb.group({
    name: [
      '',
      [Validators.required, Validators.minLength(3), Validators.email],
    ],
  });

  public changeColor(): void {
    this.color = '#xxxxxx'.replace(/x/g, (y) =>
      ((Math.random() * 16) | 0).toString(16)
    );
  }
}
