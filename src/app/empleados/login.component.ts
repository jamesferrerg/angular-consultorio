import { Component, OnInit } from '@angular/core';
import { Empleado } from './empleado';
import swal from 'sweetalert2';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import {Subject} from 'rxjs';
import {debounceTime} from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  titulo: string = "Iniciar sesión";
  empleado: Empleado;
  public errores: string = '';
  private _alertClosed = new Subject<string>();
  anio: number;

  constructor(private authService: AuthService, private router: Router) {
    this.empleado = new Empleado();
    this.anio = new Date().getFullYear();
   }

  ngOnInit() {
    this._alertClosed.subscribe(message => this.errores = message);
    this._alertClosed.pipe(
      debounceTime(5000)
    ).subscribe(() => this.errores = '');
    if (this.authService.isAuthenticated()){
      swal.fire('Login', `Hola ${this.authService.empleado.nombre} ya esta autenticado!`, 'info');
      this.router.navigate(['/directivas']);
    }
  }

  login(): void{
    if (this.empleado.username == null || this.empleado.password == null){
      this._alertClosed.next('El usuario o contraseña no pueden estar vacios');
      //swal.fire('Error Login', 'Usuario o contraseña vacio!', 'error');
      return;
    }

    this.authService.login(this.empleado).subscribe(response => {
      //console.log(response);
      this.authService.guardarUsuario(response.access_token);
      this.authService.guardarToken(response.access_token);

      let empleado = this.authService.empleado;

      // direccionar a la pagina principal
      this.router.navigate(['/directivas']);
      swal.fire('Login', `Bienvenido ${empleado.nombre}`, 'success');
    }, err => {
      if (err.status == 400){
        this._alertClosed.next('Usuario o contraseña incorrectos');
        //swal.fire('Error Login', 'Usuario o contraseña incorrectos!', 'error');
      }
    });
  }

}
