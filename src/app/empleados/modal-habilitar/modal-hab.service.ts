import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalHabService {

  modalHab: boolean = false;
  constructor() { }

  abrirModalHab(){
    this.modalHab = true;
  }

  cerrarModalHab(){
    this.modalHab = false;
  }
}
