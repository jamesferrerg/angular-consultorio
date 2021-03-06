import { Component, OnInit } from '@angular/core';
import { Cita } from './cita';
import { AuthService } from '../empleados/auth.service';
import { CitaService } from './cita.service';
import { faPhone, faCheck, faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import swal from 'sweetalert2';

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

  constructor(public authService: AuthService, public citaService: CitaService) { }

  ngOnInit(): void {
    this.citaService.getCitas().subscribe(
      citas => this.citas = citas
    );
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
            this.citas = this.citas.filter( cit => cit !== cita)
          });
        swalWithBootstrapButtons.fire(
          'Cita eliminada!',
          `Cita del paciente ${cita.paciente.nombre} ${cita.paciente.apellido} fue eliminada con éxito.`,
          'success'
        )}
    });
  }
}
