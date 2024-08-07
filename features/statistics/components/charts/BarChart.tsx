import React from "react";
import Chart from "react-apexcharts";
import { ApexOptions } from "apexcharts";

type BarChartData = {
  name: string;
  value: number;
};

type CustomBarChartProps = {
  data: BarChartData[];
  title: string;
};

const CustomBarChart = ({ data, title }: CustomBarChartProps) => {
  const colors = ["#1F77B4", "#FF7F0E", "#2CA02C", "#D62728", "#9467BD"];

  const chartOptions: ApexOptions = {
    chart: {
      type: "bar",
      height: 400,
      toolbar: { show: false },
    },
    plotOptions: {
      bar: {
        distributed: true,
        borderRadius: 5,
        horizontal: false,
        columnWidth: "70%",
      },
    },
    colors: colors,
    dataLabels: {
      enabled: true,
      formatter: (val) => `${val}`,
      style: {
        colors: ["#fff"],
        fontSize: "16px",
        fontWeight: "bold",
      },
      offsetY: -5,
      dropShadow: {
        enabled: true,
        top: 1,
        left: 1,
        blur: 1,
        opacity: 0.45,
      },
    },
    xaxis: {
      categories: data.map((item) => item.name),
      labels: {
        style: {
          colors: colors,
          fontSize: "12px",
        },
        rotate: 0, // Asegurar que las etiquetas sean horizontales
        trim: true, // Permitir el trim de labels largos
        maxHeight: 50, // Ajustar la altura máxima de las etiquetas para evitar superposición
        hideOverlappingLabels: false, // No ocultar etiquetas superpuestas
      },
      axisBorder: { show: false },
      axisTicks: { show: false },
    },
    yaxis: {
      title: {
        text: "Valores",
        style: {
          fontSize: "16px",
          fontWeight: "bold",
        },
      },
    },
    grid: { borderColor: "#f1f1f1" },
    tooltip: {
      y: {
        title: {
          formatter: () => "",
        },
        formatter: (val) =>
          `${val} ${val === 1 ? "microempresaria" : "microempresarias"}`,
      },
      style: { fontSize: "14px", fontFamily: "Arial, sans-serif" },
      theme: "dark",
    },
    title: {
      text: title,
      align: "center",
      style: {
        fontSize: "24px",
        fontWeight: "bold",
        fontFamily: "Arial, sans-serif",
      },
    },
  };

  const chartSeries = [
    { name: "Valores", data: data.map((item) => item.value) },
  ];

  return (
    <div className="p-4 bg-gray-100">
      <Chart
        options={chartOptions}
        series={chartSeries}
        type="bar"
        height={400}
      />
    </div>
  );
};

export default CustomBarChart;
