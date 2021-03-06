import { Injectable } from '@angular/core';
import {Observable, of} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {map} from 'rxjs/operators';
import { Usuario } from '../models/usuario';
import { UsuarioDatos } from '../models/usuario-datos';
import { Cliente } from '../models/cliente';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'})


  private urlEndPoint:string = 'http://pachaa.herokuapp.com/pacha-ms/';
  //private urlEndPoint:string = 'http://localhost:8010/faztty-ms/';
  
  constructor(private http: HttpClient) { }

  insertarCliente(cliente: Cliente): Observable<Cliente>{
    return this.http.post<Cliente>(this.urlEndPoint+'registrar/c',cliente)
  }

  login(usuario: Usuario): Observable<UsuarioDatos>{
    return this.http.post<UsuarioDatos>(this.urlEndPoint+'autentica',usuario)
  }
  getCliente(id:any): Observable <Cliente>{
    return this.http.get<Cliente>(this.urlEndPoint+'comprador/'+id);
  }



  
}
