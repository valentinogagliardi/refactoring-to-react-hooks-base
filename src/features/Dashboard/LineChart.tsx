import React from "react";
import { Line } from "react-chartjs-2";

interface LineChartProps {
  chartLabels: string[];
  chartValues: number[];
  label: string;
}

const LineChart = ({ chartLabels, chartValues, label }: LineChartProps) => {
  const chartData = (canvas: HTMLCanvasElement) => {
    const ctx = canvas.getContext("2d");
    let gradientFill = ctx?.createLinearGradient(0, 0, 0, 250);

    gradientFill?.addColorStop(0, "rgba(67, 65, 144, 0.4)");
    gradientFill?.addColorStop(1, "rgba(67, 65, 255, 0.2)");

    return {
      labels: chartLabels,
      datasets: [
        {
          label,
          borderColor: "rgba(67, 65, 255, 0)",
          data: chartValues,
          backgroundColor: gradientFill,
        },
      ],
    };
  };

  return (
    <Line
      data={chartData}
      width={1300}
      height={500}
      options={{
        elements: {
          line: {
            tension: 0.3,
            borderWidth: 1.5,
          },
          point: { radius: 2 },
        },
      }}
    />
  );
};

export default LineChart;
