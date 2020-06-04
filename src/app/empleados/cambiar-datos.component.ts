import { Component, OnInit, Input } from '@angular/core';
import { Empleado } from './empleado';
import { EmpleadoService } from './empleado.service';
import { AuthService } from './auth.service';
import { ActivatedRoute, Router, Params } from '@angular/router';
import swal from 'sweetalert2';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-cambiar-datos',
  templateUrl: './cambiar-datos.component.html',
  styleUrls: ['./cambiar-datos.component.css']
})
export class CambiarDatosComponent implements OnInit {

  @Input() empleado: Empleado;
  public errores: string[];
  form: FormGroup;


  constructor(private empleadoService: EmpleadoService, private activatedRoute: ActivatedRoute,
    private router: Router, public authService: AuthService,
    private fb: FormBuilder) { }

  ngOnInit(): void {
    this.cargarEmpleado();
  }

  cargarEmpleado(): void{
    this.activatedRoute.params.subscribe(params => {
      let idEmpleado = this.authService.empleado.idEmpleado;
      if(idEmpleado){
        this.empleadoService.getEmpleado(idEmpleado).subscribe((empleado) => {
          this.empleado = empleado;
          this.empleado.password = '';
        });
      }
    });
  }

  updateInfo(): void{
    this.empleadoService.updateInfo(this.empleado).subscribe(
      json => {
        this.router.navigate(['/micuenta']);
        swal.fire('Contraseña actualizada', `${json.mensaje}: ${json.empleado.nombre}`, 'success');
      },
      err => {
        this.errores = err.error.errors as string[];
        console.log('Código del error desde el backend: ' + err.status);
        console.log(err.error.errors);
      }
    );
  }

}
