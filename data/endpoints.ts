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
			key: "Grado de escolaridad",
			table: "info_personal",
			select: "escolaridad, escolaridad.count()",
			chartType: ChartType.BAR,
		},
	],
	"Variables de Género": [
		{
			key: "Horas diarias en Tareas del Hogar",
			table: "variable_genero",
			select: "tiempo_tareas_hogar, tiempo_tareas_hogar.count()",
			chartType: ChartType.BAR,
		},
		{
			key: "Porcentaje de Utilidad del Negocio Destinado a Gastos del Hogar",
			table: "variable_genero",
			select: "porcentaje_utilidad_hogar, porcentaje_utilidad_hogar.count()",
			chartType: ChartType.PIE,
		},
		{
			key: "Número de Personas que Dependen Económicamente",
			table: "variable_genero",
			select: "personas_a_cargo, personas_a_cargo.count()",
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
			key: "Sector al que Pertenece",
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
			key: "Registro Actual en el SIEC",
			table: "emprendimiento",
			select: "registro_siec, registro_siec.count()",
			chartType: ChartType.PIE,
		},
	],
	"Idea de Negocio": [
		{
			key: "Estado Actual del Emprendimiento",
			table: "idea_negocio",
			select: "estado_idea, estado_idea.count()",
			chartType: ChartType.BAR,
		},
		{
			key: "Instrumentos de Gestión del Emprendimiento Desarrollados",
			table: "idea_negocio",
			select: "instrumentos_desarrollados, instrumentos_desarrollados.count()",
			chartType: ChartType.BAR,
		},
	],
	Innovación: [
		{
			key: "Registro de Propiedad Intelectual en el Registro Nacional",
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
			key: "Identificación del Mercado Objetivo",
			table: "mercado",
			select: "mercado_objetivo, mercado_objetivo.count()",
			chartType: ChartType.BAR,
		},
		{
			key: "Segmentación del mercado",
			table: "mercado",
			select: "mercado_segmentado, mercado_segmentado.count()",
			chartType: ChartType.PIE,
		},
		{
			key: "Marca e Imagen Gráfica",
			table: "mercado",
			select: "marca_imagen_grafica, marca_imagen_grafica.count()",
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
			key: "Interés en Formalizar",
			table: "formalizacion",
			select: "interes_formalizar, interes_formalizar.count()",
			chartType: ChartType.PIE,
		},
		{
			key: "Conocimiento de los Pasos para Formalizar",
			table: "formalizacion",
			select: "conocimiento_pasos, conocimiento_pasos.count()",
			chartType: ChartType.BAR,
		},
	],
	Financiamiento: [
		{
			key: "Cuenta con Crédito Activo",
			table: "financiamiento",
			select: "credito_activo, credito_activo.count()",
			chartType: ChartType.PIE,
		},
	],
};

export const CATEGORY_TABS = Object.keys(ENDPOINTS).map((key) => ({
	label: key,
	value: key,
}));
