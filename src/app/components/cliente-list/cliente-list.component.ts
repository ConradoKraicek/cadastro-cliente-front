import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, Router } from '@angular/router';
import { Cliente, ClienteService } from '../../services/cliente.service';

@Component({
  selector: 'app-cliente-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './cliente-list.component.html',
  styleUrl: './cliente-list.component.css',
})
export class ClienteListComponent implements OnInit {
  clientes: Cliente[] = [];

  constructor(private clienteService: ClienteService, private router: Router) {}

  ngOnInit(): void {
    this.carregarClientes();
  }

  carregarClientes(): void {
    this.clienteService.listar().subscribe((data: Cliente[]) => (this.clientes = data));
  }

  editarCliente(id: number): void {
    this.router.navigate(['/clientes/editar', id]);
  }
  excluirCliente(id: number): void {
    if (confirm('Tem certeza que deseja excluir este cliente?')) {
      this.clienteService.excluir(id).subscribe(() => {
        this.carregarClientes();
      });
    }
  }

  novoCliente(): void {
    this.router.navigate(['/clientes/novo']);
  }
}
