export interface PetRequest {
    nombre: string;
    apellido: string;
    fechaNacimiento: string;
    idSexo: string;
    idEspecie: string;
    idRaza: string;
    esterilizado: boolean;
    alergias: string[];
    vacunas: string[];
    foto: string;
}
