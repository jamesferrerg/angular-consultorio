import { Component, OnInit } from '@angular/core';
import { Empleado } from './empleado';
import { EmpleadoService } from './empleado.service';
import { ModalService } from './detalle/modal.service';
import swal from 'sweetalert2';
import { tap, map } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from './auth.service';
import { ModalHabService } from './modal-habilitar/modal-hab.service';

@Component({
  selector: 'app-empleados',
  templateUrl: './empleados.component.html',
  styleUrls: ['./empleados.component.css']
})
export class EmpleadosComponent implements OnInit {

  empleados: Empleado[];
  paginador: any;
  empleadoSeleccionado: Empleado;

  constructor(public empleadoService: EmpleadoService, 
    private modalService: ModalService, private modalHabService: ModalHabService,
    public authService: AuthService,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    /* se busca detectar el parametro cuando cambia de pagina, por lo cual se necesita un observable 
    para que vigile cuando el parametro cambia se actualiza la consulta de la pagina web con los rangos
    El enrutador reutiliza la misma instancia del componente cuando se vuelve a navegar a traves de el (paginador).
    Cuando este se esta cambiando de una pagina a otra, se esta navegando dentro del mismo componente
    pero unicamente cambia el parametro de la ruta cada vez que se accede (paginador donde se avnza
    por las distintas paginas hacia adelante o atras). Por eso es mejor reutilizar la misma instancia
    del componente y actualize el parametro page*/
    // Con la propiedad paramMap es el encargado de observar
    // Dentro de subcribe se pasa el objeto params que contiene los parametros
    this.activatedRoute.paramMap.subscribe( params => {
    // params.get('page') es un string por lo que debe convetirse a un number
    // el operador + automaticamente convierte este parametro en un integer
    let page: number = +params.get('page');
    // cuando no exista el parametro page con un valor se le asignara el valor de 0
    if(!page){
      page = 0;
    }
    this.empleadoService.getEmpleados(page).pipe(
      // ejemplo cambiando los parametros en el subscribe y usarlo en el tap
      tap(response => {
        (response.content as Empleado[]).forEach(empleado =>{});
      }))
    .subscribe(response => {
      this.empleados = response.content as Empleado[];
      /* recordar que el response ademas de contener el listado de los empleados
      contiene los atributos del paginador */
      this.paginador = response;
    });
    });
    this.modalService.notificarUpload.subscribe(empleado => {
      // por cada empleado el map nos permite cambiar algo de el
      this.empleados = this.empleados.map(empleadoOriginal => {
        if(empleado.idEmpleado == empleadoOriginal.idEmpleado){
          empleadoOriginal.foto = empleado.foto;
        }
        return empleadoOriginal;
      });
    });
  }

  delete(empleado: Empleado): void{
    const swalWithBootstrapButtons = swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    });
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
          });
        swalWithBootstrapButtons.fire(
          'Empleado eliminado!',
          `Empleado ${empleado.nombre} ${empleado.apellido} fue eliminado con éxito.`,
          'success'
        )}
    });

  }

  abrirModal(empleado: Empleado){
    this.empleadoSeleccionado = empleado;
    this.modalService.abrirModal();
  }

  abrirModalHab(empleado: Empleado){
    this.empleadoSeleccionado = empleado;
    this.modalHabService.abrirModalHab();
  }

}
