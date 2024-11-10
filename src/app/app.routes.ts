import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AlumnoComponent } from './component/alumno/alumno.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    title: 'Página principal',
  },
  {
    path: 'alumno',
    component: AlumnoComponent,
    title: 'Soy alumno',
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full',
  },
];
