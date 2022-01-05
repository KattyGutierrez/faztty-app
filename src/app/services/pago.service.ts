import { Injectable } from '@angular/core';
import {Observable, of} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {map} from 'rxjs/operators';
import { Venta } from '../models/venta';
import { MercadoPagoResponse } from '../models/mercado-pago-response';
import { MercadoPagoRequest } from '../models/mercado-pago-request';


@Injectable({
  providedIn: 'root'
})
export class PagoService {
  reqMercadoPago: MercadoPagoRequest= new MercadoPagoRequest();
  resMercadoPago: MercadoPagoRequest= new MercadoPagoRequest();
  private httpHeaders = new HttpHeaders({
    'Content-Type': 'application/json' ,
    'Authorization': 'Bearer TEST-6901511865574527-121202-9635b29e6a5e6e8357a44d2094eb2eda-1037580273'
    });

  private urlEndPointMP:string = 'https://api.mercadopago.com/checkout/preferences';
  private urlEndPoint:string = 'http://pachaa.herokuapp.com/pacha-ms/';
  constructor(private http: HttpClient) { }

  crearPaymentMercadoPago(id_venta: number): void {
    this.getRequestMercadoPago(id_venta);
  }

  getRequestMercadoPago(id_venta: number): void{
    //LLAMAR GET DEL BACK CON LA VENTA
    var id_venta=1;
    var resMercadoPago ;
    //console.log(reqMercadoPago)
    this.http.get<MercadoPagoRequest>(this.urlEndPoint+'mercadopago/2').subscribe(response=>{ 
        console.log(response);
        this.reqMercadoPago = response; 
        var obs = this.http.post<MercadoPagoRequest>(this.urlEndPointMP,this.reqMercadoPago,{headers: this.httpHeaders});
        obs.subscribe(res => {
          this.resMercadoPago = res;
          console.log(this.resMercadoPago);
          console.log(this.resMercadoPago.sandbox_init_point)
        });

     });
   }


 
}
