export interface ClientResponse {
    id: string;
    nombres: string;
    apellidos: string;
    celular: string;
    fijo: string;
    email: string;
    tipoDocumento: TipoDocumento;
    documento: string;
    mascotas: Mascota[];
    citas: Cita[];
    recordatorio: Recordatorio[];
    geolocalizaciones: Geolocalizaciones[]
}

export interface Cita {
    id: string;
    idCliente: string;
    nombreMascota: string;
    idMascota: string;
    tipoCita: string;
    idTipoCita: string;
    atencionesPeluqueria: string[];
    fecha: string;
    turno: string;
    observaciones: string;
    image: string;
    image_label: string;
}

export interface Mascota {
    id: string;
    codIdentificacion: string;
    lable: string;
    nombre: string;
    apellido: string;
    fechaNacimiento: string;
    sexo: Sexo;
    especie: Especie;
    raza: Raza;
    esterilizado: boolean;
    vacunas: Vacuna[];
    foto: string;
    alergias?: Alergia[];
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
    idVacuna: string;
    vacuna: string;
    fecha: string;
}

export interface Recordatorio {
    nombre: string;
    fecha: string;
    tipo: string;
    detalle: string;
}

export interface TipoDocumento {
    id: string;
    tipoDocumento: string;
}

export interface Geolocalizaciones {
    mascotaId: string;
    mascotaNombre: string;
    geolocalizaciones: GeolocalizacionesMascota[];
}

export interface GeolocalizacionesMascota {
    id: string;
    url: string;
    telefono: string;
    fecha: string;
    hora: string;
}
