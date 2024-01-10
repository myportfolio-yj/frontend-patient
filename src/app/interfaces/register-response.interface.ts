export interface RegisterResponse {
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
