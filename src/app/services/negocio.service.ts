import { Injectable } from '@angular/core';
import { Negocio } from '../models/negocio';
import { Producto } from '../models/producto';
import {  CATEGORIAS,} from '../models/tipo-negocio.json';
import { Categoria } from '../models/categoria';
import {Observable, of} from 'rxjs';
import {HttpClient, HttpHeaders, HttpRequest} from '@angular/common/http';
import {map} from 'rxjs/operators';
import { Foto } from '../models/foto';
import { Venta } from '../models/venta';
import { MercadoPagoResponse } from '../models/mercado-pago-response';
import { MercadoPagoRequest } from '../models/mercado-pago-request';
import { VentaFinal } from '../models/venta-final';


@Injectable({
  providedIn: 'root'
})
export class NegocioService {

  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});
  private httpHeadersMP = new HttpHeaders({
    'Content-Type': 'application/json' ,
    'Authorization': 'Bearer TEST-6901511865574527-121202-9635b29e6a5e6e8357a44d2094eb2eda-1037580273'
    });
  private urlEndPoint:string = 'http://pachaa.herokuapp.com/pacha-ms/';
  private urlEndPointMP:string = 'https://api.mercadopago.com/checkout/preferences';
  //private urlEndPoint:string = 'http://localhost:8010/faztty-ms/';
  constructor(private http: HttpClient) { }
  response : MercadoPagoResponse;

  getNegocio(id_tipo: any): Observable <Negocio []>{

    return this.http.get<Negocio[]>(this.urlEndPoint+'negocioByTipo/'+id_tipo);
  }
  getNegocioById(id: any): Observable <Negocio>{

    //return of(NEGOCIO);
    return this.http.get<Negocio>(this.urlEndPoint+'negocio/'+id);
  }

  getProductos(id: any): Observable <Producto []>{

    //return of(PRODUCTOS);
    return this.http.get<Producto []>(this.urlEndPoint+'productosByNegocio/'+id);
  
  }
  getCategorias(): Observable <Categoria []>{
    //return of(CATEGORIAS);
    return this.http.get<Categoria []>(this.urlEndPoint+'categoria');
  }
  getProductosCategoria(negocio_id: any, categoria_id:any):Observable <Producto []>{

    //return of(PRODUCTOS_CATEGORIA);
    return this.http.get<Producto[]>(this.urlEndPoint+'productosByCategoria/'+negocio_id+'/'+categoria_id);
  }

  insertarNegocio(negocio: Negocio): Observable<Negocio>{
    return this.http.post<Negocio>(this.urlEndPoint+'registrar/n',negocio,{headers: this.httpHeaders});
  }
  insertarProducto(producto: Producto, id_negocio:any): Observable<Producto>{
    return this.http.post<Producto>(this.urlEndPoint+'nuevoProducto/'+id_negocio, producto);
  }

  getProducto(id: any): Observable <Producto>{

    return this.http.get<Producto>(this.urlEndPoint+'producto/'+id);
  }

  modificarProducto(producto: Producto, id_producto:any): Observable<Producto>{
    return this.http.post<Producto>(`${this.urlEndPoint}modificarProducto/${id_producto}`, producto);
  }

  subirFotoProducto(archivo: File, id): Observable<Producto>{
    let formData = new FormData();
    formData.append("archivo", archivo);
    formData.append("producto_id", id);
    return this.http.post<Producto>(this.urlEndPoint+'uploadFotoProducto', formData);
  }

  descargarFotoProducto(id): Observable<Foto>{
    return this.http.get<Foto>(this.urlEndPoint+'downloadFotoProducto/'+id);
  }

  deleteProducto(id_producto:any): Observable<Producto>{
    return this.http.delete<Producto>(this.urlEndPoint+'eliminarProducto/'+id_producto);
  }
  //////////////////////////////////////////////////////////////////
  crearPaymentMercadoPago(venta: Venta): void {

    var reqMercadoPago = this.getRequestMercadoPago(venta);
    //console.log(reqMercadoPago)
    var obs = this.http.post<MercadoPagoRequest>(this.urlEndPointMP,reqMercadoPago,{headers: this.httpHeadersMP})
    obs.subscribe(res => {this.response = res; console.log(this.response);});
  }
  getRequestMercadoPago(venta: Venta): MercadoPagoRequest{
    //LLAMAR GET DEL BACK CON LA VENTA
    var reqMercadoPago = new MercadoPagoRequest();
    var id_venta=1;
    var resMercadoPago;
    //console.log(reqMercadoPago)
    /*
    return Observable.create(observer => {
        observer.next(reqMercadoPago );
        observer.complete();
    });
    */
    this.http.get<MercadoPagoRequest>(this.urlEndPoint+'mercadoPago/1').subscribe(response=>{ console.log(response); resMercadoPago = response; });
    return reqMercadoPago;
  }

  registrarVenta(venta: VentaFinal): any{

    console.log(venta);
    var url = "https://sandbox.mercadopago.com.pe/checkout/v1/redirect?pref_id=1037580273-d9813ab2-efff-49e2-ac0a-6285b7ecc836"
 
    return url;

  }

}
