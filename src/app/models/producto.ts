import { Negocio } from "./negocio";
import { Categoria } from "./categoria";

export class Producto {
    id : any;
    nombre: any;
    marca: any;
    precio: any;
    puntuacion: any;
    imagen: any;
    negocio: Negocio;
    categoria: Categoria;
    catid: any;
    imagen_blob: any;
    imagen_ruta: any;
    cantidad: any;
    subtotal: any;
}
