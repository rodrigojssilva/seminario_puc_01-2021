import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ClientesComponent } from './clientes/clientes.component';
import { ClienteComponent } from './cliente/cliente.component';
import { ClienteAddEditComponent } from './cliente-add-edit/cliente-add-edit.component';
import { ClienteService } from 'src/services/cliente.service';
import { HttpClientModule } from '@angular/common/http';
import * as ApiServiceProxies from 'src/services/service-proxies';
import { API_BASE_URL } from 'src/services/service-proxies';
import { environment } from 'src/environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    ClientesComponent,
    ClienteComponent,
    ClienteAddEditComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [
    { provide: API_BASE_URL, useFactory: getRemoteServiceBaseUrl },

    ClienteService,
    ApiServiceProxies.ClientesServiceProxy
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }

export function getRemoteServiceBaseUrl(): string {
  return environment.appUrl;
}