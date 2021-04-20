import { Injectable } from '@angular/core';
import { TipoNegocio } from '../models/tipo-negocio';

import { TIPOSNEGOCIO, TIPONEGOCIO, CATEGORIAS } from '../models/tipo-negocio.json';
import {Observable, of} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TipoNegocioService {

  private urlEndPoint:string = 'url';

  constructor(private http: HttpClient) { }

  getTipoNegocio(): Observable <TipoNegocio []>{
    return of(TIPOSNEGOCIO);
    //return this.http.get<TipoNegocio []>(this.urlEndPoint);
  }
  getTipoNegocioSingle(id: any): Observable <TipoNegocio>{
    return of(TIPONEGOCIO);
    //return this.http.get<TipoNegocio>(this.urlEndPoint);
  }
  
}
