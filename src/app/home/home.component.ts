import { Component, OnInit } from '@angular/core';
import { faClock as farClock } from '@fortawesome/free-regular-svg-icons';
import { faPhoneAlt, faAngleRight, faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from '../empleados/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {

  mostrarLogin: boolean = true;
  hiddenHome: boolean = true;
  farClock = farClock;
  faPhone = faPhoneAlt;
  faAngleRight = faAngleRight;
  faAngleLeft = faAngleLeft;

  constructor(public authService: AuthService) { }

  ngOnInit(): void {
  }

  setMostrarLogin(){
    this.mostrarLogin = (this.mostrarLogin == true) ? false : true;
    this.hiddenHome = (this.hiddenHome == false) ? true : false;
  }

}
