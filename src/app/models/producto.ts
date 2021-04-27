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
}
