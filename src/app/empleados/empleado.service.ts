import { Injectable } from '@angular/core';
import { Empleado } from './empleado';
// se usa el observable para que funcione la clase de forma reactiva y asincrona
// el of para comvertir el arreglo en un observable
import { of, Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EmpleadoService {

  private urlEndPoint:string = 'http://localhost:8080/api/empleados';

  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});

  constructor(private http: HttpClient) { }

  getEmpleados(): Observable<Empleado[]>{
    /* convertir o cast ya que es un observable con <Empleado[]>
    return this.http.get<Empleado[]>(this.urlEndPoint); */

    /* el operador map: permite convertir el tipo json se convierte o castea al tipo objeto
    por ejemplo el empleado */
    // metodo pipe nos permite agregar mas operadores
    return this.http.get(this.urlEndPoint).pipe(
      /* map permite convertir a un listado de empleados --- se toma response que 
      viene en un formato json y se convierte en un listado o arreglode empleados*/
      map (response => response as Empleado[])
    );
  }

  create(empleado: Empleado): Observable<Empleado>{
    return this.http.post<Empleado>(this.urlEndPoint, empleado, {headers: this.httpHeaders});
  }

  getEmpleado(idEmpleado): Observable<Empleado>{
    return this.http.get<Empleado>(`${this.urlEndPoint}/${idEmpleado}`);
  }

  update(empleado: Empleado) : Observable<Empleado>{
    return this.http.put<Empleado>(`${this.urlEndPoint}/${empleado.idEmpleado}`, empleado, {headers: this.httpHeaders});
  }

  delete(idEmpleado: number): Observable<Empleado>{
    return this.http.delete<Empleado>(`${this.urlEndPoint}/${idEmpleado}`, {headers: this.httpHeaders});
  }
}
