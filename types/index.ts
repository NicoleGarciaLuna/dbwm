export type Microentrepreneur = {
  id: number;
  fullName: string;
  company: string;
  sector: string;
  businessIdea: string;
  experienceYears: string;
};

export type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

export type SearchBarProps = {
  searchQuery: string;
  onSearch: (query: string) => void;
};

export type ChartData = {
  name: string;
  value: number;
};

export type TabCategory =
  | "personal"
  | "gender"
  | "entrepreneurship"
  | "businessIdea"
  | "innovation"
  | "market"
  | "accountingFinance"
  | "formalization"
  | "financing"
  | "training";

export type TabData = {
  personal: any;
  gender: any;
  entrepreneurship: any;
  businessIdea: any;
  innovation: any;
  market: any;
  accountingFinance: any;
  formalization: any;
  financing: any;
  training: any;
};

export type DataItem = {
  name: string;
  value: number;
};

export enum ChartType {
  PIE = "pie",
  BAR = "bar",
}

export type Endpoint = {
  key: string;
  table: string;
  select: string;
  chartType: ChartType;
};

export type EndpointsType = {
  [key: string]: Endpoint[];
};

export type Persona = {
  id_persona: number;
  nombre: string;
  primer_apellido: string;
  segundo_apellido: string;
  diagnostico: {
    emprendimiento?: {
      nombre_emprendimiento?: string;
      tiempo_operacion?: string;
      sector_economico?: string;
    };
    idea_negocio?: {
      descripcion_breve?: string;
    };
  }[];
};


