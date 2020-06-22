import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { Paciente } from './paciente';
import { map, catchError, filter } from 'rxjs/operators';
import { TipoIdentificacion } from '../empleados/tipoIdentificacion';
import { Sexo } from '../empleados/sexo';
import { Departamento } from '../entity/departamento';

@Injectable({
  providedIn: 'root'
})
export class PacienteService {

  private urlEndPoint:string = 'http://localhost:8080/api/pacientes';

  constructor(private http: HttpClient, private router: Router) { }

  getPacientes(): Observable<Paciente[]>{

    return this.http.get(this.urlEndPoint).pipe(
      map (response => response as Paciente[])
    );
  }

  getTipoIdentificacion(): Observable<TipoIdentificacion[]>{
    return this.http.get<TipoIdentificacion[]>(this.urlEndPoint + '/tiposIdentificacion');
  }

  getSexo(): Observable<Sexo[]>{
    return this.http.get<Sexo[]>(this.urlEndPoint + '/sexos');
  }

  getLugarNacimiento(): Observable<Departamento[]>{
    return this.http.get<Departamento[]>(this.urlEndPoint + '/departamentos').pipe(
      map(lugaresNacimiento => lugaresNacimiento as Departamento[])
    );
  }

  create(paciente: Paciente): Observable<Paciente> {

    return this.http.post(this.urlEndPoint, paciente).pipe(
      map( (response: any) => response.paciente as Paciente),
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

  delete(idPaciente: number): Observable<Paciente>{
    return this.http.delete<Paciente>(`${this.urlEndPoint}/${idPaciente}`).pipe(
      catchError(e => {
        if (e.error.mensaje) {
          console.error(e.error.mensaje);
        }
        return throwError(e);
      })
    )
  }

  getPaciente(idPaciente): Observable<Paciente>{
    return this.http.get<Paciente>(`${this.urlEndPoint}/${idPaciente}`).pipe(
      catchError(e => {
        if (e.status != 401 && e.error.mensaje){
          this.router.navigate(['/pacientes']);
          console.error(e.error.mensaje);
        }
        return throwError(e);
      })
    );
  }

  update(paciente: Paciente): Observable<any> {
    return this.http.put<any>(`${this.urlEndPoint}/${paciente.idPaciente}`, paciente).pipe(
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
}
