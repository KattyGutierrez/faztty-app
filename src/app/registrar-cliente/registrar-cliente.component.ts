import { Component, OnInit } from '@angular/core';
import { Cliente} from '../models/cliente';
import { UsuarioService } from '../services/usuario.service';
import {Router} from '@angular/router';
import swal from 'sweetalert2';

@Component({
  selector: 'app-registrar-cliente',
  templateUrl: './registrar-cliente.component.html',
  styleUrls: ['./registrar-cliente.component.css', '../../assets/css/styles1.css']
})
export class RegistrarClienteComponent implements OnInit {

  public cliente: Cliente = new Cliente();
  constructor(private usuarioService: UsuarioService, private router: Router) { }

  ngOnInit(): void {
  }

  public insertarCliente():void{
    this.usuarioService.insertarCliente(this.cliente).subscribe(
      cliente => {
        //swal.fire('Nuevo cliente',`${cliente.username},${cliente.id} `,'success')
        swal.fire({
          //position: 'top-end',
          icon: 'success',
          title: 'Se ha registrado con éxito',
          showConfirmButton: false,
          timer: 2000
        })
        localStorage.setItem("user",cliente.id);
        localStorage.setItem("username",cliente.username);
        this.router.navigate(['principal/negocios']);

      }
      
    )
  }

}
