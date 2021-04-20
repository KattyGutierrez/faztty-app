import { Injectable } from '@angular/core';
import { Negocio } from '../models/negocio';
import { Producto } from '../models/producto';
import {  CATEGORIAS,} from '../models/tipo-negocio.json';
import { Categoria } from '../models/categoria';
import {Observable, of} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class NegocioService {

  private urlEndPoint:string = 'http://faztty-back.herokuapp.com/faztty-ms/';

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
}
