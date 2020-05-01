import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'paginator-nav',
  templateUrl: './paginator.component.html'
})
export class PaginatorComponent implements OnInit {
  // injectar a la clase hija @input
  @Input() paginador: any;

  paginas: number[];

  constructor() { }

  ngOnInit(): void {
    // totalPage es un atributo que existe dentro de los atributos del paginador
    this.paginas = new Array(this.paginador.totalPages).fill(0).map((valor, indice) => indice + 1);
  }

}
