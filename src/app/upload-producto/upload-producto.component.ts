import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { Producto } from '../models/producto';
import { NegocioService } from '../services/negocio.service';

@Component({
  selector: 'upload-producto',
  templateUrl: './upload-producto.component.html',
  styleUrls: ['./upload-producto.component.css']
})
export class UploadProductoComponent implements OnInit {
  producto : Producto;
  producto_id: any;
  private foto : File;


  constructor(private negocioService: NegocioService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.producto_id = localStorage.getItem("producto_id");
  }
  ngAfterContentInit(): void{
    this.obtenerProducto();
  }

  obtenerProducto(): void{
    this.negocioService.getProducto(this.producto_id).subscribe(
      producto => {
        this.producto = producto;
        this.producto.catid = producto.categoria.id;
      }
    )


  }

  seleccionarFoto(event){
    this.foto = event.target.files[0];
    console.log(this.foto);
    if(this.foto.type.indexOf('image')<0){
      Swal.fire('Error: seleccionar imagen', 'El archivo debe ser de tipo imagen', 'error')
      this.foto = null;
    }
  }

  subirFoto(){
    /*this.negocioService.subirFotoProducto(this.foto, this.producto_id).subscribe(
      producto => { this.producto = producto;
        Swal.fire('La foto se ha subido completamente!', `La foto se ha subido con éxito: ${this.producto.imagen}`, 'success')
      }
    )*/
    if(!this.foto){
      Swal.fire('Error: Upload', 'Debe seleccionar una foto', 'error')
    }else{
    Swal.fire('La foto se ha subido completamente!', `La foto se ha subido con éxito: `, 'success');
    }
  }


}
