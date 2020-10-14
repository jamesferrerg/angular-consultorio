import { Component, OnInit, Input } from '@angular/core';
import { Empleado } from '../empleado';
import { EmpleadoService } from '../empleado.service';
import { AuthService } from '../auth.service';
import { ModalHabService } from './modal-hab.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-modal-habilitar',
  templateUrl: './modal-habilitar.component.html',
  styleUrls: ['./modal-habilitar.component.css']
})
export class ModalHabilitarComponent implements OnInit {

  @Input() empleado: Empleado;

  constructor(private empleadoService: EmpleadoService, private authService: AuthService, public modalHabService: ModalHabService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.cargarEmpleado();
  }

  cerrarModalHab(){
    this.modalHabService.cerrarModalHab();
  }

  cargarEmpleado(): void{
    this.activatedRoute.params.subscribe(params => {
      let idEmpleado = params['idEmpleado']
      if(idEmpleado){
        this.empleadoService.getEmpleado(idEmpleado).subscribe((empleado) => this.empleado = empleado);
      }
    });
  }

  updateHabilitar(): void{
    this.empleadoService.updateHabilitar(this.empleado).subscribe(empleado => {
      if (this.empleado.habilitado == true){
        this.empleado.habilitado = false;
      } else {
        this.empleado.habilitado = true;
      }
    });
    this.modalHabService.cerrarModalHab();
  }

}
