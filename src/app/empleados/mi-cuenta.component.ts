import { Component, OnInit, Input } from '@angular/core';
import { Empleado } from './empleado';
import { EmpleadoService } from './empleado.service';
import { AuthService } from './auth.service';
import { ActivatedRoute } from '@angular/router';

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

}
