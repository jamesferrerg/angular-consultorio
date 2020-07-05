import { Component } from '@angular/core';
import { AuthService } from './empleados/auth.service';
//import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  //showHome: boolean = false;

  constructor(public authService: AuthService){}
}

  /* constructor(public authService: AuthService, private router: Router){
    this.router.events.subscribe((event: any) => {
      if (event instanceof NavigationEnd) {
        if (event.url === '/login') {
          this.showHome= true;
        } else {
          this.showHome= false;
        }
      }
    });
  }
} */
