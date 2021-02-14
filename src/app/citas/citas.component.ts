import { Component, OnInit } from '@angular/core';
import { Cita } from './cita';
import { AuthService } from '../empleados/auth.service';
import { CitaService } from './cita.service';
import { faPhone, faCheck, faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';

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

}
