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
  reqMercadoPago: MercadoPagoRequest= new MercadoPagoRequest();
  resMercadoPago: MercadoPagoRequest= new MercadoPagoRequest();
  private urlPago: string ="";

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

  getRequestMercadoPagofromVentaFinal(venta: VentaFinal): Observable<MercadoPagoRequest>{
    //this.urlPago = "https://sandbox.mercadopago.com.pe/checkout/v1/redirect?pref_id=1037580273-d9813ab2-efff-49e2-ac0a-6285b7ecc836"
    var obs1= this.http.post<MercadoPagoRequest>(this.urlEndPoint+'registrarVenta',venta)
    console.log(venta);
    return obs1;
  }
  getResponseMercadoPagofromVentaFinal(): Observable<MercadoPagoRequest>{
    var obs = this.http.post<MercadoPagoRequest>(this.urlEndPointMP,this.reqMercadoPago,{headers: this.httpHeadersMP})
    return obs
  }
  setReqMercadoPago(reqMercadoPago:MercadoPagoRequest){
    this.reqMercadoPago=reqMercadoPago;
  }
  setResMercadoPago(resMercadoPago:MercadoPagoRequest){
    this.resMercadoPago=resMercadoPago;
  }



  registrarVenta(venta: VentaFinal): any{
    this.getRequestMercadoPagofromVentaFinal(venta);
    var i=0;
    while(this.urlPago=="" && i <100000){
      console.log(i)
      i=i+1
    }
    console.log(this.urlPago)
    return this.urlPago
    //url=this.urlPago;
    //console.log(url);
    //return url;
  }

}
