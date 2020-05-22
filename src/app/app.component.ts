import { Component } from '@angular/core';
import { AuthService } from './empleados/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Bienvenido a un nuevo Consultorio odont.';
  autor: string = 'James Gomez Valverde';

  constructor(public authService: AuthService){}
}
