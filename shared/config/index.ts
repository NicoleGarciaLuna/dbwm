export const PAGE_SIZE = 8;
export const SEARCH_INPUT_WIDTH = 200;
export const MODAL_DELETE_TEXT = "Estas seguro que deseas eliminar a";
export const LOGO_SRC = "/logo-orange-blue.png";
export const LOGO_ALT = "Project Logo";
export const LOGO_TEXT = "Microempresarias TCU - 781";
export const LOGO_SIZE = 50;

export const menuItems = [
  { label: "Microempresarias", href: "/" },
  { label: "Estadísticas", href: "/statistics" },
  { label: "Cerrar Sesión", href: "/login" },
];

export const COLUMN_CONFIG = [
  { key: "fullName", header: "Nombre Completo" },
  { key: "company", header: "Empresa" },
  { key: "sector", header: "Sector" },
  { key: "businessIdea", header: "Idea de Negocio" },
  { key: "experienceYears", header: "Años de Experiencia" },
  { key: "actions", header: "Acciones", isAction: true },
];

export const USER_PROFILE_CATEGORY_TABS = [
  { value: "personal", label: "Personal" },
  { value: "gender", label: "Género" },
  { value: "emprendimiento", label: "Emprendimiento" },
  { value: "ideaNegocio", label: "Idea de Negocio" },
  { value: "innovacion", label: "Innovación" },
  { value: "mercado", label: "Mercado" },
  { value: "contabilidadFinanzas", label: "Contabilidad y Finanzas" },
  { value: "formalizacion", label: "Formalización" },
  { value: "financiamiento", label: "Financiamiento" },
  { value: "capacitacion", label: "Capacitación" },
];

export const SEARCH_FIELDS = ["fullName", "company", "sector", "businessIdea"];
