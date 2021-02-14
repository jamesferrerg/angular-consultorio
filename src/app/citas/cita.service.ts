import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Cita } from './cita';
import { Paciente } from '../pacientes/paciente';
import { Empleado } from '../empleados/empleado';
import { Servicio } from '../entity/servicio';

@Injectable({
  providedIn: 'root'
})
export class CitaService {

  private urlEndPoint: string = 'http://localhost:8080/api/citas';

  constructor(private http: HttpClient, private router: Router) { }

  getCitas(): Observable<Cita[]>{

    return this.http.get(this.urlEndPoint).pipe(
      map (response => response as Cita[])
    );
  }

  getPacientes(): Observable<Paciente[]>{
    return this.http.get<Paciente[]>(this.urlEndPoint + '/pacientes');
  }

  getEmpleados(): Observable<Empleado[]>{
    return this.http.get<Empleado[]>(this.urlEndPoint + '/empleados');
  }

  getServicios(): Observable<Servicio[]>{
    return this.http.get<Servicio[]>(this.urlEndPoint + '/servicios');
  }
}
