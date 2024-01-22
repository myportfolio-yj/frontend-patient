export interface AddAppointmentRequest {
    idCliente: string;
    idMascota: string;
    idTipoCita: string;
    fecha: string;
    turno: string;
    observaciones: string;
    atencionesPeluqueria: string[];
}
