import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Cliente {
  id: number;
  nome: string;
  email: string;
}

@Injectable({ providedIn: 'root' })
export class ClienteService {
  private API_URL = 'http://localhost:8080/api/clientes';

  constructor(private http: HttpClient) {}

  listar(): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(this.API_URL);
  }

  obterPorId(id: number): Observable<Cliente> {
    return this.http.get<Cliente>(`${this.API_URL}/${id}`);
  }
  criar(cliente: Cliente): Observable<Cliente> {
    return this.http.post<Cliente>(this.API_URL, cliente);
  }

  atualizar(id: number, cliente: Cliente): Observable<Cliente> {
    return this.http.put<Cliente>(`${this.API_URL}/${id}`, cliente);
  }

  excluir(id: number): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/${id}`);
  }
}
