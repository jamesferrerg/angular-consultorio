import { Component, OnInit } from '@angular/core';
import { Empleado } from './empleado';
import { EmpleadoService } from './empleado.service';

@Component({
  selector: 'app-empleados',
  templateUrl: './empleados.component.html'
})
export class EmpleadosComponent implements OnInit {

  empleados: Empleado[];

  constructor(public empleadoService: EmpleadoService) { }

  ngOnInit(): void {
    this.empleadoService.getEmpleados().subscribe(
      empleados => this.empleados = empleados
    );
  }

}
