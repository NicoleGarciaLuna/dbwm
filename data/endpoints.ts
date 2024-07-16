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

export const ENDPOINTS: EndpointsType = {
  "Información Personal": [
    {
      key: "Estado Civil",
      table: "info_personal",
      select: "estado_civil, estado_civil.count()",
      chartType: ChartType.PIE,
    },
    {
      key: "Escolaridad",
      table: "info_personal",
      select: "escolaridad, escolaridad.count()",
      chartType: ChartType.BAR,
    },
  ],
  "Variables de Género": [
    {
      key: "Tiempo en Tareas del Hogar",
      table: "variable_genero",
      select: "tiempo_tareas_hogar, tiempo_tareas_hogar.count()",
      chartType: ChartType.BAR,
    },
    {
      key: "Porcentaje de Utilidad del Hogar",
      table: "variable_genero",
      select: "porcentaje_utilidad_hogar, porcentaje_utilidad_hogar.count()",
      chartType: ChartType.PIE,
    },
    {
      key: "Dependientes",
      table: "variable_genero",
      select: "personas_a_cargo, personas_a_cargo.count()",
      chartType: ChartType.BAR,
    },
    {
      key: "Autonomía en el Emprendimiento",
      table: "autonomia",
      select:
        "id_genero, variable_genero_autonomia_emprendimiento (id_genero.count())",
      chartType: ChartType.BAR,
    },
  ],
  Emprendimiento: [
    {
      key: "Tipo de Emprendimiento",
      table: "emprendimiento",
      select: "tipo_emprendimiento, tipo_emprendimiento.count()",
      chartType: ChartType.BAR,
    },
    {
      key: "Tiempo de Operación",
      table: "emprendimiento",
      select: "tiempo_operacion, tiempo_operacion.count()",
      chartType: ChartType.BAR,
    },
    {
      key: "Sector Económico",
      table: "emprendimiento",
      select: "sector_economico, sector_economico.count()",
      chartType: ChartType.BAR,
    },
    {
      key: "Etapa del Negocio",
      table: "emprendimiento",
      select: "etapa_evolucion, etapa_evolucion.count()",
      chartType: ChartType.BAR,
    },
    {
      key: "Registro SIEC",
      table: "emprendimiento",
      select: "registro_siec, registro_siec.count()",
      chartType: ChartType.PIE,
    },
  ],
  "Idea de Negocio": [
    {
      key: "Estado de la Idea de Negocio",
      table: "idea_negocio",
      select: "estado_idea, estado_idea.count()",
      chartType: ChartType.BAR,
    },
    {
      key: "Instrumentos Desarrollados",
      table: "idea_negocio",
      select: "instrumentos_desarrollados, instrumentos_desarrollados.count()",
      chartType: ChartType.BAR,
    },
  ],
  Innovación: [
    {
      key: "Uso de TICs",
      table: "innovacion",
      select: "uso_tics, uso_tics.count()",
      chartType: ChartType.BAR,
    },
    {
      key: "Registro de Propiedad Intelectual",
      table: "innovacion",
      select:
        "registro_propiedad_intelectual, registro_propiedad_intelectual.count()",
      chartType: ChartType.PIE,
    },
  ],
  Mercado: [
    {
      key: "Estrategia de Marketing Digital",
      table: "mercado",
      select:
        "estrategia_mercadeo_digital, estrategia_mercadeo_digital.count()",
      chartType: ChartType.BAR,
    },
    {
      key: "Promedio Mensual de Ventas",
      table: "mercado",
      select: "promedio_mensual_ventas, promedio_mensual_ventas.count()",
      chartType: ChartType.BAR,
    },
    {
      key: "Competidores Identificados",
      table: "mercado",
      select: "competidores_identificados, competidores_identificados.count()",
      chartType: ChartType.PIE,
    },
    {
      key: "Mercado Objetivo",
      table: "mercado",
      select: "mercado_objetivo, mercado_objetivo.count()",
      chartType: ChartType.BAR,
    },
    {
      key: "Mercado Segmentado",
      table: "mercado",
      select: "mercado_segmentado, mercado_segmentado.count()",
      chartType: ChartType.PIE,
    },
    {
      key: "Imagen de Marca",
      table: "mercado",
      select: "marca_imagen_grafica, marca_imagen_grafica.count()",
      chartType: ChartType.BAR,
    },
    {
      key: "Clientes Actuales",
      table: "mercado",
      select: "id_cliente_actual.count()",
      chartType: ChartType.BAR,
    },
    {
      key: "Canales de Venta",
      table: "mercado",
      select: "id_medio_venta.count()",
      chartType: ChartType.BAR,
    },
  ],
  "Contabilidad y Finanzas": [
    {
      key: "Salario Base Mensual",
      table: "contabilidad_finanzas",
      select: "salario_base_mensual, salario_base_mensual.count()",
      chartType: ChartType.BAR,
    },
    {
      key: "Presupuesto Anual",
      table: "contabilidad_finanzas",
      select: "presupuesto_anual, presupuesto_anual.count()",
      chartType: ChartType.PIE,
    },
    {
      key: "Control de Inventario",
      table: "contabilidad_finanzas",
      select: "control_inventario, control_inventario.count()",
      chartType: ChartType.PIE,
    },
  ],
  Formalización: [
    {
      key: "Interés en Formalización",
      table: "formalizacion",
      select: "interes_formalizar, interes_formalizar.count()",
      chartType: ChartType.PIE,
    },
    {
      key: "Conocimiento de los Pasos de Formalización",
      table: "formalizacion",
      select: "conocimiento_pasos, conocimiento_pasos.count()",
      chartType: ChartType.BAR,
    },
    {
      key: "Aspectos de Formalización",
      table: "formalizacion",
      select: "id_aspecto_formalizacion.count()",
      chartType: ChartType.BAR,
    },
  ],
  Financiamiento: [
    {
      key: "Crédito Activo",
      table: "financiamiento",
      select: "credito_activo, credito_activo.count()",
      chartType: ChartType.PIE,
    },
    {
      key: "Operaciones de Crédito Actuales",
      table: "financiamiento",
      select:
        "operaciones_crediticias_al_dia, operaciones_crediticias_al_dia.count()",
      chartType: ChartType.BAR,
    },
    {
      key: "Fondos de Programas Estatales",
      table: "financiamiento",
      select: "id_fondo_programa_estado.count()",
      chartType: ChartType.BAR,
    },
    {
      key: "Necesidades de Financiamiento",
      table: "financiamiento",
      select: "id_necesidad_financiamiento.count()",
      chartType: ChartType.BAR,
    },
    {
      key: "Razones para No Tener Crédito",
      table: "financiamiento",
      select: "id_razon_no_credito.count()",
      chartType: ChartType.PIE,
    },
    {
      key: "Recursos Disponibles",
      table: "financiamiento",
      select: "id_recurso_disponible.count()",
      chartType: ChartType.BAR,
    },
    {
      key: "Fuente de Inversión Inicial",
      table: "financiamiento",
      select: "id_origen_inversion_inicial.count()",
      chartType: ChartType.BAR,
    },
  ],
  Comunismo: [],
};

export const CATEGORY_TABS = Object.keys(ENDPOINTS).map((key) => ({
  label: key,
  value: key,
}));
