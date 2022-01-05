import { Component, OnInit } from '@angular/core';
import { Venta} from '../models/venta';
import { PagoService } from '../services/pago.service';
import { NegocioService } from 'src/app/services/negocio.service'
import {Router} from '@angular/router';
import swal from 'sweetalert2';

@Component({
  selector: 'app-mercado-pago',
  templateUrl: './mercado-pago.component.html',
  styleUrls: ['./mercado-pago.component.css', '../../assets/css/styles1.css']
})
export class MercadoPagoComponent implements OnInit {

  public venta: number;
  constructor(private pagoService: PagoService, private router: Router) { }

  ngOnInit(): void {
  }

  public crearPaymentMercadoPago():void{
    console.log("Ingresa a crear Payment Mercado Pago");
    this.pagoService.crearPaymentMercadoPago(this.venta);
  }
}
