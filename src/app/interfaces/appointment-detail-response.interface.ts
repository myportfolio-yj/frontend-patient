export interface AppointmentDetailResponse {
    id: string;
    cliente: Cliente;
    nombreMascota: string;
    idMascota: string;
    mascota: Mascota;
    tipoCita: string;
    idTipoCita: string;
    atencionesPeluqueria: string[];
    fecha: string;
    turno: string;
    observaciones: string;
    checkIn: boolean;
    idAtencion: string;
    recetas: string[];
}

export interface Cliente {
    id: string;
    nombres: string;
    apellidos: string;
    celular: string;
    fijo: string;
    email: string;
    tipoDocumento: TipoDocumento;
    documento: string;
}

export interface TipoDocumento {
    id: string;
    tipoDocumento: string;
}

export interface Mascota {
    nombre: string;
    apellido: string;
    fechaNacimiento: string;
    sexo: Sexo;
    especie: Especie;
    raza: Raza;
    esterilizado: boolean;
    alergias: Alergia[];
    vacunas: Vacuna[];
    foto: string;
    id: string;
    codIdentificacion: string;
}

export interface Alergia {
    id: string;
    alergia: string;
}

export interface Especie {
    id: string;
    especie: string;
}

export interface Raza {
    id: string;
    raza: string;
}

export interface Sexo {
    id: string;
    sexo: string;
}

export interface Vacuna {
    vacuna: string;
    duracion: number;
}
