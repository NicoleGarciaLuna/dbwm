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
		ChartComponent: React.ComponentType<{ data: DataItem[]; title: string }>
	) => {
		const chartData = data[activeTab]?.[dataKey];
		return chartData ? (
			<ChartComponent data={chartData} title={dataKey} />
		) : null;
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
						{renderChart("Estado Civil", CustomPieChart)}
						{renderChart("Escolaridad", CustomBarChart)}
					</>
				);
			case "gender":
				return (
					<>
						{renderChart("Tiempo en Tareas del Hogar", CustomBarChart)}
						{renderChart("Porcentaje de Utilidad del Hogar", CustomPieChart)}
						{renderChart("Dependientes", CustomBarChart)}
						{renderChart("Autonomía en el Emprendimiento", CustomBarChart)}
					</>
				);
			case "emprendimiento":
				return (
					<>
						{renderChart("Tipo de Emprendimiento", CustomBarChart)}
						{renderChart("Tiempo de Operación", CustomBarChart)}
						{renderChart("Sector Económico", CustomBarChart)}
						{renderChart("Etapa del Negocio", CustomBarChart)}
						{renderChart("Registro SIEC", CustomPieChart)}
					</>
				);
			case "ideaNegocio":
				return (
					<>
						{renderChart("Estado de la Idea de Negocio", CustomBarChart)}
						{renderChart("Instrumentos Desarrollados", CustomBarChart)}
					</>
				);
			case "innovacion":
				return (
					<>
						{renderChart("Uso de TICs", CustomBarChart)}
						{renderChart("Registro de Propiedad Intelectual", CustomPieChart)}
					</>
				);
			case "mercado":
				return (
					<>
						{renderChart("Estrategia de Marketing Digital", CustomBarChart)}
						{renderChart("Promedio Mensual de Ventas", CustomBarChart)}
						{renderChart("Competidores Identificados", CustomPieChart)}
						{renderChart("Mercado Objetivo", CustomBarChart)}
						{renderChart("Mercado Segmentado", CustomPieChart)}
						{renderChart("Imagen de Marca", CustomBarChart)}
						{renderChart("Clientes Actuales", CustomBarChart)}
						{renderChart("Canales de Venta", CustomBarChart)}
					</>
				);
			case "contabilidadFinanzas":
				return (
					<>
						{renderChart("Salario Base Mensual", CustomBarChart)}
						{renderChart("Presupuesto Anual", CustomPieChart)}
						{renderChart("Control de Inventario", CustomPieChart)}
					</>
				);
			case "formalizacion":
				return (
					<>
						{renderChart("Interés en Formalización", CustomPieChart)}
						{renderChart(
							"Conocimiento de los Pasos de Formalización",
							CustomBarChart
						)}
						{renderChart("Aspectos de Formalización", CustomBarChart)}
					</>
				);
			case "financiamiento":
				return (
					<>
						{renderChart("Crédito Activo", CustomPieChart)}
						{renderChart("Operaciones de Crédito Actuales", CustomBarChart)}
						{renderChart("Fondos de Programas Estatales", CustomBarChart)}
						{renderChart("Necesidades de Financiamiento", CustomBarChart)}
						{renderChart("Razones para No Tener Crédito", CustomPieChart)}
						{renderChart("Recursos Disponibles", CustomBarChart)}
						{renderChart("Fuente de Inversión Inicial", CustomBarChart)}
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
