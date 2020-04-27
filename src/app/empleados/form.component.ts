import { Component, OnInit } from '@angular/core';
import { Empleado } from './empleado';
import { EmpleadoService } from './empleado.service';
import { Router, ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html'
})
export class FormComponent implements OnInit {

  public empleado: Empleado = new Empleado();
  public titulo: string = "Crear empleado";

  constructor(private empleadoService: EmpleadoService,
    private router: Router,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.cargarEmpleado();
  }

  cargarEmpleado(): void{
    this.activatedRoute.params.subscribe(params => {
      let idEmpleado = params['idEmpleado']
      if(idEmpleado){
        this.empleadoService.getEmpleado(idEmpleado).subscribe((empleado) => this.empleado = empleado);
      }
    });
  }

  public create(): void{
    this.empleadoService.create(this.empleado).subscribe(
      // en esta parte se busca retornar al listado de empleados
      empleado => {
        this.router.navigate(['/empleados']);
        swal.fire('Nuevo empleado', `Empleado ${empleado.nombre} ha sido creado con éxito!`, 'success');
      }
    );
  }

  update(): void{
    this.empleadoService.update(this.empleado).subscribe(
      empleado => {
        this.router.navigate(['/empleados']);
        swal.fire('Empleado actualizado', `Empleado ${empleado.nombre} ha sido actualizado!`, 'success');
      }
    );
  }

}
