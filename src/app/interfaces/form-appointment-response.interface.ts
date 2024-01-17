export interface FormAppointmentResponse {
    mascotas: Mascota[];
    tiposCita: TiposCita[];
    atencionesPeluqueria: AtencionesPeluqueria[];
}

export interface AtencionesPeluqueria {
    id: string;
    atencionPeluquero: string;
}

export interface Mascota {
    nombre: string;
    apellido: string;
    id: string;
    codIdentificacion: string;
}

export interface TiposCita {
    id: string;
    tipoCita: string;
    reservasVeterinario?: ReservasVeterinario[];
    reservasPeluquero?: ReservasPeluquero[];
}

export interface ReservasPeluquero {
    peluquero: Peluquero;
    turnos: Turno[];
}

export interface Veterinario {
    id: string;
    nombres: string;
    apellidos: string;
    codVeterinario?: string;
}

export interface Peluquero {
    id: string;
    nombres: string;
    apellidos: string;
}

export interface Turno {
    fecha: string;
    dia: string;
    turnos: string[];
}

export interface ReservasVeterinario {
    verinario: Veterinario;
    turnos: Turno[];
}
