import { TipoIdentificacion } from './tipoIdentificacion';

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
}
