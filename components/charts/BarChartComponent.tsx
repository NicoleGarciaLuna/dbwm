import {
	BarChart,
	Bar,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	Legend,
	ResponsiveContainer,
	Cell,
} from "recharts";

type BarChartData = {
	name: string;
	value: number;
};

type CustomBarChartProps = {
	data: BarChartData[];
};

const CustomBarChart = ({ data }: CustomBarChartProps) => {
	const colors = ["#8884d8", "#82ca9d", "#ffc658", "#ff8042", "#8dd1e1"];

	return (
		<ResponsiveContainer width="100%" height={400}>
			<BarChart
				data={data}
				margin={{
					top: 5,
					right: 30,
					left: 20,
					bottom: 5,
				}}
			>
				<CartesianGrid strokeDasharray="3 3" />
				<XAxis dataKey="name" />
				<YAxis />
				<Tooltip />
				<Bar dataKey="value">
					{data.map((entry, index) => (
						<Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
					))}
				</Bar>
			</BarChart>
		</ResponsiveContainer>
	);
};

export default CustomBarChart;
