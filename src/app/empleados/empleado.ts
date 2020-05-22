import { TipoIdentificacion } from './tipoIdentificacion';
import { Sexo } from './sexo';

export class Empleado {
    idEmpleado: number;
    nombre: string;
    apellido: string;
    numeroIdentificacion: string;
    telefono: number;
    celular: number;
    username: string;
    password: string;
    fechaContrato: string;
    foto: string;
    tipoIdentificacion: TipoIdentificacion;
    roles: string[] = [];
    direccion: string;
    barrio: string;
    sexo: Sexo;
}
