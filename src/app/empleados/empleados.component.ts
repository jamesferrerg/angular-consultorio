import { Component, OnInit } from '@angular/core';
import { Empleado } from './empleado';
import { EmpleadoService } from './empleado.service';
import swal from 'sweetalert2';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-empleados',
  templateUrl: './empleados.component.html'
})
export class EmpleadosComponent implements OnInit {

  empleados: Empleado[];

  constructor(public empleadoService: EmpleadoService) { }

  ngOnInit(): void {
    this.empleadoService.getEmpleados().pipe(
      // ejemplo cambiando los parametros en el subscribe y usarlo en el tap
      tap(empleados => this.empleados = empleados))
    .subscribe();
  }

  delete(empleado: Empleado): void{
    
    const swalWithBootstrapButtons = swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })
    
    swalWithBootstrapButtons.fire({
      title: 'Está seguro?',
      text: `¿Seguro que desea elminar el empleado ${empleado.nombre} ${empleado.apellido}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, eliminar!',
      cancelButtonText: 'No, cancelar!',
      reverseButtons: true
    }).then((result) => {
      if (result.value) {
        this.empleadoService.delete(empleado.idEmpleado).subscribe(
          response => {
            // Con lo siguiente se actualiza la lista de empleados
            this.empleados = this.empleados.filter( empl => empl !== empleado)
          }
        )
        swalWithBootstrapButtons.fire(
          'Empleado eliminado!',
          `Empleado ${empleado.nombre} ${empleado.apellido} fue eliminado con éxito.`,
          'success'
        )
      }
    })

  }

}
