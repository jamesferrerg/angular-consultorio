import { Component, OnInit } from '@angular/core';
import { Empleado } from './empleado';
import swal from 'sweetalert2';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  titulo: string = "Iniciar sesión";
  empleado: Empleado;

  constructor(private authService: AuthService, private router: Router) {
    this.empleado = new Empleado();
   }

  ngOnInit() {
    if (this.authService.isAuthenticated()){
      swal.fire('Login', `Hola ${this.authService.empleado.nombre} ya esta autenticado!`, 'info');
      this.router.navigate(['/empleados']);
    }
  }

  login(): void{
    if (this.empleado.username == null || this.empleado.password == null){
      swal.fire('Error Login', 'Usuario o contraseña vacio!', 'error');
      return;
    }

    this.authService.login(this.empleado).subscribe(response => {
      console.log(response);

      this.authService.guardarUsuario(response.access_token);
      this.authService.guardarToken(response.access_token);

      let empleado = this.authService.empleado;

      // direccionar a la pagina principal
      this.router.navigate(['/empleados']);
      swal.fire('Login', `Bienvenido ${empleado.nombre}`, 'success');
    }, err => {
      if (err.status == 400){
        swal.fire('Error Login', 'Usuario o contraseña incorrectos!', 'error');
      }
    });
  }

}
