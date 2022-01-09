import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Foto } from '../models/foto';
import { Producto } from '../models/producto';
import { NegocioService } from '../services/negocio.service';

@Component({
  selector: 'upload-producto',
  templateUrl: './upload-producto.component.html',
  styleUrls: ['./upload-producto.component.css', '../../assets/css/styles2.css']
})
export class UploadProductoComponent implements OnInit {
  producto : Producto;
  producto_id: any;
  foto : File;
  foto_descargada : Foto;
  nombre_foto : any;


  constructor(private router: Router, private negocioService: NegocioService, private activatedRoute: ActivatedRoute, private _sanitizer : DomSanitizer) { }

  ngOnInit(): void {
    this.producto_id = localStorage.getItem("producto");
  }
  ngAfterContentInit(): void{
    if(this.producto_id != "0"){
      this.nombre_foto  = "../assets/img/producto.png";
      this.descargarFoto();
    }else{
      this.nombre_foto  = "../assets/img/producto.png";
    }
  }
/*  ngOnChanges() {
    this.descargarFoto();
    }  
*/

  seleccionarFoto(event){
    this.foto = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(this.foto);
    reader.onload = (e: any) =>{
      this.nombre_foto = this._sanitizer.bypassSecurityTrustResourceUrl(e.target.result);
    }
    if(this.foto.type.indexOf('image')<0){
      Swal.fire('Error: seleccionar imagen', 'El archivo debe ser de tipo imagen', 'error')
      this.foto = null;
    }
  }

  subirFoto(producto_id: any){
    

      this.negocioService.subirFotoProducto(this.foto, producto_id).subscribe(
        producto => { this.producto = producto;
          this.producto_id = producto_id;
          Swal.fire('La foto se ha subido completamente!', `La foto se ha subido con éxito: ${this.producto.imagen}`, 'success')
          
        }
        
      )
    
  }
  descargarFoto(){
    this.negocioService.descargarFotoProducto(this.producto_id).subscribe(
      foto => { this.foto_descargada = foto;
        if(foto.foto != "")
         this.nombre_foto = this._sanitizer.bypassSecurityTrustResourceUrl('data:imagen/jpg;base64,'+foto.foto);
 
        //this.router.navigate(['upload']);
      }
    )

  }




}
