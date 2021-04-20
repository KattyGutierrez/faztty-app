import { Component, OnInit } from '@angular/core';
import { Categoria } from '../models/categoria';
import { Negocio } from '../models/negocio';
import {  Producto} from '../models/producto';
import {NegocioService} from '../services/negocio.service';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css']
})
export class ProductoComponent implements OnInit {

  negocio_id : any;
  categoria_id: any;
  productos : Producto [] = [];
  negocio: Negocio = null;
  categorias: Categoria [];
  constructor(private negocioService: NegocioService) { }

  ngOnInit(): void {
    this.negocio_id = localStorage.getItem("negocio");
    console.log("negocio_id: "+this.negocio_id);
    this.obtenerNegocioById();
    this.obtenerProductos();
    this.obtenerCategorias();

  }
  obtenerNegocioById(): void{
    this.negocioService.getNegocioById(this.negocio_id).subscribe(
      negocio => this.negocio = negocio
    )
  }
  obtenerProductos(): void{
    this.negocioService.getProductos(this.negocio_id).subscribe(
      productos => this.productos = productos
    )
  }
  obtenerCategorias(): void{
    this.negocioService.getCategorias().subscribe(
      categorias => this.categorias = categorias
    )
  }
  obtenerProductosCategoria(): void{
    this.negocioService.getProductosCategoria(this.negocio_id, this.categoria_id).subscribe(
      productos => this.productos = productos
    )
  }
  click(categoria_id): void{
    this.categoria_id=categoria_id;
    this.obtenerProductosCategoria();

  }
  calculaSrc(imagen: any): any{
    return '../assets/img/'+imagen;
  }
  

}
