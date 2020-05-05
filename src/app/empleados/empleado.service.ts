import { Injectable } from '@angular/core';
import { formatDate, DatePipe} from '@angular/common';
import { Empleado } from './empleado';
import { TipoIdentificacion } from './tipoIdentificacion';
// se usa el observable para que funcione la clase de forma reactiva y asincrona
// el of para comvertir el arreglo en un observable
import { of, Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, catchError, tap } from 'rxjs/operators';
import swal from 'sweetalert2';

import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class EmpleadoService {

  private urlEndPoint:string = 'http://localhost:8080/api/empleados';

  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});

  constructor(private http: HttpClient, private router: Router) { }

  getEmpleados(page: number): Observable<any>{
    /* convertir o cast ya que es un observable con <Empleado[]>
    return this.http.get<Empleado[]>(this.urlEndPoint); */

    /* el operador map: permite convertir el tipo json se convierte o castea al tipo objeto
    por ejemplo el empleado */
    // metodo pipe nos permite agregar mas operadores
    return this.http.get(this.urlEndPoint + '/page/' + page ).pipe(
      /* Tap: para poder realizar alguna tarea con los valores o items, es decir realizar 
      alguna tarea, proceso pero sin modificar lo valores en si mismo. Ej: guardar algo o 
      registar estos datos en log o asignar a un atributo de la clase */
      tap((response: any) => {
        // se realiza el cast response as Empleado[]
        (response.content as Empleado[]).forEach( empleado => {
          console.log(empleado.nombre);
        });
      }),
      /* map permite convertir a un listado de empleados --- se toma response que 
      viene en un formato json y se convierte en un listado o arreglode empleados*/
      map ((response: any) => {
        (response.content as Empleado[]).map(empleado => {
          // se crea una instancia para datepipe
          // let datePipe = new DatePipe('es-CO');
          // empleado.fechaContrato = datePipe.transform(empleado.fechaContrato, 'dd MMMM, yyyy'); // formatDate(empleado.fechaContrato, 'dd-MM-yyyy', 'en-US');
          return empleado;
        });
        return response;
      })
    );
  }

  // para que sea flexible y el manejo de error cambie <Empleado> por <any>
  /* otra opcion y continuar con el manejo de empleado observable retornar el mismo tipo de dato,
  se debe convertir mi json lo que esta reotrnando en un observable tipo empleado. Para convertir
  una respuesta que viene desde el servidor se tiene que utilizar el operador MAP */
  create(empleado: Empleado): Observable<Empleado>{
    return this.http.post(this.urlEndPoint, empleado, {headers: this.httpHeaders}).pipe(
      // Se convierte el atributo empleado en el objeto Empleado
      map( (response: any) => response.empleado as Empleado),
      // Tambien el catchError permite manejas los errores que vienen con algun codigo del http
      catchError(e =>{
        // Controlar los tipos de errores con el if
        // el objeto error es e
        if(e.status==400){
          return throwError(e);
        }

        console.error(e.error.mensaje);
        swal.fire(e.error.mensaje, e.error.error, 'error');
        // retornar el objeto excepcion o error pero convertido en un observable
        return throwError(e);
      })
    );
  }

  getEmpleado(idEmpleado): Observable<Empleado>{
    return this.http.get<Empleado>(`${this.urlEndPoint}/${idEmpleado}`).pipe(
      catchError(e => {

        if(e.status==400){
          return throwError(e);
        }

        // redirigir al cliente luego de capturar el error
        this.router.navigate(['/empleados']);
        console.error(e.error.mensaje);
        // mensaje es el atributo que se tiene en el backend
        swal.fire('Error al editar', e.error.mensaje, 'error');
        // para convertir un observable a traves de throwError
        return throwError(e);
      })
    );
  }

  update(empleado: Empleado): Observable<any>{
    return this.http.put<any>(`${this.urlEndPoint}/${empleado.idEmpleado}`, empleado, {headers: this.httpHeaders}).pipe(
      catchError(e => {
        console.error(e.error.mensaje);
        swal.fire(e.error.mensaje, e.error.error, 'error');
        // retornar el objeto excepcion o error pero convertido en un observable
        return throwError(e);
      })
    );
  }

  delete(idEmpleado: number): Observable<Empleado>{
    return this.http.delete<Empleado>(`${this.urlEndPoint}/${idEmpleado}`, {headers: this.httpHeaders}).pipe(
      catchError(e => {
        console.error(e.error.mensaje);
        swal.fire(e.error.mensaje, e.error.error, 'error');
        // retornar el objeto excepcion o error pero convertido en un observable
        return throwError(e);
      })
    );
  }

  subirFoto(archivo: File, idEmpleado): Observable<Empleado>{
    // para soportar el multipart/form-data de javascript
    let formData = new FormData();
    // mismo nombre del backend (archivo)
    formData.append("archivo", archivo);
    formData.append("idEmpleado", idEmpleado);
    // recordar convertir el observable y sea objeto o empleado con pipe
    return this.http.post(`${this.urlEndPoint}/upload`, formData).pipe(
      map( (response: any) => response.empleado as Empleado),
      catchError(e => {
        console.error(e.error.mensaje);
        swal.fire(e.error.mensaje, e.error.error, 'error');
        // retornar el objeto excepcion o error pero convertido en un observable
        return throwError(e);
      })
    );
  }

  getTipodIdentificacion(): Observable<TipoIdentificacion[]>{
    return this.http.get<TipoIdentificacion[]>(this.urlEndPoint + '/tiposIdentificacion');
  }
}
