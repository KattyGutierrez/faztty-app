import { Component, OnInit, Input} from '@angular/core';
import {  Producto} from '../../models/producto';
import {  VentaFinal} from '../../models/venta-final';
import {NegocioService} from '../../services/negocio.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { DetalleVenta } from 'src/app/models/detalle-venta';




@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css', '../../../assets/css/styles3.css']

})
export class CarritoComponent implements OnInit {

  productos_id : any;
  cantidad : any;

  productos : Producto [];
  total : any = 0;

  url : string;
  @Input() safe_url : SafeResourceUrl;
  constructor(private negocioService: NegocioService, private router: Router,  public modal: NgbModal, public _sanitizer : DomSanitizer) { }


  ngOnInit(): void {

    this.productos_id = localStorage.getItem("productos_id");
    this.cantidad = localStorage.getItem("cantidad");
    this.obtenerProductos();

  }

  async obtenerProductos(): Promise<void>{

    var arr_productos_id = this.productos_id.split(','); 
    var arr_cantidad  = this.cantidad.split(','); 

    this.total = 0;
    
    this.productos = []

    for (var i in arr_productos_id){


      var var_producto = await new Promise<Producto>(resolve => 
        this.negocioService.getProducto(arr_productos_id[i]).subscribe(
        
        
          producto => { 
            producto.cantidad = arr_cantidad[i];;
            producto.subtotal = producto.cantidad*producto.precio;

            this.total = this.total + producto.subtotal;

            resolve(producto);
          }
        )
      )

      this.productos.push(var_producto);
    }

    this.total = this.total.toFixed(2);
    
  }

  eliminarProducto(producto: Producto) : void{
    this.productos_id = "";
    this.cantidad = "";
    this.total = 0;

    for (var i in this.productos){

      if (this.productos[i].id != producto.id){

        if ( this.productos_id == ""){
          this.productos_id = this.productos[i].id;
          this.cantidad = this.productos[i].cantidad;
        }else{

          this.productos_id = this.productos_id+","+this.productos[i].id;
          this.cantidad = this.cantidad+","+this.productos[i].cantidad;
          
        }

        this.productos[i].subtotal = this.productos[i].cantidad*this.productos[i].precio;

        this.total = this.total + this.productos[i].subtotal;
      }

    }

    localStorage.setItem("productos_id", this.productos_id);
    localStorage.setItem("cantidad", this.cantidad);

    this.productos = []

    this.ngOnInit();
  }

  changeCantidad() : void{

    this.productos_id = "";
    this.cantidad = "";
    this.total = 0;

    for (var i in this.productos){

      if ( this.productos_id == ""){
        this.productos_id = this.productos[i].id;
        this.cantidad = this.productos[i].cantidad;
      }else{

        this.productos_id = this.productos_id+","+this.productos[i].id;
        this.cantidad = this.cantidad+","+this.productos[i].cantidad;
        
      }

      this.productos[i].subtotal = this.productos[i].cantidad*this.productos[i].precio;

      this.total = this.total + this.productos[i].subtotal;

    }

    this.total = this.total.toFixed(2);

    localStorage.setItem("productos_id", this.productos_id);
    localStorage.setItem("cantidad", this.cantidad);

    
  }

  registrarVenta(contenido): void{

    var venta : VentaFinal = new VentaFinal ();
    var detalleVenta : DetalleVenta;

    venta.id_comprador = localStorage.getItem("user");

    venta.productos = []

    for (var i in this.productos){

      detalleVenta = new DetalleVenta();

      detalleVenta.cantidad = this.productos[i].cantidad;
      detalleVenta.id_producto = this.productos[i].id;

      venta.productos.push(detalleVenta);

    }


    //this.url = this.negocioService.registrarVenta(venta);
    this.negocioService.getRequestMercadoPagofromVentaFinal(venta).subscribe(responseReq=>{
      console.log(responseReq);
      this.negocioService.setReqMercadoPago(responseReq);
      this.negocioService.getResponseMercadoPagofromVentaFinal().subscribe(responseRes=>{
        this.negocioService.setResMercadoPago(responseRes);
        this.url=responseRes.sandbox_init_point;
        console.log(this.url);
        this.safe_url = this._sanitizer.bypassSecurityTrustResourceUrl(this.url);
        this.modal.open(contenido,{size:'xl', centered: true,backdropClass:'azul', windowClass:'oscuro', })

      })
    })

  }

  
  closeModal(): void{
    localStorage.setItem("productos_id", "");
    localStorage.setItem("cantidad", "");
    this.modal.dismissAll();
    this.router.navigate(['principal/negocios']);
  }


    


}
