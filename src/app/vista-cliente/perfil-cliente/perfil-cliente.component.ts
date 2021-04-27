import { Component, OnInit } from '@angular/core';
import { Cliente } from '../../models/cliente';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-perfil-cliente',
  templateUrl: './perfil-cliente.component.html',
  styleUrls: ['./perfil-cliente.component.css', '../../../assets/css/styles1.css']
})
export class PerfilClienteComponent implements OnInit {

  user: any;
  cliente: Cliente;
  constructor(private usuarioService: UsuarioService) { }

  ngOnInit(): void {
    this.user = localStorage.getItem("user");
  }
  ngAfterContentInit(): void{
    this.obtenerCliente(); 
  }
  obtenerCliente(): void{
    this.usuarioService.getCliente(this.user).subscribe(
      cliente => this.cliente = cliente
    )
  }

}
