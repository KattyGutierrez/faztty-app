import { Component, OnInit } from '@angular/core';
import { Negocio } from 'src/app/models/negocio';
import { NegocioService } from 'src/app/services/negocio.service';

@Component({
  selector: 'app-perfil-negocio',
  templateUrl: './perfil-negocio.component.html',
  styleUrls: ['./perfil-negocio.component.css', '../../../assets/css/styles1.css']
})
export class PerfilNegocioComponent implements OnInit {

  user: any;
  negocio: Negocio;
  constructor(private negocioService: NegocioService) { }

  ngOnInit(): void {
    this.user = localStorage.getItem("user");
  }

  ngAfterContentInit(): void{
    this.obtenerNegocio(); 
  }
  obtenerNegocio(): void{
    this.negocioService.getNegocioById(this.user).subscribe(
      negocio => this.negocio = negocio
    )
  }

}
