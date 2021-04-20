import { Component, OnInit } from '@angular/core';
import {TipoNegocio} from '../models/tipo-negocio';
import {Negocio} from '../models/negocio';
import {NegocioService} from '../services/negocio.service';
import {TipoNegocioService} from '../services/tipo-negocio.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html'
})
export class PrincipalComponent implements OnInit {

  user: any; 
  tipoNegocio: TipoNegocio[]=[{id: 0, nombre: 'nombre', descripcion: 'descripcion'}];
  singleTipo: TipoNegocio = {id: 0, nombre: 'nombre', descripcion: 'descripcion'} ;
  singleTipoId: number = 1;
  negocios: Negocio[];
  constructor(private tipoNegocioService: TipoNegocioService,
    private negocioService: NegocioService,
    private router: Router) {}


  ngOnInit(): void {
    this.user = localStorage.getItem("user");
    this.tipoNegocioService.getTipoNegocio().subscribe(
      tipoNegocio => this.tipoNegocio = tipoNegocio
    )
    this.obtenerTipo();
    this.obtenerNegocio(); 
  }

  obtenerTipo(): void{
    this.tipoNegocioService.getTipoNegocioSingle(this.singleTipoId).subscribe(
      tipoNegocio => this.singleTipo = tipoNegocio
    )
  }
  obtenerNegocio(): void{
    this.negocioService.getNegocio(this.singleTipoId).subscribe(
      negocios => this.negocios = negocios
    )
  }
  click(tipo_id: any): void{
    this.singleTipoId = tipo_id;
    this.obtenerTipo();
    this.obtenerNegocio(); 
  }

  ver(negocio_id: any): void{
    localStorage.setItem("negocio", negocio_id);
    this.router.navigate(['productos']);
    
  }

  calculaSrc(imagen: any): any{
    return '../assets/img/'+imagen;
  }


}
