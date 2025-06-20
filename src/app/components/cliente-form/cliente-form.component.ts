import { Component, OnInit } from '@angular/core';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ClienteService, Cliente } from '../../services/cliente.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cliente-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './cliente-form.component.html',
  styleUrl: './cliente-form.component.css',
})
export class ClienteFormComponent implements OnInit {
  form!: FormGroup;
  clienteId: number | null = null;
  isEditMode = false;

  constructor(
    private fb: FormBuilder,
    private clienteService: ClienteService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      nome: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
    });

    // Verificar se estamos em modo de edição
    this.clienteId = this.route.snapshot.params['id'];
    if (this.clienteId) {
      this.isEditMode = true;
      this.carregarCliente();
    }
  }

  carregarCliente(): void {
    if (this.clienteId) {
      this.clienteService.obterPorId(this.clienteId).subscribe((cliente) => {
        this.form.patchValue({
          nome: cliente.nome,
          email: cliente.email,
        });
      });
    }
  }

  onSubmit(): void {
    if (this.form.valid) {
      const cliente: Cliente = this.form.value;

      if (this.isEditMode && this.clienteId) {
        // Atualizar cliente existente
        this.clienteService.atualizar(this.clienteId, cliente).subscribe(() => {
          this.router.navigate(['/clientes']);
        });
      } else {
        // Criar novo cliente
        this.clienteService.criar(cliente).subscribe(() => {
          this.router.navigate(['/clientes']);
        });
      }
    }
  }
}
