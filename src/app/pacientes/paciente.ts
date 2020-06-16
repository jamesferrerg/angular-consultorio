import { TipoIdentificacion } from '../empleados/tipoIdentificacion';
import { Sexo } from '../empleados/sexo';

export class Paciente{
    idPaciente: number;
    nombre: string;
    apellido: string;
    numeroIdentificacion: string;
    fechaNacimiento: string;
    edad: number;
    email: string;
    direccion: string;
    barrio: string;
    telefono: number;
    celular: number;
    ocupacion: number;
    aseguradora: number;
    tipoIdentificacion: TipoIdentificacion;
    sexo: Sexo;
}
