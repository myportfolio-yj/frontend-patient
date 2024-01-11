export interface PetDetailResponse {
    id: string;
    codIdentificacion: string;
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
    id: string;
    vacuna: string;
    duracion: number;
}
