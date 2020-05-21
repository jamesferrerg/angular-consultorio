import { Component } from '@angular/core';
import { AuthService } from '../empleados/auth.service';
import { Router } from '@angular/router';
import swal from 'sweetalert2';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html'
})
export class HeaderComponent{
    title: string = 'App iniciando';

    constructor(public authService: AuthService, private router: Router){}

    logout(): void {
        let nombre = this.authService.empleado.nombre;
        this.authService.logout();
        swal.fire('Cerrar sesión', `${nombre} ha cerrado sesión con éxito!`, 'success');
        this.router.navigate(['/login']);
    }
}