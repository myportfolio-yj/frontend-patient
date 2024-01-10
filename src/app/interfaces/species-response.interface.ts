export interface SpeciesResponse {
    id: string;
    especie: string;
    razas: Raza[];
}

export interface Raza {
    id: string;
    raza: string;
}
