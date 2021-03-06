import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';
import swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router){

  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      if (!this.authService.isAuthenticated()) {
        this.router.navigate(['/login']);
        return false;
      }
      // convertirlo a string
      let roles = next.data['role'] as string[];
      // validar el error
      let hasRole = false;
      for (let role of roles){
        if(this.authService.hasRole(role)){
          hasRole = true;
        }
      }
      /*roles.forEach(role => {
        if (this.authService.hasRole(role)) {
           hasRole =  true;
        }
    });*/
      if (hasRole){
      return true;
    } else {
      swal.fire('Acceso denegado', `${this.authService.empleado.nombre} no tiene acceso a este recurso!`, 'warning');
      // retornar a la pagina empleados
      this.router.navigate(['/directivas']);
      return false;
      /*if (this.authService.hasRole(roles)){
        return true;
      }*/
    }

  }
}
