import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { Usuario} from '../models/usuario';
import { UsuarioDatos} from '../models/usuario-datos';
import { UsuarioService } from '../services/usuario.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./login.component.css', '../../../assets/css/styles.css']
})
export class LoginComponent implements OnInit {


  public usuario: Usuario = new Usuario();
  public user: UsuarioDatos = new UsuarioDatos();
  constructor(private router: Router,  public modal: NgbModal, private usuarioService: UsuarioService) { }

  ngOnInit(): void {
  }

  public login():void{
    this.usuarioService.login(this.usuario).subscribe(
      usuario => {
        this.user =usuario;
        localStorage.setItem("user",usuario.id);
        localStorage.setItem("username",usuario.username);

        if(usuario.tipo=="C"){
          this.router.navigate(['principal/negocios']);
        }
        else if(usuario.tipo=="N"){
          this.router.navigate(['mitienda/productos']);
        }
       });
      
    

  }

  openSM(contenido){
    this.modal.open(contenido,{size:'md', centered: true,backdropClass:'azul', windowClass:'oscuro'})
  }


}
