import { Component, OnInit } from '@angular/core';
import { Categoria } from '../../models/categoria';
import { Negocio } from '../../models/negocio';
import {  Producto} from '../../models/producto';
import {NegocioService} from '../../services/negocio.service';
import {  NEGOCIO} from '../../models/tipo-negocio.json';
import { DomSanitizer } from '@angular/platform-browser';
import swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css', '../../../assets/css/styles.css']
})
export class ProductoComponent implements OnInit {

  negocio_id : any;
  categoria_id: any;
  productos : Producto [];
  negocio: Negocio = NEGOCIO ;
  productos_id: any;
  cantidad: any;
  
  categorias: Categoria []= [];
  constructor(private negocioService: NegocioService, public _sanitizer : DomSanitizer, private router: Router) {}

  ngOnInit(): void {
    this.negocio_id = localStorage.getItem("negocio");
    this.obtenerNegocioById();
    this.obtenerProductos();
    this.obtenerCategorias();

    this.productos_id = localStorage.getItem("productos_id");
    this.cantidad = localStorage.getItem("cantidad");

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

  agregarCarrito(producto_id: any): void{

    this.productos_id = localStorage.getItem("productos_id");
    this.cantidad = localStorage.getItem("cantidad");

    var arr_productos_id = this.productos_id.split(',');

    if (!arr_productos_id.includes(producto_id.toString())){
    
      if ( this.productos_id == null || this.productos_id == ''){
        localStorage.setItem("productos_id", producto_id);
        localStorage.setItem("cantidad", '1');
      }else{
        localStorage.setItem("productos_id", this.productos_id+','+producto_id);
        localStorage.setItem("cantidad", this.cantidad+',1');
      }   

      swal
      .fire({
          title: "Producto agregado con éxito",
          icon: 'success',
          showCancelButton: true,
          confirmButtonColor: '#aa4466',
          confirmButtonText: "Seguir Comprando",
          cancelButtonText: "Ir al carrito"
          
      })
      .then(resultado => {
          if (!resultado.value) {
            this.router.navigate(['principal/carrito']);
          }
      });

    }
    else{
      swal
      .fire({
          title: "El producto ya se encuentra en el carrito",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#aa4466',
          confirmButtonText: "Seguir Comprando",
          cancelButtonText: "Ir al carrito"
          
      })
      .then(resultado => {
          if (!resultado.value) {
            this.router.navigate(['principal/carrito']);
          }
      });
    }
  }
  

}
