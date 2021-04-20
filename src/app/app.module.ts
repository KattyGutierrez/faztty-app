import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { FooterComponent } from './footer/footer.component';
import { LoginComponent } from './login/login.component';
import { PrincipalComponent } from './principal/principal.component';
import { TipoNegocioService } from './services/tipo-negocio.service';
import { NegocioService } from './services/negocio.service';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import {  ReactiveFormsModule } from '@angular/forms';
import { ProductoComponent } from './producto/producto.component';
import { MitiendaComponent } from './mitienda/mitienda.component';


const routes: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'principal', component: PrincipalComponent},
  {path: 'productos', component: ProductoComponent},
  {path: 'mitienda', component: MitiendaComponent}

]

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    LoginComponent,
    PrincipalComponent,
    ProductoComponent,
    MitiendaComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(routes)
  ],
  providers: [TipoNegocioService, NegocioService],
  bootstrap: [AppComponent]
})
export class AppModule { }
