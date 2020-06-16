import { Component, OnInit, Input } from '@angular/core';
import { Paciente } from '../paciente';
import { PacienteService } from '../paciente.service';
import { AuthService } from '../../empleados/auth.service';
import { ModalService } from './modal.service';

@Component({
  selector: 'detalle-paciente',
  templateUrl: './detalle-paciente.component.html',
  styleUrls: ['./detalle-paciente.component.css']
})
export class DetallePacienteComponent implements OnInit {

  @Input() paciente: Paciente;

  constructor(private pacienteService: PacienteService,
    public authService: AuthService, 
    public modalService: ModalService) { }

  ngOnInit(): void {
  }

  cerrarModal(){
    this.modalService.cerrarModal();
  }

}
