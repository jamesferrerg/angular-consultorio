import { Component, OnInit } from '@angular/core';
import { Paciente } from './paciente';
import { AuthService } from '../empleados/auth.service';
import { ActivatedRoute } from '@angular/router';
import { PacienteService } from './paciente.service';
import swal from 'sweetalert2';
import { tap } from 'rxjs/operators';
import { faSearchPlus, faSortUp, faSortDown, faSearch } from '@fortawesome/free-solid-svg-icons';
import { ModalService } from './detalle-paciente/modal.service';
import { NgbPaginationConfig } from '@ng-bootstrap/ng-bootstrap';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

@Component({
  selector: 'app-pacientes',
  templateUrl: './pacientes.component.html',
  styleUrls: ['./pacientes.component.css'],
  providers: [NgbPaginationConfig]
})
export class PacientesComponent implements OnInit {

  pacientes: Paciente[];
  faSearchPlus = faSearchPlus;
  faSortUp = faSortUp;
  faSortDown = faSortDown;
  faSearch = faSearch;
  pacienteSeleccionado: Paciente;
  
  // paginacion, ordenar y buscar https://ciphertrick.com/search-sort-pagination-angular/
  term: string;
  order: string = 'nombre';
  reverse: boolean = false;

  p: number = 1;
  pageSize: number = 8;

  constructor(public authService: AuthService, private activetedRoute: ActivatedRoute, 
    public pacienteService: PacienteService, private modalService: ModalService,
    private config: NgbPaginationConfig) { this.config.boundaryLinks = true; }

  ngOnInit(): void {
    this.pacienteService.getPacientes().subscribe(
      pacientes => this.pacientes = pacientes
    );
  }

  sort(order){
    this.order = order;
    this.reverse = !this.reverse;
  }

  delete(paciente: Paciente): void {
    const swalWithBootstrapButtons = swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    });
    swalWithBootstrapButtons.fire({
      title: 'Está seguro?',
      text: `¿Seguro que desea elminar el paciente ${paciente.nombre} ${paciente.apellido}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, eliminar!',
      cancelButtonText: 'No, cancelar!',
      reverseButtons: true
    }).then((result) => {
      if (result.value) {
        this.pacienteService.delete(paciente.idPaciente).subscribe(
          response => {
            // Con lo siguiente se actualiza la lista de empleados
            this.pacientes = this.pacientes.filter( empl => empl !== paciente)
          });
        swalWithBootstrapButtons.fire(
          'Paciente eliminado!',
          `Paciente ${paciente.nombre} ${paciente.apellido} fue eliminado con éxito.`,
          'success'
        )}
    });
  }

  abrirModal(paciente: Paciente){
    this.pacienteSeleccionado = paciente;
    this.modalService.abrirModal();
  }

}
