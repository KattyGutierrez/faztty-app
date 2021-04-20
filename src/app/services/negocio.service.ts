import { Injectable } from '@angular/core';
import { Negocio } from '../models/negocio';
import { Producto } from '../models/producto';
import { NEGOCIOS, NEGOCIOS2, NEGOCIO, PRODUCTOS, CATEGORIAS, PRODUCTOS_CATEGORIA} from '../models/tipo-negocio.json';
import { Categoria } from '../models/categoria';
import {Observable, of} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class NegocioService {

  private urlEndPoint:string = 'url';

  constructor(private http: HttpClient) { }


  getNegocio(id_tipo: any): Observable <Negocio []>{

    console.log("Tipo_id: "+id_tipo);
    if(id_tipo == 1)
      return of(NEGOCIOS);
    else if(id_tipo==2)
    return of(NEGOCIOS2);
    //return this.http.get<Negocio[]>(this.urlEndPoint);
  }
  getNegocioById(id: any): Observable <Negocio>{


    console.log(id);
    return of(NEGOCIO);
    //return this.http.get<Negocio>(this.urlEndPoint);
  }

  getProductos(id: any): Observable <Producto []>{
    console.log(id);
    return of(PRODUCTOS);
    //return this.http.get<Negocio>(this.urlEndPoint);
  }
  getCategorias(): Observable <Categoria []>{
    return of(CATEGORIAS);
    //return this.http.get<TipoNegocio>(this.urlEndPoint);
  }
  getProductosCategoria(negocio_id: any, categoria_id:any):Observable <Producto []>{
    console.log("Negocio id: "+negocio_id+", Categoria id: "+categoria_id);
    return of(PRODUCTOS_CATEGORIA);
    //return this.http.get<Negocio>(this.urlEndPoint);
  }
}
