import { Component, OnInit } from '@angular/core';
import { Negocio} from '../models/negocio';
import { TipoNegocio} from '../models/tipo-negocio';
import { NegocioService } from '../services/negocio.service';
import { TipoNegocioService } from '../services/tipo-negocio.service';
import swal from 'sweetalert2';
import {Router} from '@angular/router';


@Component({
  selector: 'app-registrar-negocio',
  templateUrl: './registrar-negocio.component.html',
  styleUrls: ['./registrar-negocio.component.css', '../../assets/css/styles1.css']
})
export class RegistrarNegocioComponent implements OnInit {

  tipo_selected: any= 'Tipo de Negocio';
  public negocio: Negocio = new Negocio();
  tipoNegocio : TipoNegocio[];
  constructor(private negocioService: NegocioService, private router: Router, private tipoNegocioService: TipoNegocioService) { }

  ngOnInit(): void {
    this.obtenerTipos();
  }

  public insertarNegocio():void{
    this.negocio.imagen="tienda.png"
    this.negocioService.insertarNegocio(this.negocio).subscribe(
      negocio => {
        //swal.fire('Nuevo negocio',`${negocio.username}`,'success')
        swal.fire({
          //position: 'top-end',
          icon: 'success',
          title: 'Se ha registrado con éxito',
          showConfirmButton: false,
          timer: 2000
        })
        localStorage.setItem("user",negocio.id);
        localStorage.setItem("username",negocio.username);
        this.router.navigate(['mitienda/productos']);

      }
      
    )
  }

  obtenerTipos(): void{
    this.tipoNegocioService.getTipoNegocio().subscribe(
      tipoNegocio => this.tipoNegocio = tipoNegocio
    )

  }

  click(id: any, name: any): void {
    this.negocio.tn = id;
    this.tipo_selected = name;

  }

}
