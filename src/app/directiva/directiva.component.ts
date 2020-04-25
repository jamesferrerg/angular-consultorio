import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-directiva',
  templateUrl: './directiva.component.html'
})
export class DirectivaComponent {

  listaComida: string[] = ['Pizza', 'Hamburgueza', 'Hot dog', 'Helado', 'Fruta'];

  habilitar: boolean = true;

  setHabilitar(): void{
    this.habilitar = (this.habilitar == true) ? false : true;
  }

  constructor() { }


}
