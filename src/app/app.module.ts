import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { DirectivaComponent } from './directiva/directiva.component';
import { EmpleadosComponent } from './empleados/empleados.component';
import { EmpleadoService } from './empleados/empleado.service';
// usado para que todo cargue en una sola pagina
import { RouterModule, Routes} from '@angular/router';

const routes: Routes = [
  {path: '', redirectTo: '/empleados', pathMatch: 'full'},
  {path: 'directivas', component: DirectivaComponent},
  {path: 'empleados', component: EmpleadosComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    DirectivaComponent,
    EmpleadosComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes)
  ],
  providers: [EmpleadoService],
  bootstrap: [AppComponent]
})
export class AppModule { }
