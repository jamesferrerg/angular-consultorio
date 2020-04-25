import { Injectable } from '@angular/core';
import { EMPLEADOS } from './empleados.json';
import { Empleado } from './empleado';
// se usa el observable para que funcione la clase de forma reactiva y asincrona
// el of para comvertir el arreglo en un observable
import { of, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmpleadoService {

  constructor() { }

  getEmpleados(): Observable<Empleado[]>{
    return of(EMPLEADOS);
  }
}
