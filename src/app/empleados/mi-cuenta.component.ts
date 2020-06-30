import { Component, OnInit, Input } from '@angular/core';
import { Empleado } from './empleado';
import { EmpleadoService } from './empleado.service';
import { AuthService } from './auth.service';
import { ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';

@Component({
  selector: 'app-mi-cuenta',
  templateUrl: './mi-cuenta.component.html',
  styleUrls: ['./mi-cuenta.component.css']
})
export class MiCuentaComponent implements OnInit {

  // inyectar la instancia del empleado
  @Input() empleado: Empleado;
  titulo: string = "Detalle del empleado";
  fotoSeleccionada: File;
  empleadoId: Empleado[];

  constructor(private empleadoService: EmpleadoService,
    public authService: AuthService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params =>{
      let idEmpleado: number = this.authService.empleado.idEmpleado;
      this.empleadoService.getEmpleado(idEmpleado).subscribe(empleado =>{
        this.empleado = empleado;
      });
    })
  }

  seleccionarFoto(event){
    this.fotoSeleccionada = event.target.files[0];
    console.log(this.fotoSeleccionada); 
    // si el indexOf retorna un -1 no encontro ocurrencia
    if(this.fotoSeleccionada.type.indexOf('image') < 0){
      swal.fire('Error al seleccionar la imagen', 'El archivo debe ser del tipo imagen', 'error');
      this.fotoSeleccionada = null;
    }
  }

  subirFoto(){
    // se v
    if(!this.fotoSeleccionada){
      swal.fire('Error al cargar', 'Debe seleccionar una foto', 'error');
    }else{
      this.empleadoService.subirFoto(this.fotoSeleccionada, this.empleado.idEmpleado)
      .subscribe(empleado => {
      this.empleado = empleado;
      
      //this.authService.notificarImg.emit(this.empleado);
      swal.fire('La foto se ha subido correctamente!', `La foto se ha subido con éxito: ${this.empleado.foto}`, 'success');
    });
    }
  }


}
