import { Component } from '@angular/core';

@Component({
    selector: 'app-footer',
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.css']
})

export class FooterComponent {
    autor: any = {nombre: 'James Ferrer', apellido: 'Gomez Valverde', correo: 'jamesjfgv@gmail.com'};
    anio: number;

    constructor() {
        this.anio = new Date().getFullYear();
       }
}
