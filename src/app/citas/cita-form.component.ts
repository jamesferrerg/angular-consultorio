import { Component, OnInit } from '@angular/core';
import { Paciente } from '../pacientes/paciente';
import { Empleado } from '../empleados/empleado';
import { Servicio } from '../entity/servicio';
import { Cita } from './cita';
import { CitaService } from './cita.service';
import { Router, ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap, filter, catchError, map, flatMap } from 'rxjs/operators';


@Component({
  selector: 'app-cita-form',
  templateUrl: './cita-form.component.html',
  styleUrls: ['./cita-form.component.css']
})
export class CitaFormComponent implements OnInit {

  cita: Cita = new Cita();
  paciente: Paciente[];
  empleado: Empleado[];
  autocompleteControl = new FormControl();
  autocompleteControlEmpl = new FormControl();
  ctrlPicker = new FormControl();
  pacientesFiltrados: Observable<Paciente[]>;
  empleadosFiltrados: Observable<Empleado[]>;
  servicios: Servicio[];
  public errores: string[];

  searchTerm: string;
  searchResults:Observable<string[]>;
  public searchData: any  = {};

  constructor(private citaService: CitaService, private router: Router, 
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.cargarCita();
    
    /* Se comenta, ya que no se usa angular-material para el autocomplete
    this.empleadosFiltrados = this.autocompleteControlEmpl.valueChanges
      .pipe(
        // map es convertir el objeto empleado al nombre del empleado en un valor string
        map(value => typeof value === 'string' ? value : value.nombre),
        // retorne un valor vacio []
        flatMap(value => value ? this._filterEmp(value) : [])
      );
    this.pacientesFiltrados = this.autocompleteControl.valueChanges
      .pipe(
        map(value => typeof value === 'string' ? value : value.nombre),
        flatMap(value => value ? this._filterPac(value) : [])
      );
    */
   
    this.citaService.getServicios().subscribe(servicios => 
      this.servicios = servicios);
  }

  compararServicio(sv1: Servicio, sv2: Servicio): boolean{
    if (sv1 === undefined && sv2 === undefined){
      return true;
    }

    return sv1 === null || sv2 === null || sv1 === undefined || sv2 === undefined ? false : sv1.idServicio === sv2.idServicio;
  }

  public create(): void{
    this.citaService.create(this.cita).subscribe(
      cita => {
        this.router.navigate(['/citas']);
        swal.fire('Nueva cita agendada', `Se agendo cita al paciente ${cita.paciente.nombre} ${cita.paciente.apellido} con éxito`, `success`);
      },
      err => {
        this.errores = err.error.errors as string[];
        console.log('Código del error desde el backend: ' + err.status);
        console.log(err.error.errors);
      }
    );
  }

  /* Se comenta las siguientes lineas, ya que no se usa angular-material para el autocomplete
  private _filterEmp(value: string): Observable<Empleado[]> {
    const filterValueEmp = value.toLowerCase();

    return this.citaService.filtrarEmpleados(filterValueEmp);
  }

  mostrarNombreEmpl(empleado ?: Empleado): string | undefined {
    return empleado ? empleado.nombre + ' ' + empleado.apellido : undefined;
  }

  private _filterPac(value: string): Observable<Paciente[]> {
    const filterValuePac = value.toLowerCase();

    return this.citaService.filtrarPacientes(filterValuePac);
  }

  mostrarNombrePac(paciente ?: Paciente): string | undefined {
    return paciente ? paciente.nombre + ' ' + paciente.apellido : undefined;
  }

  seleccionarEmpleado(event): void {
    // value es generico y debe convertir en un objeto cita
    let cita = event.option.value as Cita;
  }

  seleccionarPaciente(event): void {
    // value es generico y debe convertir en un objeto cita
    let cita = event.option.value as Cita;
  }
  */

  cargarCita(): void{
    this.activatedRoute.params.subscribe(params => {
      let idCita = params['idCita']
      if (idCita){
        this.citaService.getCita(idCita).subscribe(
          (cita) => {
            this.cita = cita;
          }
        );
      }
    });
  }

  update(): void{
    this.citaService.update(this.cita).subscribe(
      json => {
        this.router.navigate(['/citas']);
        swal.fire('Cita actualizada', `${json.mensaje}: ${json.cita.paciente.nombre}`, 'success');
      },
      err => {
        this.errores = err.error.errors as string [];
        console.log('Código del error desde el backend: ' + err.status);
        console.log(err.error.errors);
      }
    );
  }

  searchEmpl = (text$: Observable<string>) => {
    return text$.pipe(
        debounceTime(200),
        distinctUntilChanged(),
        filter(term => term.length >= 1),
        // switchMap allows returning an observable rather than the final array instance
        switchMap( (searchText) =>  this.citaService.filtrarEmpleados(searchText) )
    );
  }

  resultFormatEmplListValue(value: any) {           
    return value.nombre + ' ' + value.apellido;
  } 
  /**
    * Initially binds the string value and then after selecting
    * an item by checking either for string or key/value object.
  */
  inputFormatEmplListValue(value: any)   {
    if(value.nombre)
      return value.nombre + ' ' + value.apellido;
    return value;
  }

  searchPac = (text$: Observable<string>) => {
    return text$.pipe(
        debounceTime(200),
        distinctUntilChanged(),
        filter(term => term.length >= 1),
        // switchMap allows returning an observable rather than the final array instance
        switchMap( (searchText) =>  this.citaService.filtrarPacientes(searchText) )
    );
  }

  resultFormatPacListValue(value: any) {           
    return value.nombre + ' ' + value.apellido;
  } 
  /**
    * Initially binds the string value and then after selecting
    * an item by checking either for string or key/value object.
  */
  inputFormatPacListValue(value: any)   {
    if(value.nombre)
      return value.nombre + ' ' + value.apellido;
    return value;
  }

}

