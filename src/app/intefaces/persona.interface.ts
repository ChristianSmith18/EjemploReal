export interface RootPersona {
  personas: Persona[];
}

export interface Persona {
  id: number;
  nombre: string;
  apellidos: string;
  idSexo: number;
  edad: number;
}
