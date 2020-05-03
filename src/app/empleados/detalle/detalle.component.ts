import { Component, OnInit, Input } from '@angular/core';
import { Empleado } from '../empleado';
import { EmpleadoService } from '../empleado.service';
import { ModalService } from './modal.service';
import swal from 'sweetalert2';

@Component({
  selector: 'detalle-empleado',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.css']
})
export class DetalleComponent implements OnInit {
  // inyectar la instancia del empleado
  @Input() empleado: Empleado;
  // recordar que se injectara EmpleadoService en el constructor
  titulo: string = "Detalle del empleado";
  fotoSeleccionada: File;

  constructor(private empleadoService: EmpleadoService,
    public modalService: ModalService) { }

  ngOnInit(): void {
    /* Se quita porque se usara un modal y ya no abrira una pagina nueva
    // se necesita el paramedor idEmpleado
    this.activetedRoute.paramMap.subscribe(params => {
      let idEmpleado: number = +params.get('idEmpleado');
      // si el idEmpleado existe
      if(idEmpleado){
        this.empleadoService.getEmpleado(idEmpleado).subscribe(empleado => {
          this.empleado = empleado;
        });
      }
    });
    */
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
      
      this.modalService.notificarUpload.emit(this.empleado);
      swal.fire('La foto se ha subido correctamente!', `La foto se ha subido con éxito: ${this.empleado.foto}`, 'success');
    });
    }
  }

  cerrarModal(){
    this.modalService.cerrarModal();
    this.fotoSeleccionada = null;
  }

}
