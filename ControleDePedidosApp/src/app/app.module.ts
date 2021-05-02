import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ClientesComponent } from './clientes/clientes.component';
import { ClienteComponent } from './cliente/cliente.component';
import { ClienteAddEditComponent } from './cliente-add-edit/cliente-add-edit.component';
import { ClienteService } from 'src/services/cliente.service';

@NgModule({
  declarations: [
    AppComponent,
    ClientesComponent,
    ClienteComponent,
    ClienteAddEditComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [
    ClienteService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
