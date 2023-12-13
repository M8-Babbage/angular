import { CommonModule } from '@angular/common'
import { Component } from '@angular/core'
import { RouterOutlet } from '@angular/router'
import { ProgressBarComponent } from './labs/progress-bar/progress-bar.component'
import { AjaxComponent } from './topics/ajax/ajax.component'
import { ExercisesComponent } from './topics/exercises/exercises.component'
import { FunctionsComponent } from './topics/functions/functions.component'
import { ObservablesComponent } from './topics/observables/observables.component'
import { OperatorsComponent } from './topics/operators/operators.component'

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    ObservablesComponent,
    FunctionsComponent,
    OperatorsComponent,
    ProgressBarComponent,
    AjaxComponent,
    ExercisesComponent,
  ],
  templateUrl: './app.component.html',
})
export class AppComponent {}
