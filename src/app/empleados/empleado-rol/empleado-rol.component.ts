import { Component, OnInit } from '@angular/core';
import { EmpleadoRol } from './empleadoRol';
import { AuthService } from '../auth.service';
import { ActivatedRoute } from '@angular/router';
import { EmpleadoRolService } from './empleado-rol.service';
import { tap } from 'rxjs/operators';
import swal from 'sweetalert2';

@Component({
  selector: 'app-empleado-rol',
  templateUrl: './empleado-rol.component.html',
  styleUrls: ['./empleado-rol.component.css']
})
export class EmpleadoRolComponent implements OnInit {

  empleadosRoles: EmpleadoRol[];

  constructor(public authService: AuthService, 
    public empleadoRolService: EmpleadoRolService, 
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    /*
    this.activatedRoute.paramMap.subscribe( params => {
      this.empleadoRolService.getEmpleadosRol().pipe(
        tap(response => {
          (response.content as EmpleadoRol[]).forEach(empleadoRol =>{});
        }))
        .subscribe(response => {
          this.empleadosRoles = response.content as EmpleadoRol[];
        });
    });
  }*/

    this.empleadoRolService.getEmpleadosRol().subscribe(
      empleadosRoles => this.empleadosRoles = empleadosRoles
    );
  }

  delete(empleadoRol: EmpleadoRol): void{
    const swalWithBootstrapButtons = swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    });
    swalWithBootstrapButtons.fire({
      title: 'Está seguro?',
      text: `¿Seguro que desea elminar el perfil de ${empleadoRol.empleado.nombre} ${empleadoRol.empleado.apellido}
      con perfil '${empleadoRol.rol.descripcion}'?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, eliminar!',
      cancelButtonText: 'No, cancelar!',
      reverseButtons: true
    }).then((result) => {
      if (result.value) {
        this.empleadoRolService.delete(empleadoRol.idEmpleadoRol).subscribe(
          response => {
            // Con lo siguiente se actualiza la lista de empleados
            this.empleadosRoles = this.empleadosRoles.filter( empl => empl !== empleadoRol);
          });
        swalWithBootstrapButtons.fire(
          'Perfil eliminado!',
          `El perfil ${empleadoRol.rol.descripcion} fue eliminado con éxito.`,
          'success'
        )}
    });
  }

}
