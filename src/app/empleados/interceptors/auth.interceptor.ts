import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { AuthService } from '../auth.service';
import swal from 'sweetalert2';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

/** Pass untouched request through to the next request handler. */
// manejo de errores 401 y 403 en este interceptor
@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService, private router: Router){}

  intercept(req: HttpRequest<any>, next: HttpHandler):
    Observable<HttpEvent<any>> {
      return next.handle(req).pipe(
        catchError(e => {

          // 401 no autorizado y 403 prohibido o denegado el acceso
          if (e.status == 401){
          // cerrar sesion cuando expira el token en java
            if (this.authService.isAuthenticated()){
              this.authService.logout();
            }
            // retornar a la pagina login
            this.router.navigate(['/login']);
          }

          if (e.status == 403){
            swal.fire('Acceso denegado', `${this.authService.empleado.nombre} no tiene acceso a este recurso!`, 'warning');
            // retornar a la pagina empleados
            this.router.navigate(['/empleados']);
          }

          return throwError(e);
        })
      );
    }
}