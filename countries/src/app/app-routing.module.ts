import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PorCapitalComponent } from './pais/pages/por-capital/por-capital.component';
import { PorPaisComponent } from './pais/pages/por-pais/por-pais.component';
import { PorRegionComponent } from './pais/pages/por-region/por-region.component';
import { VerPaisComponent } from './pais/pages/ver-pais/ver-pais.component';

const routes: Routes = [
  // Primera ruta, pathMatch, si va a otra ruta se va hacia la ruta ''
  { path: '', component: PorPaisComponent, pathMatch: 'full' },
  { path: 'region', component: PorRegionComponent },
  { path: 'capital', component: PorCapitalComponent },
  { path: 'pais', component: PorPaisComponent },
  // Si se recibe una ruta dinámica, se hace igual que en express
  { path: 'pais/:id', component: VerPaisComponent },
  // Si se carga una ruta no definida, se redirige a la ruta por defecto o a un componente en especial
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
