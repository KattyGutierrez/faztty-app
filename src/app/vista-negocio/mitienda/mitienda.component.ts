import { Component, OnInit } from '@angular/core';
import { Categoria } from '../../models/categoria';
import { Negocio } from '../../models/negocio';
import {  Producto} from '../../models/producto';
import {NegocioService} from '../../services/negocio.service';
import {  NEGOCIO} from '../../models/tipo-negocio.json';
import { Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { Foto } from 'src/app/models/foto';

@Component({
  selector: 'app-mitienda',
  templateUrl: './mitienda.component.html',
  styleUrls: ['./mitienda.component.css', '../../../assets/css/styles.css']
})
export class MitiendaComponent implements OnInit {

  user : any;
  username: any;
  categoria_id: any;
  productos : Producto [] ;
  negocio: Negocio = NEGOCIO;
  categorias: Categoria [];
  foto_i: Foto [];
  foto_name : any;
  cont : 0;

  constructor(private negocioService: NegocioService, private router: Router,public _sanitizer : DomSanitizer) { }

  ngOnInit(): void {
    this.user = localStorage.getItem("user");
    this.username = localStorage.getItem("username");
    

  }
  ngAfterContentInit(): void{
    this.obtenerNegocioById();
    this.obtenerProductos();
    this.obtenerCategorias(); 
    
  }
 


  obtenerNegocioById(): void{
    this.negocioService.getNegocioById(this.user).subscribe(
      negocio => this.negocio = negocio
    )
    
  }

  
  obtenerProductos(): void{
    this.negocioService.getProductos(this.user).subscribe(
      productos => {

        this.productos = productos
        console.log(productos)
      }
    );
    
    
  }
  obtenerCategorias(): void{
    this.negocioService.getCategorias().subscribe(
      categorias => this.categorias = categorias
    )
  }
  obtenerProductosCategoria(): void{
    this.negocioService.getProductosCategoria(this.user, this.categoria_id).subscribe(
      productos => this.productos = productos
    )
  }
  click(categoria_id): void{
    this.categoria_id=categoria_id;
    this.obtenerProductosCategoria();

  }

  editar(producto_id: any): void{
    localStorage.setItem("producto", producto_id);
    this.router.navigate(['mitienda/modificarProducto']);

  }


}
