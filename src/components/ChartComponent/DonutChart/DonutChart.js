import React from "react";
import ReactApexChart from "react-apexcharts";

const DonutChart = () => {
  // Define the options for the donut chart
  const options = {
    chart: {
      type: "donut",
      height: 350,
    },
    labels: ["Category A 999"],
    legend: {
      position: "bottom",
    },
    colors: ["#2f9aff76"],
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 200,
          },
          legend: {
            position: "bottom",
          },
        },
      },
    ],
  };

  // Define the data series for the donut chart
  const series = [999]; // Example data for the four categories

  // Render the donut chart component
  return (
    <div>
      <div id="chart">
        <ReactApexChart
          options={options}
          series={series}
          type="donut"
          height={350}
        />
      </div>
    </div>
  );
};

export default DonutChart;
