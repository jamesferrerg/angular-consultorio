import { Component, OnInit } from '@angular/core';
import { faClock as farClock } from '@fortawesome/free-regular-svg-icons';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons/faWhatsapp';
import { faFacebookSquare } from '@fortawesome/free-brands-svg-icons/faFacebookSquare';
import { faInstagramSquare } from '@fortawesome/free-brands-svg-icons/faInstagramSquare';
import { faWhatsappSquare } from '@fortawesome/free-brands-svg-icons/faWhatsappSquare';
import { faPhoneAlt, faAngleRight, faAngleLeft, faGrinBeam, faTooth, faTeeth, faPlusCircle, faCheck, faBars } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from '../empleados/auth.service';
import AOS from 'aos';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {

  mostrarLogin: boolean = true;
  hiddenHome: boolean = true;
  anio: number;

  farClock = farClock;
  faPhone = faPhoneAlt;
  faAngleRight = faAngleRight;
  faAngleLeft = faAngleLeft;
  faGrinBeam = faGrinBeam;
  faTooth = faTooth;
  faTeeth = faTeeth;
  faPlusCircle = faPlusCircle;
  faWhatsapp = faWhatsapp;
  faFacebookSquare = faFacebookSquare;
  faInstagramSquare = faInstagramSquare;
  faWhatsappSquare = faWhatsappSquare;
  faCheck = faCheck;
  faBars = faBars;

  constructor(public authService: AuthService) { 
    this.anio = new Date().getFullYear();
  }

  ngOnInit(): void {
    AOS.init();
  }

  setMostrarLogin(){
    this.mostrarLogin = (this.mostrarLogin == true) ? false : true;
    this.hiddenHome = (this.hiddenHome == false) ? true : false;
  }

}
