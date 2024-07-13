"use client";
import { useState, useEffect, useCallback } from "react";
import Layout from "@/components/LayoutComponent";
import TabsComponent from "@/components/TabsComponent";
import { categoryTabs } from "@/data/tabsConfig";
import dataService from "@/utils/api/dataService";

type DataItem = {
	name: string;
	value: number;
};

type DataState = Record<string, DataItem[] | null>;

const endpoints = {
	personal: [
		{
			key: "Estado Civil",
			table: "info_personal",
			select: "estado_civil, estado_civil.count()",
		},
		{
			key: "Escolaridad",
			table: "info_personal",
			select: "escolaridad, escolaridad.count()",
		},
	],
	gender: [
		{
			key: "Tiempo en Tareas del Hogar",
			table: "variable_genero",
			select: "tiempo_tareas_hogar, tiempo_tareas_hogar.count()",
		},
		{
			key: "Porcentaje de Utilidad del Hogar",
			table: "variable_genero",
			select: "porcentaje_utilidad_hogar, porcentaje_utilidad_hogar.count()",
		},
		{
			key: "Dependientes",
			table: "variable_genero",
			select: "personas_a_cargo, personas_a_cargo.count()",
		},
		{
			key: "Autonomía en el Emprendimiento",
			table: "variable_genero",
			select: "id_autonomia_emprendimiento.count()",
		},
	],
	emprendimiento: [
		{
			key: "Tipo de Emprendimiento",
			table: "emprendimiento",
			select: "tipo_emprendimiento, tipo_emprendimiento.count()",
		},
		{
			key: "Tiempo de Operación",
			table: "emprendimiento",
			select: "tiempo_operacion, tiempo_operacion.count()",
		},
		{
			key: "Sector Económico",
			table: "emprendimiento",
			select: "sector_economico, sector_economico.count()",
		},
		{
			key: "Etapa del Negocio",
			table: "emprendimiento",
			select: "etapa_evolucion, etapa_evolucion.count()",
		},
		{
			key: "Registro SIEC",
			table: "emprendimiento",
			select: "registro_siec, registro_siec.count()",
		},
	],
	ideaNegocio: [
		{
			key: "Estado de la Idea de Negocio",
			table: "idea_negocio",
			select: "estado_idea, estado_idea.count()",
		},
		{
			key: "Instrumentos Desarrollados",
			table: "idea_negocio",
			select: "instrumentos_desarrollados, instrumentos_desarrollados.count()",
		},
	],
	innovacion: [
		{
			key: "Uso de TICs",
			table: "innovacion",
			select: "uso_tics, uso_tics.count()",
		},
		{
			key: "Registro de Propiedad Intelectual",
			table: "innovacion",
			select:
				"registro_propiedad_intelectual, registro_propiedad_intelectual.count()",
		},
	],
	mercado: [
		{
			key: "Estrategia de Marketing Digital",
			table: "mercado",
			select:
				"estrategia_mercadeo_digital, estrategia_mercadeo_digital.count()",
		},
		{
			key: "Promedio Mensual de Ventas",
			table: "mercado",
			select: "promedio_mensual_ventas, promedio_mensual_ventas.count()",
		},
		{
			key: "Competidores Identificados",
			table: "mercado",
			select: "competidores_identificados, competidores_identificados.count()",
		},
		{
			key: "Mercado Objetivo",
			table: "mercado",
			select: "mercado_objetivo, mercado_objetivo.count()",
		},
		{
			key: "Mercado Segmentado",
			table: "mercado",
			select: "mercado_segmentado, mercado_segmentado.count()",
		},
		{
			key: "Imagen de Marca",
			table: "mercado",
			select: "marca_imagen_grafica, marca_imagen_grafica.count()",
		},
		{
			key: "Clientes Actuales",
			table: "mercado",
			select: "id_cliente_actual.count()",
		},
		{
			key: "Canales de Venta",
			table: "mercado",
			select: "id_medio_venta.count()",
		},
	],
	contabilidadFinanzas: [
		{
			key: "Salario Base Mensual",
			table: "contabilidad_finanzas",
			select: "salario_base_mensual, salario_base_mensual.count()",
		},
		{
			key: "Presupuesto Anual",
			table: "contabilidad_finanzas",
			select: "presupuesto_anual, presupuesto_anual.count()",
		},
		{
			key: "Control de Inventario",
			table: "contabilidad_finanzas",
			select: "control_inventario, control_inventario.count()",
		},
	],
	formalizacion: [
		{
			key: "Interés en Formalización",
			table: "formalizacion",
			select: "interes_formalizar, interes_formalizar.count()",
		},
		{
			key: "Conocimiento de los Pasos de Formalización",
			table: "formalizacion",
			select: "conocimiento_pasos, conocimiento_pasos.count()",
		},
		{
			key: "Aspectos de Formalización",
			table: "formalizacion",
			select: "id_aspecto_formalizacion.count()",
		},
	],
	financiamiento: [
		{
			key: "Crédito Activo",
			table: "financiamiento",
			select: "credito_activo, credito_activo.count()",
		},
		{
			key: "Operaciones de Crédito Actuales",
			table: "financiamiento",
			select:
				"operaciones_crediticias_al_dia, operaciones_crediticias_al_dia.count()",
		},
		{
			key: "Fondos de Programas Estatales",
			table: "financiamiento",
			select: "id_fondo_programa_estado.count()",
		},
		{
			key: "Necesidades de Financiamiento",
			table: "financiamiento",
			select: "id_necesidad_financiamiento.count()",
		},
		{
			key: "Razones para No Tener Crédito",
			table: "financiamiento",
			select: "id_razon_no_credito.count()",
		},
		{
			key: "Recursos Disponibles",
			table: "financiamiento",
			select: "id_recurso_disponible.count()",
		},
		{
			key: "Fuente de Inversión Inicial",
			table: "financiamiento",
			select: "id_origen_inversion_inicial.count()",
		},
	],
};

const Statistics = () => {
	const [loading, setLoading] = useState(false);
	const [data, setData] = useState<DataState>({});
	const [activeTab, setActiveTab] = useState<string>(categoryTabs[0].value);

	const fetchStatisticsData = useCallback(
		async (tab: string) => {
			if (data[tab]) return;

			setLoading(true);
			const newData: DataState = {};
			for (const endpoint of endpoints[tab]) {
				newData[endpoint.key] = await dataService.fetchStatistics(
					endpoint.table,
					endpoint.select
				);
			}
			setData((prevData) => ({ ...prevData, [tab]: newData }));
			setLoading(false);
		},
		[data]
	);

	useEffect(() => {
		fetchStatisticsData(activeTab);
	}, [activeTab, fetchStatisticsData]);

	const handleTabChange = (key: string) => {
		setActiveTab(key);
	};

	const filteredTabs = categoryTabs.slice(0, -1);

	return (
		<Layout>
			<TabsComponent
				loading={loading}
				tabs={filteredTabs}
				data={data}
				onTabChange={handleTabChange}
				activeTab={activeTab}
			/>
		</Layout>
	);
};

export default Statistics;
