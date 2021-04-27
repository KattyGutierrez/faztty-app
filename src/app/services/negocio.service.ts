import { Injectable } from '@angular/core';
import { Negocio } from '../models/negocio';
import { Producto } from '../models/producto';
import {  CATEGORIAS,} from '../models/tipo-negocio.json';
import { Categoria } from '../models/categoria';
import {Observable, of} from 'rxjs';
import {HttpClient, HttpHeaders, HttpRequest} from '@angular/common/http';
import {map} from 'rxjs/operators';
import { Foto } from '../models/foto';

@Injectable({
  providedIn: 'root'
})
export class NegocioService {

  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});
  //private urlEndPoint:string = 'http://faztty-back.herokuapp.com/faztty-ms/';
  private urlEndPoint:string = 'http://localhost:8010/faztty-ms/';
  constructor(private http: HttpClient) { }


  getNegocio(id_tipo: any): Observable <Negocio []>{

    console.log("Tipo_id: "+id_tipo);
    return this.http.get<Negocio[]>(this.urlEndPoint+'negocioByTipo/'+id_tipo);
  }
  getNegocioById(id: any): Observable <Negocio>{


    console.log(id);
    //return of(NEGOCIO);
    return this.http.get<Negocio>(this.urlEndPoint+'negocio/'+id);
  }

  getProductos(id: any): Observable <Producto []>{
    console.log(id);
    //return of(PRODUCTOS);
    return this.http.get<Producto []>(this.urlEndPoint+'productosByNegocio/'+id);
  }
  getCategorias(): Observable <Categoria []>{
    //return of(CATEGORIAS);
    return this.http.get<Categoria []>(this.urlEndPoint+'categoria');
  }
  getProductosCategoria(negocio_id: any, categoria_id:any):Observable <Producto []>{
    console.log("Negocio id: "+negocio_id+", Categoria id: "+categoria_id);
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

}
