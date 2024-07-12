import { Tabs, Spin } from "antd";
import CustomPieChart from "@/components/charts/PieChartComponent";
import CustomBarChart from "@/components/charts/BarChartComponent";

type DataItem = {
	name: string;
	value: number;
};

type Tab = {
	label: string;
	value: string;
};

type TabsComponentProps = {
	loading: boolean;
	tabs: Tab[];
	data: { [key: string]: { [key: string]: DataItem[] | null } | undefined };
	onTabChange: (key: string) => void;
	activeTab: string;
};

const TabsComponent = ({
	loading,
	tabs,
	data,
	onTabChange,
	activeTab,
}: TabsComponentProps) => {
	const renderChart = (
		dataKey: string,
		ChartComponent: React.ComponentType<{ data: DataItem[]; title: string }>,
		title: string
	) => {
		const chartData = data[activeTab]?.[dataKey];
		return chartData ? <ChartComponent data={chartData} title={title} /> : null;
	};

	const renderTabContent = (tabValue: string) => {
		if (loading && activeTab === tabValue) {
			return (
				<Spin tip="Cargando...">
					<div style={{ height: "200px" }} />
				</Spin>
			);
		}

		switch (tabValue) {
			case "personal":
				return (
					<>
						{renderChart("maritalStatusData", CustomPieChart, "Estado Civil")}
						{renderChart("educationData", CustomBarChart, "Escolaridad")}
					</>
				);
			case "gender":
				return (
					<>
						{renderChart(
							"householdTasksTimeData",
							CustomBarChart,
							"Tiempo en Tareas del Hogar"
						)}
						{renderChart(
							"householdUtilityPercentageData",
							CustomPieChart,
							"Porcentaje de Utilidad del Hogar"
						)}
						{renderChart("dependentsData", CustomBarChart, "Dependientes")}
						{renderChart(
							"entrepreneurshipAutonomyData",
							CustomBarChart,
							"Autonomía en el Emprendimiento"
						)}
					</>
				);
			case "emprendimiento":
				return (
					<>
						{renderChart(
							"businessTypeData",
							CustomBarChart,
							"Tipo de Emprendimiento"
						)}
						{renderChart(
							"operationTimeData",
							CustomBarChart,
							"Tiempo de Operación"
						)}
						{renderChart(
							"economicSectorData",
							CustomBarChart,
							"Sector Económico"
						)}
						{renderChart(
							"businessStageData",
							CustomBarChart,
							"Etapa del Negocio"
						)}
						{renderChart(
							"siecRegistrationData",
							CustomPieChart,
							"Registro SIEC"
						)}
					</>
				);
			case "ideaNegocio":
				return (
					<>
						{renderChart(
							"businessIdeaStatusData",
							CustomBarChart,
							"Estado de la Idea de Negocio"
						)}
						{renderChart(
							"developedInstrumentsData",
							CustomBarChart,
							"Instrumentos Desarrollados"
						)}
					</>
				);
			case "innovacion":
				return (
					<>
						{renderChart("ticsUsageData", CustomBarChart, "Uso de TICs")}
						{renderChart(
							"intellectualPropertyRegistrationData",
							CustomPieChart,
							"Registro de Propiedad Intelectual"
						)}
					</>
				);
			case "mercado":
				return (
					<>
						{renderChart(
							"digitalMarketingStrategyData",
							CustomBarChart,
							"Estrategia de Marketing Digital"
						)}
						{renderChart(
							"monthlySalesAverageData",
							CustomBarChart,
							"Promedio Mensual de Ventas"
						)}
						{renderChart(
							"identifiedCompetitorsData",
							CustomPieChart,
							"Competidores Identificados"
						)}
						{renderChart(
							"targetMarketData",
							CustomBarChart,
							"Mercado Objetivo"
						)}
						{renderChart(
							"segmentedMarketData",
							CustomPieChart,
							"Mercado Segmentado"
						)}
						{renderChart("brandImageData", CustomBarChart, "Imagen de Marca")}
						{renderChart(
							"currentClientsData",
							CustomBarChart,
							"Clientes Actuales"
						)}
						{renderChart(
							"salesChannelsData",
							CustomBarChart,
							"Canales de Venta"
						)}
					</>
				);
			case "contabilidadFinanzas":
				return (
					<>
						{renderChart(
							"monthlyBaseSalaryData",
							CustomBarChart,
							"Salario Base Mensual"
						)}
						{renderChart(
							"annualBudgetData",
							CustomPieChart,
							"Presupuesto Anual"
						)}
						{renderChart(
							"inventoryControlData",
							CustomPieChart,
							"Control de Inventario"
						)}
					</>
				);
			case "formalizacion":
				return (
					<>
						{renderChart(
							"formalizationInterestData",
							CustomPieChart,
							"Interés en Formalización"
						)}
						{renderChart(
							"formalizationStepsKnowledgeData",
							CustomBarChart,
							"Conocimiento de los Pasos de Formalización"
						)}
						{renderChart(
							"formalizationAspectsData",
							CustomBarChart,
							"Aspectos de Formalización"
						)}
					</>
				);
			case "financiamiento":
				return (
					<>
						{renderChart("activeCreditData", CustomPieChart, "Crédito Activo")}
						{renderChart(
							"currentCreditOperationsData",
							CustomBarChart,
							"Operaciones de Crédito Actuales"
						)}
						{renderChart(
							"stateProgramFundsData",
							CustomBarChart,
							"Fondos de Programas Estatales"
						)}
						{renderChart(
							"financingNeedsData",
							CustomBarChart,
							"Necesidades de Financiamiento"
						)}
						{renderChart(
							"noCreditReasonsData",
							CustomPieChart,
							"Razones para No Tener Crédito"
						)}
						{renderChart(
							"availableResourcesData",
							CustomBarChart,
							"Recursos Disponibles"
						)}
						{renderChart(
							"initialInvestmentSourceData",
							CustomBarChart,
							"Fuente de Inversión Inicial"
						)}
					</>
				);
			default:
				return null;
		}
	};

	return (
		<div>
			<Tabs activeKey={activeTab} onChange={onTabChange} type="card">
				{tabs.map((tab) => (
					<Tabs.TabPane tab={tab.label} key={tab.value}>
						{renderTabContent(tab.value)}
					</Tabs.TabPane>
				))}
			</Tabs>
		</div>
	);
};

export default TabsComponent;
