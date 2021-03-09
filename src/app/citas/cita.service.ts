import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
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

  filtrarPacientes(term2: string): Observable<Paciente[]>{
    return this.http.get<Paciente[]>(this.urlEndPoint + '/filtrar-pacientes'+ `/${term2}`);
  }

  getEmpleados(): Observable<Empleado[]>{
    return this.http.get<Empleado[]>(this.urlEndPoint + '/empleados');
  }

  filtrarEmpleados(term1: string): Observable<Empleado[]>{
    return this.http.get<Empleado[]>(this.urlEndPoint + '/filtrar-empleados'+ `/${term1}`);
  }

  getServicios(): Observable<Servicio[]>{
    return this.http.get<Servicio[]>(this.urlEndPoint + '/servicios');
  }

  create(cita: Cita): Observable<Cita>{
    return this.http.post(this.urlEndPoint, cita).pipe(
      map( (response: any) => response.cita as Cita),
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

  delete(idCita: number): Observable<Cita>{
    return this.http.delete<Cita>(`${this.urlEndPoint}/${idCita}`).pipe(
      catchError(e => {
        if (e.error.mensaje){
          console.error(e.error.mensaje);
        }
        return throwError(e);
      })
    )
  }

  getCita(idCita): Observable<Cita>{
    return this.http.get<Cita>(`${this.urlEndPoint}/${idCita}`).pipe(
      catchError(e => {
        if(e.status != 401 && e.error.mensaje){
          this.router.navigate(['/citas']);
          console.error(e.error.mensaje);
        }
        return throwError(e);
      })
    );
  }

  update(cita: Cita): Observable<any>{
    return this.http.put<any>(`${this.urlEndPoint}/${cita.idCita}`, cita).pipe(
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

  listarPaginas(page: string, size: string): Observable<any>{
    const parametros = new HttpParams()
      .set('page', page)
      .set('size', size);
    return this.http.get<any>(`${this.urlEndPoint}/paginar`, {params: parametros} );
  }
}
