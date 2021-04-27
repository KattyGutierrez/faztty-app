import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { FooterComponent } from './footer/footer.component';
import { LoginComponent } from './login/login.component';
import { PrincipalComponent } from './vista-cliente/principal/principal.component';
import { TipoNegocioService } from './services/tipo-negocio.service';
import { NegocioService } from './services/negocio.service';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import {  ReactiveFormsModule } from '@angular/forms';
import { ProductoComponent } from './vista-cliente/producto/producto.component';
import { MitiendaComponent } from './vista-negocio/mitienda/mitienda.component';
import { RegistrarClienteComponent } from './registrar-cliente/registrar-cliente.component';
import {FormsModule} from '@angular/forms';
import { UploadProductoComponent } from './upload-producto/upload-producto.component';
import { RegistrarNegocioComponent } from './registrar-negocio/registrar-negocio.component';
import { PerfilClienteComponent } from './vista-cliente/perfil-cliente/perfil-cliente.component';
import { PerfilNegocioComponent } from './vista-negocio/perfil-negocio/perfil-negocio.component';
import { NavbarComponent } from './vista-cliente/navbar/navbar.component';
import { NavbarNegocioComponent } from './vista-negocio/navbar-negocio/navbar-negocio.component';
import { VistaClienteComponent } from './vista-cliente/vista-cliente.component';
import { VistaNegocioComponent } from './vista-negocio/vista-negocio.component';
import { AgregarProductoComponent } from './vista-negocio/agregar-producto/agregar-producto.component';
import { ModificarProductoComponent } from './vista-negocio/modificar-producto/modificar-producto.component';

const routes: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'principal', component: VistaClienteComponent,
  children: [
    { path: 'negocios', component: PrincipalComponent},
    { path: 'productos', component: ProductoComponent },
    {path: 'perfilCliente', component: PerfilClienteComponent}

  ]},
  
  {path: 'mitienda', component: VistaNegocioComponent,
  children: [
    { path: 'productos', component: MitiendaComponent },
    {path: 'perfil', component: PerfilNegocioComponent},
    {path: 'agregarProducto', component: AgregarProductoComponent},
    {path: 'modificarProducto', component: ModificarProductoComponent}

  ]},
  {path: 'registrarCliente', component: RegistrarClienteComponent},
  {path: 'registrarNegocio', component: RegistrarNegocioComponent},
  {path: 'upload', component: UploadProductoComponent},
 


]

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    LoginComponent,
    PrincipalComponent,
    ProductoComponent,
    MitiendaComponent,
    RegistrarClienteComponent,
    UploadProductoComponent,
    RegistrarNegocioComponent,
    PerfilClienteComponent,
    PerfilNegocioComponent,
    NavbarComponent,
    NavbarNegocioComponent,
    VistaClienteComponent,
    VistaNegocioComponent,
    AgregarProductoComponent,
    ModificarProductoComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [TipoNegocioService, NegocioService],
  bootstrap: [AppComponent]
})
export class AppModule { }
