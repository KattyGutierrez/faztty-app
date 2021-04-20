import {TipoNegocio} from './tipo-negocio';
import {Negocio} from './negocio';
import {Producto} from './producto';
import {Categoria} from './categoria';
export const TIPOSNEGOCIO: TipoNegocio[] = [
   { id : 1, nombre: 'nombre 1', descripcion: 'descripcion 1'},
   { id : 2, nombre: 'nombre 2', descripcion: 'descripcion 2'}
];
export const TIPONEGOCIO: TipoNegocio = 
   { id : 1, nombre: 'nombre 1', descripcion: 'descripcion 1'};

   export const NEGOCIOS: Negocio[] = [
      { id: 1, RUC : 1, nombre: 'negocio 1', puntuacion: 3, imagen: 'aaa1', direccion: 'direccion 1', tipoNegocio:{ id : 1, nombre: 'nombre 1', descripcion: 'descripcion 1'}},
      { id: 2, RUC : 2, nombre: 'negocio 2', puntuacion: 2, imagen: 'aaa2', direccion: 'direccion 2', tipoNegocio:{ id : 1, nombre: 'nombre 1', descripcion: 'descripcion 1'}}
   ];

   export const NEGOCIOS2: Negocio[] = [
      { id: 3, RUC : 3, nombre: 'negocio 3', puntuacion: 3, imagen: 'aaa3', direccion: 'direccion 3', tipoNegocio:{ id : 2, nombre: 'nombre 2', descripcion: 'descripcion 2'}},
      { id: 4, RUC : 4, nombre: 'negocio 4', puntuacion: 4, imagen: 'aaa4', direccion: 'direccion 4', tipoNegocio:{ id : 2, nombre: 'nombre 2', descripcion: 'descripcion 2'}}
   ];

   export const NEGOCIO: Negocio = 
      { id: 1, RUC : 1, nombre: 'negocio 1', puntuacion: 3, imagen: 'aaa1', direccion: 'direccion 1', tipoNegocio:{ id : 1, nombre: 'nombre 1', descripcion: 'descripcion 1'}};

   


      export const PRODUCTOS: Producto[] = [
         { id: 1, nombre: 'producto 1', marca: 'marca 1', precio: 1, puntuacion: 3, imagen: 'pp1', negocio: NEGOCIO, categoria: {id: 1, nombre: 'catego 1', descripcion:'descr 1'} },
         { id: 2, nombre: 'producto 2', marca: 'marca 2', precio: 2, puntuacion: 2, imagen: 'pp2', negocio: NEGOCIO, categoria: {id: 2, nombre: 'catego 2', descripcion:'descr 2'} }
      ]; 

      export const CATEGORIAS: Categoria[] = [
         {id: 1, nombre: 'catego 1', descripcion:'descr 1'},
         {id: 2, nombre: 'catego 2', descripcion:'descr 2'}
      ]
      export const PRODUCTOS_CATEGORIA: Producto[] = [
         { id: 2, nombre: 'producto 2', marca: 'marca 2', precio: 2, puntuacion: 2, imagen: 'pp2', negocio: NEGOCIO, categoria: {id: 2, nombre: 'catego 2', descripcion:'descr 2'} }
      ]; 
