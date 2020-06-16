import { Component, OnInit } from '@angular/core';
import { PacienteService } from './paciente.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Paciente } from './paciente';
import swal from 'sweetalert2';
import { TipoIdentificacion } from '../empleados/tipoIdentificacion';
import { Sexo } from '../empleados/sexo';

@Component({
  selector: 'app-paciente-form',
  templateUrl: './paciente-form.component.html',
  styleUrls: ['./paciente-form.component.css']
})
export class PacienteFormComponent implements OnInit {

  public paciente: Paciente = new Paciente();
  public errores: string[];
  tiposIdentificacion: TipoIdentificacion[];
  sexos: Sexo[];

  constructor(private pacienteService: PacienteService, private router: Router, 
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.cargarPaciente();
    this.pacienteService.getTipoIdentificacion().subscribe(tiposIdentificacion =>
      this.tiposIdentificacion = tiposIdentificacion);
    this.pacienteService.getSexo().subscribe(sexos =>
      this.sexos = sexos);
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

  public create(): void{
    this.pacienteService.create(this.paciente).subscribe(
      paciente => {
        this.router.navigate(['/pacientes']);
        swal.fire('Nuevo paciente', `El paciente ${paciente.nombre} ${paciente.apellido} ha sido creado con éxito!`, 'success');
      },
      err => {
        this.errores = err.error.errors as string[];
        console.log('Código del error desde el backend: ' + err.status);
        console.log(err.error.errors);
      }
    );
  }

  cargarPaciente(): void{
    this.activatedRoute.params.subscribe(params => {
      let idPaciente = params['idPaciente']
      if (idPaciente){
        this.pacienteService.getPaciente(idPaciente).subscribe(
          (paciente) => this.paciente = paciente);
      }
    });
  }

  update(): void{
    this.pacienteService.update(this.paciente).subscribe(
      json => {
        this.router.navigate(['/pacientes']);
        swal.fire('Paciente actualizado', `${json.mensaje}: ${json.paciente.nombre}`, 'success');
      },
      err => {
        this.errores = err.error.errors as string[];
        console.log('Código del error desde el backend: ' + err.status);
        console.log(err.error.errors);
      });
  }

}
