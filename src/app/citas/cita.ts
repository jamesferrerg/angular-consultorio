import { Empleado } from '../empleados/empleado';
import { Paciente } from '../pacientes/paciente';
import { Servicio } from '../entity/servicio';

export class Cita{
    idCita: number;
    fecha: string;
    hora: string;
    costo: number;
    saldo: boolean = false;
    servicio: Servicio;
    empleado: Empleado;
    paciente: Paciente;
}