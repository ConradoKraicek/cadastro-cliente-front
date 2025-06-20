import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { ClienteService } from '../../services/cliente.service';

@Component({
  selector: 'app-cliente-detalhe',
  templateUrl: './cliente-detalhe.component.html',
  styleUrls: ['./cliente-detalhe.component.css'],
  standalone: true,
  imports: [CommonModule, RouterModule],
})
export class ClienteDetalheComponent implements OnInit {
  cliente: any;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private clienteService: ClienteService
  ) {}
  ngOnInit(): void {
    // Lógica para carregar os detalhes do cliente
    const id = +this.route.snapshot.paramMap.get('id')!;
    this.clienteService
      .obterPorId(id)
      .subscribe((data) => (this.cliente = data));
  }

  editarCliente(): void {
    if (this.cliente) {
      this.router.navigate(['/clientes/editar', this.cliente.id]);
    }
  }
}
