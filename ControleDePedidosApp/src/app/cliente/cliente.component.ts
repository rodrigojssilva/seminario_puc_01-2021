import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Cliente } from 'src/models/cliente';
import { ClienteService } from 'src/services/cliente.service';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.scss']
})
export class ClienteComponent implements OnInit {
  cliente: Observable<Cliente> = of();
  clienteId: number = 0;

  constructor(
    private clienteService: ClienteService,
    private avRoute: ActivatedRoute
  ) {
    const idParam = 'id';
    if (this.avRoute.snapshot.params[idParam]) { //recupera o id passado por parâmetro
      this.clienteId = this.avRoute.snapshot.params[idParam];
    }
  }

  ngOnInit() {
    this.loadCliente();
  }

  loadCliente() {
    this.cliente = this.clienteService.getCliente(this.clienteId);
  }

}
