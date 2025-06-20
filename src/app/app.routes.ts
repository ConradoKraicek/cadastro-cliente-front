import { Routes } from '@angular/router';
import { ClienteFormComponent } from './components/cliente-form/cliente-form.component';
import { ClienteListComponent } from './components/cliente-list/cliente-list.component';
import { ClienteDetalheComponent } from './components/cliente-detalhe/cliente-detalhe.component';

export const routes: Routes = [
  { path: '', redirectTo: 'clientes', pathMatch: 'full' },
  { path: 'clientes', component: ClienteListComponent },
  { path: 'clientes/novo', component: ClienteFormComponent },
  { path: 'clientes/editar/:id', component: ClienteFormComponent },
  { path: 'clientes/:id', component: ClienteDetalheComponent },
];
