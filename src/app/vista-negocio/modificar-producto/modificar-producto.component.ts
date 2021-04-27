import { Component, OnInit } from '@angular/core';
import { Producto } from 'src/app/models/producto';
import {Router, ActivatedRoute} from '@angular/router';
import { NegocioService } from 'src/app/services/negocio.service';
import { Categoria } from 'src/app/models/categoria';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modificar-producto',
  templateUrl: './modificar-producto.component.html',
  styleUrls: ['./modificar-producto.component.css', '../../../assets/css/styles2.css']
})
export class ModificarProductoComponent implements OnInit {

  cat_selected: any= 'Elegir';
  producto_id: any;
  user: any;
  producto: Producto= new Producto();
  categorias: Categoria[];
  constructor(private negocioService: NegocioService,
    private router: Router,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.producto_id = localStorage.getItem("producto");
    this.user = localStorage.getItem("user");
    
  }
  ngAfterContentInit(): void{
    this.obtenerProducto();
    this.obtenerCategorias(); 
  }

  obtenerProducto(): void{
    this.negocioService.getProducto(this.producto_id).subscribe(
      producto => {
        this.producto = producto;
        this.cat_selected = producto.categoria.nombre;
        this.producto.catid = producto.categoria.id;
      }
    )


  }

  modificarProducto(): void{
    console.log(this.producto);
    this.producto.categoria = null;
    this.producto.negocio = null;
    this.negocioService.modificarProducto(this.producto, this.producto_id).subscribe(
      producto => {
        //swal.fire('Nuevo negocio',`${negocio.username}`,'success')
        Swal.fire({
          //position: 'top-end',
          icon: 'success',
          title: 'Se ha actualizado el producto con éxito',
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
