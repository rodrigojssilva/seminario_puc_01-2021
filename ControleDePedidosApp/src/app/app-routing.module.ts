import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClienteAddEditComponent } from './cliente-add-edit/cliente-add-edit.component';
import { ClienteComponent } from './cliente/cliente.component';
import { ClientesComponent } from './clientes/clientes.component';

const routes: Routes = [
  { path: '', component: ClientesComponent, pathMatch: 'full' }, //este componente será carregado como página inicial!
  { path: 'cliente/:id', component: ClienteComponent },
  { path: 'add', component: ClienteAddEditComponent },
  { path: 'cliente/edit/:id', component: ClienteAddEditComponent },
  { path: '**', redirectTo: '/' } //caso algum caminho inválido seja invocado, redirecionar para página inicial
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
