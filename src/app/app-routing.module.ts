import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProfessionalComponent } from './professional/professional.component';

const routes: Routes = [
  { path: 'professional/:id', component: ProfessionalComponent },
  { path: '**', redirectTo: 'professional/1' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
