import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Categoria } from 'src/app/models/categoria';
import { Producto } from 'src/app/models/producto';
import { NegocioService } from 'src/app/services/negocio.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-agregar-producto',
  templateUrl: './agregar-producto.component.html',
  styleUrls: ['./agregar-producto.component.css','../../../assets/css/styles2.css']
})
export class AgregarProductoComponent implements OnInit {

  user: any;
  cat_selected: any= 'Elegir';
  producto: Producto = new Producto();
  categorias: Categoria[];
  constructor(private negocioService: NegocioService, private router: Router) { }

  ngOnInit(): void {
    this.user = localStorage.getItem("user");
  }
  ngAfterContentInit(): void{
    this.obtenerCategorias(); 
  }

  public insertarProducto():void{
    console.log("Agregando Producto ...");
    this.negocioService.insertarProducto(this.producto, this.user).subscribe(
      producto => {
        //swal.fire('Nuevo negocio',`${negocio.username}`,'success')
        Swal.fire({
          //position: 'top-end',
          icon: 'success',
          title: 'Se ha agregado con éxito',
          showConfirmButton: false,
          timer: 2000
        })
        this.router.navigate(['mitienda/productos']);
        console.log(producto);

      }
      
    )
  }
  obtenerCategorias(): void{
    this.negocioService.getCategorias().subscribe(
      categorias => this.categorias = categorias
    )
  }

  click(id: any, name: any): void {
    this.producto.catid = id;
    this.cat_selected = name;

  }


}
