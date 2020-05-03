import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  modal: boolean = false;

  /* el EventEmitter es un evento que nos permite enviar algo o emitir algo de forma asíncrona y 
  reactiva desde cualquer parte de nuestra aplicación, luego en otra parte de nuestra app, en 
  otro componente o service podemos suscribirnos a este evento (estar pendiente estar 
  escuchando) y obtener este objeto cuando se emite (se dispara el evento) y hacer algo con 
  el, entonces en alguna parte disparamos un evento y en otra parte escuchamos y cuando se 
  dispara lo podemos recibir e implementar un observador para hacer algo con el objeto que 
  se emite. En el ejemplo se emite el cliente con la nueva imagen, luego en el componente del 
  listado, escuchamos el evento cuando un cliente actualiza o sube una foto y capturamos este 
  cambio y refrescamos la lista con el cliente con su foto. */

  private _notificarUpload = new EventEmitter<any>();

  constructor() { }

  get notificarUpload(): EventEmitter<any>{
    return this._notificarUpload;
  }

  abrirModal(){
    this.modal = true;
  }

  cerrarModal(){
    this.modal = false;
  }
}
