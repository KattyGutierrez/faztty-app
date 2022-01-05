import {ItemMP} from './itemmp';
export class MercadoPagoRequest {
    description: any;
    external_reference: any;
    installments: any;
    items: ItemMP[];
    additional_info: any;
    metadata: any;
    order: any;
    payer: any;
    payment_method_id: any;
    transaction_amount: any;
    fee_details: any;
    sandbox_init_point: any;
    public constructor() {
    	/*
	    this.items= [   
	         {
	            "id": "0",
	            "picture_url": "",
	            "title": "Libro 1",
	            "description": "Libro 1",
	            "category_id": "",
	            "quantity": 1,
	            "currency_id": "PEN",
	            "unit_price": 10
	        }
        ];
        */
    }
}