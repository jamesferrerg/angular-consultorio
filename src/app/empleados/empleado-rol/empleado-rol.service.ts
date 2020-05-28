import { Injectable } from '@angular/core';
import { Empleado } from '../empleado';
import { EmpleadoRol } from './empleadoRol';
import { Observable, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { map, tap, catchError } from 'rxjs/operators';
import { Rol } from './rol';


@Injectable({
  providedIn: 'root'
})
export class EmpleadoRolService {

  private urlEndPoint: string = 'http://localhost:8080/api/perfiles';

  constructor(private http: HttpClient, private router: Router) { }

  getEmpleadosRol(): Observable<EmpleadoRol[]>{

    return this.http.get(this.urlEndPoint).pipe(
      map (response => response as EmpleadoRol[])
    );
  }

  getRoles(): Observable<Rol[]>{
    return this.http.get<Rol[]>(this.urlEndPoint + '/roles');
  }
  
  getEmpleados(): Observable<Empleado[]>{
    return this.http.get<Empleado[]>(this.urlEndPoint + '/usuarios');
  }

  filtrarEmpleados(term1: string): Observable<Empleado[]>{
    return this.http.get<Empleado[]>(this.urlEndPoint + '/filtrar-empleados' + `/${term1}`);
  }

  create(empleadoRol: EmpleadoRol): Observable<EmpleadoRol> {

    return this.http.post(this.urlEndPoint, empleadoRol).pipe(
      map( (response: any) => response.empleadoRol as EmpleadoRol),
      catchError( e => {
        if (e.status == 400){
          return throwError(e);
        }
        if (e.error.mensaje){
          console.error(e.error.mensaje);
        }
        return throwError(e);
      })
    );
  }

  delete(idEmpleadoRol: number): Observable<EmpleadoRol>{
    return this.http.delete<EmpleadoRol>(`${this.urlEndPoint}/${idEmpleadoRol}`).pipe(
      catchError(e => {
        if (e.error.mensaje) {
          console.error(e.error.mensaje);
        }
        return throwError(e);
      })
    );
  }
}