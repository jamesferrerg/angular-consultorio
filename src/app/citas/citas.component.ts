import { Component, OnInit, ViewChild } from '@angular/core';
import { Cita } from './cita';
import { AuthService } from '../empleados/auth.service';
import { CitaService } from './cita.service';
import { faPhone, faCheck, faExclamationTriangle, faSearch } from '@fortawesome/free-solid-svg-icons';
import swal from 'sweetalert2';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import {Sort, MatSortModule} from '@angular/material/sort';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-citas',
  templateUrl: './citas.component.html',
  styleUrls: ['./citas.component.css']
})
export class CitasComponent implements OnInit {

  citas: Cita[];
  faPhone = faPhone;
  faCheck = faCheck;
  faExclamationTriangle = faExclamationTriangle;
  faSearch = faSearch;

  totalRegistros = 0;
  paginaActual = 0;
  totalPorPagina = 8;
  opcionTamanoPagina: number[] = [4, 8, 16, 32, 100];

  cita: Cita = new Cita();
  dia: string = '';

  // Para cambiar el idioma de matpaginator
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(public authService: AuthService, public citaService: CitaService) {}

  ngOnInit(): void {
    /* Se comenta poruqe se utiliza la paginacion
    this.citaService.getCitas().subscribe(
      citas => this.citas = citas
    );*/
    this.calcularRangos();
  }

  delete(cita: Cita): void {
    const swalWithBootstrapButtons = swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    });
    swalWithBootstrapButtons.fire({
      title: 'Está seguro?',
      text: `¿Seguro que desea elminar la cita del paciente ${cita.paciente.nombre} ${cita.paciente.apellido}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, eliminar!',
      cancelButtonText: 'No, cancelar!',
      reverseButtons: true
    }).then((result) => {
      if (result.value) {
        this.citaService.delete(cita.idCita).subscribe(
          response => {
            // Con lo siguiente se actualiza la lista de empleados
            /* La siguiente linea se comenta, ya que se utilizara la paginacion y se cambiara al metodo calcularRangos() para actualizar
            cuando se elimine un registro, vuelva a paginar y hacer el calculo
            this.citas = this.citas.filter( cit => cit !== cita)*/
            this.calcularRangos();
          });
        swalWithBootstrapButtons.fire(
          'Cita eliminada!',
          `Cita del paciente ${cita.paciente.nombre} ${cita.paciente.apellido} fue eliminada con éxito.`,
          'success'
        )}
    });
  }

  private calcularRangos(){
    this.citaService.listarPaginas(this.paginaActual.toString(), this.totalPorPagina.toString(), this.dia.toString())
      .subscribe(p => 
        {
          this.citas = p.content as Cita[];
          this.totalRegistros = p.totalElements as number;
          this.paginator._intl.itemsPerPageLabel = 'Registros por página';
          this.paginator._intl.firstPageLabel = 'Primera página';
          this.paginator._intl.lastPageLabel = 'Ultima página';
          this.paginator._intl.nextPageLabel = 'Página siguiente';
          this.paginator._intl.previousPageLabel = 'Página anterior';
        });
  }

  paginar(event: PageEvent): void {
    this.paginaActual = event.pageIndex;
    this.totalPorPagina = event.pageSize;
    this.calcularRangos();
  }

  sortData(sort: Sort){
    const data = this.citas.slice();
    if (!sort.active || sort.direction === '') {
      this.citas = data;
      return;
    }

    this.citas = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'nombrePac': return this.compare(a.paciente.nombre, b.paciente.nombre, isAsc);
        case 'nombreDr': return this.compare(a.empleado.nombre, b.empleado.nombre, isAsc);
        case 'fecha': return this.compare(a.fecha, b.fecha, isAsc);
        case 'hora': return this.compare(a.hora, b.hora, isAsc);
        case 'servicio': return this.compare(a.servicio.servicio, b.servicio.servicio, isAsc);
        case 'costo': return this.compare(a.costo, b.costo, isAsc);
        case 'saldo': return this.compare(a.saldo, b.saldo, isAsc);
        default: return 0;
      }
    });

  }

  compare = (a: number | string | boolean, b: number | string | boolean, isAsc: boolean) => {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }

  buscarFecha(){
    this.dia = this.dia;
    console.log('bf - Buscar dia '+this.dia);
    this.calcularRangos();
    return;
  }

}
