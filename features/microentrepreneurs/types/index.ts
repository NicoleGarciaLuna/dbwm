type Emprendimiento = {
  nombre_emprendimiento: string | null;
  tiempo_operacion: number | null;
  sector_economico: string | null;
};

type IdeaNegocio = {
  descripcion_breve: string | null;
};

type Persona = {
  id_persona: number;
  nombre: string;
  primer_apellido: string;
  segundo_apellido: string;
};

export type Diagnostico = {
  id_diagnostico: number;
  fecha_diagnostico: string;
  id_persona: number;
  emprendimiento: Emprendimiento | null;
  idea_negocio: IdeaNegocio | null;
  persona: Persona;
};

export type MicroentrepreneurTableProps = {
  id: number;
  fullName: string;
  company: string;
  sector: string;
  businessIdea: string;
  experienceYears: number | string;
};

export const COLUMN_CONFIG = [
  { key: "fullName", header: "Nombre Completo" },
  { key: "company", header: "Empresa" },
  { key: "sector", header: "Sector" },
  { key: "businessIdea", header: "Idea de Negocio" },
  { key: "experienceYears", header: "Años de Experiencia" },
  { key: "actions", header: "Acciones", isAction: true },
];

export const MODAL_DELETE_TEXT = "Estas seguro que deseas eliminar a";
export const PAGE_SIZE = 8;
export const SEARCH_FIELDS = [
  "fullName",
  "company",
  "sector",
  "businessIdea",
  "experienceYears",
];
