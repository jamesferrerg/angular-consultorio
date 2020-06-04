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
import { RouterModule, Routes, CanActivate } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { registerLocaleData } from '@angular/common';
import localeES from '@angular/common/locales/es-CO';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { DetalleComponent } from './empleados/detalle/detalle.component';
import { LoginComponent } from './empleados/login.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AuthGuard } from './empleados/guards/auth.guard';
import { RoleGuard } from './empleados/guards/role.guard';
import { TokenInterceptor } from './empleados/interceptors/token.interceptor';
import { AuthInterceptor } from './empleados/interceptors/auth.interceptor';
import { EmpleadoRolComponent } from './empleados/empleado-rol/empleado-rol.component';

import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatCardModule} from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { RolFormComponent } from './empleados/empleado-rol/rol-form.component';
import { MiCuentaComponent } from './empleados/mi-cuenta.component';
import { CambiarDatosComponent } from './empleados/cambiar-datos.component';
import { CompareValidatorDirective } from './empleados/shared/compare-validator.directive';



registerLocaleData(localeES, 'es-CO');

const routes: Routes = [
  {path: '', redirectTo: '/empleados', pathMatch: 'full'},
  {path: 'directivas', component: DirectivaComponent},
  {path: 'empleados', component: EmpleadosComponent},
  {path: 'empleados/page/:page', component: EmpleadosComponent},
  {path: 'empleados/form', component: FormComponent, canActivate: [AuthGuard, RoleGuard], data: {role: 'ROLE_ADMIN'}},
  {path: 'empleados/form/:idEmpleado', component: FormComponent, canActivate: [AuthGuard, RoleGuard], data: {role: 'ROLE_ADMIN'}},
  {path: 'login', component: LoginComponent},
  {path: 'perfiles', component: EmpleadoRolComponent, canActivate: [AuthGuard, RoleGuard], data: {role: 'ROLE_ADMIN'}},
  {path: 'perfiles/form', component: RolFormComponent, canActivate: [AuthGuard, RoleGuard], data: {role: 'ROLE_ADMIN'}},
  {path: 'micuenta', component: MiCuentaComponent},
  {path: 'cambiar-datos', component: CambiarDatosComponent}
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
    DetalleComponent,
    LoginComponent,
    EmpleadoRolComponent,
    RolFormComponent,
    MiCuentaComponent,
    CambiarDatosComponent,
    CompareValidatorDirective
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(routes),
    BrowserAnimationsModule, MatDatepickerModule, MatMomentDateModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatInputModule,
    MatFormFieldModule,
    MatCardModule,
    MatButtonModule
  ],
  providers: [EmpleadoService,
    { provide: LOCALE_ID, useValue: 'es-CO' },
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },],
  bootstrap: [AppComponent]
})
export class AppModule { }
