import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { DirectivaComponent } from './directiva/directiva.component';
import { EmpleadosComponent } from './empleados/empleados.component';
import { FormComponent } from './empleados/form.component';
import { PaginatorComponent } from './paginator/paginator.component';
import { EmpleadoService } from './empleados/empleado.service';
// usado para que todo cargue en una sola pagina
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { registerLocaleData } from '@angular/common';
import localeES from '@angular/common/locales/es-CO';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { DetalleComponent } from './empleados/detalle/detalle.component';


registerLocaleData(localeES, 'es-CO');

const routes: Routes = [
  {path: '', redirectTo: '/empleados', pathMatch: 'full'},
  {path: 'directivas', component: DirectivaComponent},
  {path: 'empleados', component: EmpleadosComponent},
  {path: 'empleados/page/:page', component: EmpleadosComponent},
  {path: 'empleados/form', component: FormComponent},
  {path: 'empleados/form/:idEmpleado', component: FormComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    DirectivaComponent,
    EmpleadosComponent,
    FormComponent,
    PaginatorComponent,
    DetalleComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(routes),
    BrowserAnimationsModule, MatDatepickerModule, MatMomentDateModule
  ],
  providers: [EmpleadoService, {provide: LOCALE_ID, useValue: 'es-CO' }],
  bootstrap: [AppComponent]
})
export class AppModule { }
