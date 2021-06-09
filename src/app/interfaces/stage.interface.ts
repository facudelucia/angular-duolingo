export interface Stage {
    id:           number;
    textoIngles:  string;
    textoEspañol: string;
    palabras:     Palabra[];
    img:          string;
}

export interface Palabra {
    palabra: string;
    id:      number;
}
