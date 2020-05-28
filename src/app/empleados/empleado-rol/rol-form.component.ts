import { Component, OnInit } from '@angular/core';
import { EmpleadoRolService } from './empleado-rol.service';
import { ActivatedRoute, Router } from '@angular/router';
import { EmpleadoRol } from './empleadoRol';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, flatMap } from 'rxjs/operators';
import { Empleado } from '../empleado';
import { Rol } from './rol';
import swal from 'sweetalert2';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';

@Component({
  selector: 'app-rol-form',
  templateUrl: './rol-form.component.html',
  styleUrls: ['./rol-form.component.css']
})
export class RolFormComponent implements OnInit {

  public empleadoRol: EmpleadoRol =  new EmpleadoRol();
  roles: Rol[];
  autocompleteControl = new FormControl();
  usuariosFiltrados: Observable<Empleado[]>;
  errores: string[];

  constructor(private empleadoRolService: EmpleadoRolService,
    private activatedRoute: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.usuariosFiltrados = this.autocompleteControl.valueChanges
      .pipe(
        // map es convertir el objeto empleado al nombre del empleado en un valor string
        map(value => typeof value === 'string' ? value : value.nombre),
        // retorne un valor vacio []
        flatMap(value => value ? this._filter(value) : [])
      );
    this.empleadoRolService.getRoles().subscribe(roles =>
      this.roles = roles);
    
  }

  private _filter(value: string): Observable<Empleado[]> {
    const filterValue = value.toLowerCase();

    return this.empleadoRolService.filtrarEmpleados(filterValue);
  }

  mostrarNombre(empleado ?: Empleado): string | undefined {
    return empleado ? empleado.nombre + ' ' + empleado.apellido : undefined;
  }

  /*
  cargarEmpleadoRol(): void{
    this.activatedRoute.params.subscribe(params => {
      let idEmpleadoRol = params['idEmpleadoRol']
      if(idEmpleadoRol){
        this.empleadoRolService.getEmpleadosRol(idEmpleadoRol).subscribe((empleadoRol) => this.empleadoRol = empleadoRol);
      }
    });
  }*/

  // Aparezca en el select del editar
  compararRol(o1: Rol, o2: Rol): boolean{
    // la opcion de --- seleccionar ... ---
    if (o1 === undefined && o2 === undefined){
      return true;
    }
    // si cualquiera de los dos objetos es null retorna falso
    return o1 === null || o2 === null || o1 === undefined || o2 === undefined ? false : o1.idRol === o2.idRol;
  }

  seleccionarEmpleado(event: MatAutocompleteSelectedEvent): void {
    // value es generico y debe convertir en un objeto empleadorol
    let empleadoRol = event.option.value as EmpleadoRol;
  }

  create(): void {
    this.empleadoRolService.create(this.empleadoRol).subscribe(
      empleadoRol => {
        this.router.navigate(['/perfiles']);
        swal.fire('Nuevo perfil asignado', `Se ha asignado el perfil ${empleadoRol.rol.descripcion} con éxito`, 'success');
      },
      err => {
        this.errores = err.error.errors as string[];
        console.log('Código del error desde el backend: ' + err.status);
        console.log(err.error.errors);
      }
    )
  }

}
