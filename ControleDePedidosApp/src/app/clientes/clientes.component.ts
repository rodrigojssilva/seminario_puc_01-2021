import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ClienteX } from 'src/models/cliente';
import { ClienteService } from 'src/services/cliente.service';
import { ClientesServiceProxy, Cliente } from 'src/services/service-proxies';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.scss']
})

export class ClientesComponent implements OnInit {
  clientes: any[] = [];
  cliente: Cliente = new Cliente();

  constructor(
    private clienteService: ClienteService,
    private clienteServiceProxie: ClientesServiceProxy
    ) {
  }

  ngOnInit(): void {
    this.loadClientes();
  }

  loadClientes() {
    this.clienteServiceProxie.getAllClientes()
    .subscribe((result: Cliente[]) => {
      this.clientes = result;
    });
  }

  delete(clienteId: number = 0) {
    const ans = confirm('Deseja realmente excluir o cliente: ' + clienteId);
    if (ans) {
      this.clienteService.deleteCliente(clienteId).subscribe((data) => {
        this.loadClientes();
      });
    }
  }
}
