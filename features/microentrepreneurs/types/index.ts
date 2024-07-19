export type MicroentrepreneurTableProps = {
  id: number;
  fullName: string;
  company: string;
  sector: string;
  businessIdea: string;
  experienceYears: string;
};

export type Persona = {
  id_persona: number;
  nombre: string;
  primer_apellido: string;
  segundo_apellido: string;
};

export type Emprendimiento = {
  nombre_emprendimiento?: string;
  tiempo_operacion?: string;
  sector_economico?: string;
};

export type IdeaNegocio = {
  descripcion_breve?: string;
};

export type Diagnostico = {
  id_diagnostico: number;
  fecha_diagnostico: string;
  id_persona: number;
  emprendimiento?: Emprendimiento;
  idea_negocio?: IdeaNegocio;
  persona: Persona;
};
