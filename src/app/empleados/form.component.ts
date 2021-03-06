import { Component, OnInit } from '@angular/core';
import { Empleado } from './empleado';
import { TipoIdentificacion } from './tipoIdentificacion';
import { Sexo } from './sexo';
import { EmpleadoService } from './empleado.service';
import { Router, ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';
import { Cargo } from './cargo';


@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  public empleado: Empleado = new Empleado();
  tiposIdentificacion: TipoIdentificacion[];
  sexos: Sexo[];
  cargos: Cargo[];
  public titulo: string = "Crear empleado";

  public errores: string[];
  public duplicado: string;

  constructor(private empleadoService: EmpleadoService,
    private router: Router,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.cargarEmpleado();
    this.empleadoService.getTipodIdentificacion().subscribe(tiposIdentificacion =>
      this.tiposIdentificacion = tiposIdentificacion);
    this.empleadoService.getSexo().subscribe(sexos =>
      this.sexos = sexos);
    this.empleadoService.getCargo().subscribe(cargos => 
      this.cargos = cargos);
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
      // cambiamos empleado para manejar un json
      empleado => {
        this.router.navigate(['/empleados']);
        swal.fire('Nuevo empleado', `El empleado ${empleado.nombre} ha sido creado con éxito!`, 'success');
      },
      err => {
        this.errores = err.error.errors as string[];
        console.log('Código del error desde el backend: ' + err.status);
        console.log(err.error.errors);
      }
    );
  }

  update(): void{
    this.empleadoService.update(this.empleado).subscribe(
      json => {
        this.router.navigate(['/empleados']);
        swal.fire('Empleado actualizado', `${json.mensaje}: ${json.empleado.nombre}`, 'success');
      },
      err => {
        this.errores = err.error.errors as string[];
        console.log('Código del error desde el backend: ' + err.status);
        console.log(err.error.errors);
      }
    );
  }

  // Aparezca en el select del editar
  compararIdentificacion(o1: TipoIdentificacion, o2: TipoIdentificacion): boolean{
    // la opcion de --- seleccionar ... ---
    if (o1 === undefined && o2 === undefined){
      return true;
    }
    // si cualquiera de los dos objetos es null retorna falso
    return o1 === null || o2 === null || o1 === undefined || o2 === undefined ? false : o1.idTipoIdentificacion === o2.idTipoIdentificacion;
  }

  compararSexo(sx1: Sexo, sx2: Sexo): boolean{
    if (sx1 === undefined && sx2 === undefined){
      return true;
    }
    // si cualquiera de los dos objetos es null retorna falso
    return sx1 === null || sx2 === null || sx1 === undefined || sx2 === undefined ? false : sx1.idSexo === sx2.idSexo;
  }

  compararCargo(cg1: Cargo, cg2: Cargo): boolean{
    if (cg1 === undefined && cg2 === undefined){
      return true;
    }
    // si cualquiera de los dos objetos es null retorna falso
    return cg1 === null || cg2 === null || cg1 === undefined || cg2 === undefined ? false : cg1.idCargo === cg2.idCargo;
  }

}
