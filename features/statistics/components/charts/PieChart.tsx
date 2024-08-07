import ReactApexChart from "react-apexcharts";
import { ApexOptions } from "apexcharts";

type PieChartData = {
  name: string | boolean;
  value: number;
};

type CustomPieChartProps = {
  data: PieChartData[];
  title: string;
};

const CustomPieChart = ({ data, title }: CustomPieChartProps) => {
  // Convertir valores booleanos a "Sí" o "No"
  const transformedData = data.map((entry) => ({
    ...entry,
    name: entry.name === true ? "Sí" : entry.name === false ? "No" : entry.name,
  }));

  // Filtrar datos válidos
  const validData = transformedData.filter(
    (d) => d.name && d.value !== null && d.value !== undefined
  );

  const colors = ["#4a90e2", "#50e3c2", "#f5a623", "#d0021b", "#8b572a"];

  const chartData = {
    series: validData.map((entry) => entry.value),
    options: {
      chart: {
        type: "pie",
        height: 450,
        toolbar: {
          show: false,
        },
        animations: {
          enabled: true,
          easing: "easeinout",
          speed: 800,
        },
      },
      labels: validData.map((entry) => entry.name),
      colors: colors,
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 300,
            },
            legend: {
              position: "bottom",
            },
          },
        },
      ],
      legend: {
        position: "bottom",
        offsetY: 0,
        height: 50,
        onItemClick: {
          toggleDataSeries: true,
        },
      },
      plotOptions: {
        pie: {
          customScale: 0.9,
          dataLabels: {
            offset: -5,
            minAngleToShowLabel: 10,
          },
        },
      },
      dataLabels: {
        enabled: true,
        formatter: (val: number) => `${val.toFixed(2)}%`,
        style: {
          fontSize: "14px",
          fontWeight: "bold",
          colors: ["#fff"],
        },
        background: {
          enabled: false,
        },
      },
      tooltip: {
        theme: "dark",
        style: {
          fontSize: "14px",
          fontWeight: "bold",
        },
        y: {
          formatter: (value: number) =>
            `${value} (${(
              (value / validData.reduce((acc, entry) => acc + entry.value, 0)) *
              100
            ).toFixed(2)}%)`,
        },
      },
      aria: {
        enabled: true,
        describedBy: "description",
      },
      noData: {
        text: "No data available",
        align: "center",
        verticalAlign: "middle",
        style: {
          color: "#444",
          fontSize: "14px",
        },
      },
    } as ApexOptions,
  };

  return (
    <div className="max-w-full overflow-hidden p-4">
      <div className="text-center text-xl font-bold text-gray-800 mb-4 break-words">
        {title}
      </div>
      <ReactApexChart
        options={chartData.options}
        series={chartData.series}
        type="pie"
        width="100%"
        height={450}
      />
    </div>
  );
};

export default CustomPieChart;
